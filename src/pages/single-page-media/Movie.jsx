import React from "react";
import { useGetSingleMovieQuery } from "../../features/apis/baseApi";

const Movie = ({ id }) => {
    const { data, isSuccess } = useGetSingleMovieQuery(id);

    let content;
    if (isSuccess) {
        content = <div>{data.result.metaKeywords}</div>;
    }

    return <div className="movie-page">{content}</div>;
};

export default Movie;
