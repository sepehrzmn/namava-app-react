import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CardPost } from "../../components";
import { ResizeContext } from "../../contexts/ResizeContext";

import {
    useGetConfigQuery,
    useGetInfoPostGroupQuery,
    useGetPostGroupQuery,
} from "../../features/apis/baseApi";

import "./collection-page.scss";

const Collection = () => {
    const { id } = useParams();
    const resize = useContext(ResizeContext);
    const { data, isSuccess } = useGetInfoPostGroupQuery({ id });
    const { data: posts } = useGetPostGroupQuery({ id });
    const { data: config } = useGetConfigQuery();
    const base = config?.result?.staticBaseUrl ?? "";

    let content;

    if (isSuccess) {
        const dataContent = data?.result ?? null;
        const postsContent = posts?.result ?? null;
        content = dataContent && (
            <>
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
                        ? postsContent.map((post, index) => {
                              console.log(post);
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
            </>
        );
    }

    return <div className="collection-page">{content}</div>;
};

export default Collection;
