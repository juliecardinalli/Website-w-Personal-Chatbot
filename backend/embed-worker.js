// embed-worker/index.js

export default {
  async fetch(request, env) {
    console.log("📦 Embed worker received a request");


    if (request.method !== "POST") {
      return new Response("Only POST requests allowed", { status: 405 });
    }

    const { text } = await request.json();
    if (!text) {
      return new Response("Missing 'text' in request body", { status: 400 });
    }

    try {
      const result = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text });
      return Response.json({ embedding: result.data });
    } catch (err) {
      return new Response("Embedding failed", { status: 500 });
    }
  },
};
