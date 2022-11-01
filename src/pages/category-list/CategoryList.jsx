import { useContext, useMemo } from "react";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { GroupContext } from "../../contexts/CroupContext";
import {
    useGetConfigQuery,
    useGetMenuQuery,
} from "../../features/apis/baseApi";

import "./category-list.scss";

const CategoryList = ({ data: dataBase }) => {
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
            <Helmet>
                {dataBase?.metaKeywords && (
                    <meta name="keyword" content={data.result.metaKeywords} />
                )}
                {dataBase?.metaDescription && (
                    <meta
                        name="description"
                        content={data.result.metaDescription}
                    />
                )}
                {dataBase?.metaTitle && <title>{dataBase.metaTitle}</title>}
            </Helmet>
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
    const { setGroup } = useContext(GroupContext);

    return (
        <Link
            to={`/${
                data?.entityType === "PostGroup"
                    ? `collection-${data?.entityId}-${data?.slug}`
                    : `category/${data?.slug}`
            }`}
            onClick={() => {
                setGroup((preventGroup) => {
                    return {
                        ...preventGroup,
                        text: data?.caption,
                        status: true,
                    };
                });
            }}
        >
            <div className="item">
                <LazyLoadImage
                    src={`${config.result.staticBaseUrl}${data?.imageUrl}`}
                    alt=""
                    effect="opacity"
                />
                <h2>{data?.caption}</h2>
            </div>
        </Link>
    );
};

export default CategoryList;
