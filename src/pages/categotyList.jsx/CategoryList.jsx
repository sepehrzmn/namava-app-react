import { useMemo } from "react";
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
        <Link to={`/category/${data?.slug ?? ""}`}>
            <div className="item">
                <img
                    src={`${config.result.staticBaseUrl}${data?.imageUrl}`}
                    alt=""
                />
                <h2>{data?.caption}</h2>
            </div>
        </Link>
    );
};

export default CategoryList;
