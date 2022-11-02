import { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { KidsContext } from "../../contexts/kidsContext";

const CardCasts = ({ data, base }) => {
    const { isKids } = useContext(KidsContext);

    return (
        <div
            className={`card cast ${isKids ? "kids" : ""}`}
            title={data.castName}
        >
            <Link
                to={`/person-${data.castId}-${data.castName
                    .split(" ")
                    .join("_")}`}
            >
                <div className={`card__poster`}>
                    {Boolean(data?.imageUrl) || Boolean(data?.castImageUrl) ? (
                        <LazyLoadImage
                            src={`${base}/${
                                data?.imageUrl ?? data?.castImageUrl
                            }?anchor=middlecenter&crop=auto&scale=both&w=140&h=140`}
                            alt={data?.caption}
                            effect="opacity"
                        />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="147"
                            height="147"
                            viewBox="0 0 147 147"
                        >
                            <g
                                id="Group_1983"
                                data-name="Group 1983"
                                transform="translate(-278 -2313)"
                            >
                                <path
                                    id="Subtraction_2"
                                    data-name="Subtraction 2"
                                    d="M1899.5,6045a73.154,73.154,0,0,1-41.095-12.553,73.719,73.719,0,0,1-26.63-32.338,73.4,73.4,0,0,1,6.777-69.7,73.716,73.716,0,0,1,32.338-26.63,73.4,73.4,0,0,1,69.7,6.777,73.718,73.718,0,0,1,26.63,32.338,73.4,73.4,0,0,1-6.777,69.7,73.717,73.717,0,0,1-32.338,26.63A73.043,73.043,0,0,1,1899.5,6045Zm-.261-38.587a7.552,7.552,0,0,1,3.477.854l22.655,11.85a7.5,7.5,0,0,0,3.482.869,7.623,7.623,0,0,0,5.756-2.7,7.253,7.253,0,0,0,1.6-6l-4.324-25.094a7.394,7.394,0,0,1,2.145-6.575l18.331-17.774a7.321,7.321,0,0,0,1.9-7.6,7.372,7.372,0,0,0-6.036-5.074l-25.333-3.664a7.454,7.454,0,0,1-5.624-4.063l-11.327-22.831a7.426,7.426,0,0,0-2.867-3.107,7.617,7.617,0,0,0-7.674,0,7.428,7.428,0,0,0-2.867,3.107l-11.328,22.831a7.452,7.452,0,0,1-5.622,4.063l-25.334,3.664a7.4,7.4,0,0,0-4.139,12.677l18.33,17.774a7.4,7.4,0,0,1,2.147,6.575l-4.325,25.094a7.252,7.252,0,0,0,1.605,6,7.624,7.624,0,0,0,5.756,2.7,7.509,7.509,0,0,0,3.483-.869l22.655-11.85A7.543,7.543,0,0,1,1899.24,6006.413Z"
                                    transform="translate(-1548 -3585)"
                                    fill="#343434"
                                />
                                <g
                                    id="ic_menu_profile2"
                                    transform="translate(329.881 2363.892)"
                                >
                                    <rect
                                        id="Rectangle_369"
                                        data-name="Rectangle 369"
                                        width="14.809"
                                        height="14.809"
                                        transform="translate(13.772 15.294)"
                                        fill="none"
                                    />
                                    <g
                                        id="Group_1233"
                                        data-name="Group 1233"
                                        transform="translate(0 0)"
                                    >
                                        <path
                                            id="Path_4801"
                                            data-name="Path 4801"
                                            d="M286.983,1394.344a24.679,24.679,0,0,0,19.836-9.99,6.469,6.469,0,0,0,1-6.029,13.955,13.955,0,0,0-8.283-8.183,4,4,0,0,0-3.673.365,15.407,15.407,0,0,1-17.768,0,3.984,3.984,0,0,0-3.645-.373,13.95,13.95,0,0,0-8.283,8.115,6.467,6.467,0,0,0,1.086,6.147A25.3,25.3,0,0,0,286.983,1394.344Z"
                                            transform="translate(-265.818 -1348.947)"
                                            fill="#343434"
                                        />
                                        <ellipse
                                            id="Ellipse_109"
                                            data-name="Ellipse 109"
                                            cx="10.591"
                                            cy="10.591"
                                            rx="10.591"
                                            ry="10.591"
                                            transform="translate(10.575)"
                                            fill="#343434"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    )}
                </div>

                <div className="card__title">{data.castName}</div>
            </Link>
        </div>
    );
};

export default CardCasts;
