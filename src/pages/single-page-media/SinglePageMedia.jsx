import { Navigate, useParams } from "react-router-dom";
import { useGetConfigQuery } from "../../features/apis/baseApi";
import Movie from "./Movie";
import Series from "./Series";

const SinglePageMedia = () => {
    const { data: config } = useGetConfigQuery();

    const { type, id, namePe } = useParams();
    return type === "Series" ? (
        <Series id={id} name={namePe} config={config} />
    ) : type === "Movie" || type === "PurchasableMovie" ? (
        <Movie id={id} name={namePe} config={config} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default SinglePageMedia;
