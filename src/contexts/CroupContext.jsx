import { createContext, useState } from "react";

export const GroupContext = createContext();

const CroupContextProvider = ({ children }) => {
    const [group, setGroup] = useState({ text: "", status: false });

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    );
};

export default CroupContextProvider;
