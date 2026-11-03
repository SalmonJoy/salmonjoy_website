import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import * as fontkit from 'fontkit';
import sharp from 'sharp';
import wawoff from 'wawoff2';
const themes=JSON.parse(await readFile('src/data/themes.json','utf8'));
const settings=JSON.parse(await readFile('src/data/theme-settings.json','utf8'));
export const themeName=process.env.SITE_THEME||settings.defaultTheme;
if(!Object.hasOwn(themes,themeName))throw new Error('Unknown SITE_THEME: '+themeName);
const t=themes[themeName];
const font=fontkit.create(Buffer.from(await wawoff.decompress(await readFile('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'))));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
function text(value,x,y,size,color,weight=600,maxWidth=1100){
 const f=font.getVariation({wght:weight});const run=f.layout(value);let cursor=0;
 const scale=Math.min(size/f.unitsPerEm,maxWidth/run.positions.reduce((n,p)=>n+p.xAdvance,0));
 const glyphs=run.glyphs.map((g,i)=>{const p=run.positions[i];const d=`<path transform="translate(${cursor+p.xOffset},${p.yOffset})" d="${g.path.toSVG()}"/>`;cursor+=p.xAdvance;return d;}).join('');
 return `<g aria-label="${escape(value)}" fill="${color}" transform="translate(${x},${y}) scale(${scale},${-scale})">${glyphs}</g>`;
}
function svg(body,title){return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><title>${escape(title)}</title><rect width="1200" height="630" fill="${t.dark}"/>${body}</svg>`;}
export async function writeThemeAssets(output='public'){
 await mkdir(path.join(output,'images'),{recursive:true});
 const lessonCards=JSON.parse(await readFile('src/data/lesson-meta.json','utf8')).map(l=>({name:l.art,eyebrow:l.audience.toUpperCase()+' ? LEARN GENAI',lines:l.lines,steps:l.labels}));
 const cards=[{name:'choose-ai-training',eyebrow:'A PRACTICAL TRAINING CHECKLIST',lines:['Choose the learning.','Change the work.'],steps:['DEFINE THE TASK','PRACTISE','REVIEW']},{name:'chatgpt-workflows',eyebrow:'CHATGPT FOR BUSINESS TEAMS',lines:['A useful draft.','A thoughtful review.'],steps:['BRIEF','DRAFT','VERIFY','REVISE']}];
 for(const c of [...cards,...lessonCards]){const n=c.steps.length;const art=svg(`<path d="M65 105H1135" stroke="${t.accent}" opacity=".25"/>${text(c.eyebrow,65,72,18,t.accent,600)}${text(c.lines[0],65,207,66,t.surface,700,1070)}${text(c.lines[1],65,290,66,t.accent,600,1070)}${c.steps.map((s,i)=>{const x=65+i*1070/n;return `<rect x="${x}" y="365" width="${1070/n-18}" height="105" rx="6" fill="${t.surface}"/>${text('0'+(i+1),x+22,401,16,t.brand,700)}${text(s,x+22,444,20,t.ink,600,1070/n-62)}`;}).join('')}${text('salmonjoy',65,566,25,t.surface,700)}${text('AI, made practical.',900,566,18,t.accent,500,235)}`,c.lines.join(' '));await writeFile(path.join(output,'images',c.name+'.svg'),art);await sharp(Buffer.from(art)).png().toFile(path.join(output,'images',c.name+'.png'));}
 const portrait=(await sharp('public/images/portrait.webp').resize(370,470,{fit:'cover'}).png().toBuffer()).toString('base64');
 const og=svg(`<defs><clipPath id="portrait"><path d="M815 265a175 175 0 0 1 350 0v275H815Z"/></clipPath></defs><image href="data:image/png;base64,${portrait}" x="815" y="90" width="350" height="450" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>${text('FROM CURIOSITY TO CAPABILITY',65,82,18,t.accent,600,720)}<path d="M65 112H755" stroke="${t.accent}" opacity=".25"/>${text('Salmon Joy.',60,258,94,t.surface,700,720)}${text('AI, made practical.',65,351,60,t.accent,600,720)}${text('OpenAI Programme Master Trainer',65,444,24,t.surface,500,720)}${text('AI Engineer · Enterprise AI Trainer',65,483,22,t.onDarkMuted,400,720)}${text('salmonjoy.com',65,568,20,t.accent,600)}`,'Salmon Joy — AI, made practical.');
 await writeFile(path.join(output,'og.svg'),og);await sharp(Buffer.from(og)).png().toFile(path.join(output,'og.png'));
 const favicon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="6" fill="${t.brand}"/><path d="M32 13v38M13 32h38" stroke="${t.surface}" stroke-width="6"/><path d="m20 20 24 24m0-24L20 44" stroke="${t.surface}" stroke-width="3"/></svg>`;
 await writeFile(path.join(output,'favicon.svg'),favicon);
 console.log(`Generated ${themeName} article, social and favicon assets in ${output}`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve('scripts/theme-assets.mjs'))await writeThemeAssets(process.argv[2]||'public');
