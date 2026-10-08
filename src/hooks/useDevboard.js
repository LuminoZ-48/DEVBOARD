import { useState, useCallback, useMemo, useEffect } from 'react';

// ─── localStorage keys ───────────────────────────────────────────────────────
const FAVS_KEY = 'devboard_favourites_v1';
const THEME_KEY = 'devboard_theme_v1';

function loadFavsFromStorage() {
  try {
    const raw = localStorage.getItem(FAVS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavsToStorage(set) {
  try {
    localStorage.setItem(FAVS_KEY, JSON.stringify([...set]));
  } catch {
    // Silently ignore storage errors (e.g. private browsing quota)
  }
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // Silently ignore
  }
  return 'dark';
}

// ─── useTheme ─────────────────────────────────────────────────────────────────
/**
 * Manages light / dark theme with localStorage persistence and system preference.
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void }}
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Silently ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}

// ─── useNavbar ────────────────────────────────────────────────────────────────
/**
 * Manages responsive hamburger menu state.
 */
export function useNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, toggle, close };
}

// ─── useFavourites ───────────────────────────────────────────────────────────
/**
 * Manages the set of favourited event IDs.
 * - No duplicates (Set-based)
 * - Persisted to localStorage
 *
 * @returns {{ favourites: Set<string>, toggle: (id: string) => void, isFavourite: (id: string) => boolean }}
 */
export function useFavourites() {
  const [favourites, setFavourites] = useState(() => loadFavsFromStorage());

  // Sync to localStorage whenever favourites change
  useEffect(() => {
    saveFavsToStorage(favourites);
  }, [favourites]);

  const toggle = useCallback((id) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isFavourite = useCallback(
    (id) => favourites.has(id),
    [favourites],
  );

  return { favourites, toggle, isFavourite };
}

// ─── useEventDiscovery ───────────────────────────────────────────────────────
/**
 * Manages search query, active category filter, and sort order.
 * Derives filteredEvents with real case-insensitive search + category filtering.
 *
 * @param {import('../data/events').Event[]} allEvents
 * @returns {{
 *   query: string,
 *   setQuery: (q: string) => void,
 *   activeCategory: string,
 *   setActiveCategory: (cat: string) => void,
 *   sortOrder: string,
 *   setSortOrder: (s: string) => void,
 *   filteredEvents: import('../data/events').Event[],
 *   isFiltered: boolean,
 *   resetFilters: () => void,
 * }}
 */
export function useEventDiscovery(allEvents) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('date-asc');

  const isFiltered = query.trim() !== '' || activeCategory !== 'All';

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = allEvents.filter((evt) => {
      // Category filter
      if (activeCategory !== 'All' && evt.category !== activeCategory) {
        return false;
      }
      // Search filter — match against title, description, category, tags, location
      if (q) {
        const searchable = [
          evt.title,
          evt.shortDescription,
          evt.category,
          evt.format,
          evt.location,
          ...(evt.tags ?? []),
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortOrder) {
        case 'date-asc':
          return a.date.localeCompare(b.date);
        case 'date-desc':
          return b.date.localeCompare(a.date);
        case 'category-asc':
          return a.category.localeCompare(b.category) || a.date.localeCompare(b.date);
        case 'alpha-asc':
          return a.title.localeCompare(b.title);
        case 'alpha-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [allEvents, query, activeCategory, sortOrder]);

  const resetFilters = useCallback(() => {
    setQuery('');
    setActiveCategory('All');
  }, []);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    sortOrder,
    setSortOrder,
    filteredEvents,
    isFiltered,
    resetFilters,
  };
}
