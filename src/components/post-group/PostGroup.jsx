import {
    useGetConfigQuery,
    useGetPostGroupQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

export const PostGroup = ({ data, className }) => {
    const {
        data: posts,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetPostGroupQuery(data.key);
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
                    posts={posts}
                    config={config}
                    data={data}
                />
            </>
        );
    }
    return <div>{content}</div>;
};

export default PostGroup;
