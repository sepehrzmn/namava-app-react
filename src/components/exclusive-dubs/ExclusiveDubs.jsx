import {
    useGetConfigQuery,
    useGetExclusiveDubsQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

export const ExclusiveDubs = ({ data, className }) => {
    const {
        data: Dubs,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetExclusiveDubsQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {Dubs.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={Dubs}
                    />
                ) : (
                    ""
                )}
            </>
        );
    }

    return <div>{content}</div>;
};

export default ExclusiveDubs;
