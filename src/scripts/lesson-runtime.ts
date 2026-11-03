import {lessonBeats} from '../data/lesson-beats';
import {initialFlow,currentBeat,revealed,choose,changeAnswer,moveFlow,repairFixture,fixtureResults,type LessonFlow} from './lesson-flow';
import {scene} from './lesson-scenes';
import {reusableBrief} from '../data/lesson-fixtures';
import type {LessonId} from '../data/lessons';
const data=document.querySelector('#lesson-data');
if(data){
 const lesson=JSON.parse(data.textContent!) as {id:LessonId;activities:string[]};
 const app=document.querySelector<HTMLElement>('.lesson-app')!;
 const stage=app.querySelector<HTMLElement>('#lesson-stage-content')!;
 const controls=app.querySelector<HTMLElement>('#lesson-controls')!;
 const title=app.querySelector<HTMLElement>('#activity-title')!;
 const feedback=app.querySelector<HTMLElement>('#lesson-feedback')!;
 const feedbackBox=app.querySelector<HTMLElement>('.focus-feedback')!;
 const feedbackTitle=app.querySelector<HTMLElement>('#feedback-title')!;
 const summary=app.querySelector<HTMLElement>('.answer-summary')!;
 const outline=app.querySelector<HTMLDetailsElement>('.lesson-outline')!;
 let state:LessonFlow=initialFlow();let animations:Animation[]=[];
 const motionOff=()=>document.documentElement.classList.contains('motion-paused')||matchMedia('(prefers-reduced-motion: reduce)').matches;
 function stop(){animations.forEach(a=>a.cancel());animations=[];}
 function animate(){stop();if(motionOff())return;
  stage.querySelectorAll('.changed').forEach(el=>{const frames=el instanceof SVGElement?[{opacity:.15},{opacity:1}]:[{opacity:.3,translate:'0 5px'},{opacity:1,translate:'0 0'}];animations.push(el.animate(frames,{duration:350,easing:'ease-out'}));});
  if(['pieces','lamp','wrench'].includes(scene(lesson.id,state).prop)){const nori=app.querySelector('.lesson-nori')!;animations.push(nori.animate([{rotate:'0deg'},{rotate:'-5deg',offset:.4},{rotate:'0deg'}],{duration:350}));}
 }
 function focusVisible(el:HTMLElement){el.focus({preventScroll:true});const rect=el.getBoundingClientRect();if(rect.top<20||rect.bottom>innerHeight-30)el.scrollIntoView({behavior:'instant',block:'nearest'});}
 function start(){document.body.classList.add('lesson-started');}
 function render(){stop();const b=currentBeat(lesson.id,state),view=scene(lesson.id,state),done=revealed(lesson.id,state);
  app.dataset.beat=b.id;app.dataset.phase=done?'result':'choice';title.textContent=b.title;app.querySelector('#activity-lead')!.textContent=b.prompt;
  stage.innerHTML=view.stage;controls.innerHTML=view.controls;controls.hidden=done;controls.classList.toggle('object-choices',b.choices.every(c=>['ball','cat','moon'].includes(c.id)));
  summary.hidden=!done;app.querySelector('#selected-answer')!.textContent=done?(b.id==='build'?'Sentence assembled':b.choices.find(c=>c.id===state.answers[b.id])?.label||''):'';
  app.querySelector('[data-change-answer]')!.textContent=b.choices.length>1?'Change my answer':'Try again';
  feedbackBox.hidden=!done;feedbackBox.dataset.result=view.correct===false?'retry':view.correct===true?'supported':'notice';feedback.textContent=view.feedback;
  feedbackTitle.textContent=view.correct===false?'One thing to check':view.correct===true?'That follows the evidence':'What changed';
  app.querySelector('#lesson-detail')!.innerHTML=view.detail;
  app.querySelector('#lesson-position')!.textContent=`Activity ${b.activity+1} of ${lesson.activities.length}`;
  app.querySelectorAll<HTMLButtonElement>('[data-activity]').forEach(el=>{if(Number(el.dataset.activity)===b.activity)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
  (app.querySelector('[data-back]') as HTMLButtonElement).disabled=state.position===0;
  const next=app.querySelector<HTMLButtonElement>('[data-next]')!;next.hidden=!done;next.textContent=state.position===lessonBeats[lesson.id].length-1?'See my takeaways →':'Continue →';
 }
 function move(position:number){state=moveFlow(lesson.id,state,position);document.body.classList.remove('lesson-complete');start();outline.open=false;render();app.scrollIntoView({behavior:'instant',block:'start'});title.focus({preventScroll:true});}
 function complete(){stop();state.complete=true;outline.open=false;document.body.classList.add('lesson-complete');const recap=document.querySelector<HTMLElement>('#lesson-takeaways')!;
  const fixtureRecap=document.querySelector('#fixture-recap');if(fixtureRecap){fixtureRecap.innerHTML='<h3>Your three teaching fixtures</h3><ul>'+fixtureResults(state).map((r,i)=>`<li><span>${state.answers[['eval-allowance','eval-probation','eval-missing'][i]]?(r.pass?'✓ Pass':'! Needs repair'):'Not run'}</span>${r.label}</li>`).join('')+'</ul><p>These are authored cases, not a benchmark or production accuracy score.</p>';}
  recap.scrollIntoView({behavior:'instant',block:'start'});recap.querySelector<HTMLElement>('h2')!.focus({preventScroll:true});
 }
 app.addEventListener('click',e=>{const target=(e.target as Element).closest<HTMLButtonElement>('button');if(!target)return;
  if(target.hasAttribute('data-choice')){if(revealed(lesson.id,state))return;start();state=choose(lesson.id,state,target.dataset.choice!);render();animate();if(revealed(lesson.id,state))focusVisible(feedbackTitle);else{focusVisible(controls.querySelector('button')!);}return;}
  if(target.hasAttribute('data-change-answer')){state=changeAnswer(lesson.id,state);render();focusVisible(controls.querySelector('button')!);return;}
  if(target.hasAttribute('data-activity')){move(lessonBeats[lesson.id].findIndex(b=>b.activity===Number(target.dataset.activity)));return;}
  if(target.hasAttribute('data-back')){move(state.position-1);return;}
  if(target.hasAttribute('data-next')){if(!revealed(lesson.id,state))return;if(state.position===lessonBeats[lesson.id].length-1)complete();else move(state.position+1);return;}
  if(target.hasAttribute('data-restart')){state=initialFlow();move(0);return;}
  if(target.hasAttribute('data-skip-recap')){complete();return;}
  if(target.hasAttribute('data-replay')){animate();feedback.textContent=scene(lesson.id,state).feedback+(motionOff()?' Motion is paused; the result is shown without animation.':' Replaying the visual; your answer stays the same.');return;}
  if(target.hasAttribute('data-repair-fixture')){state=repairFixture(state);render();animate();focusVisible(feedbackTitle);}
 });
 document.querySelector('[data-start-lesson]')?.addEventListener('click',e=>{e.preventDefault();start();move(0);});
 document.querySelector('[data-review-lesson]')?.addEventListener('click',()=>move(0));
 document.querySelector('[data-copy-prompt]')?.addEventListener('click',async()=>{const prompt=document.querySelector<HTMLElement>('#copyable-prompt')!,status=document.querySelector<HTMLElement>('[data-copy-status]')!;try{await navigator.clipboard.writeText(reusableBrief);status.textContent='Copied. Adapt it with approved material, then review the result.';}catch{const range=document.createRange();range.selectNodeContents(prompt);const selection=getSelection();selection?.removeAllRanges();selection?.addRange(range);prompt.focus();status.textContent='Prompt selected. Use your device’s Copy command, or select the text manually.';}});
 document.addEventListener('lesson-motion-change',stop);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&outline.open){outline.open=false;outline.querySelector('summary')!.focus();}});
 document.addEventListener('click',e=>{if(outline.open&&!outline.contains(e.target as Node))outline.open=false;});
 render();app.inert=false;document.querySelector<HTMLElement>('.lesson-fallback-notice')!.hidden=true;document.querySelector<HTMLDetailsElement>('#walkthrough')!.open=false;
}
