import { useEffect, useState } from "react";
import fakeData from "../data.json";    // Just temporary dummy data

/**
 * Custom hook to manage our app data
 */
const useDataManager = () => {
    const [taskList, setTaskList] = useState([]); // The array of all fetched tasks - type: array of Task
    const [isLoading, setIsLoading] = useState(false); // Indicator, if data is currently loading
    const [loadingError, setLoadingError] = useState(null); // contains the error from data loading - type Error | null

    // Initial loading the data
    useEffect(() => {
        setIsLoading(true);

        try {
            // useEffect doesn't allow async so we wrap the async tasks
            // into a function and call the fuction later
            const loadDataFromApi = async () => {
                // Here will the data fetch magic happen
                setTaskList(fakeData);
            }

            loadDataFromApi(); // Execute the async function
        } catch (err) {
            // Handle the error case
            setTaskList([]);
            setLoadingError(err);
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
        }

    }, []);

    return {
        taskList,
        isLoading,
        loadingError
    }
}

export default useDataManager;