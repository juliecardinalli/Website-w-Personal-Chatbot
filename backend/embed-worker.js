export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Only POST supported", { status: 405 });
    }

    const { text } = await request.json();
    if (!text) {
      return new Response("Missing 'text' in request body", { status: 400 });
    }

    // Call Cloudflare Workers AI embedding model
    const result = await env.EMBEDDINGS.run(text);
    
    return new Response(JSON.stringify({ embedding: result }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
