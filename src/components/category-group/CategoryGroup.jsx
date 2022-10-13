import { Swiper, SwiperSlide } from "swiper/react";
import {
    useGetCategoryQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";
import { CardPost } from "../card/card";

const CategoryGroup = ({ data }) => {
    const {
        data: posts,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetCategoryQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <div className="post-group my-2">
                <div className="post-group__content container">
                    <h2 className="title-group">{data.caption}</h2>
                    <Swiper
                        slidesPerView={"auto"}
                        style={{ overflow: "visible" }}
                        spaceBetween={16}
                    >
                        {posts?.result?.map((post) => {
                            return (
                                <SwiperSlide key={post.id}>
                                    <CardPost
                                        data={post}
                                        base={config?.result?.staticBaseUrl}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        );
    }
    return <div>{content}</div>;
};

export default CategoryGroup;
