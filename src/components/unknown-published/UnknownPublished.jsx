import { useLazyGetUnknownDatePublishedQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const UnknownPublished = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetUnknownDatePublishedQuery}
        />
    );
};

export default UnknownPublished;
