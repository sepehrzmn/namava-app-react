import { Swiper, SwiperSlide } from "swiper/react";

import {
    useGetCastsQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";

import { CardCasts } from "../";

import "./star-group.scss";

const StarGroup = ({ data }) => {
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
                <Swiper
                    slidesPerView={"auto"}
                    style={{ overflow: "visible" }}
                    spaceBetween={16}
                >
                    {castes?.result.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <CardCasts
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
        <div>
            <div className="star-group my-2">
                <div className="star-group__content container">
                    <h2 className="title-group">{data?.caption}</h2>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default StarGroup;
