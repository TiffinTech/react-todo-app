import { useEffect, useState } from "react";
// import fakeData from "../data.json";    // Just temporary dummy data

const API_BASE_URL = "http://localhost:4000/api";

/**
 * Custom hook to manage our app data
 */
const useDataManager = () => {
    const [taskList, setTaskList] = useState([]); // The array of all fetched tasks - type: array of Task
    const [isLoading, setIsLoading] = useState(false); // Indicator, if data is currently loading
    const [loadingError, setLoadingError] = useState(null); // contains the error from data loading - type Error | null

    // Initial loading of the data from the database
    useEffect(() => {
        setIsLoading(true);

        try {
            // useEffect doesn't allow async so we wrap the async tasks
            // into a function and call the fuction later
            const loadDataFromApi = async () => {
                // Here will the data fetch magic happen
                const res = await fetch(API_BASE_URL + "/todos");

                // fetch doesn't throw an error, if it could connect but got an api error
                if (res.status !== 200) {    // status 200 = OK
                    throw new Error(res.statusText);
                }

                const data = await res.json();
                setTaskList(data);  // Store all records from the database in our state variable
            }

            loadDataFromApi(); // Execute the async function
            setLoadingError(null); // remove potential previous error
        } catch (err) {
            // Handle the error case
            setTaskList([]);    // There's no data so we set an empty array
            setLoadingError(err);   // Set the error object to inform the app 
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
        }
    }, []);

    /**
     * Adds a new task object to the database
     * @param {*} The task object to add 
     */
    const addTask = async ({ event, finished = false }) => {
        setIsLoading(true); // Tell the app, we are fetching data

        // Prepare the final new record
        const newRecord = {
            event,
            finished
        };

        try {
            // Adding a record via the REST POST method
            const res = await fetch(API_BASE_URL + "/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecord)
            });

            // fetch doesn't throw an error, if it could connect but got an api error
            if (res.status !== 201) {    // status 201 = OK
                throw new Error(res.statusText);
            }

            // We get the stored record including the generated id
            const data = await res.json();

            setTaskList([...taskList, data]); // append the new record to our task list
            setLoadingError(null); // remove potential previous error
        } catch (err) {
            // Handle the error case
            setLoadingError(err);   // set the error object to inform the app
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
        }
    };

    /**
     * Updates an existing task in the database
     * @param {*} The task object to be updated 
     */
    const updateTask = async ({ id, event, finished }) => {
        setIsLoading(true);

        // Prepare the record for updating
        const record = {
            id,
            event,
            finished
        };

        try {
            // Updating the record via the REST PUT method
            const res = await fetch(API_BASE_URL + "/todos/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(record)
            });

            // fetch doesn't throw an error, if it could connect but got an api error
            if (res.status !== 200) {    // status 200 = OK
                throw new Error(res.statusText);
            }

            // We get back the updated record
            const updatedRecord = await res.json();

            // Let's update the returned updated record in our state variable
            const updatedTaskList = taskList.map(item => item.id === id ? updatedRecord : item);
            setTaskList(updatedTaskList);

            setLoadingError(null); // remove potential previous error
        } catch (err) {
            // Handle the error case
            setLoadingError(err);
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
        }
    };

    /**
     * Deletes an record from the database
     * @param {*} The record object to be deleted 
     */
    const deleteTask = async ({ id }) => {
        setIsLoading(true);

        try {
            // Delete a record via the REST DELETE method
            const res = await fetch(API_BASE_URL + "/todos/" + id, {
                method: "DELETE"
            });

            // fetch doesn't throw an error, if it could connect but got an api error
            if (res.status !== 200) {    // status 200 = OK
                throw new Error(res.statusText);
            }

            // If we are here, the delete action succeeded,
            // let's update our state variable
            const updatedTaskList = taskList.filter(item => item.id !== id);
            setTaskList(updatedTaskList);

            setLoadingError(null); // remove potential previous error
        } catch (err) {
            // Handle the error case
            setLoadingError(err);
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
        }
    };

    /**
     * Loads a random activity/todo from an external API
     * Have a look at https://www.youtube.com/watch?v=7gapLT_2Uf8  :)
     * @returns A string with a random todo
     */
    const getBoredAPIActivity = async () => {
        setIsLoading(true);
        let activity = "";

        try {
            // Let's connect to the boredapi server
            const res = await fetch("https://www.boredapi.com/api/activity");

            // fetch doesn't throw an error, if it could connect but got an api error
            if (res.status !== 200) {    // status 200 = OK
                throw new Error(res.statusText);
            }

            const data = await res.json();
            activity = data.activity || "";

            setLoadingError(null);
        } catch (err) {
            // Handle the error case
            setLoadingError(err);
        } finally {
            // Either successfull or with error, now we are done loading data :)
            setIsLoading(false);
            return activity;
        }
    }

    // Here we prepare the object with all 
    // data and functions for our custom hook
    return {
        taskList,
        isLoading,
        loadingError,
        getBoredAPIActivity,
        addTask,
        updateTask,
        deleteTask
    }
}

export default useDataManager;