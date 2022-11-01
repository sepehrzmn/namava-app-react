import {
    useLazyGetLatestKidsQuery,
    useLazyGetLatestMoviesQuery,
    useLazyGetLatestQuery,
    useLazyGetLatestSeriesQuery,
} from "../../features/apis/baseApi";

import { LazyComponent } from "../";
import { useLocation } from "react-router-dom";

const Latest = ({ data, className }) => {
    const { pathname } = useLocation();

    const lazy =
        pathname === "/movies"
            ? useLazyGetLatestMoviesQuery
            : pathname === "/series"
            ? useLazyGetLatestSeriesQuery
            : pathname === "/kids"
            ? useLazyGetLatestKidsQuery
            : useLazyGetLatestQuery;

    return (
        <LazyComponent className={className} data={data} useLazyApi={lazy} />
    );
};

export default Latest;
