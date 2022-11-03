import { useContext, useState } from "react";

import VisibilitySensor from "react-visibility-sensor";

import { useGetConfigQuery } from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";
import { KidsContext } from "../../contexts/kidsContext";

const LazyComponent = ({
    useLazyApi,
    data,
    className,
    castCard,
    banner,
    slugItem,
}) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState();

    const [trigger] = useLazyApi();
    const { data: config } = useGetConfigQuery();
    const { isKids } = useContext(KidsContext);

    const onChange = async (isVisible) => {
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = data?.key
                    ? await trigger({ id: data?.key, pi: 1, ps: 20 })
                    : data?.caption && data?.slug
                    ? await trigger({
                          slug: slugItem ?? "",
                          type: encodeURIComponent(data?.slug),
                      })
                    : await trigger({ pi: 1, ps: 20, isKids });

                if (isSuccess) {
                    setContent(
                        <>
                            {posts.result.length ? (
                                <CarouselsPostCard
                                    className={className}
                                    config={config}
                                    data={data}
                                    posts={posts}
                                    castCard={castCard ? true : false}
                                    banner={banner ? true : false}
                                />
                            ) : posts.result?.items ? (
                                <CarouselsPostCard
                                    className={className}
                                    config={config}
                                    data={data}
                                    posts={posts.result?.items}
                                    castCard={castCard ? true : false}
                                    banner={banner ? true : false}
                                />
                            ) : (
                                ""
                            )}
                        </>
                    );
                    setLoad(() => {
                        return posts?.result?.length
                            ? true
                            : posts?.result?.items?.length
                            ? true
                            : false;
                    });
                }
            }
        }
    };
    return (
        <VisibilitySensor onChange={onChange}>
            <div
                className={`step my-2${
                    load ? `${className ? " top" : ""}` : " disable"
                }`}
                id={data.type}
            >
                {content}
            </div>
        </VisibilitySensor>
    );
};

export default LazyComponent;
