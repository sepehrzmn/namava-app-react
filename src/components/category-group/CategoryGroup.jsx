import {
    useGetCategoryQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";
import { CarouselsPostCard } from "../";

const CategoryGroup = ({ data, className }) => {
    const {
        data: posts,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetCategoryQuery(data.key);
    const { data: config } = useGetConfigQuery();
    console.log(data);
    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {posts.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={posts}
                    />
                ) : (
                    ""
                )}
            </>
        );
    }
    return <div>{content}</div>;
};

export default CategoryGroup;
