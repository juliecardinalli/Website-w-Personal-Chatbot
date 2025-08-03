export default function HowItWorks() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">How this project works</h2>
      <p>This chatbot uses a Retrieval-Augmented Generation (RAG) architecture built entirely on Cloudflare (where I currently work):</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>✍️ I wrote 55 Q&A pairs about myself (from career to fun facts)</li>
        <li>🧠 They're embedded using Workers AI and stored in Cloudflare Vectorize</li>
        <li>💬 When you ask something, the backend Worker fetches the closest answers and sends them to the AI model</li>
      </ul>
      <p>This project was built in a week — it's part application, part portfolio, part experiment. Hope you enjoy chatting with me!</p>
    </div>
  )
}
