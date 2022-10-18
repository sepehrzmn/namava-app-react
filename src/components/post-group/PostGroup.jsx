import { useLazyGetPostGroupQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

export const PostGroup = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetPostGroupQuery}
        />
    );
};

export default PostGroup;
