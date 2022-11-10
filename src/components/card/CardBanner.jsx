import { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { KidsContext } from "../../contexts/kidsContext";

const CardBanner = ({ data, base, loading }) => {
    const { isKids } = useContext(KidsContext);

    if (loading) {
        return <div className="card-loading" />;
    }

    return (
        <div
            className={`card banner ${isKids ? "kids" : ""}`}
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
