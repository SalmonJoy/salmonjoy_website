import type { APIRoute } from 'astro';
import { featured } from '../data/content';
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/projects/', '/privacy/', ...featured.map(p => `/projects/${p.slug}/`)].map(p => `<url><loc>https://salmonjoy.com${p}</loc></url>`).join('')}</urlset>`, {headers:{'Content-Type':'application/xml'}});
