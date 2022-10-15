import {
    useGetConfigQuery,
    useGetMostPopularQuery,
} from "../../features/apis/baseApi";
import { CarouselsPostCard } from "../";

const MostPopular = ({ data, className }) => {
    const {
        data: popular,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetMostPopularQuery();

    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {popular.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={popular}
                    />
                ) : (
                    ""
                )}
            </>
        );
    }

    return <div>{content}</div>;
};

export default MostPopular;
