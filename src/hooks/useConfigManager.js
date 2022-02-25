import { useEffect, useState } from "react"

const LOCAL_STORAGE_KEY = "tt-todo";

/*
    type Config = {
        theme: "default" | "dark"
    }
*/

const useConfigManager = () => {
    const [currentConfig, setCurrentConfig] = useState(null) // type: Config | null

    const setMode = (newMode) => { // type: "default" | "dark"
        if (!(newMode in ["default", "dark"])) return;    // param makes no sense...
        setCurrentConfig({ ...currentConfig, theme: newMode });
    }

    const toggleMode = () => {
        const newMode = currentConfig.theme === "dark" ? "default" : "dark";
        setCurrentConfig({ ...currentConfig, theme: newMode });
    }

    useEffect(() => {
        let savedConfig;
        const savedConfigTxt = localStorage.getItem(LOCAL_STORAGE_KEY);

        // Try getting former stored config
        if (!savedConfigTxt) {
            // nope, not found, so we save a default config
            savedConfig = { theme: "dark" }
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedConfig));
        }
        else {
            savedConfig = JSON.parse(savedConfigTxt);
        }

        setCurrentConfig(savedConfig);
    }, []);

    // Called every time the config changes
    useEffect(() => {
        if (!currentConfig) return;  // Nothing to do

        if (currentConfig.theme === "dark") {
            // Add the css-class to the body tag, if we are in dark mode 
            document.body.classList.add("dark");
        }
        else {
            // Remove the dark mode css-class 
            document.body.classList.remove("dark");
        }

        // Store the new config
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentConfig));
    }, [currentConfig])

    return {
        currentConfig,
        setMode,
        toggleMode,
        isDarkMode: () => currentConfig.theme === "dark"
    }
}

export default useConfigManager;