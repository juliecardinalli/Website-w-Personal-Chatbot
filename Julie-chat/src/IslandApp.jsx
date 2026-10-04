import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, X, Pause, Play, RotateCcw } from "lucide-react";
import World from "./components/World";
import ChapterContents from "./components/ChapterContents";

const chapters = [
  { id: "work", number: "01", label: "The day job", sub: "Solutions engineering", color: "#de7852" },
  { id: "ai", number: "02", label: "The curiosity lab", sub: "Things I build", color: "#8c88bd" },
  { id: "speaking", number: "03", label: "The conversation", sub: "Speaking & storytelling", color: "#bb7068" },
  { id: "life", number: "04", label: "The great outside", sub: "A life beyond the screen", color: "#708d75" },
];

export default function App() {
  const [chapter, setChapter] = useState(null);
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [loaded, setLoaded] = useState(false);
  const worldAPI = useRef(null);
  const dialog = useRef(null);
  const openChapter = useCallback((id) => {
    setChapter(id);
    dialog.current?.showModal();
    window.history.replaceState(null, "", `#${id}`);
  }, []);
  const onReady = useCallback((api) => { worldAPI.current = api; setLoaded(true); }, []);
  const closeChapter = () => {
    setChapter(null);
    window.history.replaceState(null, "", "#home");
  };
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (["work", "ai", "speaking", "life", "contact", "about"].includes(id)) openChapter(id);
      else if (dialog.current?.open) dialog.current.close();
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [openChapter]);
  return <div className="atlas">
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Julie Cardinalli home">julie<span>cardinalli</span><i>.</i></a>
      <div className="header-note"><span className="status-dot" /> Austin, Texas</div>
      <button className="contact-link" onClick={() => openChapter("contact")}>Say hello <ArrowUpRight size={17} /></button>
    </header>
    <main id="home" className="world-layout">
      <div className="intro">
        <p className="eyebrow">A small world by Julie Cardinalli</p>
        <h1><span>Follow </span><span>your </span><em>curiosity.</em></h1>
        <p className="intro-text">Solutions engineer at Cloudflare.<br />Berkeley Data Science grad.</p>
        <p className="intro-note">Work, projects, and the rest.<br />Pick an island to explore.</p>
        <button className="story-link" onClick={() => openChapter("about")}>A little about me <ArrowRight size={17} /></button>
        <div className="coordinate-note">30.2672° N &nbsp; 97.7431° W <span>Austin, TX</span></div>
      </div>
      <div className={`world-frame ${loaded ? "is-ready" : ""}`}>
        <World chapters={chapters} onSelect={openChapter} onReady={onReady} paused={paused} />
        {!loaded && <p className="loading-note">Loading the islands…</p>}
        <div className="map-caption"><span>THE JULIE ARCHIPELAGO</span><span>Not to scale.</span></div>
        <div className="map-tools"><span>Drag to wander · Tap to explore</span>
          <button aria-label={paused ? "Play world animation" : "Pause world animation"} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
          <button aria-label="Reset world view" onClick={() => worldAPI.current?.reset()}><RotateCcw size={15} /></button>
        </div>
      </div>
    </main>
    <footer className="world-footer">
      <span className="index-label">Choose a world <ArrowRight size={15} /></span>
      <nav aria-label="Portfolio chapters">{chapters.map((item) => <button key={item.id} onClick={() => openChapter(item.id)}><span style={{ color: item.color }}>{item.number}</span>{item.label}<ArrowUpRight size={14} /></button>)}</nav>
      <span className="footer-signature">Julie Cardinalli</span>
    </footer>
    <dialog ref={dialog} className="chapter-dialog" aria-labelledby="chapter-title" onClose={closeChapter} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="chapter-sheet">
        <button className="close-panel" aria-label="Close chapter" onClick={() => dialog.current.close()}><X size={21} /></button>
        <p className="eyebrow">{chapters.find((item) => item.id === chapter)?.number || "JC"} &nbsp; / &nbsp; {chapters.find((item) => item.id === chapter)?.sub || "Julie Cardinalli"}</p>
        <h2 id="chapter-title">{chapters.find((item) => item.id === chapter)?.label || (chapter === "contact" ? "Let's talk." : "Hello, I'm Julie.")}</h2>
        <ChapterContents chapter={chapter} onNavigate={openChapter} />
      </div>
    </dialog>
  </div>;
}
