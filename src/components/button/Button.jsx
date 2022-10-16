import "./button.scss";

const Button = ({ children, eventF, dark, transparent, flex }) => {
    return (
        <button
            className={`btn${dark ? " dark" : ""}${
                transparent ? " transparent" : ""
            }${flex ? " flex" : ""}`}
            onClick={eventF}
        >
            {children}
        </button>
    );
};

export default Button;
