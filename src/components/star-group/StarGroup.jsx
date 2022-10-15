import {
    useGetCastsQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const StarGroup = ({ data, className }) => {
    const {
        data: castes,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetCastsQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {castes.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={castes}
                        castCard
                    />
                ) : (
                    ""
                )}
            </>
        );
    }
    return <div>{content}</div>;
};

export default StarGroup;
