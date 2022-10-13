import { SwiperSlide, Swiper } from "swiper/react";

import {
    useGetConfigQuery,
    useGetExclusiveDubsQuery,
} from "../../features/apis/baseApi";
import { CardPost } from "../card/card";

import "./exclusiveDubs.scss";

export const ExclusiveDubs = ({ data }) => {
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
                <Swiper
                    slidesPerView={"auto"}
                    style={{ overflow: "visible" }}
                    spaceBetween={16}
                >
                    {Dubs?.result.map((item) => {
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
        <div className="exclusive-dubs-group">
            <div className="exclusive-dubs-group__content container">
                <h2 className="title-group">{data.caption}</h2>
                {content}
            </div>
        </div>
    );
};

export default ExclusiveDubs;
