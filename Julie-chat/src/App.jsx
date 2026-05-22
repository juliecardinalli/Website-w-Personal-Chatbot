import {
  Award,
  Brain,
  BriefcaseBusiness,
  Camera,
  Code2,
  ExternalLink,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
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
    icon: BriefcaseBusiness,
    title: "Business Value Storyteller",
    text: "Selected for Cloudflare's inaugural Business Value Associate cohort to deliver ROI assessments economic buyers can actually fund.",
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
  "Delivered a 25-minute FutureCon SLC talk on developing a Zero Trust mindset.",
  "Drove a vendor POC and beta launch of a client-facing software portal at Applied Materials.",
];

const personality = [
  "Knows every country flag",
  "Jeopardy! enthusiast",
  "Chess and strategy nerd",
  "Hot yoga reset button",
  "Beach volleyball player",
  "Event-planning brain",
  "Runner and skier",
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

function App() {
  return (
    <main className="site-shell">
      <header className="top-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Julie Cardinalli home">
          JC
        </a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#personality">Life</a>
          <a href="#socials">Socials</a>
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

      <section className="content-band life-band" id="personality">
        <div className="section-heading">
          <span className="eyebrow">
            <MapPin size={16} aria-hidden="true" />
            Beyond the Resume
          </span>
          <h2>A little polished, a little unhinged, very much herself.</h2>
        </div>
        <div className="personality-grid">
          {personality.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="social-band" id="socials">
        <div className="social-copy">
          <span className="eyebrow">
            <Camera size={16} aria-hidden="true" />
            Internet Julie
          </span>
          <h2>Content creation, soft launches, and occasional cow content.</h2>
          <p>
            Julie makes mid-length videos that translate business, technology, and current events for
            general audiences. The vibe is smart, conversational, and a little bit sparkly.
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
            <span>Not every high-performing website needs a cow photo, but this one absolutely does.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
