import {tracks} from '../data/training';
import {prepareMessage,contactLinks} from './enquiry';

const $ = <T extends Element=HTMLElement>(s:string) => document.querySelector<T>(s);
const $$ = <T extends Element=HTMLElement>(s:string) => [...document.querySelectorAll<T>(s)];
document.documentElement.classList.add('enhanced');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches;
try { paused = localStorage.getItem('salmon-motion') === 'paused' || (localStorage.getItem('salmon-motion') !== 'on' && reduced.matches); } catch {}
let nori: {setState:(state:string,step:number)=>void;setPaused:(paused:boolean)=>void;dispose:()=>void}|undefined;
let gsapContext: {revert:()=>void}|undefined;
let currentScene='hero';
let currentStep=0;
let trainingScene='training';
function reflectMotion(enhance=true){
 document.documentElement.classList.toggle('motion-paused',paused);
 $$<HTMLButtonElement>('[data-motion-toggle]').forEach(b=>{b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?'Enable animations':'Pause animations');b.querySelector('.motion-label')!.textContent=paused?'Motion off':'Motion on';b.querySelector('.motion-icon')!.textContent=paused?'▷':'Ⅱ';});
 nori?.setPaused(paused);
 if(paused){gsapContext?.revert();gsapContext=undefined;}else if(enhance){void enhanceMotion();void loadNori();}
}
$$('[data-motion-toggle]').forEach(b=>b.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('salmon-motion',paused?'paused':'on')}catch{}reflectMotion();}));
reduced.addEventListener('change',()=>{paused=reduced.matches;reflectMotion();});

const menu=$<HTMLDialogElement>('#mobile-menu')!;
const guide=$<HTMLDialogElement>('#guide-dialog')!;
const host=$<HTMLButtonElement>('#nori-host')!;
function openDialog(dialog:HTMLDialogElement){dialog.showModal();host.classList.add('dialog-open');nori?.setPaused(true);if(dialog===menu)$('#menu-open')?.setAttribute('aria-expanded','true');}
$('#menu-open')?.addEventListener('click',()=>openDialog(menu));
$('#guide-open')?.addEventListener('click',()=>openDialog(guide));
$$('[data-open-guide]').forEach(b=>b.addEventListener('click',()=>openDialog(guide)));
$$<HTMLDialogElement>('dialog').forEach(dialog=>{
 dialog.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('close',()=>{host.classList.remove('dialog-open');nori?.setPaused(paused);$('#menu-open')?.setAttribute('aria-expanded','false');});
});
const enquiry=$<HTMLFormElement>('#enquiry-form');
const field=(name:string)=>enquiry?.elements.namedItem(name) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|null;
function selectTrack(track:string){const control=field('track');if(control)control.value=track;$('#message-preview')?.setAttribute('hidden','');}
$$<HTMLAnchorElement>('.track-enquiry').forEach(a=>a.addEventListener('click',()=>selectTrack(a.dataset.track!)));
$('#finder-form')?.addEventListener('submit',e=>{
 e.preventDefault();const data=new FormData(e.currentTarget as HTMLFormElement);const track=tracks.find(t=>t.id===data.get('audience'))!;
 $('#finder-title')!.textContent=track.title;$('#finder-description')!.textContent=track.description;
 $('#finder-result')!.hidden=false;selectTrack(track.id);field('goal')!.value=String(data.get('finderGoal'));field('size')!.value=String(data.get('finderSize'));
 $('#finder-contact')!.setAttribute('href','#contact');$('#finder-result')!.scrollIntoView({behavior:paused?'instant':'smooth',block:'nearest'});
});
enquiry?.addEventListener('input',()=>{$('#message-preview')!.hidden=true;});
enquiry?.addEventListener('submit',e=>{
 e.preventDefault();const values=Object.fromEntries([...new FormData(enquiry)].map(([key,value])=>[key,String(value)]));
 const message=prepareMessage(values);const links=contactLinks(message,values.track);
 $('#prepared-message')!.textContent=message;$('#email-enquiry')!.setAttribute('href',links.email);$('#whatsapp-enquiry')!.setAttribute('href',links.whatsapp);
 $('#message-preview')!.hidden=false;$('#copy-status')!.textContent='';$('#preview-title')!.focus({preventScroll:true});$('#message-preview')!.scrollIntoView({behavior:paused?'instant':'smooth',block:'center'});
});
$('#copy-message')?.addEventListener('click',async()=>{
 const message=$('#prepared-message')!.textContent!;
 try{await navigator.clipboard.writeText(message);$('#copy-status')!.textContent='Copied. Paste it into your preferred app.';}catch{
 const range=document.createRange();range.selectNodeContents($('#prepared-message')!);const selection=window.getSelection();selection?.removeAllRanges();selection?.addRange(range);$('#prepared-message')!.focus();$('#copy-status')!.textContent='Message selected. Use your device’s Copy command to copy it.';
 }
});

function setDemo(step:number){currentStep=step;host.dataset.step=String(step);$('.teaching-stage')?.setAttribute('data-active-step',String(step));$$('[data-demo-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.demoStep)===step)));nori?.setState(currentScene,currentStep);}
$$('[data-demo-step]').forEach(b=>b.addEventListener('click',()=>{setDemo(Number(b.dataset.demoStep));if(b.classList.contains('replay-step')){if(innerWidth<768){const panel=b.closest('.teaching-step')!;panel.classList.remove('replaying');requestAnimationFrame(()=>panel.classList.add('replaying'));panel.addEventListener('animationend',()=>panel.classList.remove('replaying'),{once:true});}else $('.teaching-stage')?.scrollIntoView({behavior:paused?'instant':'smooth',block:'center'});}}));
if($('.teaching-stage'))setDemo(0);
const stepObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible[0])setDemo(Number((visible[0].target as HTMLElement).dataset.step));},{rootMargin:'-25% 0px -35% 0px',threshold:[0,.3,.7]});
$$('[data-step]').forEach(e=>stepObserver.observe(e));
const caseObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const index=(entry.target as HTMLElement).dataset.case;$$('[data-work-visual]').forEach(el=>el.classList.toggle('active',el.dataset.workVisual===index));nori?.setState('work',Number(index));}},{rootMargin:'-20% 0px -45% 0px'});
$$('[data-case]').forEach(el=>caseObserver.observe(el));
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const category=b.dataset.filter;let count=0;$$('[data-project-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.projectCategory!==category;if(!card.hidden)count++;});$$('[data-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));$('#filter-status')!.textContent=`Showing ${count} of 21 projects`;}));

document.addEventListener('focusin',e=>{if(matchMedia('(max-width:767px)').matches&&(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement))document.body.classList.add('input-active');});
document.addEventListener('focusout',()=>{setTimeout(()=>{if(!(document.activeElement instanceof HTMLInputElement||document.activeElement instanceof HTMLTextAreaElement||document.activeElement instanceof HTMLSelectElement))document.body.classList.remove('input-active');},60);});

let positionPending=false;
function positionNori(){
 positionPending=false;const dock=$('#nori-dock')!;let target:HTMLElement=dock;let scene='dock';const h=innerHeight;
 for(const anchor of $$('.nori-anchor')){const r=anchor.getBoundingClientRect();if(r.width>0&&r.top>70&&r.bottom<h-85&&r.left>=0&&r.right<=innerWidth){target=anchor;scene=anchor.closest<HTMLElement>('[data-nori-scene]')?.dataset.noriScene||'hero';}}
 if(target===dock){for(const section of $$('[data-nori-scene]')){const bounds=section.getBoundingClientRect();if(bounds.top<h*.6&&bounds.bottom>h*.4)scene=section.dataset.noriScene!;}}
 if(scene==='training')scene=trainingScene;
 const r=target.getBoundingClientRect();const progress=100*scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);host.style.width=`${r.width}px`;host.style.height=`${r.height}px`;host.style.transform=`translate3d(${r.left}px,${r.top}px,0)`;host.classList.add('is-positioned');host.classList.toggle('docked',target===dock);host.tabIndex=target===dock?-1:0;host.setAttribute('aria-hidden',String(target===dock));host.dataset.scene=scene;$('.companion-controls')?.classList.toggle('nori-in-scene',target!==dock);$('.story-thread')?.style.setProperty('--story-progress',`${progress}%`);
 if(scene!==currentScene){currentScene=scene;nori?.setState(scene,currentStep);}
}
function queuePosition(){if(!positionPending){positionPending=true;requestAnimationFrame(positionNori);}}
addEventListener('scroll',queuePosition,{passive:true});addEventListener('resize',queuePosition);new ResizeObserver(queuePosition).observe(document.body);
let loadingNori=false;
async function loadNori(){if(nori||loadingNori||paused||innerWidth<1024)return;loadingNori=true;try{const {createNori}=await import('./nori');nori=await createNori($('#nori-canvas') as HTMLCanvasElement,()=>host.classList.remove('has-webgl'));host.classList.add('has-webgl');nori.setState(currentScene,currentStep);nori.setPaused(paused);}catch{host.classList.remove('has-webgl');}finally{loadingNori=false;}}
let loadingMotion=false;
async function enhanceMotion(){if(paused||gsapContext||loadingMotion||innerWidth<1024)return;loadingMotion=true;try{
 const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);gsap.registerPlugin(ScrollTrigger);if(paused)return;
 gsapContext=gsap.context(()=>{const mm=gsap.matchMedia();mm.add('(min-width:1024px) and (min-height:721px)',()=>{
 if($('.hero'))gsap.to('.hero-visual',{y:35,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1,onUpdate:queuePosition}});
 if($('.timeline'))gsap.fromTo('.timeline',{ '--timeline-progress':'0%' },{'--timeline-progress':'100%',ease:'none',scrollTrigger:{trigger:'.timeline',start:'top 75%',end:'bottom 50%',scrub:1}});
 $$('.metrics>div').forEach(el=>gsap.fromTo(el,{'--metric-progress':'0%'},{'--metric-progress':'100%',duration:.6,scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
 $$('.photo-grid figure').forEach(el=>gsap.from(el,{y:24,duration:.6,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
 });});
}catch{}finally{loadingMotion=false;}}
$$('[data-training-card]').forEach(card=>{card.addEventListener('click',()=>{const id=card.dataset.trainingCard;$$('[data-training-card]').forEach(c=>c.classList.toggle('selected',c===card));trainingScene=id==='build'?'work':id==='teach'?'ideas':'training';host.dataset.scene=trainingScene;nori?.setState(trainingScene,0);});});
reflectMotion(false);
function enhanceWhenReady(){if('requestIdleCallback' in window)window.requestIdleCallback(()=>{void loadNori();void enhanceMotion();},{timeout:2500});else setTimeout(()=>{void loadNori();void enhanceMotion();},1000);}
if(document.readyState==='complete')enhanceWhenReady();else addEventListener('load',enhanceWhenReady,{once:true});
addEventListener('resize',()=>{if(innerWidth>=1024){enhanceWhenReady();}else if(nori){nori.dispose();nori=undefined;host.classList.remove('has-webgl');}});
