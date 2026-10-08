import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import ChapterContents from './src/components/ChapterContents.jsx';

const expected = {
  work: ['Solutions Engineer III', 'Solutions Engineer II', 'Solutions Engineer I', 'Feb 2026', 'linkedin.com'],
  ai: ['Ask about me.', 'Cloudflare Workers AI', 'Opening Julie AI'],
  speaking: ['player.vimeo.com/video/1111253347?h=2dbaa3f485', 'Developing a Zero Trust Mindset', 'tiktok.com'],
  reading: ['Books read in 2026', 'James', 'Percival Everett', 'The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'The Midnight Library', 'Matt Haig', 'Has China Won?', 'Kishore Mahbubani', 'The Song of Achilles', 'Madeline Miller', 'The Alchemist', 'Paulo Coelho', 'Fruit Fly', 'Josh Silver'],
  about: ['Berkeley', 'President', 'linkedin.com', 'tiktok.com', 'x.com/softlaunchjulie'],
  contact: ['mailto:juliecardinalli@gmail.com', 'linkedin.com', 'tiktok.com', 'x.com/softlaunchjulie'],
};
for (const [chapter, checks] of Object.entries(expected)) {
  const html = renderToStaticMarkup(<ChapterContents chapter={chapter} onNavigate={() => {}} />);
  for (const check of checks) assert.ok(html.includes(check), `${chapter}: missing ${check}`);
  assert.ok(!html.includes('undefined'), `${chapter}: unexpected undefined`);
  if (chapter === 'ai') {
    for (const removed of ['Recent project', 'A sales assistant', 'OpenCode', 'Miro', 'Salesforce']) {
      assert.ok(!html.includes(removed), `ai: removed project content still renders: ${removed}`);
    }
  }
  console.log(`PASS ${chapter}: required content and links render`);
}
console.log(`All ${Object.keys(expected).length} content panels passed server-side rendering checks.`);
assert.equal(renderToStaticMarkup(<ChapterContents chapter="life" onNavigate={() => {}} />), '', 'removed life chapter must not render');
console.log('PASS removed life chapter renders no content');
