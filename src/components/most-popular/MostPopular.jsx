import { useLazyGetMostPopularQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const MostPopular = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetMostPopularQuery}
        />
    );
};

export default MostPopular;
