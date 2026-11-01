import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const themes=JSON.parse(await readFile('src/data/themes.json','utf8'));
const settings=JSON.parse(await readFile('src/data/theme-settings.json','utf8'));
const name=process.env.SITE_THEME||settings.defaultTheme;
const rgb=h=>h.slice(1).match(/../g).map(c=>parseInt(c,16));
const luminance=h=>rgb(h).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
const mix=(a,b,p)=>'#'+rgb(a).map((v,i)=>Math.round(v*p+rgb(b)[i]*(1-p)).toString(16).padStart(2,'0')).join('');
const results={};
for(const [key,t] of Object.entries(themes)){
 const pairs=[['body',t.ink,t.surface,4.5],['secondary',t.muted,t.surface,4.5],['panel text',t.muted,t.raised,4.5],['button',t.surface,t.brand,4.5],['dark text',t.surface,t.dark,4.5],['dark secondary',t.onDarkMuted,t.dark,4.5],['highlight',t.accent,t.dark,4.5],['dark field border',mix(t.onDarkMuted,t.dark,.65),t.dark,3],['light field border',t.muted,t.surface,3],['light focus',t.brand,t.surface,3],['dark focus',t.accent,t.dark,3]];
 results[key]=Object.fromEntries(pairs.map(([role,a,b,min])=>{const ratio=contrast(a,b);assert.ok(ratio>=min,`${key} ${role}: ${ratio}`);return [role,+ratio.toFixed(2)]}));
}
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){let p=path.join(dir,e.name);out.push(...(e.isDirectory()?await walk(p):[p]));}return out;}
const files=await walk('dist');const html=await readFile('dist/index.html','utf8');
assert.ok(html.includes(`data-theme="${name}"`));assert.ok(html.includes(`content="${themes[name].dark}"`));
const css=(await Promise.all(files.filter(f=>f.endsWith('.css')).map(f=>readFile(f,'utf8')))).join('\n');
const inline=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
const declared=new Set([...`${css}\n${inline}`.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map(m=>m[1]));
for(const m of css.matchAll(/var\((--[a-zA-Z0-9-]+)([,\)])/g))assert.ok(declared.has(m[1])||m[2]===',','Undefined CSS token: '+m[1]);
assert.ok(!/Instrument Serif|#dca4b3|#381b29|#e8b6c3/i.test(css+html),'Legacy palette or display font leaked');
for(const filename of ['og.svg','images/choose-ai-training.svg','images/chatgpt-workflows.svg']){const image=await readFile(path.join('dist',filename),'utf8');assert.ok(image.includes(themes[name].dark));assert.ok(!/Georgia|font-style="italic"|#dca4b3/i.test(image));}
for(const file of files.filter(f=>f.endsWith('.html')))assert.ok((await readFile(file,'utf8')).includes(`data-theme="${name}"`),'Mixed theme in '+file);
console.log(JSON.stringify({selected:name,palettes:results,cssTokens:'resolved',pages:'one consistent theme',graphics:'matched'},null,2));
