import { events } from '../data/events';

// Inline SVG icons
const SearchIcon = () => (
  <svg className="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Compute stats from the full dataset
const totalEvents = events.length;
const totalCategories = [...new Set(events.map((e) => e.category))].length;
const onlineCount = events.filter((e) => e.format === 'Online').length;

/**
 * Hero component — search bar and product stats.
 * @param {{ query: string, onQueryChange: (q: string) => void }} props
 */
export default function Hero({ query, onQueryChange }) {
  const hasQuery = query.length > 0;

  return (
    <section className="hero" id="discover" aria-labelledby="hero-headline">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__text">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Live Event Discovery
            </div>

            <h1 className="hero__headline" id="hero-headline">
              Your next big{' '}
              <em>build</em> starts here
            </h1>

            <p className="hero__subline">
              Discover upcoming hackathons, workshops, and conferences
              for developers. Filter by category, save favourites, and
              never miss an event that matters.
            </p>

            {/* Search */}
            <div className="search-bar" role="search">
              <SearchIcon />
              <label htmlFor="event-search" className="visually-hidden">
                Search events
              </label>
              <input
                id="event-search"
                type="search"
                className="search-bar__input"
                placeholder="Search events, topics, or locations…"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                autoComplete="off"
                spellCheck="false"
              />
              <button
                className={`search-bar__clear${hasQuery ? ' is-visible' : ''}`}
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                tabIndex={hasQuery ? 0 : -1}
              >
                <XIcon />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="hero__stats" aria-label="Platform statistics">
            <div className="hero__stat">
              <span className="hero__stat-value">{totalEvents}</span>
              <span className="hero__stat-label">Events</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{totalCategories}</span>
              <span className="hero__stat-label">Categories</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{onlineCount}</span>
              <span className="hero__stat-label">Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
