import { useLazyGetExclusiveContentQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const ExclusiveContent = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetExclusiveContentQuery}
        />
    );
};

export default ExclusiveContent;
