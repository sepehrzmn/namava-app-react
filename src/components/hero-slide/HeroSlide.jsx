import { Link } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";

import {
    useGetConfigQuery,
    useGetSliderQuery,
} from "../../features/apis/baseApi";
import { Button, Modal } from "../";

import "./hero-slider.scss";
import { useContext } from "react";
import { ResizeContext } from "../../contexts/ResizeContext";
import { KidsContext } from "../../contexts/kidsContext";

const HeroSlide = ({ data }) => {
    const {
        data: slides = [],
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetSliderQuery({ id: data.key });
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className="hero-slider"></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                <div className="hero-slider">
                    <Swiper
                        modules={[EffectFade, Pagination, Autoplay]}
                        effect="fade"
                        pagination
                        allowTouchMove={false}
                        autoplay={{ delay: 1500 }}
                    >
                        {slides.succeeded && slides?.result?.length
                            ? slides.result.map((slide) => (
                                  <SwiperSlide key={slide.id}>
                                      {({ isActive }) => (
                                          <Item
                                              data={slide}
                                              baseUrl={
                                                  config?.result?.staticBaseUrl
                                              }
                                              isActive={isActive}
                                          />
                                      )}
                                  </SwiperSlide>
                              ))
                            : ""}
                        <div className="btn-swiper-box">
                            <Prev />
                            <Next />
                        </div>
                    </Swiper>
                </div>
                {slides.succeeded && slides?.result?.length
                    ? slides?.result
                          ?.filter((slide) => slide?.trailerVideoUrl)
                          .map((video) => (
                              <Modal key={video.id} id={video.id}>
                                  <video
                                      width="100%"
                                      height="100%"
                                      controls
                                      poster={`${config?.result?.staticBaseUrl}/${video?.trailerImageUrl}`}
                                  >
                                      <source
                                          src={`${config?.result?.staticBaseUrl}/${video?.trailerVideoUrl}`}
                                          type="video/mp4"
                                      />
                                  </video>
                              </Modal>
                          ))
                    : ""}
            </>
        );
    }

    return <>{content}</>;
};

const Item = ({ data, baseUrl, isActive }) => {
    const showTrailer = () => {
        const modal = document.getElementById(`modal_${data.id}`);
        modal.classList.add("active");
    };
    const { ResizeMd: resize } = useContext(ResizeContext);
    const { isKids } = useContext(KidsContext);

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 135vw), url("${baseUrl}/${
                    resize ? data?.coverLandscape : data?.coverPortrait
                }")`,
            }}
            className={`item${isActive ? " active" : ""}`}
        >
            <div className="container item__content">
                <Link
                    to={`/${data.type}/${data.id}-${data.caption}`}
                    className="logo-media"
                >
                    <img
                        src={`${baseUrl}/${data.logoImageUrl}`}
                        alt={`logo ${data.type} by id ${data.id}`}
                    />
                </Link>
                <h2>{data.caption}</h2>
                <div className="btns">
                    <Link
                        to={`/${data.type}/${
                            data?.id ?? data?.mediaId ?? ""
                        }-${data.caption.split(" ").join("_")}? ${
                            isKids ? "kids=true" : ""
                        } `}
                    >
                        <Button>
                            {data.type !== "Series" ? "ورود و پخش" : "قسمت ها"}
                        </Button>
                    </Link>
                    {data?.trailerVideoUrl && (
                        <Button dark eventF={showTrailer}>
                            پیش نمایش
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const Next = () => {
    const swiper = useSwiper();
    return (
        <button
            onClick={() => {
                swiper.slideNext();
            }}
            className="btn-swiper"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60px"
                height="60px"
                viewBox="0 0 60 60"
                fill="#fff"
                className="left"
            >
                <circle cx="30" cy="30" r="30" opacity=".2"></circle>
                <path
                    d="M27.1 20.5c-.7-.7-1.9-.7-2.6 0s-.7 1.9 0 2.6l7.1 7.1-7.1 7.1c-.7.7-.7 1.9 0 2.6.4.4.8.5 1.3.5s.9-.2 1.3-.5l8.4-8.4c.3-.3.5-.8.5-1.3s-.2-.9-.5-1.3l-8.4-8.4z"
                    opacity=".4"
                ></path>
            </svg>
        </button>
    );
};

const Prev = () => {
    const swiper = useSwiper();

    return (
        <button
            onClick={() => {
                swiper.slidePrev();
            }}
            className="btn-swiper"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60px"
                height="60px"
                viewBox="0 0 60 60"
                fill="#fff"
            >
                <circle cx="30" cy="30" r="30" opacity=".2"></circle>
                <path
                    d="M27.1 20.5c-.7-.7-1.9-.7-2.6 0s-.7 1.9 0 2.6l7.1 7.1-7.1 7.1c-.7.7-.7 1.9 0 2.6.4.4.8.5 1.3.5s.9-.2 1.3-.5l8.4-8.4c.3-.3.5-.8.5-1.3s-.2-.9-.5-1.3l-8.4-8.4z"
                    opacity=".4"
                ></path>
            </svg>
        </button>
    );
};

export default HeroSlide;
