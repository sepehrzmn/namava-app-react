import {
    useGetConfigQuery,
    useGetLatestQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const Latest = ({ data, className }) => {
    const {
        data: latests,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetLatestQuery();
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
                    posts={latests}
                />
            </>
        );
    }

    return <div>{content}</div>;
};

export default Latest;
