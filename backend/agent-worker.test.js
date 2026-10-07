import assert from "node:assert/strict";
import test from "node:test";
import agent from "./agent-worker.js";
import embed from "./embed-worker.js";

test("chat retrieves Vectorize v2 metadata through the private embedding service", async () => {
  const prompt = "Where did Julie study?";
  const embedding = Array(384).fill(0.1);
  const env = {
    SYSTEM_PROMPT: "Preserved personal-site persona",
    EMBED: { async fetch(request) {
      assert.deepEqual(await request.json(), { text: prompt });
      return Response.json({ embedding: [embedding] });
    } },
    VECTORIZE: { async query(vector, options) {
      assert.deepEqual(vector, embedding);
      assert.deepEqual(options, { topK: 5, returnMetadata: "all" });
      return { matches: [{ metadata: { question: prompt, answer: "UC Berkeley, Data Science." } }] };
    } },
    LLM: { async run(model, options) {
      assert.equal(model, "@cf/meta/llama-3.1-8b-instruct-fast");
      assert.equal(options.messages[0].content, env.SYSTEM_PROMPT);
      assert.match(options.messages[1].content, /UC Berkeley, Data Science/);
      return { response: "I studied Data Science at UC Berkeley." };
    } },
  };
  const response = await agent.fetch(new Request("https://chat.example", {
    method: "POST", body: JSON.stringify({ prompt }),
  }), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
  assert.equal((await response.json()).answer, "I studied Data Science at UC Berkeley.");
});

test("chat supports browser preflight", async () => {
  const response = await agent.fetch(new Request("https://chat.example", { method: "OPTIONS" }), {});
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Methods"), "POST");
});

test("embedding service preserves model and response shape", async () => {
  const vector = Array(384).fill(0.1);
  const response = await embed.fetch(new Request("https://internal/embed", {
    method: "POST", body: JSON.stringify({ text: "test" }),
  }), { AI: { async run(model, input) {
    assert.equal(model, "@cf/baai/bge-small-en-v1.5");
    assert.deepEqual(input, { text: "test" });
    return { data: [vector] };
  } } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { embedding: [vector] });
});
