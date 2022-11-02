import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const KidsContext = createContext();

const KidsContextProvider = ({ children }) => {
    const { pathname } = useLocation();

    const [isKids, setIsKids] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0 });

        window.location.pathname === "/kids" ||
        window.location.search.split("=")[1]
            ? setIsKids(true)
            : setIsKids(false);
    }, [pathname]);

    return (
        <KidsContext.Provider value={{ isKids }}>
            {children}
        </KidsContext.Provider>
    );
};

export default KidsContextProvider;
