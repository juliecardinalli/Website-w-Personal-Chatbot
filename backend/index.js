export default {
  async fetch(request, env, ctx) {
    const { question } = await request.json();
    return new Response(JSON.stringify({
      answer: "Hi! I'm Julie's AI agent. This is a placeholder until we add the RAG pipeline."
    }), { headers: { "Content-Type": "application/json" }});
  }
};
