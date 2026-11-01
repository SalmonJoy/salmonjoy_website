import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');const origin='https://salmonjoy.com';
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);out.push(...(e.isDirectory()?await walk(p):[p]));}return out;}
const htmlFiles=(await walk(root)).filter(f=>f.endsWith('.html'));
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');const listed=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(listed).size,listed.length,'Duplicate sitemap URLs');
const titles=new Set(),descriptions=new Set(),canonicals=new Set(),indexable=[];let graphCount=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');const title=html.match(/<title>([^<]+)<\/title>/)?.[1];const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];const noindex=/<meta name="robots" content="noindex, follow"/.test(html);
 assert.ok(title&&description&&canonical,'Missing SEO metadata: '+file);assert.ok(!titles.has(title),'Duplicate title');assert.ok(!descriptions.has(description),'Duplicate description');assert.ok(!canonicals.has(canonical),'Duplicate canonical');titles.add(title);descriptions.add(description);canonicals.add(canonical);
 assert.ok(canonical.startsWith(origin+'/'));assert.ok(!new URL(canonical).search);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,'Exactly one H1: '+file);
 assert.match(html,/<html lang="en"/);assert.match(html,/<meta property="og:image" content="https:\/\/salmonjoy.com\/images\/|<meta property="og:image" content="https:\/\/salmonjoy.com\/og.png/);
 assert.ok(!/hreflang=|googletagmanager|google-analytics\.com|plausible\.io/.test(html));
 const json=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];assert.ok(json,'Missing JSON-LD');const schema=JSON.parse(json);const graph=schema['@graph'];assert.ok(Array.isArray(graph));graphCount+=graph.length;
 const ids=graph.map(e=>e['@id']);assert.equal(new Set(ids).size,ids.length,'Duplicate entity IDs');
 assert.ok(graph.some(e=>e['@type']==='WebSite'));const person=graph.find(e=>e['@type']==='Person');assert.equal(person['@id'],origin+'/#salmon-joy');assert.ok(person.description.includes('VMS Group APAC'));assert.ok(!person.worksFor,'No implied direct employment');
 const page=graph.find(e=>['WebPage','ProfilePage'].includes(e['@type']));assert.equal(page.url,canonical);
 if(!noindex){indexable.push(canonical);if(canonical!==origin+'/')assert.ok(graph.some(e=>e['@type']==='BreadcrumbList'),'Missing breadcrumbs: '+file);}
 for(const entity of graph){for(const key of ['datePublished','dateModified'])if(entity[key]){assert.match(entity[key],/^\d{4}-\d{2}-\d{2}$/);assert.ok(html.includes('datetime="'+entity[key]+'"'),'Invisible article date');}}
 for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  let href=m[1].replaceAll('&amp;','&');if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  const u=new URL(href,canonical);let target=path.join(root,decodeURIComponent(u.pathname));if(u.pathname.endsWith('/'))target=path.join(target,'index.html');
  await assert.doesNotReject(()=>stat(target),'Missing local target '+href+' from '+file);
  if(u.hash&&target.endsWith('.html')){const targetHtml=await readFile(target,'utf8');assert.ok(targetHtml.includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'),'Missing anchor '+href+' from '+file);}
 }
}
assert.deepEqual([...indexable].sort(),[...listed].sort(),'Sitemap does not match indexable pages');
assert.equal(htmlFiles.length,15);assert.equal(indexable.length,14);
for(const [slug,track] of [['chatgpt-for-business','work'],['generative-ai-engineering','build'],['faculty-development','teach']]){const html=await readFile(path.join(root,'training',slug,'index.html'),'utf8');assert.match(html,new RegExp('<option value="'+track+'" selected'));assert.match(html,/"@type":"Service"/);}
const about=await readFile(path.join(root,'about/index.html'),'utf8');assert.match(about,/"@type":"ProfilePage"/);
for(const slug of ['choose-corporate-ai-training','chatgpt-workflows-for-business-teams']){const html=await readFile(path.join(root,'insights',slug,'index.html'),'utf8');assert.match(html,/"@type":"Article"/);assert.match(html,/Sources &amp; further reading|Sources & further reading/);}
const robots=await readFile(path.join(root,'robots.txt'),'utf8');assert.match(robots,/User-agent: \*\s+Allow: \//);assert.match(robots,/Sitemap: https:\/\/salmonjoy.com\/sitemap.xml/);
console.log(JSON.stringify({htmlPages:htmlFiles.length,indexablePages:indexable.length,structuredEntities:graphCount,canonicalUniqueness:'passed',internalLinksAndAnchors:'passed',servicePreselection:'passed',sitemapCoverage:'passed',publicationDates:process.env.ARTICLE_PUBLISH_DATE||'unset until public release'},null,2));
