import { ArrowUpRight, Mail, MessageCircle, PlayCircle } from "lucide-react";
import julieCow from "./assets/julie-cow.jpg";
import juliePresidentsClub from "./assets/julie-presidents-club.jpg";
import Chat from "./components/Chat";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juliecardinalli/" },
  { label: "TikTok", href: "https://www.tiktok.com/@juliemeow69" },
  { label: "X", href: "https://x.com/softlaunchjulie" },
];

const futureConUrl = "https://vimeo.com/1111253347/2dbaa3f485";
const futureConEmbedUrl = "https://player.vimeo.com/video/1111253347?h=2dbaa3f485";
const emailAddress = "juliecardinalli@gmail.com";
const emailUrl = `mailto:${emailAddress}`;

function App() {
  return (
    <div className="site-shell">
      <header className="site-header" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="Julie Cardinalli home">
          <span className="wordmark-mark" aria-hidden="true">JC</span>
          <span>Julie Cardinalli</span>
        </a>
        <nav className="nav-links">
          <a href="#speaking">Speaking</a>
          <a href="#ai">AI lab</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="section-label">Solutions engineering · AI · storytelling</p>
            <h1>Julie Cardinalli</h1>
            <p className="hero-statement">Technical seller. Clear communicator. Curious builder.</p>
            <p className="hero-lede">
              Cloudflare Solutions Engineer, President&apos;s Club honoree, and UC Berkeley Data Science
              graduate. I turn complex technology into clear stories, trusted customer conversations,
              and useful AI systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#ai">
                <MessageCircle size={18} aria-hidden="true" />
                Ask my AI
              </a>
              <a className="button button-secondary" href={emailUrl}>
                <Mail size={18} aria-hidden="true" />
                Email me
              </a>
            </div>
            <ul className="credential-line" aria-label="Professional highlights">
              <li><strong>Cloudflare</strong><span>Solutions Engineer</span></li>
              <li><strong>President&apos;s Club</strong><span>Honoree</span></li>
              <li><strong>UC Berkeley</strong><span>Data Science</span></li>
            </ul>
          </div>

          <figure className="hero-portrait">
            <img src={juliePresidentsClub} alt="Julie Cardinalli at Cloudflare President's Club" />
            <figcaption>
              <span>President&apos;s Club</span>
              <span>Cloudflare</span>
            </figcaption>
          </figure>
        </section>

        <section className="speaking-band" id="speaking">
          <div className="section-inner speaking-layout">
            <div className="speaking-copy">
              <p className="section-label section-label-light">
                <PlayCircle size={16} aria-hidden="true" /> FutureCon SLC
              </p>
              <h2>Zero Trust, explained clearly.</h2>
              <p>
                A practical talk on building a Zero Trust mindset for technical and business audiences.
              </p>
              <a className="text-link text-link-light" href={futureConUrl} target="_blank" rel="noreferrer">
                Watch the talk <ArrowUpRight size={17} aria-hidden="true" />
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
          </div>
        </section>

        <section className="ai-band" id="ai">
          <div className="section-inner ai-layout">
            <div className="ai-copy">
              <p className="section-label">Personal AI lab</p>
              <h2>A site that can answer back.</h2>
              <p>
                This portfolio is also a working AI experiment. Ask about my work, background, projects,
                or the useful details that do not fit neatly on a resume.
              </p>
              <p className="build-note">
                Built with React, Cloudflare Pages, Workers AI, and Vectorize.
              </p>
            </div>
            <div className="chat-wrap">
              <Chat />
            </div>
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div className="section-inner contact-layout">
            <div className="contact-copy">
              <p className="section-label">Contact</p>
              <h2>Let&apos;s talk.</h2>
              <p>
                For roles, speaking, collaborations, or a thoughtful hello, email is the best place to start.
              </p>
              <a className="email-link" href={emailUrl}>
                {emailAddress} <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <div className="social-links" aria-label="Social profiles">
                {socials.map((social) => (
                  <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
                    {social.label} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <figure className="contact-photo">
              <img src={julieCow} alt="Julie smiling beside a fluffy cow" />
              <figcaption>Good questions, serious work, and a life beyond the screen.</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Julie Cardinalli</span>
        <span>Austin, Texas</span>
      </footer>
    </div>
  );
}

export default App;
