import {
    useGetConfigQuery,
    useGetUnknownDatePublishedQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const UnknownPublished = ({ data, className }) => {
    const {
        data: dataMedia,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetUnknownDatePublishedQuery(data.key);
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
                    posts={dataMedia}
                />
            </>
        );
    }

    return <div>{content}</div>;
};

export default UnknownPublished;
