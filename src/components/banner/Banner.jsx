import React, { useEffect, useState } from "react";

import { ListHorizontal, Button, BadgeInfo } from "../";

import "./banner.scss";

const Banner = ({ dataContent, name, base }) => {
    const [resize, setResize] = useState(() => {
        if (window.innerWidth < 600) {
            return false;
        } else {
            return true;
        }
    });

    useEffect(() => {
        const setBackground = () => {
            if (window.innerWidth < 600) {
                setResize(false);
            } else {
                setResize(true);
            }
        };

        window.addEventListener("resize", setBackground);
        return () => {
            window.removeEventListener("resize", setBackground);
        };
    }, []);

    return (
        <div
            className="banner-single"
            style={{
                backgroundImage: `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 100vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url(${base}${
                    resize
                        ? dataContent?.coverLandscape
                        : dataContent?.coverPortrait
                })`,
            }}
        >
            <div className="container banner-single__content">
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
