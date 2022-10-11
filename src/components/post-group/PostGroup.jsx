import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import {
    useGetConfigQuery,
    useGetPostGroupQuery,
} from "../../features/apis/baseApi";

import "./post-group.scss";

export const PostGroup = ({ data, className }) => {
    console.log(className);
    const {
        data: posts,
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetPostGroupQuery(data.key);
    const { data: config } = useGetConfigQuery();

    let content;
    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <div className={`post-group ${className ? "top" : ""}`}>
                <div className="post-group__content container">
                    <h2 className="title">{data.caption}</h2>
                    <Swiper
                        slidesPerView={"auto"}
                        style={{ overflow: "visible" }}
                        spaceBetween={16}
                    >
                        {posts?.result?.map((post) => {
                            return (
                                <SwiperSlide key={post.id}>
                                    <Item
                                        data={post}
                                        base={config?.result?.staticBaseUrl}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        );
    }
    return <div>{content}</div>;
};

const Item = ({ data, base }) => {
    return (
        <div className="item">
            <Link to={`/${data.type}/${data.id}-${data.caption}`}>
                <div className="item__poster">
                    <img
                        src={`${base}/${data?.imageUrl}`}
                        alt={data?.caption}
                    />
                </div>
                <div className="item__title">{data.caption}</div>
            </Link>
        </div>
    );
};

export default PostGroup;
