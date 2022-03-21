import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { taskIsOverdueHelper } from "../components/Task/Task.js"; // Should be moved somewhere else...

export const taskListAtom = atom([]);   // type: array of tasks
export const selectedTaskAtom = atom(null); // type: task | null
export const inEditModeAtom = atom(false); // type: boolean
export const theModalAtom = atom(); // type: (useRef) ref of the <Modal /> component

// atomWithStorage autsaves the values in localStorage an rehydrates them on app start
export const selectedFilterIndexAtom = atomWithStorage("tt.todo.selectedFilterIndex", -1); // type: number
export const currentThemeStoreAtom = atomWithStorage("tt.todo.theme", "default"); // type: "default" | "dark"
export const leftPanelVisibleAtom = atomWithStorage("tt.todo.panelLeft", true);   // type: boolean
export const rightPanelVisibleAtom = atomWithStorage("tt.todo.panelRight", true);   // type: boolean

/**
 * FILTERED TASKS
 * Here we define a dynamic read-only atom
 */
export const filteredTasksAtom = atom((get) => {
    const allTasks = get(taskListAtom);
    if (!allTasks) return []; // Just for safety ;)

    const filterIndex = get(selectedFilterIndexAtom);
    switch (filterIndex) {
        case 1:  // Only NOT finished todos
            return allTasks.filter(item => !item.finished);

        case 2:  // Overdue todos only
            return allTasks.filter(item => item.duedate && !item.finished && taskIsOverdueHelper(new Date(item.duedate)));

        case 3:  // Finished todos only
            return allTasks.filter(item => item.finished);

        default: // All tasks selected
            return allTasks;
    }
});

/**
 *  THEME HANDLER 
 */
const setMode = (newMode) => { // type "default" | "dark"
    if (newMode === "dark") {
        // Add the css-class to the body tag, if we are in dark mode 
        document.body.classList.add("dark");
    }
    else {
        // Remove the dark mode css-class 
        document.body.classList.remove("dark");
    }
}

export const currentThemeAtom = atom(
    (get) => get(currentThemeStoreAtom),
    (get, set, _arg) => {
        setMode(_arg);
        set(currentThemeStoreAtom, _arg);

    }
);

currentThemeAtom.onMount = (setAtom) => {
    const mode = currentThemeStoreAtom.read(get => get.init);
    setMode(mode);
}
