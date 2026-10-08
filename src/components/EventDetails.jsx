import { useState, useEffect, useCallback } from 'react';
import { formatDateRange } from '../data/events';
import { getCategoryColor, getFormatDotClass, getSpotsInfo } from '../utils/eventHelpers';

// ─── Icons ───────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/**
 * EventDetails — full-screen modal overlay showing all event information.
 *
 * @param {{
 *   event: import('../data/events').Event | null,
 *   isFavourite: boolean,
 *   onToggleFavourite: (id: string) => void,
 *   onClose: () => void,
 * }} props
 */
export default function EventDetails({ event, isFavourite, onToggleFavourite, onClose }) {
  const [registeredEventId, setRegisteredEventId] = useState(null);
  const isRegistered = Boolean(event && registeredEventId === event.id);

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!event) return;
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [event, handleKeyDown]);

  if (!event) return null;

  const catColor = getCategoryColor(event.category);
  const formatDotClass = getFormatDotClass(event.format);
  const { percent, fillClass } = getSpotsInfo(event.spotsLeft, event.totalSpots);
  const dateRange = formatDateRange(event.date, event.endDate);

  return (
    <div
      className="details-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Event details: ${event.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="details-panel">
        {/* Panel header */}
        <div className="details-panel__topbar">
          <button
            className="details-panel__back-btn"
            onClick={onClose}
            aria-label="Close event details and return to discovery"
          >
            <ArrowLeftIcon />
            Back to events
          </button>
          <button
            className="details-panel__close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="details-panel__body">
          {/* Category + Featured */}
          <div className="details-panel__badges">
            <span
              className="event-card__category-badge"
              style={{ '--cat-color': catColor }}
            >
              {event.category}
            </span>
            {event.isFeatured && (
              <span className="details-featured-badge">Featured</span>
            )}
          </div>

          {/* Title */}
          <h2 className="details-panel__title">{event.title}</h2>

          {/* Description */}
          <p className="details-panel__description">{event.shortDescription}</p>

          {/* Meta grid */}
          <div className="details-panel__meta-grid">
            <div className="details-panel__meta-item">
              <span className="details-panel__meta-label">
                <CalendarIcon /> Date
              </span>
              <time className="details-panel__meta-value" dateTime={event.date}>
                {dateRange}
              </time>
            </div>

            <div className="details-panel__meta-item">
              <span className="details-panel__meta-label">
                <MapPinIcon /> Location
              </span>
              <span className="details-panel__meta-value">{event.location}</span>
            </div>

            <div className="details-panel__meta-item">
              <span className="details-panel__meta-label">
                Format
              </span>
              <span className="details-panel__meta-value">
                <span className={`event-card__format-dot ${formatDotClass}`} style={{ display: 'inline-block' }} aria-hidden="true" />
                {' '}{event.format}
              </span>
            </div>

            <div className="details-panel__meta-item">
              <span className="details-panel__meta-label">
                <UsersIcon /> Availability
              </span>
              <span className="details-panel__meta-value">
                {event.spotsLeft} of {event.totalSpots} spots left
              </span>
            </div>
          </div>

          {/* Spots bar */}
          <div className="details-panel__spots">
            <div className="spots-bar__track" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" aria-label={`${percent}% spots available`}>
              <div className={fillClass} style={{ width: `${percent}%` }} />
            </div>
            <div className="spots-bar__text" style={{ marginBottom: 0, marginTop: '6px' }}>
              <span>{percent}% available</span>
              {percent <= 15 && <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>Almost full!</span>}
              {percent > 15 && percent <= 40 && <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>Filling fast</span>}
            </div>
          </div>

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div className="details-panel__section">
              <h3 className="details-panel__section-title">Topics</h3>
              <div className="event-card__tags">
                {event.tags.map((tag) => (
                  <span key={tag} className="event-card__tag">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="details-panel__actions">
            <button
              type="button"
              className={`details-fav-btn${isFavourite ? ' details-fav-btn--active' : ''}`}
              onClick={() => onToggleFavourite(event.id)}
              aria-label={isFavourite ? `Remove ${event.title} from favourites` : `Save ${event.title} to favourites`}
              aria-pressed={isFavourite}
            >
              <HeartIcon filled={isFavourite} />
              {isFavourite ? 'Saved to Favourites' : 'Save to Favourites'}
            </button>

            <button
              type="button"
              className={`details-register-btn${isRegistered ? ' details-register-btn--registered' : ''}`}
              onClick={() => setRegisteredEventId(event.id)}
              aria-label={isRegistered ? `Registration interest recorded for ${event.title}` : `Register interest for ${event.title}`}
            >
              {isRegistered ? (
                <>
                  <CheckIcon />
                  Interest Recorded
                </>
              ) : (
                <>
                  Register Now
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </div>

          {/* Registration Demo Feedback */}
          {isRegistered && (
            <div className="details-registration-alert" role="status" aria-live="polite">
              <div className="details-registration-alert__icon" aria-hidden="true">
                <CheckIcon />
              </div>
              <div className="details-registration-alert__content">
                <p className="details-registration-alert__title">Registration interest recorded</p>
                <p className="details-registration-alert__desc">
                  You&apos;re all set for this demo event. (Demo preview — no real ticket issued)
                </p>
              </div>
              <button
                type="button"
                className="details-registration-alert__dismiss"
                onClick={() => setRegisteredEventId(null)}
                aria-label="Dismiss registration confirmation"
              >
                <XIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
