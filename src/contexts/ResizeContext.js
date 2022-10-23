import { createContext, useEffect, useState } from "react";

export const ResizeContext = createContext({});

export function ResizeProvider({ children }) {
    const [resize, setResize] = useState(() => {
        if (window.innerWidth < 700) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(() => {
        const setBackground = () => {
            if (window.innerWidth < 700) {
                setResize(false);
            } else {
                setResize(true);
            }
        };

        window.addEventListener("resize", setBackground);
        return () => {
            window.removeEventListener("resize", setBackground);
        };
    }, []);

    return (
        <ResizeContext.Provider value={resize}>
            {children}
        </ResizeContext.Provider>
    );
}
