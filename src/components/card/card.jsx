import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { baseApiSlice } from "../../features/apis/baseApi";

import "./card.scss";
import { KidsContext } from "../../contexts/kidsContext";

export const CardPost = ({ data, base, onClick, loading }) => {
    const [trigger, { data: backPreview }] =
        baseApiSlice.endpoints.getBriefPreview.useLazyQuery();
    const [content, setContent] = useState("");
    const [isShow, setIsShow] = useState(false);
    const { isKids } = useContext(KidsContext);

    let timeOut;

    const getPreview = () => {
        timeOut = setTimeout(async () => {
            if (backPreview === undefined) {
                const { data: preview, isSuccess } = await trigger({
                    id: data.id ?? data?.mediaId ?? "",
                });
                if (isSuccess) {
                    setContent(
                        preview?.succeeded ? (
                            <>
                                <div>
                                    <span>
                                        {data?.type === "Series"
                                            ? "سریال"
                                            : "فیلم"}
                                    </span>{" "}
                                    - <span>{preview?.result.year}</span>
                                </div>
                                {preview?.result?.hit ? (
                                    <div className="item">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="20"
                                                width="20"
                                                viewBox="0 0 20 20"
                                                fill="white"
                                            >
                                                <path d="M13.548 3a4.55 4.55 0 0 0-3.486 1.642C9.2 3.605 7.925 3.003 6.577 3A4.58 4.58 0 0 0 2 7.577c0 6.2 4.852 10.388 8.062 10.388s8.063-4.184 8.063-10.388A4.58 4.58 0 0 0 13.548 3z"></path>
                                            </svg>
                                        </div>
                                        <p>{preview?.result.hit}%</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {preview?.result?.imdb ? (
                                    <div className="item">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="20"
                                                fill="#ffffff"
                                            >
                                                <path d="M11.107 9.587c.1-.424.122-.824.2-1.248l.122-.965.122-.918a7 7 0 0 1 .1-.706l.1-.753c.05-.235.073-.494.1-.73.024-.212 0-.212.22-.212h3.746c.122 0 .147.024.147.14V15.78c0 .094-.024.14-.122.14h-2.36c-.122 0-.147-.024-.147-.14v-6.3h-.024l-.27 1.46-.245 1.295-.22 1.295-.2 1.13-.22 1.177c-.024.094-.05.118-.147.118h-1.662c-.05 0-.1 0-.1-.07l-.343-1.837-.367-1.884-.367-1.978-.147-.73v6.357c0 .118-.024.165-.147.165h-2.4c-.122 0-.147-.024-.147-.14V4.242c0-.094.024-.14.122-.14h3.453c.073 0 .122 0 .147.094l.27 1.483.294 1.6.22 1.32a3.5 3.5 0 0 1 .272.99zm6.288.3V4.195c0-.14.05-.165.17-.165h3.942a4.46 4.46 0 0 1 1.665.235 2.66 2.66 0 0 1 1.175.8 2.25 2.25 0 0 1 .367.894 6.31 6.31 0 0 1 .049 1.176v6.352a1.8 1.8 0 0 1-.661 1.459 2.76 2.76 0 0 1-1.1.518 6.59 6.59 0 0 1-1.665.212l-3.8.024c-.122 0-.1-.07-.1-.14l-.043-5.67zm2.9-.094v3.858c0 .094.024.118.122.118a4.51 4.51 0 0 0 .563-.024.56.56 0 0 0 .514-.588V6.383c.006-.183-.1-.35-.27-.423a2.18 2.18 0 0 0-.784-.118c-.122 0-.147.024-.147.14zm8.917-3.08a5.12 5.12 0 0 1 1.494-.73 2.02 2.02 0 0 1 1.812.4 1.45 1.45 0 0 1 .588 1.2v7c-.022.595-.464 1.1-1.053 1.177a4.36 4.36 0 0 1-1.1.047 4.08 4.08 0 0 1-1.053-.26l-.857-.26c-.086-.026-.18.013-.22.094-.07.133-.12.276-.147.424-.024.07-.05.094-.122.094H26.12c-.073 0-.1-.024-.1-.07V4.22c0-.14.025-.165.17-.165h2.8c.17 0 .17 0 .17.188l.05 2.472zm.2 3.955v3.085a.46.46 0 0 0 .1.306c.082.133.244.2.392.14.17-.047.22-.118.22-.33v-6.1a.7.7 0 0 0-.024-.235c-.046-.186-.226-.308-.416-.282-.147.024-.27.07-.27.33zM1.924 9.963V4.195c0-.118.024-.14.147-.14h2.62c.122 0 .122.024.122.14v11.583c0 .118-.024.14-.147.14h-2.62c-.122 0-.147-.024-.147-.14l.025-5.815z"></path>
                                            </svg>
                                        </div>
                                        <p>{preview?.result.imdb}</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {preview?.result?.hasPersianSubtitle ? (
                                    <div className="item">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="white"
                                            >
                                                <path d="M14.216 3H6.26a3.26 3.26 0 0 0-3.26 3.26v7.957a3.26 3.26 0 0 0 3.26 3.26h7.955a3.26 3.26 0 0 0 3.26-3.26V6.262A3.26 3.26 0 0 0 14.216 3zM6.2 14.428a.9.9 0 0 1 0-1.8.9.9 0 0 1 .636 1.537.9.9 0 0 1-.637.263zm8.077 0h-5.31a.9.9 0 1 1 0-1.8h5.3a.9.9 0 1 1 0 1.8zm0-3.356H6.2a.9.9 0 0 1 0-1.8h8.076a.9.9 0 0 1 0 1.8zm0-3.222H6.2a.9.9 0 1 1 0-1.8h8.076a.9.9 0 1 1 0 1.8z"></path>
                                            </svg>
                                        </div>
                                        <p>زیرنویس فارسی</p>
                                    </div>
                                ) : (
                                    ""
                                )}
                                {preview?.result?.dubsType |
                                (preview?.result?.dubsType !== "None") ? (
                                    <div className="item">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="white"
                                            >
                                                <path d="M16.097 6.244a.53.53 0 0 0-.372.153.52.52 0 0 0-.153.372v5.285a3.48 3.48 0 0 1-1.9 3.106l-.088.045a7.87 7.87 0 0 1-7.171 0l-.087-.045a3.48 3.48 0 0 1-1.9-3.107V6.768c0-.14-.055-.273-.154-.37a.53.53 0 0 0-.37-.154.52.52 0 0 0-.525.525v5.285a4.52 4.52 0 0 0 2.47 4.04l.085.043a8.89 8.89 0 0 0 3.54.964v1.212H7.848c-.14 0-.273.055-.37.154a.53.53 0 0 0-.154.37.52.52 0 0 0 .525.525h4.294a.52.52 0 0 0 .525-.525c0-.14-.055-.273-.154-.37a.53.53 0 0 0-.37-.154H10.52V17.1a8.9 8.9 0 0 0 3.54-.964l.087-.044c1.517-.775 2.47-2.336 2.467-4.04V6.768c-.001-.286-.23-.52-.516-.524zM7.244 13.9l.06.03a5.9 5.9 0 0 0 5.392 0l.06-.03a2.83 2.83 0 0 0 1.538-2.518v-7.45a2.83 2.83 0 0 0-1.538-2.518l-.06-.03a5.9 5.9 0 0 0-5.392 0l-.06.03a2.83 2.83 0 0 0-1.538 2.518v7.45a2.83 2.83 0 0 0 1.538 2.518z"></path>
                                            </svg>
                                        </div>
                                        <p>
                                            {preview.result.dubsType ===
                                            "ExclusiveDubs"
                                                ? "دوبله نماوا"
                                                : "دوبله فارسی"}
                                        </p>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </>
                        ) : (
                            <div>{preview?.error}</div>
                        )
                    );
                }
            }
            setIsShow(true);
        }, 1000);
    };

    if (loading) {
        return <div className="card-loading" />;
    }

    return (
        <div className={`card ${isKids ? "kids" : ""}`} title={data.caption}>
            {false ? "" : ""}
            <Link
                to={`/${data.type}/${
                    data?.id ?? data?.mediaId ?? ""
                }-${data.caption.split(" ").join("_")}? ${
                    isKids ? "kids=true" : ""
                } `}
                onClick={(event) => {
                    onClick?.(event, data.id);
                }}
            >
                <div
                    className={`card__poster ${isShow ? "active" : ""}`}
                    onMouseEnter={getPreview}
                    onMouseLeave={() => {
                        setIsShow(false);
                        timeOut !== undefined && clearTimeout(timeOut);
                    }}
                    onClick={() => {}}
                >
                    <LazyLoadImage
                        src={`${base}/${data?.imageUrl}`}
                        alt={data?.caption}
                        effect="opacity"
                        height={"auto"}
                        defaultValue="img"
                    />
                    <div className="description">{content}</div>
                </div>

                <div className="card__title">{data.caption}</div>
            </Link>
        </div>
    );
};
