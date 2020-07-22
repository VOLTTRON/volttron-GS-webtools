import React, { useState } from "react";
import { clone } from '../utils/clone'
import { statusTemplate } from '../constants/status'

export const CurrentPageContext = React.createContext(null);

export default ({ children }) => {
    let status = JSON.parse(localStorage.getItem("ilc-configuration-status"))
    if (!status){
        status = clone(statusTemplate)
    }
    const [currentPage, setCurrentPage] = useState(status["currentPage"]);

    const setPage = (page) => {
        status["currentPage"] = page
        localStorage.setItem("ilc-configuration-status", JSON.stringify(status))
        setCurrentPage(page)
    }

    const page = {
        currentPage: currentPage,
        setPage: setPage
    };

    return (
        <CurrentPageContext.Provider value={page}>
        {children}
        </CurrentPageContext.Provider>
    );
};