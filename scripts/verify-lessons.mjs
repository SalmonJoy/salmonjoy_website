import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
const compiled=await build({stdin:{contents:"export * from './src/scripts/lesson-engine';export * from './src/scripts/lesson-flow';export {lessonBeats} from './src/data/lesson-beats';export {scene} from './src/scripts/lesson-scenes';",resolveDir:process.cwd(),loader:'ts'},bundle:true,write:false,format:'esm',platform:'node',logLevel:'silent'});
const {initialState,evaluateFixtures,initialFlow,choose,changeAnswer,moveFlow,repairFixture,fixtureResults,revealed,scene,lessonBeats,feedbackFor}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
let branches=0,beats=0;
const untouched=initialFlow();assert.strictEqual(choose('answer',untouched,'invalid'),untouched);
for(const [id,list] of Object.entries(lessonBeats)){
 assert.equal(new Set(list.map(b=>b.id)).size,list.length);
 let journey=initialFlow();
 for(let position=0;position<list.length;position++){
  const b=list[position]; beats++; assert.ok(b.choices.length>=1&&b.choices.length<=3);
  for(const dep of b.dependsOn||[])assert.ok(list.findIndex(x=>x.id===dep)<position);
  const before=moveFlow(id,initialFlow(),position),v=scene(id,before);
  assert.ok(v.stage&&v.controls);assert.equal(v.feedback,'');assert.equal(revealed(id,before),false);
  for(const c of b.choices){let selected=choose(id,before,c.id);if(b.id==='build')for(let i=0;i<12;i++)selected=choose(id,selected,c.id);
   assert.equal(before.answers[b.id],undefined);assert.equal(selected.answers[b.id],c.id);assert.equal(revealed(id,selected),true);
   const after=scene(id,selected);assert.ok(after.stage&&after.feedback);assert.equal(after.controls,'');
   const retry=changeAnswer(id,selected);assert.equal(revealed(id,retry),false);assert.equal(selected.answers[b.id],c.id);branches++;
  }
  journey=moveFlow(id,journey,position);journey=choose(id,journey,b.choices[0].id);if(b.id==='build')for(let i=0;i<10;i++)journey=choose(id,journey,'add');assert.ok(revealed(id,journey));
 }
 assert.equal(Object.keys(journey.answers).length,list.length);
 assert.equal(moveFlow(id,journey,-99).position,0);assert.equal(moveFlow(id,journey,999).position,list.length-1);
}
for(let mask=0;mask<8;mask++){const checks=['current','exception','missing'].filter((_,i)=>mask&(1<<i));const r=evaluateFixtures({...initialState(),checks});assert.equal(r[0].pass,!!(mask&1));assert.equal(r[1].pass,(mask&3)===3);assert.equal(r[2].pass,!!(mask&4));}
let s={...initialFlow(),position:1,answers:{guess:'cat',setting:'fetch',predict:'ball','check-context':'right'}};
let changed=choose('answer',s,'space');assert.equal(changed.answers.predict,undefined);assert.equal(changed.answers.guess,'cat');assert.equal(changed.answers['check-context'],'right');assert.equal(s.answers.predict,'ball');
s={...initialFlow(),position:3,tokenCount:7,answers:{pieces:'show',build:'add'}};changed=changeAnswer('answer',s);assert.equal(changed.tokenCount,0);assert.equal(changed.answers.build,undefined);
s={...initialFlow(),position:5,answers:{claim:'all',citation:'exception'}};assert.equal(feedbackFor('rag',s).correct,false);
s={...initialFlow(),position:5,answers:{citation:'exception'}};assert.match(feedbackFor('rag',s).text,/not chosen a claim/);assert.match(scene('rag',s).stage,/No claim chosen yet/);assert.equal(feedbackFor('rag',s).correct,undefined);
const fixed={filter:'current',relevance:'equipment',context:'full',claim:'exception',citation:'exception',missing:'unknown','eval-allowance':'run','eval-probation':'run','eval-missing':'run'};
s={...initialFlow(),answers:fixed};assert.ok(fixtureResults(s).every(r=>r.pass));
changed=choose('rag',{...s,position:1},'all');assert.equal(changed.answers.relevance,undefined);assert.equal(changed.answers['eval-allowance'],undefined);assert.equal(changed.answers['eval-probation'],undefined);assert.equal(changed.answers['eval-missing'],'run');
for(const position of [7,8,9]){const repaired=repairFixture({...initialFlow(),position});assert.equal(repaired.answers[lessonBeats.rag[position].id],'run');assert.equal(fixtureResults(repaired)[position-7].pass,true);}
const metadata=JSON.parse(await readFile('src/data/lesson-meta.json','utf8'));
for(const m of metadata){const h=await readFile(`dist/learn/${m.slug}/index.html`,'utf8');assert.match(h,/lesson-page/);assert.doesNotMatch(h,/id="nori-canvas"|id="nori-host"|class="companion-controls"/);assert.match(h,/Read the complete walkthrough/);assert.match(h,/No account/);assert.match(h,/data-start-lesson/);assert.match(h,/class="lesson-outline"/);assert.match(h,/data-skip-recap/);const data=JSON.parse(h.match(/<script type="application\/json" id="lesson-data">([\s\S]*?)<\/script>/)[1]);assert.equal(data.activities.length,m.id==='brief'?5:6);const schema=JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.ok(schema['@graph'].some(e=>e['@type']==='LearningResource'&&e.isAccessibleForFree));await readFile(`dist/images/${m.art}.png`);}
for(const file of ['lesson-runtime.ts','lesson-flow.ts','lesson-scenes.ts'])assert.doesNotMatch(await readFile('src/scripts/'+file,'utf8'),/fetch\(|localStorage|sessionStorage|setTimeout/);
console.log(JSON.stringify({lessons:3,beats,choiceBranches:branches,fixtureSettingCombinations:8,checks:'choice/result isolation, all authored branches, retries, token bounds, dependencies, independent answers, fixture repairs, evidence mismatch, static walkthroughs, schemas and assets passed'},null,2));
