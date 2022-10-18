import { useState } from "react";
import {
    useGetConfigQuery,
    useLazyGetCategoryQuery,
} from "../../features/apis/baseApi";

import VisibilitySensor from "react-visibility-sensor";

import { CarouselsPostCard } from "../";

const CategoryGroup = ({ data, className }) => {
    const [load, setLoad] = useState(true);
    const [content, setContent] = useState(null);

    const { data: config } = useGetConfigQuery();
    const [trigger] = useLazyGetCategoryQuery();

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

export default CategoryGroup;
