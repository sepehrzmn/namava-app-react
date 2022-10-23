import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import {
    useGetConfigQuery,
    useGetMenuQuery,
} from "../../features/apis/baseApi";

import "./category-list.scss";

const CategoryList = () => {
    const { data = [] } = useGetMenuQuery();
    const categories = useMemo(() => {
        if (data?.result) {
            const filter = data.result.filter((category) => {
                return category?.parentId === 5;
            });

            return filter;
        } else {
            return null;
        }
    }, [data]);

    return (
        <div className="category-list">
            <div className="category-list__content container">
                {categories &&
                    categories?.map((category, index) => {
                        return <Item key={index} data={category} />;
                    })}
            </div>
        </div>
    );
};

const Item = ({ data }) => {
    const { data: config } = useGetConfigQuery();
    return (
        <Link
            to={`/${
                data?.entityType === "PostGroup"
                    ? `collection-${data?.entityId}-${data?.slug}`
                    : `category/${data?.slug}`
            }`}
        >
            <div className="item">
                <LazyLoadImage
                    src={`${config.result.staticBaseUrl}${data?.imageUrl}`}
                    alt=""
                    effect="blur"
                />
                <h2>{data?.caption}</h2>
            </div>
        </Link>
    );
};

export default CategoryList;
