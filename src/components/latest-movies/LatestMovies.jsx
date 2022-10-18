import { useLazyGetLatestMoviesQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const LatestMovies = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetLatestMoviesQuery}
        />
    );
};

export default LatestMovies;
