import EventCard from './EventCard';

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton sk-badge" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton sk-line sk-title" />
        <div className="skeleton sk-line sk-body1" />
        <div className="skeleton sk-line sk-body2" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div className="skeleton sk-line" style={{ width: '60%' }} />
        <div className="skeleton sk-line" style={{ width: '50%' }} />
      </div>
    </div>
  );
}

const SORT_OPTIONS = [
  { value: 'date-asc',     label: 'Date: Soonest' },
  { value: 'date-desc',    label: 'Date: Latest' },
  { value: 'category-asc', label: 'Category: A → Z' },
  { value: 'alpha-asc',    label: 'Title: A → Z' },
  { value: 'alpha-desc',   label: 'Title: Z → A' },
];

const ResetIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
  </svg>
);

/**
 * EventGrid — renders the discovery grid with sorting, filters header, loading/empty states.
 *
 * @param {{
 *   events: import('../data/events').Event[],
 *   isLoading: boolean,
 *   isFavourite: (id: string) => boolean,
 *   onToggleFavourite: (id: string) => void,
 *   onOpenDetails: (event: import('../data/events').Event) => void,
 *   query: string,
 *   activeCategory: string,
 *   isFiltered: boolean,
 *   sortOrder: string,
 *   onSortChange: (s: string) => void,
 *   onResetFilters: () => void,
 * }} props
 */
export default function EventGrid({
  events,
  isLoading,
  isFavourite,
  onToggleFavourite,
  onOpenDetails,
  query,
  activeCategory,
  isFiltered,
  sortOrder,
  onSortChange,
  onResetFilters,
}) {
  return (
    <section className="discovery-section" id="events-grid" aria-labelledby="events-heading">
      <div className="container">
        {/* Section controls header */}
        <div className="discovery-section__header">
          <div className="discovery-section__title-group">
            <h2 className="discovery-section__title" id="events-heading">
              {isFiltered ? 'Search Results' : 'All Events'}
            </h2>
            {!isLoading && (
              <span className="discovery-section__count" aria-live="polite" aria-atomic="true">
                {events.length} event{events.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="discovery-section__controls">
            {/* Clear filters */}
            {isFiltered && (
              <button
                className="clear-filters-btn"
                onClick={onResetFilters}
                aria-label="Clear all filters and search"
              >
                <ResetIcon />
                Clear filters
              </button>
            )}

            {/* Sort select */}
            <label htmlFor="sort-select" className="visually-hidden">Sort events by</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortOrder}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort events"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div
          className="event-grid"
          role="list"
          aria-label="Events list"
          aria-busy={isLoading}
        >
          {/* Loading state */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} role="listitem">
                <SkeletonCard />
              </div>
            ))}

          {/* No results */}
          {!isLoading && events.length === 0 && (
            <div className="state-card" role="status">
              <div className="state-card__icon" aria-hidden="true">🔍</div>
              <p className="state-card__title">No events found</p>
              <p className="state-card__subtitle">
                {isFiltered
                  ? 'Try adjusting your search or selecting a different category.'
                  : 'Check back soon — new events are added regularly.'}
              </p>
              {isFiltered && (
                <button className="state-card__browse-btn" onClick={onResetFilters}>
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Event cards */}
          {!isLoading &&
            events.map((event) => (
              <div key={event.id} role="listitem">
                <EventCard
                  event={event}
                  isFavourite={isFavourite(event.id)}
                  onToggleFavourite={onToggleFavourite}
                  onOpenDetails={onOpenDetails}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
