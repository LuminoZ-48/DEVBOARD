import { useNavbar } from '../hooks/useDevboard';

// ─── Icons ───────────────────────────────────────────────────────────────────
const CompassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// Pure component declared outside render to satisfy React purity
function NavLinks({ activeView, favouriteCount, onNavClick }) {
  return (
    <>
      <button
        type="button"
        className={`navbar__nav-link${activeView === 'discover' ? ' navbar__nav-link--active' : ''}`}
        onClick={() => onNavClick('discover')}
        aria-current={activeView === 'discover' ? 'page' : undefined}
      >
        <CompassIcon />
        Discover
      </button>
      <button
        type="button"
        className={`navbar__nav-link${activeView === 'favourites' ? ' navbar__nav-link--active' : ''}`}
        onClick={() => onNavClick('favourites')}
        aria-current={activeView === 'favourites' ? 'page' : undefined}
        aria-label={`Favourites${favouriteCount > 0 ? `, ${favouriteCount} saved` : ''}`}
      >
        <HeartIcon filled={favouriteCount > 0} />
        Favourites
        {favouriteCount > 0 && (
          <span className="navbar__nav-link-badge" aria-hidden="true">
            {favouriteCount}
          </span>
        )}
      </button>
    </>
  );
}

/**
 * Navbar — sticky header with DEVBOARD branding, view switching, and theme toggle.
 *
 * @param {{
 *   favouriteCount: number,
 *   activeView: 'discover' | 'favourites',
 *   onViewChange: (view: 'discover' | 'favourites') => void,
 *   theme: 'light' | 'dark',
 *   onToggleTheme: () => void,
 * }} props
 */
export default function Navbar({
  favouriteCount,
  activeView,
  onViewChange,
  theme,
  onToggleTheme,
}) {
  const { isOpen, toggle, close } = useNavbar();

  function handleNavClick(view) {
    onViewChange(view);
    close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <header className="navbar" role="banner">
      <div className="container">
        <div className="navbar__inner">
          {/* Brand */}
          <button
            type="button"
            className="navbar__brand"
            onClick={() => handleNavClick('discover')}
            aria-label="DEVBOARD home — go to Discover"
          >
            <div className="navbar__logo-mark" aria-hidden="true">
              <span>DB</span>
            </div>
            <span className="navbar__brand-name">
              DEVBOARD<span className="navbar__brand-dot">.</span>
            </span>
          </button>

          {/* Right actions: Desktop nav + Theme toggle + Mobile Hamburger */}
          <div className="navbar__actions">
            {/* Desktop nav links */}
            <nav className="navbar__nav" aria-label="Main navigation">
              <NavLinks
                activeView={activeView}
                favouriteCount={favouriteCount}
                onNavClick={handleNavClick}
              />
            </nav>

            {/* Theme toggle button */}
            <button
              type="button"
              className="navbar__theme-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={`navbar__hamburger${isOpen ? ' is-open' : ''}`}
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`navbar__mobile-nav${isOpen ? ' is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <nav className="navbar__nav" aria-label="Mobile navigation">
          <NavLinks
            activeView={activeView}
            favouriteCount={favouriteCount}
            onNavClick={handleNavClick}
          />
        </nav>
      </div>
    </header>
  );
}

