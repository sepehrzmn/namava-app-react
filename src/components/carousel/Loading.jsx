import React from "react";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { KidsContext } from "../../contexts/kidsContext";
import { CardPost } from "../card/card";
import CardBanner from "../card/CardBanner";
import CardCasts from "../card/CardCasts";

const Loading = ({ data, banner, castCard }) => {
    const { isKids } = useContext(KidsContext);

    const loopContent = Array(20).fill("");

    return (
        <div className="carousel">
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
                        ? loopContent?.map((_, index) => {
                              return (
                                  <SwiperSlide key={index}>
                                      {castCard ? (
                                          <CardCasts loading />
                                      ) : banner ? (
                                          <CardBanner loading />
                                      ) : (
                                          <CardPost loading />
                                      )}
                                  </SwiperSlide>
                              );
                          })
                        : ""}
                </Swiper>
            </div>
        </div>
    );
};

export default Loading;
