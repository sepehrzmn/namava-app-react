import { useLazyGetLatestQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const Latest = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetLatestQuery}
        />
    );
};

export default Latest;
