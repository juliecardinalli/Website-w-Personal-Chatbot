const gap = 6;
const overlaps = (a, b) => a.x < b.x + b.width + gap && a.x + a.width + gap > b.x && a.y < b.y + b.height + gap && a.y + a.height + gap > b.y;

// Keep the HTML island buttons readable as the camera or viewport changes.
export function arrangeIslandLabels(labels, width, height) {
  const placed = [];
  for (const label of [...labels].sort((a, b) => a.y - b.y)) {
    const clampX = (x) => Math.max(8, Math.min(x, width - label.width - 8));
    const clampY = (y) => Math.max(28, Math.min(y, height - label.height - 58));
    const origin = { ...label, x: clampX(label.x), y: clampY(label.y) };
    if (!placed.some((other) => overlaps(origin, other))) {
      placed.push(origin);
      continue;
    }
    const xs = [origin.x, ...placed.flatMap((other) => [other.x - label.width - gap, other.x + other.width + gap])].map(clampX);
    const ys = [origin.y, ...placed.flatMap((other) => [other.y - label.height - gap, other.y + other.height + gap])].map(clampY);
    let best = origin, distance = Infinity;
    for (const x of xs) for (const y of ys) {
      const candidate = { ...label, x, y };
      const cost = (x - origin.x) ** 2 + (y - origin.y) ** 2;
      if (cost < distance && !placed.some((other) => overlaps(candidate, other))) {
        best = candidate;
        distance = cost;
      }
    }
    placed.push(best);
  }
  return placed;
}
