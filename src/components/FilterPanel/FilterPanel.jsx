import FilterPanelItem from './FilterPanelItem';
import './styles.css';

// Preparing the static menu for the left panel
const menuItems = [
    {
        text: 'All tasks',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        ),
    },
    {
        text: 'Todos',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>
        ),
    },
    {
        text: 'Finished tasks',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="21 8 21 21 3 21 3 8"></polyline>
                <rect x="1" y="3" width="22" height="5"></rect>
                <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
        ),
    },
];

/**
 *
 * @param {*} selectedIndex is the currently selected menu item
 * @param {*} onChange event handler for menu selection
 * @returns JSX-Content for the left menu panel
 */
const FilterPanel = ({ selectedIndex, onChange }) => {
    return (
        <div className="filter-panel">
            <ul>
                {menuItems.map((item, idx) => (
                    <FilterPanelItem
                        key={idx}
                        item={item}
                        index={idx}
                        selected={selectedIndex}
                        onChange={onChange}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FilterPanel;
