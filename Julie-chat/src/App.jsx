import {
  Award,
  Brain,
  BriefcaseBusiness,
  Cloud,
  Code2,
  GraduationCap,
  MapPin,
  MessageCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
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
  "Created a BERT and DistilBERT classifier for Yelp review helpfulness with about 70% accuracy.",
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
          <a href="#chat">Chat</a>
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
            who turns complex technology into crisp stories, trusted customer moments, and useful AI-powered
            systems.
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

        <div className="hero-visual" aria-label="Julie profile highlights">
          <div className="portrait-card">
            <div className="portrait-badge">
              <Cloud size={24} aria-hidden="true" />
            </div>
            <div className="portrait-initials">JC</div>
            <div className="portrait-caption">
              <span>President's Club</span>
              <span>Berkeley Data Science</span>
              <span>AI + value selling</span>
            </div>
          </div>
          <div className="floating-note note-one">curious</div>
          <div className="floating-note note-two">clear</div>
          <div className="floating-note note-three">fun</div>
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

      <section className="content-band" id="work">
        <div className="section-heading">
          <span className="eyebrow">
            <Trophy size={16} aria-hidden="true" />
            Professional Sparkle
          </span>
          <h2>Technical enough to go deep, human enough to make it make sense.</h2>
        </div>
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
          <h2>A little polished, a little playful, very much herself.</h2>
        </div>
        <div className="personality-grid">
          {personality.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="chat-band" id="chat">
        <div className="chat-intro">
          <span className="eyebrow">
            <MessageCircle size={16} aria-hidden="true" />
            Ask Julie Anything
          </span>
          <h2>Meet the chatbot version of Julie.</h2>
          <p>
            It answers in Julie's voice using the personal and professional knowledge base behind this
            site. Ask about Cloudflare, Berkeley, AI, projects, hobbies, or how she thinks through hard
            problems.
          </p>
        </div>
        <Chat />
      </section>
    </main>
  );
}

export default App;
