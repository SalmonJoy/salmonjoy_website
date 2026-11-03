import {lessons} from './lessons';
import {services} from './services';
import {insights} from './articles';
import {featured} from './content';
export interface SearchRoute {path:string;modifiedAt?:string;}
export const searchRoutes:SearchRoute[]=[
 ...['/','/training/','/about/','/insights/','/projects/','/privacy/','/learn/'].map(path=>({path})),
 ...lessons.map(l=>({path:`/learn/${l.slug}/`,modifiedAt:l.publishedAt})),
 ...services.map(s=>({path:`/training/${s.slug}/`})),
 ...featured.map(p=>({path:`/projects/${p.slug}/`})),
 ...insights.map(a=>({path:`/insights/${a.slug}/`,modifiedAt:a.modifiedAt||a.publishedAt||undefined})),
];
