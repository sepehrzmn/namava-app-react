import { useLazyGetCastsQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const StarGroup = ({ data, className }) => {
    <LazyComponent
        className={className}
        data={data}
        useLazyApi={useLazyGetCastsQuery}
        castCard={true}
    />;
};

export default StarGroup;
