// vectorize/embed.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.dev.vars' });

const EMBED_WORKER_URL = process.env.EMBED_WORKER_URL;
if (!EMBED_WORKER_URL) {
  console.error('❌ Missing EMBED_WORKER_URL in .dev.vars');
  process.exit(1);
}

const qnaPath = path.resolve('backend/qna.json');
const outputPath = path.resolve('vectorize/embeddings.json');

async function createEmbedding(text) {
  const res = await fetch(EMBED_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const json = await res.json();
  if (!json || !Array.isArray(json.embedding) || !Array.isArray(json.embedding[0])) {
    console.error('Invalid response from embed-worker:', JSON.stringify(json));
    throw new Error('Embedding failed');
  }

  return json.embedding[0]; // ✅ use the flat array inside the outer array
}

async function generateEmbeddings() {
  const qna = JSON.parse(fs.readFileSync(qnaPath, 'utf-8'));
  const vectors = [];

  for (let i = 0; i < qna.length; i++) {
    const { question, answer } = qna[i];
    const inputText = `${question}\n${answer}`;
    console.log(`Embedding [${i + 1}/${qna.length}]: ${question}`);
    const embedding = await createEmbedding(inputText);

    vectors.push({
      id: `q${i + 1}`,
      values: embedding,
      metadata: { question, answer },
    });
  }

  fs.writeFileSync(outputPath, JSON.stringify(vectors, null, 2));
  console.log(`✅ Saved ${vectors.length} embeddings to ${outputPath}`);
}

generateEmbeddings().catch(console.error);




