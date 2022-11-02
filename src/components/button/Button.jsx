import { useContext } from "react";
import { KidsContext } from "../../contexts/kidsContext";
import "./button.scss";

const Button = ({ children, eventF, dark, transparent, flex }) => {
    const { isKids } = useContext(KidsContext);

    return (
        <button
            className={`btn${dark ? " dark" : ""}${
                transparent ? " transparent" : ""
            }${flex ? " flex" : ""}${isKids ? " kids" : ""}`}
            onClick={eventF}
        >
            {children}
        </button>
    );
};

export default Button;
