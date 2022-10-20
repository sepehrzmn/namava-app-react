import { useParams } from "react-router-dom";
import Movie from "./Movie";
import Series from "./Series";

const SinglePageMedia = () => {
    const { type, id, namePe } = useParams();
    return type === "Series" ? (
        <Series id={id} />
    ) : type === "Movie" ? (
        <Movie id={id} name={namePe} />
    ) : (
        ""
    );
};

export default SinglePageMedia;
