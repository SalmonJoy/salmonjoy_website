import type { APIRoute } from 'astro';
import {searchRoutes} from '../data/routes';
import {SITE} from '../data/seo';
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${searchRoutes.map(p=>`<url><loc>${SITE}${p.path}</loc>${p.modifiedAt?`<lastmod>${p.modifiedAt}</lastmod>`:''}</url>`).join('')}</urlset>`, {headers:{'Content-Type':'application/xml'}});
