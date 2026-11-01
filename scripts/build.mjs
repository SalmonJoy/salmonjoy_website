import {spawnSync} from 'node:child_process';
import {writeThemeAssets} from './theme-assets.mjs';
const args=process.argv.slice(2);
const flag=args.indexOf('--outDir');
const output=flag>=0?args[flag+1]:'dist';
if(!output)throw new Error('--outDir requires a directory');
const result=spawnSync(process.execPath,['node_modules/astro/astro.js','build',...args],{stdio:'inherit',env:process.env});
if(result.status!==0)process.exit(result.status||1);
await writeThemeAssets(output);
