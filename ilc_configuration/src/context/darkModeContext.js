import React, { useState } from "react";
import { clone } from '../utils/clone'
import { statusTemplate } from '../constants/status'

export const darkModeContext = React.createContext(null);

export default ({ children }) => {
    let status = JSON.parse(localStorage.getItem("ilc-configuration-status"))
    if (!status){
        status = clone(statusTemplate)
    }
    const [darkMode, setDarkMode] = useState(status["darkMode"]);

    const setMode = darkMode => {
        status["darkMode"] = darkMode
        if (darkMode) {
            document.body.style.backgroundColor = "#303030";
        } else {
            document.body.style.backgroundColor = "#FFFFFF";
        }
        setDarkMode(darkMode)
        localStorage.setItem("ilc-configuration-status", JSON.stringify(status))
    }

    const mode = {
        darkMode: darkMode,
        setDarkMode: setMode
    };

    return (
        <darkModeContext.Provider value={mode}>
        {children}
        </darkModeContext.Provider>
    );
};