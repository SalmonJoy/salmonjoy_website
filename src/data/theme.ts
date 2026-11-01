import themes from './themes.json';
import settings from './theme-settings.json';
export type ThemeName = keyof typeof themes;
export const DEFAULT_THEME = settings.defaultTheme as ThemeName;
const requested = import.meta.env.SITE_THEME || DEFAULT_THEME;
if (!Object.hasOwn(themes, requested)) throw new Error(`Unknown SITE_THEME: ${requested}`);
export const themeName = requested as ThemeName;
export const theme = themes[themeName];
export const themeTokens: Record<string,string> = {
 'surface-dark':theme.dark, surface:theme.surface, brand:theme.brand, accent:theme.accent,
 ink:theme.ink, 'text-muted':theme.muted, 'text-on-dark-muted':theme.onDarkMuted,
 'surface-raised':theme.raised, 'surface-soft':theme.soft, paper:theme.paper,
 'border-strong':theme.border, 'border-light':theme.ink+'30', 'border-dark':theme.surface+'36',
 'border-dark-soft':theme.surface+'1A', 'border-dark-strong':theme.surface+'55',
 'accent-line':theme.accent+'66', 'accent-line-soft':theme.accent+'33',
 'accent-faint':theme.accent+'14', 'accent-progress':theme.accent+'8A',
 'brand-faint':theme.brand+'15', 'brand-line':theme.brand+'33',
 'diagram-panel':theme.panel, 'grid-line':theme.surface+'09',
 'overlay-hover':theme.surface+'12', 'input-dark':theme.surface+'03',
 'shadow-soft':theme.dark+'08', 'shadow':theme.dark+'1C', 'backdrop':theme.dark+'AA',
 'focus-light':theme.brand, 'focus-dark':theme.accent,
 'control-border-light':theme.muted,
 'control-border-dark':`color-mix(in srgb,${theme.onDarkMuted} 65%,${theme.dark})`,
 'nori-shell':'#F2F3F1', 'nori-shell-light':'#FFFFFF', 'nori-shell-mid':'#DDE1E1',
 'nori-shell-shadow':'#A8B0B3', 'nori-visor':'#252B31', 'nori-eye':'#FFFFFF',
 'nori-collar':theme.brand, 'nori-collar-light':theme.collarLight, 'nori-spark':theme.accent,
};
export const themeCSS = `:root{${Object.entries(themeTokens).map(([key,value])=>`--${key}:${value}`).join(';')}}`;
