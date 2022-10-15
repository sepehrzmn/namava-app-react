import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.namava.ir/api" }),
    endpoints: (builder) => ({
        // get config app
        getConfig: builder.query({
            query: () => "/v1.0/applications/configs",
        }),

        // get data menus
        getMenu: builder.query({
            query: () => "/v3.0/menus",
        }),

        // get data slider
        getSlider: builder.query({
            query: (id) => `/v2.0/medias/sliders/${id}`,
        }),

        // get data post group
        getPostGroup: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/post-groups/${id}/medias`,
                params: { pi, ps },
            }),
        }),

        // get brief Preview data
        getBriefPreview: builder.query({
            query: (id) => `v1.0/medias/${id}/brief-preview`,
        }),

        // get latest media data
        getLatest: builder.query({
            query: (pi = 1, ps = 20) => ({
                url: "/v1.0/medias/latest",
                params: { pi, ps },
            }),
        }),

        // get data Exclusive default content
        getExclusiveContent: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/exclusive-content/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data banner
        getBanner: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/banners/${id}`,
                params: { pi, ps },
            }),
        }),

        // get data Exclusive default dubs
        getExclusiveDubs: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/exclusive-dubs/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data casts
        getCasts: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/casts/collection/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data categories
        getCategory: builder.query({
            query: (type, pi = 1, ps = 20) => ({
                url: `v1.0/category-groups/${type}/latest-medias`,
                params: { pi, ps },
            }),
        }),

        // get latest series TV
        getLatestSeries: builder.query({
            query: (pi = 1, ps = 20) => ({
                url: `v1.0/medias/latest-series`,
                params: { pi, ps },
            }),
        }),

        // get latest most popular
        getMostPopular: builder.query({
            query: (pi = 1, ps = 20) => ({
                url: `v1.0/medias/latest-series`,
                params: { pi, ps },
            }),
        }),

        // get latest movies TV
        getLatestMovies: builder.query({
            query: (pi = 1, ps = 20) => ({
                url: `v1.0/medias/latest-movies`,
                params: { pi, ps },
            }),
        }),

        // get unknown date published
        getUnknownDatePublished: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/unknown-date-published/${id}`,
                params: { pi, ps },
            }),
        }),
    }),
});

export const {
    useGetConfigQuery,
    useGetMenuQuery,
    useGetSliderQuery,
    useGetPostGroupQuery,
    useGetBriefPreviewQuery,
    useGetLatestQuery,
    useGetExclusiveContentQuery,
    useGetBannerQuery,
    useGetExclusiveDubsQuery,
    useGetCastsQuery,
    useGetCategoryQuery,
    useGetLatestSeriesQuery,
    useGetMostPopularQuery,
    useGetLatestMoviesQuery,
    useGetUnknownDatePublishedQuery,
} = baseApiSlice;
