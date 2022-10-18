import { useLazyGetPostGroupQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

export const ExclusiveDubs = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetPostGroupQuery}
        />
    );
};

export default ExclusiveDubs;
