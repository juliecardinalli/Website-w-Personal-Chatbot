export default {
  async fetch(request, env, ctx) {
    try {
      const { text } = await request.json();
      console.log("Got text:", text);

      // Call the model by name
      const embedding = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text });
      console.log("Got embedding:", embedding);

      return new Response(JSON.stringify({ embedding: embedding.data }), {
  headers: { "Content-Type": "application/json" }
});

    } catch (err) {
      console.error("Worker error:", err);
      return new Response("Internal error", { status: 500 });
    }
  }
};

