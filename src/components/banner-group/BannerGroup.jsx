import { useState } from "react";

import VisibilitySensor from "react-visibility-sensor";

import {
    useLazyGetBannerQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";

import { CarouselsPostCard } from "../";

const BannerGroup = ({ data, className }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const { data: config } = useGetConfigQuery();
    const [trigger] = useLazyGetBannerQuery();

    const onChange = async (isVisible) => {
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = await trigger(data.key);
                if (isSuccess) {
                    console.log(posts.result.length);
                    setContent(
                        <>
                            {posts.result.length ? (
                                <CarouselsPostCard
                                    className={className}
                                    config={config}
                                    data={data}
                                    posts={posts}
                                    banner
                                />
                            ) : (
                                ""
                            )}
                        </>
                    );
                    setLoad(() => {
                        return posts?.result?.length ? true : false;
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

export default BannerGroup;
