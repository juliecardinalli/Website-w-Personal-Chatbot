import {
  Camera,
  Code2,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import julieCow from "./assets/julie-cow.jpg";
import Chat from "./components/Chat";

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
const emailAddress = "juliecardinalli@gmail.com";
const emailUrl = `mailto:${emailAddress}`;

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
          <a href="#futurecon">Speaking</a>
          <a href="#site">Site</a>
          <a href="#contact">Contact</a>
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
            <a className="secondary-action" href={emailUrl}>
              <Mail size={18} aria-hidden="true" />
              Contact
            </a>
          </div>
        </div>

        <div className="hero-chat" id="chat">
          <Chat />
        </div>
      </section>

      <section className="video-band" id="futurecon">
        <div className="video-copy">
          <span className="eyebrow">
            <PlayCircle size={16} aria-hidden="true" />
            FutureCon SLC Speaker
          </span>
          <h2>Zero Trust, made practical.</h2>
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

      <section className="site-build-band" id="site">
        <div className="section-heading">
          <span className="eyebrow">
            <Code2 size={16} aria-hidden="true" />
            About This Site
          </span>
          <h2>A personal AI lab.</h2>
        </div>
        <div className="site-detail-stack">
          <p>
            This site is a React/Vite app hosted on Cloudflare Pages. The chat runs through a Cloudflare
            Worker, uses Workers AI for generation, searches Julie-specific Q&A context in Cloudflare
            Vectorize, and calls a small embedding Worker so the bot can answer in a way that feels more
            like Julie and less like a customer-support toaster.
          </p>
          <div>
            <span className="eyebrow">
              <MapPin size={16} aria-hidden="true" />
              Beyond the Resume
            </span>
            <div className="personality-grid">
              {personality.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="social-band" id="contact">
        <div className="social-copy">
          <span className="eyebrow">
            <Camera size={16} aria-hidden="true" />
            Connect
          </span>
          <h2>Find me online.</h2>
          <p>
            Julie shares practical, conversational takes on business, technology, and current events.
            For opportunities, speaking, collaborations, or a thoughtful hello, email is the cleanest
            place to start.
          </p>
          <div className="contact-links">
            <a className="email-card" href={emailUrl}>
              <span>Email</span>
              <strong>{emailAddress}</strong>
              <Mail size={18} aria-hidden="true" />
            </a>
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
        </div>
        <div className="life-photo">
          <img src={julieCow} alt="Julie smiling with a fluffy cow" />
          <div>
            <Heart size={18} aria-hidden="true" />
            <span>Personal, approachable, and still very much built for the real internet.</span>
          </div>
        </div>
      </section>

    </main>
  );
}

export default App;
