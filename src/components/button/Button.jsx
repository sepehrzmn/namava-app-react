import "./button.scss";

const Button = ({ children, eventF, dark }) => {
    return (
        <button className={`btn${dark ? " dark" : ""}`} onClick={eventF}>
            {children}
        </button>
    );
};

export default Button;
