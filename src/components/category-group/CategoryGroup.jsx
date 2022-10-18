import { useLazyGetCategoryQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const CategoryGroup = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetCategoryQuery}
        />
    );
};

export default CategoryGroup;
