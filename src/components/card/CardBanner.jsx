import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";

const CardBanner = ({ data, base }) => {
    const { pathname } = useLocation();

    const isKids = pathname === "/kids";

    return (
        <div
            className={`card banner ${pathname === "/kids" ? "kids" : ""}`}
            title={data.caption}
        >
            <Link
                to={`/collection-${data.referenceId}-${data.caption
                    .split(" ")
                    .join("_")}?${isKids ? "kids=true" : ""}`}
            >
                <div className={`card__poster`}>
                    <LazyLoadImage
                        src={`${base}/${data?.imageUrl}`}
                        alt={data?.caption}
                        effect="opacity"
                    />
                </div>

                <div className="card__title">{data.caption}</div>
            </Link>
        </div>
    );
};

export default CardBanner;
