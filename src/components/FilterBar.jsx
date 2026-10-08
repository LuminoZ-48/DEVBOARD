import { CATEGORIES } from '../data/events';
import { getCategoryColor } from '../utils/eventHelpers';

/**
 * FilterBar — horizontal scrollable category filter tabs.
 * @param {{ activeCategory: string, onCategoryChange: (cat: string) => void }} props
 */
export default function FilterBar({ activeCategory, onCategoryChange }) {
  return (
    <div className="filter-bar" role="navigation" aria-label="Category filters">
      <div className="container">
        <div className="filter-bar__inner">
          <span className="filter-bar__label" id="filter-label" aria-hidden="true">
            Category
          </span>

          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const color = cat === 'All' ? undefined : getCategoryColor(cat);

            return (
              <button
                key={cat}
                className={`filter-btn${isActive ? ' filter-btn--active' : ''}`}
                onClick={() => onCategoryChange(cat)}
                aria-pressed={isActive}
                aria-label={`Filter by ${cat}`}
              >
                {cat !== 'All' && (
                  <span
                    className="filter-btn__dot"
                    style={{ backgroundColor: isActive ? '#fff' : color }}
                    aria-hidden="true"
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
