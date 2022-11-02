import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { KidsContext } from "../../contexts/kidsContext";
import { useGetConfigQuery } from "../../features/apis/baseApi";
import Movie from "./Movie";
import Series from "./Series";

const SinglePageMedia = () => {
    const { data: config } = useGetConfigQuery();
    const { type, id, namePe } = useParams();
    const { isKids } = useContext(KidsContext);

    const params = { id, name: namePe, config, isKids };

    return type === "Series" ? (
        <Series {...params} />
    ) : type === "Movie" || type === "PurchasableMovie" ? (
        <Movie {...params} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default SinglePageMedia;
