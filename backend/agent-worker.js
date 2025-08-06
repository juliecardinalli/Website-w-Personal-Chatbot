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
      return new Response("Only POST requests are supported", { status: 405 });
    }

    try {
      const { prompt } = await request.json();
      console.log("📨 Prompt received:", prompt);

      if (!prompt) {
        return new Response('Missing "prompt" in request body', { status: 400 });
      }

      // Call embed-worker to get embedding
      const embedRes = await env.EMBED.fetch(
        new Request("https://dummy/embed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: prompt }),
        })
      );

      const { embedding } = await embedRes.json();
      const queryEmbedding = embedding?.[0];

      console.log("🧠 Embedding received:", queryEmbedding?.slice(0, 5), "...");

      if (!Array.isArray(queryEmbedding)) {
        console.error("❌ Embedding failed:", embedding);
        return new Response("Embedding failed", { status: 500 });
      }

      // Query vector index
      const searchRes = await env.VECTORIZE.query(queryEmbedding, {
        topK: 5,
        returnMetadata: true,
      });

      console.log("🔍 Vector search matches:", searchRes.matches?.length || 0);

      const context = searchRes.matches
        .map((m) => `Q: ${m.metadata.question}\nA: ${m.metadata.answer}`)
        .join("\n\n");

      const finalPrompt = `${env.SYSTEM_PROMPT}\n\nRelevant Q&A examples:\n${context}\n\nUser: ${prompt}`;
      console.log("📝 Final prompt to LLM:", finalPrompt.slice(0, 200), "...");

      // Call LLM
      const aiResponse = await env.LLM.run("@cf/meta/llama-3.1-8b-instruct-fast", {
        messages: [{ role: "user", content: finalPrompt }],
        max_tokens: 512,
      });

      console.log("🤖 LLM response:", aiResponse.response);

      return new Response(JSON.stringify({ answer: aiResponse.response }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      console.error("🔥 Agent worker error:", err);
      return new Response("Internal error", { status: 500 });
    }
  },
};







