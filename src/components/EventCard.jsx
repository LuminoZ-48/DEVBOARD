import { formatDateRange } from '../data/events';
import { getCategoryColor, getFormatDotClass, getSpotsInfo } from '../utils/eventHelpers';

// ─── Icons ───────────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg className="event-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="event-card__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/**
 * EventCard — displays a single event.
 * Clicking the card body opens details; footer buttons have their own actions.
 *
 * @param {{
 *   event: import('../data/events').Event,
 *   isFavourite: boolean,
 *   onToggleFavourite: (id: string) => void,
 *   onOpenDetails: (event: import('../data/events').Event) => void,
 * }} props
 */
export default function EventCard({ event, isFavourite, onToggleFavourite, onOpenDetails }) {
  const catColor = getCategoryColor(event.category);
  const formatDotClass = getFormatDotClass(event.format);
  const { percent, fillClass } = getSpotsInfo(event.spotsLeft, event.totalSpots);
  const dateRange = formatDateRange(event.date, event.endDate);

  function handleCardKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenDetails?.(event);
    }
  }

  return (
    <article
      className={`event-card${event.isFeatured ? ' event-card--featured' : ''}`}
      aria-label={`Event: ${event.title}`}
    >
      {/* Card Header — category badge + fav button.
          Featured badge is handled via CSS ::before but we give header extra
          padding-top on featured cards via the --featured modifier. */}
      <div className="event-card__header">
        <div className="event-card__badges">
          <span
            className="event-card__category-badge"
            style={{ '--cat-color': catColor }}
          >
            {event.category}
          </span>

          {/* Featured pill — rendered in JSX so it doesn't overlap the heart */}
          {event.isFeatured && (
            <span className="event-card__featured-pill" aria-label="Featured event">
              Featured
            </span>
          )}
        </div>

        <button
          type="button"
          className={`event-card__fav-btn${isFavourite ? ' event-card__fav-btn--active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavourite(event.id); }}
          aria-label={isFavourite ? `Remove ${event.title} from favourites` : `Save ${event.title} to favourites`}
          aria-pressed={isFavourite}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>

      {/* Clickable body — opens details */}
      <div
        className="event-card__body event-card__body--clickable"
        onClick={() => onOpenDetails?.(event)}
        onKeyDown={handleCardKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${event.title}`}
      >
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__description">{event.shortDescription}</p>
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="event-card__tags" aria-label="Event tags">
          {event.tags.map((tag) => (
            <span key={tag} className="event-card__tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="event-card__meta">
        <div className="event-card__meta-row">
          <CalendarIcon />
          <time dateTime={event.date}>{dateRange}</time>
        </div>
        <div className="event-card__meta-row">
          <MapPinIcon />
          <span>{event.location}</span>
        </div>

        {/* Spots remaining */}
        <div className="spots-bar" aria-label={`${event.spotsLeft} of ${event.totalSpots} spots remaining`}>
          <div className="spots-bar__text">
            <span>
              <strong>{event.spotsLeft}</strong> spots left
            </span>
            <span>{percent}% available</span>
          </div>
          <div className="spots-bar__track" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
            <div className={fillClass} style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="event-card__footer">
        <span className="event-card__format-badge">
          <span className={`event-card__format-dot ${formatDotClass}`} aria-hidden="true" />
          {event.format}
        </span>

        <button
          className="event-card__register-btn"
          onClick={() => onOpenDetails?.(event)}
          aria-label={`View details for ${event.title}`}
        >
          View Details
          <ArrowRightIcon />
        </button>
      </div>
    </article>
  );
}
