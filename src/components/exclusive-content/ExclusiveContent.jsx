import {
    useGetConfigQuery,
    useGetExclusiveContentQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const ExclusiveContent = ({ data, className }) => {
    const {
        data: latests,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetExclusiveContentQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message}</div>;
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

export default ExclusiveContent;
