import CSS2 from './FilterPanel.module.css';
import { useAtom } from 'jotai';
import {
    selectedFilterIndexAtom,
    selectedTaskAtom,
    inEditModeAtom,
    theModalAtom,
} from '../../atoms/atoms';

const FilterPanelItem = ({ item, index }) => {
    const [isInEditMode] = useAtom(inEditModeAtom);
    const [theModal] = useAtom(theModalAtom);
    const [selectedFilterIndex, setSelectedFilterIndex] = useAtom(selectedFilterIndexAtom);
    const [, setSelectedTask] = useAtom(selectedTaskAtom);

    /**
     * Event handler for the selection of another filter item
     */
    const onFilterSelectionChanged = () => {
        if (isInEditMode) {
            theModal.current.showModal({
                title: 'Information',
                content: 'You are currently in edit mode. Please finish editing first.',
                textOK: 'OK',
                showCancel: false,
                showOK: true,
            });
        } else {
            setSelectedFilterIndex(index);
            setSelectedTask(null); // reset currently selected task
        }
    };

    return (
        <li
            className={`${selectedFilterIndex === index ? CSS2.selected : ''}`}
            onClick={onFilterSelectionChanged}
        >
            <span>{item.svg}</span>
            {item.text}
        </li>
    );
};

export default FilterPanelItem;
