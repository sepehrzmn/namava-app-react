import { useParams } from "react-router-dom";
import Movie from "./Movie";
import Series from "./Series";

const SinglePageMedia = () => {
    const { type, id } = useParams();
    return type === "Series" ? (
        <Series id={id} />
    ) : type === "Movie" ? (
        <Movie id={id} />
    ) : (
        ""
    );
};

export default SinglePageMedia;
