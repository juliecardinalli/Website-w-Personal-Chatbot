export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Only POST requests allowed" }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const { text } = await request.json();
      if (!text) {
        return new Response(JSON.stringify({ error: "Missing 'text' field" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const result = await env.AI.run("@cf/baai/bge-small-en-v1.5", { text });

      return new Response(JSON.stringify({ embedding: result.data }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      console.error("🔥 Embedding failed:", err);
      return new Response(JSON.stringify({ error: "Embedding failed" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
