// convert-to-ndjson.js
import fs from 'fs';

const input = JSON.parse(fs.readFileSync('vectorize/embeddings.json', 'utf-8'));
const ndjson = input.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync('vectorize/embeddings.ndjson', ndjson);

console.log('✅ Converted to NDJSON: vectorize/embeddings.ndjson');

