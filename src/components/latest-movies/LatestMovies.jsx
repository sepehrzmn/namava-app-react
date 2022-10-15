import {
    useGetConfigQuery,
    useGetLatestMoviesQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const LatestMovies = ({ data, className }) => {
    const {
        data: movies,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetLatestMoviesQuery();

    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {movies.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={movies}
                    />
                ) : (
                    ""
                )}
            </>
        );
    }

    return <div>{content}</div>;
};

export default LatestMovies;
