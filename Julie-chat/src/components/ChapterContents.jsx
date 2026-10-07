import { lazy, Suspense } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import julieCow from "../assets/julie-cow.jpg";
import juliePresidentsClub from "../assets/julie-presidents-club.jpg";

const Chat = lazy(() => import("./Chat"));
const email = "mailto:juliecardinalli@gmail.com";
const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/juliecardinalli/"],
  ["TikTok", "https://www.tiktok.com/@juliemeow69"],
  ["X", "https://x.com/softlaunchjulie"],
];
const readingList = [
  { title: "James", author: "Percival Everett", color: "#ab6657" },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", color: "#708d75" },
  { title: "The Midnight Library", author: "Matt Haig", color: "#8c88ad" },
  { title: "Has China Won?", author: "Kishore Mahbubani", color: "#b59a5c" },
  { title: "The Song of Achilles", author: "Madeline Miller", color: "#769ca1" },
  { title: "The Alchemist", author: "Paulo Coelho", color: "#b28660" },
  { title: "Fruit Fly", author: "Josh Silver", color: "#627d77" },
];
function ExternalLink({ href, children }) {
  return <a className="panel-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}
function Socials() {
  return <div className="social-links" aria-label="Social profiles">{socials.map(([name, href]) => <ExternalLink href={href} key={name}>{name}</ExternalLink>)}</div>;
}

export default function ChapterContents({ chapter, onNavigate }) {
  if (chapter === "work") return <div className="chapter-content">
    <p className="chapter-lede">Solutions Engineer at Cloudflare.</p>
    <p>I help customers figure out what they need, test solutions, and put them to work.</p>
    <figure className="chapter-photo award-photo"><img src={juliePresidentsClub} alt="Julie Cardinalli at Cloudflare President's Club" /><figcaption>President&apos;s Club · Cloudflare</figcaption></figure>
    <h3>At Cloudflare</h3>
    <ol className="career-timeline">
      <li><span className="timeline-date">Feb 2026 — Present</span><strong>Solutions Engineer III</strong><span>Cloudflare · Austin, Texas</span></li>
      <li><span className="timeline-date">Jan 2025 — Feb 2026</span><strong>Solutions Engineer II</strong><span>Cloudflare</span></li>
      <li><span className="timeline-date">Dec 2023 — Jan 2025</span><strong>Solutions Engineer I</strong><span>Cloudflare</span></li>
    </ol>
    <div className="chapter-note"><span>Before that</span><p>UC Berkeley, B.A. in Data Science, with an emphasis in Economics. Program Management Intern at Applied Materials.</p></div>
    <ExternalLink href={socials[0][1]}>More on LinkedIn</ExternalLink>
  </div>;
  if (chapter === "ai") return <div className="chapter-content">
    <p className="chapter-lede">Tools that make my day easier.</p>
    <div className="project-note"><span className="eyebrow">Recent project</span><h3>A sales assistant</h3><p>I built an OpenCode assistant for call prep, planning, and follow-ups. It keeps customer context organized and connects to Miro and Salesforce.</p><span className="project-tags">OpenCode <i>·</i> Miro <i>·</i> Salesforce</span></div>
    <h3>Ask about me.</h3><p>This is an AI chat, not me. It can make mistakes, so <a href={email}>email me</a> if you want to check something.</p>
    <Suspense fallback={<div className="chat-loading" role="status">Opening Julie AI…</div>}><Chat /></Suspense>
    <p className="build-note">Messages are processed by Cloudflare Workers AI.</p>
  </div>;
  if (chapter === "speaking") return <div className="chapter-content">
    <p className="chapter-lede">Talks and videos.</p>
    <div className="video-frame"><iframe src="https://player.vimeo.com/video/1111253347?h=2dbaa3f485" title="Julie Cardinalli speaking at FutureCon SLC" allow="fullscreen; picture-in-picture; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
    <div className="media-caption"><span>FutureCon SLC · August 2025</span><h3>Developing a Zero Trust Mindset</h3></div>
    <ExternalLink href="https://vimeo.com/1111253347/2dbaa3f485">Watch the full talk</ExternalLink>
    <div className="chapter-divider" />
    <h3>On TikTok</h3><p>I make videos about business, tech, and current events—usually something I&apos;ve been learning about.</p>
    <ExternalLink href={socials[1][1]}>Find me on TikTok</ExternalLink>
  </div>;
  if (chapter === "life") return <div className="chapter-content">
    <p className="chapter-lede">When I&apos;m not working.</p>
    <figure className="chapter-photo"><img src={julieCow} alt="Julie smiling beside a fluffy cow" loading="lazy" /><figcaption>A very good cow.</figcaption></figure>
    <p>I like skiing, beach volleyball, chess, and a good excuse to get outside.</p>
    <div className="interest-tags"><span>Skiing</span><span>Beach volleyball</span><span>Chess</span></div>
    <button className="next-chapter" onClick={() => onNavigate("contact")}>Say hello <ArrowRight size={16} /></button>
  </div>;
  if (chapter === "reading") return <div className="chapter-content reading-chapter">
    <p className="chapter-lede">A few books I read this year.</p>
    <ul className="reading-list" aria-label="Books read in 2026">{readingList.map((book, index) => <li key={book.title} className="reading-book" style={{ "--book-color": book.color }}>
      <div className="book-cover" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
      <div><h3>{book.title}</h3><p>{book.author}</p></div>
    </li>)}</ul>
  </div>;
  if (chapter === "contact") return <div className="chapter-content">
    <p className="chapter-lede">Email is best.</p>
    <p>For work, speaking, or just to say hi.</p>
    <a className="contact-email" href={email}>juliecardinalli@gmail.com <ArrowUpRight size={22} /></a>
    <Socials />
    <div className="chapter-note"><span>Based in</span><p>Austin, Texas.</p></div>
  </div>;
  if (chapter === "about") return <div className="chapter-content">
    <p className="chapter-lede">Berkeley grad. Based in Austin.</p>
    <p>I work at Cloudflare, build tools, and make videos about things I&apos;m learning.</p>
    <figure className="chapter-photo award-photo"><img src={juliePresidentsClub} alt="Julie Cardinalli at Cloudflare President's Club" loading="lazy" /><figcaption>President&apos;s Club · Cloudflare</figcaption></figure>
    <Socials /><button className="next-chapter" onClick={() => onNavigate("ai")}>See what I&apos;m building <ArrowRight size={16} /></button>
  </div>;
  return null;
}
