import {
    useGetConfigQuery,
    useGetLatestSeriesQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const LatestSeries = ({ data, className }) => {
    const {
        data: series,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetLatestSeriesQuery();
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                <CarouselsPostCard
                    className={className}
                    config={config}
                    data={data}
                    posts={series}
                />
            </>
        );
    }

    return <div>{content}</div>;
};

export default LatestSeries;
