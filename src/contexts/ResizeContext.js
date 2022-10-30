import { createContext, useEffect, useState } from "react";

export const ResizeContext = createContext({});

export function ResizeProvider({ children }) {
    const [resize, setResize] = useState(() => {
        if (window.innerWidth < 500) {
            return false;
        } else {
            return true;
        }
    });
    const [resizeLg, setResizeLg] = useState(() => {
        if (window.innerWidth < 1000) {
            return false;
        } else {
            return true;
        }
    });

    const [ResizeMd, setResizeMd] = useState(() => {
        if (window.innerWidth < 700) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(() => {
        const setBackground = () => {
            if (window.innerWidth < 500) {
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

    useEffect(() => {
        const setBackground = () => {
            if (window.innerWidth < 1000) {
                setResizeLg(false);
            } else {
                setResizeLg(true);
            }
        };

        window.addEventListener("resize", setBackground);
        return () => {
            window.removeEventListener("resize", setBackground);
        };
    }, []);

    useEffect(() => {
        const setBackground = () => {
            if (window.innerWidth < 700) {
                setResizeMd(false);
            } else {
                setResizeMd(true);
            }
        };

        window.addEventListener("resize", setBackground);
        return () => {
            window.removeEventListener("resize", setBackground);
        };
    }, []);

    return (
        <ResizeContext.Provider value={{ resize, resizeLg, ResizeMd }}>
            {children}
        </ResizeContext.Provider>
    );
}
