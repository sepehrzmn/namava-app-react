import { Swiper, SwiperSlide } from "swiper/react";
import { CardPost } from "../card/card";

const CarouselsPostCard = ({ className, posts, config, data }) => {
    return (
        <div className={`post-group my-2 ${className ? "top" : ""}`}>
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
};

export default CarouselsPostCard;
