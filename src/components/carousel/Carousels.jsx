import { Swiper, SwiperSlide } from "swiper/react";
import { CardCasts, CardPost, CardBanner } from "../";

import "./carousel.scss";

const CarouselsPostCard = ({
    className,
    posts,
    config,
    data,
    castCard,
    banner,
}) => {
    const [isShowDes, setIsShowDes] = useState(false);

    return (
        <div
            className={`carousel my-2 ${className ? "top" : ""} ${
                banner ? "banner" : ""
            }`}
            id={data.type + "-" + data.key}
        >
            <div className="carousel__content container">
                <h2 className="title-group">{data.caption}</h2>
                <Swiper
                    slidesPerView={"auto"}
                    style={{ overflow: "visible" }}
                    spaceBetween={16}
                >
                    {posts?.result?.map((post) => {
                        return (
                            <SwiperSlide key={post.id}>
                                {castCard ? (
                                    <CardCasts
                                        data={post}
                                        base={config?.result?.staticBaseUrl}
                                    />
                                ) : banner ? (
                                    <CardBanner
                                        base={config?.result?.staticBaseUrl}
                                        data={post}
                                    />
                                ) : (
                                    <CardPost
                                        data={post}
                                        base={config?.result?.staticBaseUrl}
                                    />
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className="carousel-des"></div>
        </div>
    );
};

export default CarouselsPostCard;
