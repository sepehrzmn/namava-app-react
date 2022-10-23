import { useState } from "react";

import VisibilitySensor from "react-visibility-sensor";

import { useGetConfigQuery } from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const LazyComponent = ({ useLazyApi, data, className, castCard, banner }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const [trigger] = useLazyApi();
    const { data: config } = useGetConfigQuery();

    const onChange = async (isVisible) => {
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = data?.key
                    ? await trigger(data?.key)
                    : await trigger();

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
                            : posts?.result?.items.length
                            ? true
                            : false;
                    });
                }
            }
        }
    };

    return (
        <VisibilitySensor onChange={onChange}>
            <div className={`step ${load ? "" : "disable"}`}>{content}</div>
        </VisibilitySensor>
    );
};

export default LazyComponent;
