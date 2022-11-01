import { useLocation } from "react-router-dom";
import "./button.scss";

const Button = ({ children, eventF, dark, transparent, flex }) => {
    const { pathname } = useLocation();

    return (
        <button
            className={`btn${dark ? " dark" : ""}${
                transparent ? " transparent" : ""
            }${flex ? " flex" : ""}${pathname === "/kids" ? " kids" : ""}`}
            onClick={eventF}
        >
            {children}
        </button>
    );
};

export default Button;
