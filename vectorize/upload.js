// vectorize/upload.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.dev.vars' });

const { CF_API_TOKEN, CF_ACCOUNT_ID, VECTORIZE_INDEX } = process.env;
if (!CF_API_TOKEN || !CF_ACCOUNT_ID || !VECTORIZE_INDEX) {
  console.error('❌ Missing CF_API_TOKEN, CF_ACCOUNT_ID, or VECTORIZE_INDEX in .dev.vars');
  process.exit(1);
}

const embeddingsPath = path.resolve('vectorize/embeddings.json');
const vectors = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));

console.log(`📤 Uploading ${vectors.length} vectors to Vectorize index "${VECTORIZE_INDEX}"...`);

const res = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/vectorize/indexes/${VECTORIZE_INDEX}/upsert`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vectors }),
  }
);

const json = await res.json();
console.log('Raw response:', JSON.stringify(json, null, 2));

if (!json.success) {
  console.error('❌ Upload failed:', json.errors);
  process.exit(1);
}

console.log(`✅ Upload successful: ${json.result?.inserted} vectors inserted.`);


