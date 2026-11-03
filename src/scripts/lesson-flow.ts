import {lessonBeats,type LessonBeat} from '../data/lesson-beats';
import type {LessonId} from '../data/lessons';
import {initialState,evaluateFixtures} from './lesson-engine';
import {tokenPieces} from '../data/lesson-fixtures';
export interface LessonFlow {position:number;answers:Record<string,string>;tokenCount:number;complete:boolean}
export const initialFlow=():LessonFlow=>({position:0,answers:{},tokenCount:0,complete:false});
export const currentBeat=(id:LessonId,s:LessonFlow):LessonBeat=>lessonBeats[id][s.position];
export const revealed=(id:LessonId,s:LessonFlow)=>Boolean(s.answers[currentBeat(id,s).id]);
function invalidate(id:LessonId,s:LessonFlow,key:string){
 const queue=[key];const visited=new Set<string>();
 while(queue.length){const changed=queue.shift()!;if(visited.has(changed))continue;visited.add(changed);for(const b of lessonBeats[id])if(b.dependsOn?.includes(changed)){delete s.answers[b.id];if(b.id==='build')s.tokenCount=0;queue.push(b.id);}}
}
export function choose(id:LessonId,s:LessonFlow,value:string):LessonFlow{
 const b=currentBeat(id,s);if(!b.choices.some(c=>c.id===value))return s;
 const n={...s,answers:{...s.answers},complete:false};
 if(b.id==='build'){n.tokenCount=Math.min(tokenPieces.length,n.tokenCount+1);if(n.tokenCount===tokenPieces.length)n.answers[b.id]=value;return n;}
 if(n.answers[b.id]!==value)invalidate(id,n,b.id);n.answers[b.id]=value;return n;
}
export function changeAnswer(id:LessonId,s:LessonFlow):LessonFlow{const n={...s,answers:{...s.answers},complete:false};const key=currentBeat(id,s).id;delete n.answers[key];if(key==='build')n.tokenCount=0;invalidate(id,n,key);return n;}
export function moveFlow(id:LessonId,s:LessonFlow,position:number):LessonFlow{return {...s,position:Math.max(0,Math.min(position,lessonBeats[id].length-1)),complete:false};}
export function fixtureResults(s:LessonFlow){
 const a=s.answers;const checks:string[]=[];
 if(a.filter==='current'&&a.relevance==='equipment')checks.push('current');
 if(a.context==='full'&&a.claim==='exception'&&a.citation==='exception')checks.push('exception');
 if(a.missing==='unknown')checks.push('missing');
 return evaluateFixtures({...initialState(),checks});
}
export function repairFixture(s:LessonFlow):LessonFlow{
 let n={...s,answers:{...s.answers},complete:false};const b=currentBeat('rag',s);const repairs:Record<string,string>=b.id==='eval-missing'?{missing:'unknown'}:b.id==='eval-allowance'?{filter:'current',relevance:'equipment'}:{filter:'current',relevance:'equipment',context:'full',claim:'exception',citation:'exception'};
 for(const [key,value] of Object.entries(repairs)){if(n.answers[key]!==value)invalidate('rag',n,key);n.answers[key]=value;}n.answers[b.id]='run';return n;
}
export function feedbackFor(id:LessonId,s:LessonFlow):{text:string;correct?:boolean}{
 const b=currentBeat(id,s),value=s.answers[b.id],c=b.choices.find(c=>c.id===value);if(!c)return {text:''};
 if(b.id==='predict'){const expected=s.answers.setting==='space'?'moon':'ball';return {text:value===expected?'That fits this setting well. Context changes the relative possibilities; it doesn’t verify whether the story happened.':'That is possible too. In this authored example, the setting makes '+expected+' more likely. The highest bar is not a truth score.'};}
 if(b.id==='citation'&&!s.answers.claim)return {text:'You have not chosen a claim yet. Go Back to choose an answer, then compare it with this passage. A citation alone does not establish support.'};
 if(b.id==='citation'&&s.answers.claim==='all'&&value==='exception')return {text:'This is the relevant passage, but your earlier claim says everyone can claim. The passage excludes probation. Go Back to revise the claim, or keep exploring.',correct:false};
 if(b.id.startsWith('eval-')){const r=fixtureResults(s)[b.id==='eval-allowance'?0:b.id==='eval-probation'?1:2];return {text:r.pass?'This fixture passes. The selected evidence supports this particular response.':'This fixture needs a repair. Compare the response with the expected outcome in the result.',correct:r.pass};}
 return {text:c.feedback,correct:c.correct};
}
