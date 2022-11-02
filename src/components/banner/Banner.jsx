import { useContext } from "react";

import { ListHorizontal, Button, BadgeInfo } from "../";
import { ResizeContext } from "../../contexts/ResizeContext";

import "./banner.scss";

const Banner = ({ dataContent, name, base, isKids }) => {
    const { ResizeMd: resize } = useContext(ResizeContext);
    return (
        <div
            className={`banner-single  ${isKids ? "kids" : ""}`}
            style={{
                backgroundImage: `linear-gradient(rgba( ${
                    isKids ? "200,200,200" : "18, 18, 18"
                } , 0) 10vw, rgb( ${
                    isKids ? "200,200,200" : "18, 18, 18"
                }) 100vw), linear-gradient(to left, rgba( ${
                    isKids ? "200,200,200" : "18, 18, 18"
                }, 0.7), rgba(1${
                    isKids ? "200,200,200" : "18, 18, 18"
                }, 0) 50%), url(${base}${
                    resize
                        ? dataContent?.coverLandscape
                        : dataContent?.coverPortrait
                })`,
            }}
        >
            <div className={`container banner-single__content `}>
                <div className="logo-media">
                    <img
                        src={`${base}${dataContent?.logoImageUrl}`}
                        alt={dataContent?.movieLatinName}
                    />
                </div>

                <h2>{name}</h2>

                <BadgeInfo dataContent={dataContent} />

                <p>{dataContent?.story}</p>

                <Button>ورود و پخش</Button>

                <ListHorizontal
                    dataContent={dataContent?.casts.slice(0, 5)}
                    title="ستارگان"
                    itemName="castName"
                />
            </div>
        </div>
    );
};

export default Banner;
