import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
const args=process.argv.slice(2);
const site='https://salmonjoy.com';
if(args.includes('--prepare-key')){
 const key=randomBytes(16).toString('hex');
 await mkdir('public',{recursive:true});await writeFile(`public/${key}.txt`,key);
 console.log(`Created public/${key}.txt. Rebuild and deploy this public verification file. Set INDEXNOW_KEY to its filename without .txt for submission.`);
 process.exit(0);
}
const urls=args.filter(a=>!a.startsWith('--')).map(path=>{
 const u=new URL(path,site);
 if(u.origin!==site||u.search||u.hash||u.username||u.password||u.pathname==='/404/'||u.pathname==='/404.html'||u.pathname.endsWith('.pdf'))throw new Error('Use clean, canonical HTML URLs on salmonjoy.com only.');
 return u.href;
});
if(!urls.length)throw new Error('Supply one or more canonical URLs or paths. Default is dry-run. --prepare-key creates a public verification file; --submit sends after deployment.');
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const url of urls)if(!sitemap.includes(`<loc>${url}</loc>`))throw new Error('URL is not in the built sitemap: '+url);
if(!args.includes('--submit')){console.log(JSON.stringify({mode:'dry-run',urls:[...new Set(urls)],message:'Nothing sent. Use --submit only after deployment and key verification.'},null,2));process.exit(0);}
const key=process.env.INDEXNOW_KEY;
if(!key||!/^[a-zA-Z0-9-]{8,128}$/.test(key))throw new Error('Set a valid INDEXNOW_KEY matching your deployed public key file.');
const keyLocation=`${site}/${key}.txt`;
const keyResponse=await fetch(keyLocation,{redirect:'error',signal:AbortSignal.timeout(15000)});
if(keyResponse.status!==200||(await keyResponse.text()).trim()!==key)throw new Error('Public verification key is not available at the canonical host.');
for(const url of urls){const r=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(15000)});const html=await r.text();if(r.status!==200||r.headers.get('x-robots-tag')?.includes('noindex')||/content=["'][^"']*noindex/i.test(html)||!html.includes(`rel="canonical" href="${url}"`))throw new Error('URL is not a public, indexable canonical page: '+url);}
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({host:'salmonjoy.com',key,keyLocation,urlList:[...new Set(urls)]}),signal:AbortSignal.timeout(15000)});
console.log(JSON.stringify({status:response.status,message:response.status===200?'Submission received; indexing is not guaranteed.':response.status===202?'Submission received; verification is pending. Indexing is not guaranteed.':'Submission was not accepted. Check the response and retry only after resolving the issue.'}));
if(![200,202].includes(response.status))process.exitCode=1;
