import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetConfigQuery,
    useGetUnknownDatePublishedQuery,
} from "../../features/apis/baseApi";
import { CardPost } from "../card/card";

const UnknownPublished = ({ data }) => {
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
                <Swiper
                    slidesPerView={"auto"}
                    style={{ overflow: "visible" }}
                    spaceBetween={16}
                >
                    {dataMedia?.result.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <CardPost
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
        <div className="latest-series my-2">
            <div className="latest-series__content container">
                <h2 className="title-group">{data?.caption}</h2>
                {content}
            </div>
        </div>
    );
};

export default UnknownPublished;
