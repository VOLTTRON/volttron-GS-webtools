import React, { useState } from "react";

export const CurrentPageContext = React.createContext(null);

export default ({ children }) => {
    const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem("tcc-configuration-status"))["currentPage"]);

    const setPage = (page) => {
        let status = JSON.parse(localStorage.getItem("tcc-configuration-status"))
        status["currentPage"] = page
        localStorage.setItem("tcc-configuration-status", JSON.stringify(status))
        setCurrentPage(page)
    }

    const page = {
        currentPage: [currentPage, setPage]
    };

    return (
        <CurrentPageContext.Provider value={page}>
        {children}
        </CurrentPageContext.Provider>
    );
};