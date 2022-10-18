import { useState } from "react";
import {
    useGetConfigQuery,
    useLazyGetExclusiveContentQuery,
} from "../../features/apis/baseApi";

import VisibilitySensor from "react-visibility-sensor";

import { CarouselsPostCard } from "../";

const ExclusiveContent = ({ data, className }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const [trigger] = useLazyGetExclusiveContentQuery();
    const { data: config } = useGetConfigQuery();

    const onChange = async (isVisible) => {
        console.log(isVisible);
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = await trigger(data.key);
                console.log(posts);
                if (isSuccess) {
                    setContent(
                        <>
                            {posts.result.length ? (
                                <CarouselsPostCard
                                    className={className}
                                    config={config}
                                    data={data}
                                    posts={posts}
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

export default ExclusiveContent;
