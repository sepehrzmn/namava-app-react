import React, {
    forwardRef,
    Fragment,
    useEffect,
    useRef,
    useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import VisibilitySensor from "react-visibility-sensor";

import {
    Banner,
    Button,
    CarouselsPostCard,
    Gallery,
    InfoText,
    LazyComponent,
    ListHorizontal,
} from "../../components";
import {
    useGetSingleSeriesQuery,
    useLazyGetEpisodesQuery,
    useLazyGetRecommendItemForUserQuery,
} from "../../features/apis/baseApi";

import "./single-series.scss";

const Series = ({ name, config, id }) => {
    const [seasons, setSeasons] = useState({
        selectSeason: "",
        active: false,
        seasonId: null,
    });
    const listRef = useRef(null);
    const btnRef = useRef(null);
    const [episodes, setEpisodes] = useState(null);

    const { data, isSuccess } = useGetSingleSeriesQuery(id);
    const [trigger] = useLazyGetEpisodesQuery();

    useEffect(() => {
        const checkClick = (event) => {
            setSeasons((s) => {
                if (
                    event.target !== listRef.current &&
                    event.target !== btnRef.current?.lastChild
                ) {
                    return { ...s, active: false };
                } else {
                    return { ...s, active: true };
                }
            });
        };

        window.addEventListener("click", checkClick);

        return () => {
            window.removeEventListener("click", checkClick);
        };
    }, []);

    async function getEpisodes(seasonId) {
        const { data, isSuccess } = await trigger(seasonId);
        return { episodes: data, isSuccess };
    }

    async function viewEpisodesBox(id) {
        const { episodes, isSuccess } = await getEpisodes(id);

        if (isSuccess) {
            setEpisodes(episodes);
        }
    }

    let content;
    if (isSuccess) {
        const dataContent = data?.result ?? undefined;
        const base = config?.result?.staticBaseUrl ?? "";
        const orderSeasons = dataContent.seasons.map((item) => {
            return {
                season: item.seasonOrderId,
                seasonId: item.seasonId,
            };
        });

        content = (
            <div className="single-series">
                <div>
                    <Banner dataContent={dataContent} base={base} name={name} />
                </div>
                <div className="season container">
                    <SeasonBtn
                        ref={btnRef}
                        setSeasons={setSeasons}
                        seasons={seasons}
                        orderSeasons={orderSeasons}
                    />

                    <SeasonList
                        setSeasons={setSeasons}
                        seasons={seasons}
                        orderSeasons={orderSeasons}
                        ref={listRef}
                        viewEpisodesBox={viewEpisodesBox}
                    />
                    <div className="season-info">
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_16448:5568)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.19 6H5C3.34 6 2 7.35 2 9V18.79C2 20.44 3.34 21.79 5 21.79H24.19C25.85 21.79 27.19 20.44 27.19 18.79V9C27.19 7.35 25.85 6 24.19 6ZM17.11 14.67L14.24 16.33C13.57 16.71 12.74 16.23 12.74 15.46V12.15C12.74 11.38 13.57 10.9 14.24 11.28L17.11 12.94C17.78 13.32 17.78 14.29 17.11 14.67Z"
                                    fill="white"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.36001 24.0699H22.74C22.99 24.0699 23.19 23.8699 23.19 23.6199C23.19 23.3699 22.99 23.1699 22.74 23.1699H6.36001C6.11001 23.1699 5.91001 23.3699 5.91001 23.6199C5.90001 23.8699 6.11001 24.0699 6.36001 24.0699Z"
                                    fill="white"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_16448:5568">
                                    <rect
                                        width="25.19"
                                        height="18.07"
                                        fill="white"
                                        transform="translate(2 6)"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        <div>
                            <div>
                                تعداد کل فصل ها:{" "}
                                {dataContent?.seasons[0]?.seasonOrderId}
                            </div>
                            <div>
                                وضعیت بخش: {dataContent?.episodeReleaseTime}
                            </div>
                        </div>
                    </div>
                </div>
                <VisibilitySensor
                    onChange={() => {
                        if (episodes === null) {
                            viewEpisodesBox(orderSeasons[0].seasonId);
                        }
                    }}
                >
                    <div className="container step episodes">
                        {episodes?.result && episodes.result.length
                            ? episodes.result.map((episode) => {
                                  return <Episode data={episode} base={base} />;
                              })
                            : ""}
                    </div>
                </VisibilitySensor>
                <div className="container">
                    <h2 style={{ margin: "3rem 0 1rem 0" }}>تصاویر و جزییات</h2>
                    <Gallery base={base} slides={dataContent.slideImageList} />
                </div>
                <InfoText
                    about={dataContent?.about}
                    movieLatinName={dataContent?.movieLatinName}
                    name={name}
                    story={dataContent?.story}
                />
                <div
                    className="container"
                    style={{ margin: "1rem 0", fontSize: "12px" }}
                >
                    <ListHorizontal
                        dataContent={dataContent?.categories}
                        itemName={"categoryName"}
                        title="دسته بندی"
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

                <LazyComponent
                    data={{ key: id }}
                    useLazyApi={useLazyGetRecommendItemForUserQuery}
                />
            </div>
        );
    }

    return <>{content}</>;
};

const SeasonBtn = forwardRef(({ setSeasons, seasons, orderSeasons }, ref) => {
    return (
        <div ref={ref}>
            <Button
                eventF={() => {
                    setSeasons((preventSeason) => ({
                        ...preventSeason,
                        active: !preventSeason.active,
                    }));
                }}
            >
                {seasons?.selectSeason
                    ? seasons?.selectSeason
                    : orderSeasons[0].season}
            </Button>
        </div>
    );
});

const SeasonList = forwardRef(
    ({ setSeasons, seasons, orderSeasons, viewEpisodesBox }, ref) => {
        return (
            <ul
                className={`list ${
                    orderSeasons.length !== 1 &&
                    orderSeasons.length !== 0 &&
                    seasons.active
                        ? "active"
                        : ""
                }`}
                ref={ref}
            >
                {orderSeasons.map((season, index) => (
                    <Fragment key={index}>
                        <li
                            value={season.season}
                            onClick={() => {
                                setSeasons({
                                    ...seasons,
                                    active: false,
                                    selectSeason: season.season,
                                });
                                viewEpisodesBox(season.seasonId);
                            }}
                            className={
                                seasons.selectSeason === season.season
                                    ? "select"
                                    : ""
                            }
                        >
                            {season.season}
                        </li>
                    </Fragment>
                ))}
            </ul>
        );
    }
);

const Episode = ({ data, base }) => (
    <div className="episode">
        <div className="responsive">
            <div className="poster">
                <LazyLoadImage
                    src={`${base}${data?.imageUrl}?anchor=middlecenter&crop=auto&scale=both&w=300&h=195`}
                    alt={data.caption}
                />
                <div className="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M14.66 8.347l-8.537-4.93c-.502-.287-1.12-.286-1.62.005s-.81.825-.81 1.404v9.858c-.001.58.307 1.115.808 1.406s1.12.293 1.62.005l8.537-4.93a1.64 1.64 0 0 0 0-2.82z"></path>
                    </svg>
                </div>
                <p className="time">{data?.mediaDuration} دقیقه </p>
            </div>
            <div>
                <h3>{data?.caption}</h3>
                <div className="hit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                    >
                        <path d="M13.548 3a4.55 4.55 0 0 0-3.486 1.642C9.2 3.605 7.925 3.003 6.577 3A4.58 4.58 0 0 0 2 7.577c0 6.2 4.852 10.388 8.062 10.388s8.063-4.184 8.063-10.388A4.58 4.58 0 0 0 13.548 3z"></path>
                    </svg>
                    {data?.hit ? data.hit : ""}
                </div>
            </div>
        </div>
        <p>{data?.shortDescription}</p>
    </div>
);

export default Series;
