import { useLazyGetLatestSeriesQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const LatestSeries = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetLatestSeriesQuery}
        />
    );
};

export default LatestSeries;
