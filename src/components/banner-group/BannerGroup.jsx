import {
    useGetBannerQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const BannerGroup = ({ data, className }) => {
    const {
        data: banners,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetBannerQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message}</div>;
    } else if (isSuccess) {
        content = (
            <>
                {banners.result.length ? (
                    <CarouselsPostCard
                        className={className}
                        config={config}
                        data={data}
                        posts={banners}
                        banner
                    />
                ) : (
                    ""
                )}
            </>
        );
    }
    return <div>{content}</div>;
};

export default BannerGroup;
