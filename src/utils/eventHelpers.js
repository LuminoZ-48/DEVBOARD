/**
 * Returns the CSS custom-property colour associated with a category.
 * @param {string} category
 * @returns {string} hex colour value
 */
export function getCategoryColor(category) {
  const map = {
    'Hackathon':       '#f97316',
    'Workshop':        '#8b5cf6',
    'AI / ML':         '#06b6d4',
    'Web Development': '#10b981',
    'Cloud':           '#3b82f6',
    'Cybersecurity':   '#ef4444',
    'Developer Tools': '#f59e0b',
  };
  return map[category] ?? '#4f6ef7';
}

/**
 * Returns the dot modifier class for a format string.
 * @param {'Online'|'In-Person'|'Hybrid'} format
 * @returns {string}
 */
export function getFormatDotClass(format) {
  const map = {
    'Online':    'event-card__format-dot--online',
    'In-Person': 'event-card__format-dot--in-person',
    'Hybrid':    'event-card__format-dot--hybrid',
  };
  return map[format] ?? '';
}

/**
 * Returns className modifiers and fill styles for spots remaining bar.
 * @param {number} left
 * @param {number} total
 * @returns {{ percent: number, fillClass: string }}
 */
export function getSpotsInfo(left, total) {
  const pct = Math.round((left / total) * 100);
  let fillClass = 'spots-bar__fill';
  if (pct <= 15) fillClass += ' spots-bar__fill--low';
  else if (pct <= 40) fillClass += ' spots-bar__fill--mid';
  return { percent: pct, fillClass };
}
