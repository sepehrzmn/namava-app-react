import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetBannerQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";
import { CardBanner } from "../card/card";

import "./banner-group.scss";

const BannerGroup = ({ data }) => {
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
                <Swiper
                    slidesPerView={"auto"}
                    style={{ overflow: "visible" }}
                    spaceBetween={16}
                >
                    {banners?.result.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <CardBanner
                                    data={item}
                                    base={config?.result?.staticBaseUrl}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </>
        );
    }
    return (
        <>
            <div className="banner-group my-2">
                <div className="banner-group__content container">
                    <h2 className="title-group">{data?.caption}</h2>
                    {content}
                </div>
            </div>
        </>
    );
};

export default BannerGroup;
