/**
 * DEVBOARD — Centralized mock event dataset.
 * This is the single source of truth for all event data across the app.
 * Future milestones: search, filter, favourites, and details all consume this array.
 */

export const CATEGORIES = [
  'All',
  'Hackathon',
  'Workshop',
  'AI / ML',
  'Web Development',
  'Cloud',
  'Cybersecurity',
  'Developer Tools',
];

/** @type {Event[]} */
export const events = [
  {
    id: 'evt-001',
    title: 'HackSphere 2026',
    category: 'Hackathon',
    date: '2026-11-15',
    endDate: '2026-11-17',
    format: 'In-Person',
    location: 'San Francisco, CA',
    shortDescription:
      'A 48-hour global hackathon bringing together 1 000+ builders to tackle climate-tech challenges with cutting-edge tools.',
    tags: ['climate', 'hardware', 'open-source'],
    registrationUrl: '#',
    spotsLeft: 120,
    totalSpots: 500,
    isFeatured: true,
  },
  {
    id: 'evt-002',
    title: 'Build With AI — Workshop Series',
    category: 'AI / ML',
    date: '2026-11-08',
    endDate: '2026-11-08',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'Hands-on sessions covering LLM fine-tuning, RAG pipelines, and deploying AI agents to production with real workloads.',
    tags: ['llm', 'rag', 'production'],
    registrationUrl: '#',
    spotsLeft: 300,
    totalSpots: 1000,
    isFeatured: true,
  },
  {
    id: 'evt-003',
    title: 'DevConf Europe 2026',
    category: 'Web Development',
    date: '2026-12-03',
    endDate: '2026-12-05',
    format: 'Hybrid',
    location: 'Berlin, Germany',
    shortDescription:
      'Three days of deep-dive talks, workshops, and open-space sessions on modern web standards, frameworks, and performance.',
    tags: ['react', 'web-standards', 'performance'],
    registrationUrl: '#',
    spotsLeft: 45,
    totalSpots: 800,
    isFeatured: false,
  },
  {
    id: 'evt-004',
    title: 'CloudNative Summit',
    category: 'Cloud',
    date: '2026-11-22',
    endDate: '2026-11-23',
    format: 'Hybrid',
    location: 'Austin, TX',
    shortDescription:
      'Platform engineering, Kubernetes deep-dives, FinOps, and the future of distributed systems at scale.',
    tags: ['kubernetes', 'platform-engineering', 'finops'],
    registrationUrl: '#',
    spotsLeft: 200,
    totalSpots: 600,
    isFeatured: true,
  },
  {
    id: 'evt-005',
    title: 'CyberDefend CTF 2026',
    category: 'Cybersecurity',
    date: '2026-11-29',
    endDate: '2026-11-30',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'Capture-the-Flag competition open to all skill levels — from web exploitation to binary reverse-engineering challenges.',
    tags: ['ctf', 'pentesting', 'reverse-engineering'],
    registrationUrl: '#',
    spotsLeft: 500,
    totalSpots: 2000,
    isFeatured: false,
  },
  {
    id: 'evt-006',
    title: 'Prompt Engineering Bootcamp',
    category: 'AI / ML',
    date: '2026-11-12',
    endDate: '2026-11-12',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'A focused one-day bootcamp on advanced prompt design, chain-of-thought, tool use, and evaluation frameworks.',
    tags: ['prompting', 'llm', 'evaluation'],
    registrationUrl: '#',
    spotsLeft: 80,
    totalSpots: 200,
    isFeatured: false,
  },
  {
    id: 'evt-007',
    title: 'Open Source Builders Hackathon',
    category: 'Hackathon',
    date: '2026-12-13',
    endDate: '2026-12-15',
    format: 'In-Person',
    location: 'Bangalore, India',
    shortDescription:
      'Celebrate and contribute to the open-source ecosystem. Ship real PRs and compete for grants and mentorship.',
    tags: ['open-source', 'community', 'grants'],
    registrationUrl: '#',
    spotsLeft: 60,
    totalSpots: 250,
    isFeatured: false,
  },
  {
    id: 'evt-008',
    title: 'DevTools Conf 2026',
    category: 'Developer Tools',
    date: '2026-11-19',
    endDate: '2026-11-20',
    format: 'In-Person',
    location: 'London, UK',
    shortDescription:
      'The conference for toolmakers: IDEs, CLIs, build systems, observability, and the dev-experience frontier.',
    tags: ['dx', 'cli', 'observability'],
    registrationUrl: '#',
    spotsLeft: 30,
    totalSpots: 400,
    isFeatured: false,
  },
  {
    id: 'evt-009',
    title: 'CSS Wizards Workshop',
    category: 'Web Development',
    date: '2026-11-05',
    endDate: '2026-11-05',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'Advanced CSS — container queries, has(), cascade layers, scroll-driven animations, and view transitions.',
    tags: ['css', 'animations', 'design-systems'],
    registrationUrl: '#',
    spotsLeft: 150,
    totalSpots: 300,
    isFeatured: false,
  },
  {
    id: 'evt-010',
    title: 'SecureOps Workshop',
    category: 'Cybersecurity',
    date: '2026-12-09',
    endDate: '2026-12-09',
    format: 'In-Person',
    location: 'New York, NY',
    shortDescription:
      'Hands-on training in cloud security posture management, secrets detection, and zero-trust architecture.',
    tags: ['cloud-security', 'devsecops', 'zero-trust'],
    registrationUrl: '#',
    spotsLeft: 25,
    totalSpots: 80,
    isFeatured: false,
  },
  {
    id: 'evt-011',
    title: 'Serverless & Edge Compute Summit',
    category: 'Cloud',
    date: '2026-12-17',
    endDate: '2026-12-18',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'Explore the edge-first web: Cloudflare Workers, Deno Deploy, Bun, and optimising cold starts globally.',
    tags: ['serverless', 'edge', 'performance'],
    registrationUrl: '#',
    spotsLeft: 400,
    totalSpots: 800,
    isFeatured: false,
  },
  {
    id: 'evt-012',
    title: 'GenAI for Developers',
    category: 'AI / ML',
    date: '2026-12-01',
    endDate: '2026-12-02',
    format: 'Hybrid',
    location: 'Singapore',
    shortDescription:
      'Practical generative AI: building multi-modal apps, embeddings, vector search, and responsible AI patterns.',
    tags: ['genai', 'multimodal', 'embeddings'],
    registrationUrl: '#',
    spotsLeft: 90,
    totalSpots: 350,
    isFeatured: true,
  },
  {
    id: 'evt-013',
    title: 'Frontend Hackday',
    category: 'Hackathon',
    date: '2026-11-25',
    endDate: '2026-11-25',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'A one-day sprint focused purely on UI craftsmanship — accessibility, animations, and design-system excellence.',
    tags: ['ui', 'accessibility', 'design-systems'],
    registrationUrl: '#',
    spotsLeft: 200,
    totalSpots: 500,
    isFeatured: false,
  },
  {
    id: 'evt-014',
    title: 'Rust Systems Workshop',
    category: 'Developer Tools',
    date: '2026-11-10',
    endDate: '2026-11-10',
    format: 'In-Person',
    location: 'Amsterdam, Netherlands',
    shortDescription:
      'Systems programming with Rust: ownership deep-dive, async runtimes, WASM compilation, and unsafe patterns.',
    tags: ['rust', 'wasm', 'systems'],
    registrationUrl: '#',
    spotsLeft: 15,
    totalSpots: 60,
    isFeatured: false,
  },
  {
    id: 'evt-015',
    title: 'Full-Stack React Intensive',
    category: 'Workshop',
    date: '2026-11-18',
    endDate: '2026-11-19',
    format: 'Online',
    location: 'Virtual',
    shortDescription:
      'Two days of advanced React patterns, server components, data fetching strategies, and testing workflows.',
    tags: ['react', 'server-components', 'testing'],
    registrationUrl: '#',
    spotsLeft: 70,
    totalSpots: 150,
    isFeatured: false,
  },
  {
    id: 'evt-016',
    title: 'Platform Engineering Workshop',
    category: 'Workshop',
    date: '2026-12-06',
    endDate: '2026-12-06',
    format: 'In-Person',
    location: 'Toronto, Canada',
    shortDescription:
      'Build internal developer platforms: golden paths, self-service portals, and measuring developer productivity.',
    tags: ['platform', 'devex', 'idp'],
    registrationUrl: '#',
    spotsLeft: 35,
    totalSpots: 100,
    isFeatured: false,
  },
];

/**
 * Returns a human-friendly date range string.
 * @param {string} start - ISO date string
 * @param {string} [end] - ISO date string
 * @returns {string}
 */
export function formatDateRange(start, end) {
  const opts = { month: 'short', day: 'numeric', year: 'numeric' };
  const startDate = new Date(start + 'T00:00:00');
  if (!end || end === start) {
    return startDate.toLocaleDateString('en-US', opts);
  }
  const endDate = new Date(end + 'T00:00:00');
  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = startDate.getMonth() === endDate.getMonth();
  if (sameYear && sameMonth) {
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${endDate.getDate()}, ${endDate.getFullYear()}`;
  }
  return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', opts)}`;
}
