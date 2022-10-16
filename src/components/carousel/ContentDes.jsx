import Button from "../button/Button";
import BadgeInfo from "./BadgeInfo";

const ContentDes = ({ data }) => {
    const dataContent = data ? data?.result ?? null : null;

    return (
        <>
            {dataContent ? (
                <>
                    <>
                        <h2>{dataContent.caption}</h2>
                        <BadgeInfo dataContent={dataContent} />
                        {dataContent?.story ? (
                            <p className="story">{dataContent.story}</p>
                        ) : (
                            ""
                        )}
                        <div className="btns">
                            <Button>
                                {data.type !== "Series"
                                    ? "ورود و پخش"
                                    : "قسمت ها"}
                            </Button>
                            <Button transparent flex>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 30 30"
                                    class="Component-icon-0-1-85"
                                >
                                    <g
                                        transform="matrix(-1 0 0 -1 1649.226 -336.319)"
                                        class="svg-c1"
                                    >
                                        <path
                                            class="svg-c1"
                                            d="M1634.13-339.32a12.02 12.02 0 0 1-12.102-12.101 12.02 12.02 0 0 1 12.102-12.101 12.02 12.02 0 0 1 8.557 3.544 12.12 12.12 0 0 1 0 17.114 12.02 12.02 0 0 1-8.557 3.544zm0-23.08a10.91 10.91 0 0 0-10.98 10.98 10.91 10.91 0 0 0 10.98 10.98 10.91 10.91 0 0 0 7.764-3.216c4.28-4.29 4.28-11.238 0-15.53a10.91 10.91 0 0 0-7.764-3.215z"
                                        ></path>
                                        <rect
                                            width="3.14"
                                            height="10.632"
                                            rx="1.57"
                                            x="1632.561"
                                            y="-359.153"
                                        ></rect>
                                        <rect
                                            width="3.14"
                                            height="3.14"
                                            rx="1.57"
                                            x="1632.561"
                                            y="-346.124"
                                        ></rect>
                                    </g>
                                </svg>
                                اطلاعات بیشتر
                            </Button>
                        </div>
                        {dataContent?.casts?.length ? (
                            <div className="">
                                <span>ستارگان:‌ </span>
                                {dataContent.casts.map((cast, index) => {
                                    return (
                                        <>
                                            <span
                                                className={
                                                    index ===
                                                    dataContent.casts.length - 1
                                                        ? ""
                                                        : "space"
                                                }
                                            >
                                                {cast.castName}
                                            </span>
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}

                        {dataContent?.directors?.length ? (
                            <div className="">
                                <span>کارگردان: </span>
                                {dataContent.directors.map((cast, index) => {
                                    return (
                                        <>
                                            <span
                                                className={
                                                    index ===
                                                    dataContent.directors
                                                        .length -
                                                        1
                                                        ? ""
                                                        : "space"
                                                }
                                            >
                                                {cast.castName}
                                            </span>
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}

                        {dataContent?.categories?.length ? (
                            <div className="">
                                <span>کارگردان: </span>
                                {dataContent.categories.map((cast, index) => {
                                    console.log(
                                        dataContent.categories.length,
                                        dataContent.categories
                                    );
                                    return (
                                        <>
                                            <span
                                                className={
                                                    index ===
                                                    dataContent.categories
                                                        .length -
                                                        1
                                                        ? ""
                                                        : "space"
                                                }
                                            >
                                                {cast.categoryName}
                                            </span>
                                        </>
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}
                    </>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default ContentDes;
