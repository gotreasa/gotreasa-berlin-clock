import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { pactToHurl } from './pactToHurl.js';

const [pactFile, hurlFile] = process.argv.slice(2);

mkdirSync(dirname(hurlFile), { recursive: true });
writeFileSync(hurlFile, pactToHurl(JSON.parse(readFileSync(pactFile, 'utf8'))));
console.log(`Wrote ${hurlFile} from ${pactFile}`);
