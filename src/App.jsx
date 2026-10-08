import './index.css';
import './styles/components.css';

import { useState, useEffect, useMemo } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import EventGrid from './components/EventGrid';
import EventDetails from './components/EventDetails';
import FavouritesView from './components/FavouritesView';
import Footer from './components/Footer';

import { events as allEvents } from './data/events';
import { useFavourites, useEventDiscovery, useTheme } from './hooks/useDevboard';

/**
 * App — root component.
 *
 * State owned here:
 *  - activeView: 'discover' | 'favourites'
 *  - selectedEvent: the event whose details are open (null = closed)
 *  - isLoading: initial skeleton state
 *
 * Discovery state (query, category, sort, filteredEvents) lives in useEventDiscovery.
 * Favourite state lives in useFavourites (with localStorage persistence).
 * Theme state lives in useTheme (light / dark with localStorage persistence).
 */
export default function App() {
  const [activeView, setActiveView] = useState('discover');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Theme — light | dark with persistence
  const { theme, toggleTheme } = useTheme();

  // Favourites — localStorage-backed, no-duplicate Set
  const { favourites, toggle: toggleFavourite, isFavourite } = useFavourites();

  // Discovery — search + filter + sort
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    sortOrder,
    setSortOrder,
    filteredEvents,
    isFiltered,
    resetFilters,
  } = useEventDiscovery(allEvents);

  // Derive the list of full event objects that are favourited (preserves sort order)
  const favouritedEvents = useMemo(
    () => allEvents.filter((e) => favourites.has(e.id)),
    [favourites],
  );

  // Brief loading shimmer on first render
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar
        favouriteCount={favourites.size}
        activeView={activeView}
        onViewChange={setActiveView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="main-content">
        {activeView === 'discover' && (
          <>
            <Hero query={query} onQueryChange={setQuery} />

            <FilterBar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <EventGrid
              events={filteredEvents}
              isLoading={isLoading}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
              onOpenDetails={setSelectedEvent}
              query={query}
              activeCategory={activeCategory}
              isFiltered={isFiltered}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              onResetFilters={resetFilters}
            />
          </>
        )}

        {activeView === 'favourites' && (
          <FavouritesView
            events={favouritedEvents}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
            onOpenDetails={setSelectedEvent}
            onBrowse={() => setActiveView('discover')}
          />
        )}
      </main>

      <Footer />

      {/* Event details modal — rendered outside main for proper stacking */}
      <EventDetails
        event={selectedEvent}
        isFavourite={selectedEvent ? isFavourite(selectedEvent.id) : false}
        onToggleFavourite={toggleFavourite}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
