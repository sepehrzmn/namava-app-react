import { useRef } from "react";
import "./modal.scss";

const Modal = ({ id, active, children }) => {
    const modalRef = useRef(null);

    return (
        <div
            id={`modal_${id}`}
            className={`modal ${active ? " active" : ""}`}
            ref={modalRef}
        >
            <div className="modal-content">
                <div
                    onClick={() => {
                        modalRef.current.classList.remove("active");
                    }}
                    className="close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="#fff"
                    >
                        <path d="M16.4 14.85l-4.488-4.488L16.4 5.874a1.1 1.1 0 0 0 0-1.552 1.1 1.1 0 0 0-1.552 0L10.36 8.8 5.873 4.322a1.1 1.1 0 0 0-1.552 0 1.1 1.1 0 0 0 0 1.552l4.488 4.488L4.32 14.85a1.1 1.1 0 0 0 0 1.552 1.1 1.1 0 0 0 1.552 0l4.488-4.488 4.488 4.488a1.1 1.1 0 0 0 1.552 0 1.1 1.1 0 0 0 0-1.552z"></path>
                    </svg>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
