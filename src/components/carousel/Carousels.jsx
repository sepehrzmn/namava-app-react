import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { baseApiSlice } from "../../features/apis/baseApi";

import "./carousel.scss";

import { CardCasts, CardPost, CardBanner } from "../";
import ContentDes from "./ContentDes";
import { ResizeContext } from "../../contexts/ResizeContext";
import { KidsContext } from "../../contexts/kidsContext";

const CarouselsPostCard = ({ posts, config, data, castCard, banner }) => {
  const [isShowDes, setIsShowDes] = useState(false);
  const [content, setContent] = useState(null);
  const [trigger] = baseApiSlice.endpoints.getPlayInfo.useLazyQuery();
  const [backId, setBackId] = useState("");
  const { ResizeMd: resize, resizeLg } = useContext(ResizeContext);
  const { isKids } = useContext(KidsContext);

  const getDesTv = async (event, id) => {
    event.preventDefault();
    const { data: preview, isSuccess } = await trigger({ id });

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
  const loopContent = Array.isArray(posts)
    ? posts
    : posts?.result
    ? posts.result
    : Array.isArray(posts)
    ? posts
    : [];

  return (
    <div
      className={`carousel my-2 ${banner ? "banner" : ""} ${
        isKids ? "kids" : ""
      } `}
      id={data?.type + "-" + data?.key}
    >
      <div className="carousel__content container">
        <h2 className={`title-group ${isKids ? "kids" : ""}`}>
          {data?.caption}
        </h2>
        <Swiper
          slidesPerView={"auto"}
          style={{ overflow: "visible" }}
          spaceBetween={16}
        >
          {loopContent?.length
            ? loopContent?.map((post, index) => {
                return (
                  <SwiperSlide key={index}>
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
            isShowDes &&
            content?.result &&
            config?.result?.staticBaseUrl
              ? `linear-gradient(to ${
                  resize ? "right" : " bottom"
                },transparent  , ${isKids ? "#ffff" : "#1a1a1a"} ${
                  resizeLg ? "74vw" : "100vw"
                }), url(${config?.result?.staticBaseUrl}${
                  resize
                    ? content?.result?.coverLandscape
                    : content?.result?.coverPortrait
                })`
              : "",
        }}
      >
        <div className="carousel-des__content container">
          <ContentDes data={content} isKids={isKids} />
        </div>
      </div>
    </div>
  );
};

export default CarouselsPostCard;
