import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { request } from 'undici';

dotenv.config({ path: '.dev.vars' });

const { CF_API_TOKEN, CF_ACCOUNT_ID, VECTORIZE_INDEX } = process.env;
if (!CF_API_TOKEN || !CF_ACCOUNT_ID || !VECTORIZE_INDEX) {
  console.error('❌ Missing CF_API_TOKEN, CF_ACCOUNT_ID, or VECTORIZE_INDEX in .dev.vars');
  process.exit(1);
}

const embeddingsPath = path.resolve('vectorize/embeddings.json');
const vectors = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));
console.log(`📤 Uploading ${vectors.length} vectors to Vectorize index "${VECTORIZE_INDEX}"...`);

const body = JSON.stringify({ vectors });

const { statusCode, body: resBody } = await request(
  `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/vectorize/indexes/${VECTORIZE_INDEX}/upsert`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
      'Content-Type': 'application/json', // 🚨 this must be *exactly* this, no charset!
      'Content-Length': Buffer.byteLength(body),
    },
    body,
  }
);

let raw = '';
for await (const chunk of resBody) {
  raw += chunk.toString();
}

console.log('Raw response:', raw);

try {
  const json = JSON.parse(raw);
  if (!json.success) {
    console.error('❌ Upload failed:', json.errors);
    process.exit(1);
  }
  console.log(`✅ Upload successful: ${json.result?.inserted} vectors inserted.`);
} catch (e) {
  console.error('❌ Failed to parse JSON:', e);
}




