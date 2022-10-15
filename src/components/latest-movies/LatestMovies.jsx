import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetConfigQuery,
    useGetLatestMoviesQuery,
} from "../../features/apis/baseApi";
import { CardPost } from "../card/card";

const LatestMovies = ({ data }) => {
    const {
        data: movies,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetLatestMoviesQuery();

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
                    {movies?.result.map((item) => {
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
        <div className="most-popular my-2">
            <div className="most-popular__content container">
                <h2 className="title-group">{data?.caption}</h2>
                {content}
            </div>
        </div>
    );
};

export default LatestMovies;
