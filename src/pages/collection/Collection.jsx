import { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Button, CardPost } from "../../components";
import { ResizeContext } from "../../contexts/ResizeContext";

import {
    useGetConfigQuery,
    useGetInfoPostGroupQuery,
    useGetPostGroupQuery,
    useLazyGetPostGroupQuery,
} from "../../features/apis/baseApi";

import "./collection-page.scss";

const Collection = () => {
    const [postGroup, setPostGroup] = useState([]);
    const [page, setPage] = useState(2);

    const { id } = useParams();
    const { resize } = useContext(ResizeContext);
    const btnRef = useRef(null);

    const { data, isSuccess } = useGetInfoPostGroupQuery({ id });
    const [trigger] = useLazyGetPostGroupQuery();
    const { data: posts } = useGetPostGroupQuery({ id });
    const { data: config } = useGetConfigQuery();

    const base = config?.result?.staticBaseUrl ?? "";

    const showMore = async () => {
        const { data, isSuccess } = await trigger({ id, pi: page });
        if (isSuccess) {
            setPostGroup(() => [...postGroup, ...data?.result]);
            setPage(page + 1);
            if (data?.result.length < 28) {
                btnRef.current.classList.add("disable");
            }
        }
    };

    let content;

    if (isSuccess) {
        const dataContent = data?.result ?? null;
        const postsContent = posts?.result ?? null;
        content = dataContent && (
            <>
                <Helmet>
                    {dataContent?.metaDescription && (
                        <meta
                            key="description"
                            content={dataContent?.metaDescription}
                        />
                    )}
                    {dataContent?.metaKeywords && (
                        <meta
                            key="keyword"
                            content={dataContent?.metaKeywords}
                        />
                    )}
                    {dataContent?.metaTitle && (
                        <title>{dataContent.metaTitle}</title>
                    )}
                </Helmet>
                <div
                    className="collection-page__banner"
                    style={{
                        backgroundImage: `linear-gradient(rgba(18, 18, 18, 0) 5vw, rgb(18, 18, 18) ${
                            resize ? "55vw" : ""
                        }), url(${base}${
                            resize
                                ? dataContent?.coverLandscape ?? ""
                                : dataContent?.coverPortrait ?? ""
                        }?anchor=middlecenter&crop=auto&scale=both&h=1350)`,
                    }}
                >
                    <div className="collection-page__banner__content container">
                        <h2>{dataContent?.caption}</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: dataContent?.shortDescription,
                            }}
                        />
                    </div>
                </div>
                <div className="posts container">
                    {postsContent && postsContent?.length
                        ? [...postsContent, ...postGroup].map((post, index) => {
                              return (
                                  <CardPost
                                      data={post}
                                      base={base}
                                      key={index}
                                  />
                              );
                          })
                        : ""}
                </div>
                <div
                    style={{ textAlign: "center", margin: "4rem 0" }}
                    ref={btnRef}
                    className={`${
                        postsContent && postsContent.length < 28 && "disable"
                    }`}
                >
                    <Button dark eventF={showMore}>
                        بیشتر
                    </Button>
                </div>
            </>
        );
    }

    return <div className="collection-page">{content}</div>;
};

export default Collection;
