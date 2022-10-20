import React, { Fragment, useEffect, useState } from "react";
import BadgeInfo from "../../components/badge-info/BadgeInfo";
import {
    useGetConfigQuery,
    useGetSingleMovieQuery,
} from "../../features/apis/baseApi";

import { Button, CarouselsPostCard } from "../../components";

import "./single-media.scss";
import ListHorizontal from "../../components/list-horizontal/ListHorizontal";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Movie = ({ id, name }) => {
    const { data, isSuccess } = useGetSingleMovieQuery(id);
    const { data: config } = useGetConfigQuery();
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

    let content;
    if (isSuccess) {
        const dataContent = data?.result ?? undefined;
        const base = config?.result?.staticBaseUrl ?? "";

        content = dataContent && (
            <>
                <div
                    className="banner"
                    style={{
                        backgroundImage: `linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 100vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), url(${base}${
                            resize
                                ? dataContent?.coverLandscape
                                : dataContent?.coverPortrait
                        })`,
                    }}
                >
                    <div className="container banner__content">
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
                <div className="gallery container">
                    {dataContent?.slideImageList.map((slideImage) => {
                        return (
                            <Fragment key={slideImage?.url}>
                                <LazyLoadImage
                                    src={`${base}${slideImage?.url}?anchor=middlecenter&crop=auto&scale=both&w=200&h=150`}
                                    alt={slideImage?.title}
                                />
                            </Fragment>
                        );
                    })}
                </div>
                <div className="info-des container">
                    <h3>{dataContent?.movieLatinName}</h3>
                    <h2>{name}</h2>
                    <p>{dataContent?.story}</p>

                    <p
                        dangerouslySetInnerHTML={{
                            __html: dataContent?.about,
                        }}
                    />
                </div>
                <CarouselsPostCard
                    castCard
                    config={config}
                    posts={dataContent.casts.filter(
                        (item) => item.castRole === "Actor"
                    )}
                    data={{
                        key: "",
                        type: "",
                        caption: `ستارگان فیلم  ${name}`,
                    }}
                />
                <CarouselsPostCard
                    castCard
                    config={config}
                    posts={dataContent.casts.filter(
                        (item) => item.castRole !== "Actor"
                    )}
                    data={{
                        key: "",
                        type: "",
                        caption: `عوامل فیلم  ${name}`,
                    }}
                />
            </>
        );
    }

    return <div className="single-media">{content}</div>;
};

export default Movie;
