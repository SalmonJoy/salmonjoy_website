import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import ts from 'typescript';
const root=path.resolve('dist');
async function files(dir){const result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())result.push(...await files(p));else result.push(p);}return result;}
const all=await files(root);const pages=all.filter(p=>p.endsWith('.html'));
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
const canonicalPages=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(pages.length,canonicalPages.length+1,'Expected sitemap pages and one 404 page');
for(const file of pages){const html=await readFile(file,'utf8');assert.match(html,/<h1[ >]/);assert.match(html,/<html lang="en"/);assert.match(html,/<link rel="canonical" href="https:\/\/salmonjoy.com/);assert.match(html,/<noscript>/);assert.match(html,/<option value="work"[^>]*>AI at Work/);assert.match(html,/aria-label="Pause animations"/);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const relative=decodeURIComponent(match[1]);let target=path.join(root,relative);if(relative.endsWith('/'))target=path.join(target,'index.html');await assert.doesNotReject(()=>stat(target),`Missing local target ${relative} on ${file}`);}
}
const home=await readFile(path.join(root,'index.html'),'utf8');
for(const id of ['arrival','credibility','teaching','training','work','people','about','insights','contact'])assert.ok(home.includes(`id="${id}"`),`Missing ${id}`);
assert.equal((home.match(/class="mobile-demo-panel"/g)||[]).length,3);
assert.match(home,/10,000/);assert.match(home,/VMS Group APAC and Channel Partners Solutions, LLC/);
const library=await readFile(path.join(root,'projects/index.html'),'utf8');assert.equal((library.match(/data-project-category=/g)||[]).length,21);
for(const pdf of ['Profile.pdf','Salmon Joy Profile 2025 (2).pdf','Salmon Project Portfolio.pdf','Salmon_Joy_Resume.pdf']){const bytes=await readFile(path.join(root,pdf));assert.equal(bytes.subarray(0,4).toString(),'%PDF');}
const messageSource=await readFile('src/scripts/enquiry.ts','utf8');const compiled=ts.transpileModule(messageSource,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {prepareMessage,contactLinks,trackNames}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
for(const track of ['work','build','teach','consulting','choose']){const data={name:' Alex O’Neil ',organization:'R&D + Partners',track,size:'11–50 people',goal:'“AI” & RAG? 50% faster / safe\nWith evidence.'};const message=prepareMessage(data);const links=contactLinks(message,track);assert.ok(message.includes(trackNames[track]));assert.ok(message.includes('R&D + Partners'));assert.ok(message.includes(data.goal));assert.equal(new URL(links.whatsapp).searchParams.get('text'),message);assert.equal(new URL(links.email).searchParams.get('body'),message);assert.equal(new URL(links.whatsapp).pathname,'/919029964453');}
const assets=all.filter(p=>/\.(css|js|woff2)$/.test(p));let compressed=gzipSync(Buffer.from(home)).byteLength;for(const p of assets)compressed+=gzipSync(await readFile(p)).byteLength;compressed+=(await stat(path.join(root,'images/portrait.webp'))).size;
assert.ok(compressed<1_000_000,`Critical assets including all deferred code exceed budget: ${compressed}`);
console.log(JSON.stringify({pages:pages.length,projects:21,legacyPdfs:3,contactTracks:5,localLinks:'passed',estimatedCompressedAssetsIncludingDeferredBytes:compressed},null,2));
