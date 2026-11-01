import {services} from './services';
import {insights} from './articles';
import {featured} from './content';
export interface SearchRoute {path:string;modifiedAt?:string;}
export const searchRoutes:SearchRoute[]=[
 ...['/','/training/','/about/','/insights/','/projects/','/privacy/'].map(path=>({path})),
 ...services.map(s=>({path:`/training/${s.slug}/`})),
 ...featured.map(p=>({path:`/projects/${p.slug}/`})),
 ...insights.map(a=>({path:`/insights/${a.slug}/`,modifiedAt:a.modifiedAt||a.publishedAt||undefined})),
];
