import { useState } from "react";
import {
    useGetConfigQuery,
    useLazyGetPostGroupQuery,
} from "../../features/apis/baseApi";

import VisibilitySensor from "react-visibility-sensor";

import { CarouselsPostCard } from "../";

export const ExclusiveDubs = ({ data, className }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const [trigger] = useLazyGetPostGroupQuery();
    const { data: config } = useGetConfigQuery();

    const onChange = async (isVisible) => {
        if (isVisible) {
            if (!content) {
                const { data: posts, isSuccess } = await trigger(data.key);
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

export default ExclusiveDubs;
