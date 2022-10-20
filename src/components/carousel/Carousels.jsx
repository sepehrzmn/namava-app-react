import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { baseApiSlice } from "../../features/apis/baseApi";

import "./carousel.scss";

import { CardCasts, CardPost, CardBanner } from "../";
import ContentDes from "./ContentDes";

const CarouselsPostCard = ({
    className,
    posts,
    config,
    data,
    castCard,
    banner,
}) => {
    const [isShowDes, setIsShowDes] = useState(false);
    const [content, setContent] = useState(null);
    const [trigger] = baseApiSlice.endpoints.getPlayInfo.useLazyQuery();
    const [backId, setBackId] = useState("");

    const getDesTv = async (event, id) => {
        event.preventDefault();
        const { data: preview, isSuccess } = await trigger(id);

        if (isSuccess) {
            setIsShowDes(() => {
                if (id === backId) {
                    return !isShowDes;
                }
                return true;
            });
            setContent(preview);

            setBackId(id);
        }
    };

    const loopContent = posts?.result
        ? posts.result
        : Array.isArray(posts)
        ? posts
        : [];

    return (
        <>
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
                        {loopContent.length
                            ? loopContent?.map((post, index) => {
                                  return (
                                      <SwiperSlide key={index}>
                                          {castCard ? (
                                              <CardCasts
                                                  data={post}
                                                  base={
                                                      config?.result
                                                          ?.staticBaseUrl
                                                  }
                                              />
                                          ) : banner ? (
                                              <CardBanner
                                                  base={
                                                      config?.result
                                                          ?.staticBaseUrl
                                                  }
                                                  data={post}
                                              />
                                          ) : (
                                              <CardPost
                                                  data={post}
                                                  base={
                                                      config?.result
                                                          ?.staticBaseUrl
                                                  }
                                                  onClick={getDesTv}
                                              />
                                          )}
                                      </SwiperSlide>
                                  );
                              })
                            : ""}
                    </Swiper>
                </div>
                <div
                    className={`carousel-des ${isShowDes ? "active" : ""}`}
                    style={{
                        backgroundImage:
                            content &&
                            content?.result &&
                            config?.result?.staticBaseUrl
                                ? `linear-gradient(to right,transparent , #1a1a1a), url(${config?.result?.staticBaseUrl}${content?.result?.coverLandscape})`
                                : "",
                    }}
                >
                    <div className="carousel-des__content container">
                        <ContentDes data={content} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarouselsPostCard;
