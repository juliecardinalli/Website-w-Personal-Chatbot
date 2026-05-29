import {
  Award,
  Brain,
  Camera,
  Code2,
  ExternalLink,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useEffect } from "react";
import julieCow from "./assets/julie-cow.jpg";
import juliePresidentsClub from "./assets/julie-presidents-club.jpg";
import Chat from "./components/Chat";

const highlights = [
  {
    value: "Top 3%",
    label: "Cloudflare President's Club honoree across the global sales organization",
  },
  {
    value: "$2M+",
    label: "Cumulative ACV influenced through technical wins across key accounts",
  },
  {
    value: "2.5M+",
    label: "TikTok views translating business, tech, and current events for broad audiences",
  },
];

const achievementCards = [
  {
    icon: Award,
    title: "Solutions Engineer at Cloudflare",
    text: "Co-sells complex enterprise deals across Financial Services and Retail, building technical wins that connect product depth to business outcomes.",
  },
  {
    icon: GraduationCap,
    title: "UC Berkeley Data Science",
    text: "Studied data science with economics and machine learning, building the analytical foundation behind her AI and product curiosity.",
  },
  {
    icon: Trophy,
    title: "President's Club + Value Selling",
    text: "Earned Cloudflare President's Club while translating technical wins into business outcomes and ROI stories buyers can actually act on.",
  },
  {
    icon: Brain,
    title: "AI-Forward Operator",
    text: "Builds agentic workflows and custom prep tools that turn meetings, email threads, and account signals into useful briefs.",
  },
];

const projects = [
  "Built this personal AI chatbot with Cloudflare Workers AI, Vectorize, and a RAG flow.",
  "Created custom AI skills for account prep, including pre-call briefs and morning pipeline summaries.",
  "Grew a TikTok audience by making business, technology, and current events easier to understand.",
  "Delivered a 25-minute FutureCon SLC talk on developing a Zero Trust mindset.",
];

const personality = [
  "Every country flag",
  "Jeopardy! person",
  "Chess brain",
  "200-hour yoga certified",
  "Beach volleyball",
  "Event planner",
];

const socials = [
  {
    label: "TikTok",
    handle: "@juliemeow69",
    href: "https://www.tiktok.com/@juliemeow69",
  },
  {
    label: "LinkedIn",
    handle: "@juliecardinalli",
    href: "https://www.linkedin.com/in/juliecardinalli/",
  },
  {
    label: "X",
    handle: "@softlaunchjulie",
    href: "https://x.com/softlaunchjulie",
  },
];

const futureConUrl = "https://vimeo.com/1111253347/2dbaa3f485";
const futureConEmbedUrl = "https://player.vimeo.com/video/1111253347?h=2dbaa3f485";

function App() {
  useEffect(() => {
    let lastSparkle = 0;
    const colors = ["#ff4fa3", "#ff8abb", "#58d6b2", "#5667ff", "#ffd166"];

    const createSparkle = (event) => {
      const now = performance.now();
      if (now - lastSparkle < 42) return;
      lastSparkle = now;

      const sparkle = document.createElement("span");
      const size = Math.floor(Math.random() * 7) + 7;
      const driftX = `${Math.random() * 34 - 17}px`;
      const driftY = `${Math.random() * 28 - 22}px`;

      sparkle.className = "cursor-sparkle";
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.setProperty("--sparkle-x", driftX);
      sparkle.style.setProperty("--sparkle-y", driftY);

      document.body.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 720);
    };

    window.addEventListener("pointermove", createSparkle, { passive: true });
    return () => window.removeEventListener("pointermove", createSparkle);
  }, []);

  return (
    <main className="site-shell">
      <header className="top-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Julie Cardinalli home">
          JC
        </a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#socials">Socials</a>
          <a href="#site">Site</a>
          <a href="#personality">Life</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            Austin-based technologist, storyteller, and professional question-asker
          </span>
          <h1>Julie Cardinalli</h1>
          <p className="hero-lede">
            Cloudflare Solutions Engineer, President's Club honoree, and UC Berkeley Data Science grad
            who turns complex technology into crisp stories, useful AI-powered systems, and occasionally
            TikToks that make business news feel less like homework.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#chat">
              <MessageCircle size={18} aria-hidden="true" />
              Chat with Julie
            </a>
            <a className="secondary-action" href="#work">
              See the proof
            </a>
          </div>
        </div>

        <div className="hero-chat" id="chat">
          <Chat />
        </div>
      </section>

      <section className="social-band social-band-early" id="socials">
        <div className="social-copy">
          <span className="eyebrow">
            <Camera size={16} aria-hidden="true" />
            Internet Julie
          </span>
          <h2>Content creation with a curious, practical point of view.</h2>
          <p>
            Julie makes mid-length videos that translate business, technology, and current events for
            general audiences. The vibe is smart, conversational, and just chaotic enough to be useful.
          </p>
          <div className="social-links">
            {socials.map((social) => (
              <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
                <span>{social.label}</span>
                <strong>{social.handle}</strong>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="life-photo">
          <img src={julieCow} alt="Julie smiling with a fluffy cow" />
          <div>
            <Heart size={18} aria-hidden="true" />
            <span>Personal, approachable, and still very much built for the real internet.</span>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Julie highlights">
        {highlights.map((item) => (
          <div className="stat-item" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="feature-band" id="work">
        <div className="feature-photo">
          <img src={juliePresidentsClub} alt="Julie at Cloudflare President's Club winners wall" />
          <span>President's Club, but make it orange.</span>
        </div>
        <div className="feature-copy">
          <div className="section-heading">
            <span className="eyebrow">
              <Trophy size={16} aria-hidden="true" />
              Professional Sparkle
            </span>
            <h2>Technical enough to go deep, human enough to make it make sense.</h2>
          </div>
          <p>
            The work version of Julie is still very Julie: curious, direct, a little extra, and obsessed
            with turning complicated systems into stories customers can trust.
          </p>
        </div>
      </section>

      <section className="video-band" id="futurecon">
        <div className="video-copy">
          <span className="eyebrow">
            <PlayCircle size={16} aria-hidden="true" />
            FutureCon SLC Speaker
          </span>
          <h2>Speaking on Zero Trust with a technical, practical point of view.</h2>
          <p>
            Julie presented at FutureCon Salt Lake City on developing a Zero Trust mindset, translating
            security concepts into a clear framework for business and technical audiences.
          </p>
          <a className="secondary-action video-link" href={futureConUrl} target="_blank" rel="noreferrer">
            Watch on Vimeo
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="video-frame">
          <iframe
            src={futureConEmbedUrl}
            title="Julie Cardinalli speaking at FutureCon SLC"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="content-band">
        <div className="achievement-grid">
          {achievementCards.map(({ icon: Icon, title, text }) => (
            <article className="achievement-card" key={title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-band" id="projects">
        <div>
          <span className="eyebrow">
            <Code2 size={16} aria-hidden="true" />
            Built, Shipped, Learned
          </span>
          <h2>Julie likes a project with a little texture.</h2>
          <p>
            Her work sits at the intersection of technical depth, practical execution, and a genuinely
            curious point of view. The throughline is simple: learn fast, explain well, quantify value,
            and build things that make people feel more capable.
          </p>
        </div>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </section>

      <section className="site-build-band" id="site">
        <div>
          <span className="eyebrow">
            <Code2 size={16} aria-hidden="true" />
            About This Site
          </span>
          <h2>Built like a tiny personal AI lab, hosted on Cloudflare.</h2>
        </div>
        <p>
          This site is a React/Vite app hosted on Cloudflare Pages. The chat runs through a Cloudflare
          Worker, uses Workers AI for generation, searches Julie-specific Q&A context in Cloudflare
          Vectorize, and calls a small embedding Worker so the bot can answer in a way that feels more
          like Julie and less like a customer-support toaster.
        </p>
      </section>

      <section className="content-band life-band" id="personality">
        <div className="section-heading">
          <span className="eyebrow">
            <MapPin size={16} aria-hidden="true" />
            Beyond the Resume
          </span>
          <h2>Curious, well-rounded, and comfortable bringing personality to the room.</h2>
        </div>
        <div className="personality-grid">
          {personality.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

    </main>
  );
}

export default App;
