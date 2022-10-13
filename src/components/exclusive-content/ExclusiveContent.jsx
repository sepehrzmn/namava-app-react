import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetConfigQuery,
    useGetExclusiveContentQuery,
} from "../../features/apis/baseApi";
import { CardPost } from "../card/card";

import "./exclusive-content.scss";

const ExclusiveContent = ({ data }) => {
    const {
        data: latests,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetExclusiveContentQuery(data.key);
    const { data: config } = useGetConfigQuery();
    console.log(data);
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
                    {latests?.result.map((item) => {
                        return (
                            <SwiperSlide>
                                <CardPost
                                    key={item.id}
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
        <div className="exclusive-content-group">
            <div className="exclusive-content-group__content container">
                <h2 className="title-group">{data.caption}</h2>
                {content}
            </div>
        </div>
    );
};

export default ExclusiveContent;
