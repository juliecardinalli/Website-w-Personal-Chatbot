import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import ChapterContents from './src/components/ChapterContents.jsx';

const expected = {
  work: ['Solutions Engineer III', 'Solutions Engineer II', 'Solutions Engineer I', 'Feb 2026', 'linkedin.com'],
  ai: ['OpenCode', 'Miro', 'Salesforce', 'Cloudflare Workers AI', 'Opening Julie AI'],
  speaking: ['player.vimeo.com/video/1111253347?h=2dbaa3f485', 'Developing a Zero Trust Mindset', 'tiktok.com'],
  life: ['fluffy cow', 'Skiing', 'Beach volleyball', 'Chess'],
  about: ['Berkeley', 'President', 'linkedin.com', 'tiktok.com', 'x.com/softlaunchjulie'],
  contact: ['mailto:juliecardinalli@gmail.com', 'linkedin.com', 'tiktok.com', 'x.com/softlaunchjulie'],
};
for (const [chapter, checks] of Object.entries(expected)) {
  const html = renderToStaticMarkup(<ChapterContents chapter={chapter} onNavigate={() => {}} />);
  for (const check of checks) assert.ok(html.includes(check), `${chapter}: missing ${check}`);
  assert.ok(!html.includes('undefined'), `${chapter}: unexpected undefined`);
  console.log(`PASS ${chapter}: required content and links render`);
}
console.log('All six content panels passed server-side rendering checks.');
