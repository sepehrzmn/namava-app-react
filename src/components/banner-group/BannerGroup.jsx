import { useLazyGetBannerQuery } from "../../features/apis/baseApi";

import { LazyComponent } from "../";

const BannerGroup = ({ data, className }) => {
    return (
        <LazyComponent
            className={className}
            data={data}
            useLazyApi={useLazyGetBannerQuery}
            banner={true}
        />
    );
};

export default BannerGroup;
