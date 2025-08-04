export default {
  async fetch(request, env) {
    // 🔁 Handle preflight OPTIONS
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

    const { prompt } = await request.json();
    if (!prompt) {
      return new Response('Missing "prompt" in request body', { status: 400 });
    }

    // ✅ Add logging for clarity
    console.log("Prompt:", prompt);

    // Call embed-worker via service binding
    const embedRes = await env.EMBED.fetch(
      new Request("https://dummy/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt }),
      })
    );

    const { embedding } = await embedRes.json();
    const queryEmbedding = embedding?.[0];

    if (!Array.isArray(queryEmbedding)) {
      return new Response("Embedding failed", { status: 500 });
    }

    const searchRes = await env.VECTORIZE.query(queryEmbedding, {
      topK: 2,
      returnMetadata: true,
    });

    const relevantPairs = searchRes.matches
      .map((m) => `Q: ${m.metadata.question}\nA: ${m.metadata.answer}`)
      .join("\n\n");

    const finalPrompt = `${env.SYSTEM_PROMPT}\n\nRelevant Q&A examples:\n${relevantPairs}\n\nUser: ${prompt}`;

    const aiResponse = await env.LLM.run("@cf/meta/llama-3-8b-instruct", {
      messages: [{ role: "user", content: finalPrompt }],
      max_tokens: 512,
    });

    return new Response(JSON.stringify({ answer: aiResponse.response }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // ✅ This is key
      },
    });
  },
};






