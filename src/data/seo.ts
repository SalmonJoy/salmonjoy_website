export const SITE = 'https://salmonjoy.com';
export const PERSON_ID = `${SITE}/#salmon-joy`;
export const WEBSITE_ID = `${SITE}/#website`;
export const programme = 'Master Trainer for the OpenAI Programme in India, delivered through VMS Group APAC and Channel Partners Solutions, LLC.';
export type Entity = Record<string, unknown>;
export interface Breadcrumb { name: string; path: string; }
export interface SeoMetadata {
 title?: string; description?: string; canonicalPath?: string; image?: string;
 imageAlt?: string; pageType?: 'WebPage'|'ProfilePage'; noindex?: boolean;
 entities?: Entity[]; breadcrumbs?: Breadcrumb[]; publishedAt?: string|null; modifiedAt?: string;
}
export const person: Entity = {'@type':'Person','@id':PERSON_ID,name:'Salmon Joy',url:`${SITE}/about/`,jobTitle:'AI Engineer and Enterprise AI Trainer',description:programme,image:`${SITE}/images/portrait.webp`,sameAs:['https://www.linkedin.com/in/salmonjoy/','https://github.com/SalmonJoy','https://www.youtube.com/@ai.4.lazygenius'],knowsAbout:['Corporate AI training','Generative AI','Retrieval-augmented generation','AI evaluation'],homeLocation:{'@type':'Place',name:'Mumbai, India'}};
export function pageGraph(meta:SeoMetadata, pathname:string, title:string, description:string){
 const url=new URL(meta.canonicalPath||pathname,SITE).href;
 const graph:Entity[]=[{'@type':'WebSite','@id':WEBSITE_ID,url:SITE+'/',name:'Salmon Joy',publisher:{'@id':PERSON_ID},inLanguage:'en'},person,{'@type':meta.pageType||'WebPage','@id':url+'#webpage',url,name:title,description,isPartOf:{'@id':WEBSITE_ID},inLanguage:'en',...(meta.pageType==='ProfilePage'?{mainEntity:{'@id':PERSON_ID}}:{}),...(meta.modifiedAt?{dateModified:meta.modifiedAt}:{})},...(meta.entities||[])];
 if(meta.breadcrumbs?.length)graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:meta.breadcrumbs.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.name,item:new URL(b.path,SITE).href}))});
 return {'@context':'https://schema.org','@graph':graph};
}
