/**
 *
 * @param {*} item the todo item to render
 * @param {*} index the current item's index
 * @param {*} selected the currently selected menu item
 * @param {*} onChange event handler for menu selection
 * @returns JSX-Content for a single menu panel item
 */
const FilterPanelItem = ({ item, index, selected, onChange }) => {
    return (
        <li
            className={`${selected === index ? 'selected' : ''}`}
            onClick={() => onChange(index)}
        >
            <span>{item.svg}</span>
            {item.text}
        </li>
    );
};

export default FilterPanelItem;
