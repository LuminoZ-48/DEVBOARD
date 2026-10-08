import EventCard from './EventCard';

const HeartOffIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const CompassIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

/**
 * FavouritesView — section showing all saved events.
 *
 * @param {{
 *   events: import('../data/events').Event[],
 *   isFavourite: (id: string) => boolean,
 *   onToggleFavourite: (id: string) => void,
 *   onOpenDetails: (event: import('../data/events').Event) => void,
 *   onBrowse: () => void,
 * }} props
 */
export default function FavouritesView({ events, isFavourite, onToggleFavourite, onOpenDetails, onBrowse }) {
  const hasFavourites = events.length > 0;

  return (
    <section className="discovery-section" id="favourites-view" aria-labelledby="favourites-heading">
      <div className="container">
        {/* Section header */}
        <div className="discovery-section__header">
          <h2 className="discovery-section__title" id="favourites-heading">
            Saved Events
          </h2>
          {hasFavourites && (
            <span className="discovery-section__count" aria-live="polite" aria-atomic="true">
              {events.length} saved
            </span>
          )}
        </div>

        {/* Empty state */}
        {!hasFavourites && (
          <div className="state-card" role="status">
            <HeartOffIcon />
            <p className="state-card__title">No saved events yet</p>
            <p className="state-card__subtitle">
              Hit the heart icon on any event to save it here for quick access.
            </p>
            <button className="state-card__browse-btn" onClick={onBrowse}>
              <CompassIcon />
              Browse Events
            </button>
          </div>
        )}

        {/* Cards grid */}
        {hasFavourites && (
          <div className="event-grid" role="list" aria-label="Saved events">
            {events.map((event) => (
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
        )}
      </div>
    </section>
  );
}
