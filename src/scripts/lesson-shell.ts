import {prepareMessage,contactLinks} from './enquiry';
import './lesson-runtime';
document.documentElement.classList.add('enhanced');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
try{const saved=localStorage.getItem('salmon-motion');paused=saved==='paused'||(saved!=='on'&&reduced.matches);}catch{}
function reflect(){document.documentElement.classList.toggle('motion-paused',paused);document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach(b=>{b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?'Enable animations':'Pause animations');b.querySelector('.motion-icon')!.textContent=paused?'▷':'Ⅱ';b.querySelector('.motion-label')!.textContent=paused?'Motion off':'Motion on';});document.dispatchEvent(new CustomEvent('lesson-motion-change'));}
document.querySelectorAll('[data-motion-toggle]').forEach(b=>b.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('salmon-motion',paused?'paused':'on');}catch{}reflect();}));
reduced.addEventListener('change',()=>{paused=reduced.matches;reflect();});reflect();
const menu=document.querySelector<HTMLDialogElement>('#mobile-menu')!;const opener=document.querySelector<HTMLButtonElement>('#menu-open')!;
opener.addEventListener('click',()=>{menu.showModal();opener.setAttribute('aria-expanded','true');});
menu.querySelectorAll('[data-close-dialog],a').forEach(e=>e.addEventListener('click',()=>menu.close()));
menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close();}});
menu.addEventListener('close',()=>opener.setAttribute('aria-expanded','false'));
const form=document.querySelector<HTMLFormElement>('#enquiry-form')!;const preview=document.querySelector<HTMLElement>('#message-preview')!;
form.addEventListener('input',()=>preview.hidden=true);
form.addEventListener('submit',e=>{e.preventDefault();const values=Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,String(v)]));const message=prepareMessage(values);const links=contactLinks(message,values.track);document.querySelector('#prepared-message')!.textContent=message;document.querySelector('#email-enquiry')!.setAttribute('href',links.email);document.querySelector('#whatsapp-enquiry')!.setAttribute('href',links.whatsapp);preview.hidden=false;document.querySelector('#copy-status')!.textContent='';document.querySelector<HTMLElement>('#preview-title')!.focus({preventScroll:true});preview.scrollIntoView({behavior:paused?'instant':'smooth',block:'center'});});
document.querySelector('#copy-message')!.addEventListener('click',async()=>{const el=document.querySelector<HTMLElement>('#prepared-message')!;const status=document.querySelector('#copy-status')!;try{await navigator.clipboard.writeText(el.textContent||'');status.textContent='Copied. Paste it into your preferred app.';}catch{const range=document.createRange();range.selectNodeContents(el);const selection=getSelection();selection?.removeAllRanges();selection?.addRange(range);el.focus();status.textContent='Message selected. Use your device’s Copy command.';}});
