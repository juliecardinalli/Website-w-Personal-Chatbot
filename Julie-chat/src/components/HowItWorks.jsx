export default function HowItWorks() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">How this project works</h2>
      <p>This chatbot uses a Retrieval-Augmented Generation (RAG) architecture built pretty much entirely on Cloudflare (where I currently work):</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>  To start, I wrote 55 Q&A pairs about myself (from career, fun facts, my interest in this program)</li>
        <li> Then, I created a Worker for embedding data (used an embeddings LLM via Cloudflare AI) and stored it in Cloudflare Vectorize</li>
        <li> The Chat Interface fetches a Worker which sends the user input to my embedding Worker </li>
        <li> The main Worker then takes the top 3 most similar Q&A pairs from the user input and uses them as a context prompt that it feeds into another LLM</li>
        <li> The LLM output is returned in the Chat Interface </li>
      </ul>
      <p>Note: This project was built in a week — it's part application, part portfolio, part experiment. There are many things that I want to polish, but this is intended to be a MVP.  Hope you enjoy chatting with me!</p>
    </div>
  )
}