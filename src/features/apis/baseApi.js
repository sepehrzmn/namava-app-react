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
            query: ({ id }) => `/v2.0/medias/sliders/${id}`,
        }),

        // get slider post group
        getPostGroup: builder.query({
            query: ({ id, pi = 1, ps = 28 }) => ({
                url: `v1.0/post-groups/${id}/medias`,
                params: { pi, ps },
            }),
        }),

        // get info post group
        getInfoPostGroup: builder.query({
            query: ({ id }) => ({
                url: `v1.0/post-groups/${id}/`,
            }),
        }),

        // get brief Preview data
        getBriefPreview: builder.query({
            query: ({ id }) => `v1.0/medias/${id}/brief-preview`,
        }),

        // get latest media data
        getLatest: builder.query({
            query: () => ({
                url: "v1.0/medias/latest",
                params: { pi: 1, ps: 20 },
            }),
        }),

        // get data Exclusive default content
        getExclusiveContent: builder.query({
            query: ({ id, pi, ps }) => ({
                url: `v1.0/medias/exclusive-content/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data banner
        getBanner: builder.query({
            query: ({ id, pi, ps }) => ({
                url: `v1.0/medias/banners/${id}`,
                params: { pi, ps },
            }),
        }),

        // get data Exclusive default dubs
        getExclusiveDubs: builder.query({
            query: ({ id, pi = 1, ps = 20 }) => ({
                url: `v1.0/medias/exclusive-dubs/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data casts
        getCasts: builder.query({
            query: ({ id, pi, ps }) => ({
                url: `v1.0/casts/collection/${id}/`,
                params: { pi, ps },
            }),
        }),

        // get data categories
        getCategory: builder.query({
            query: ({ id, pi, ps }) => ({
                url: `v1.0/category-groups/${id}/latest-medias`,
                params: { pi, ps },
            }),
        }),

        // get latest series TV
        getLatestSeries: builder.query({
            query: ({ pi, ps }) => ({
                url: `v1.0/medias/latest-series`,
                params: { pi, ps },
            }),
        }),

        // get latest most popular
        getMostPopular: builder.query({
            query: ({ pi, ps }) => ({
                url: `v1.0/medias/latest-series`,
                params: { pi, ps },
            }),
        }),

        // get latest movies TV
        getLatestMovies: builder.query({
            query: ({ pi, ps }) => ({
                url: `v1.0/medias/latest-movies`,
                params: { pi, ps },
            }),
        }),

        // get unknown date published
        getUnknownDatePublished: builder.query({
            query: ({ id, pi, ps }) => ({
                url: `v1.0/medias/unknown-date-published/${id}`,
                params: { pi, ps },
            }),
        }),

        // get info tv
        getPlayInfo: builder.query({
            query: ({ id }) => ({
                url: `/v1.0/medias/${id}/preview`,
            }),
        }),

        // get data for single movie
        getSingleMovie: builder.query({
            query: ({ id }) => `v2.0/medias/${id}/single-movie`,
        }),

        // get data for single series
        getSingleSeries: builder.query({
            query: ({ id }) => `v2.0/medias/${id}/single-series`,
        }),

        // get data episodes series tv
        getEpisodes: builder.query({
            query: ({ id }) => `/v2.0/medias/seasons/${id}/episodes`,
        }),

        getRecommendItemForUser: builder.query({
            query: ({ id, pi, ps, iskid = false }) => ({
                url: `/v1.0/medias/${id}/recommend-items-anonymous-user`,
                params: { ps, pi, iskid },
            }),
        }),

        // /v1.0/category-groups/tops/tags/کمدی/latest-medias?pi=1&ps=21
        // get data tag
        getCategoryTag: builder.query({
            query: ({ slug, type }, pi, ps) => ({
                url: `v1.0/category-groups/${slug}/tags/${type}/latest-medias?pi=1&ps=21`,
                params: { pi, ps },
            }),
        }),

        // v1.0/casts/1278
        getCastById: builder.query({
            query: ({ id }) => `v1.0/casts/${id}`,
        }),
    }),
});

export const {
    useGetConfigQuery,
    useGetMenuQuery,
    useGetSliderQuery,
    useGetPostGroupQuery,
    useLazyGetPostGroupQuery,
    useGetBriefPreviewQuery,
    useGetLatestQuery,
    useLazyGetLatestQuery,
    useGetExclusiveContentQuery,
    useLazyGetExclusiveContentQuery,
    useGetBannerQuery,
    useLazyGetBannerQuery,
    useGetExclusiveDubsQuery,
    useLazyGetExclusiveDubsQuery,
    useGetCastsQuery,
    useLazyGetCastsQuery,
    useGetCategoryQuery,
    useLazyGetCategoryQuery,
    useGetLatestSeriesQuery,
    useLazyGetLatestSeriesQuery,
    useGetMostPopularQuery,
    useLazyGetMostPopularQuery,
    useGetLatestMoviesQuery,
    useLazyGetLatestMoviesQuery,
    useGetUnknownDatePublishedQuery,
    useLazyGetUnknownDatePublishedQuery,
    useGetPlayInfoQuery,
    useGetSingleMovieQuery,
    useGetSingleSeriesQuery,
    useGetEpisodesQuery,
    useLazyGetEpisodesQuery,
    useGetRecommendItemForUserQuery,
    useLazyGetRecommendItemForUserQuery,
    useLazyGetInfoPostGroupQuery,
    useGetInfoPostGroupQuery,
    useGetCategoryTagQuery,
    useLazyGetCategoryTagQuery,
    useGetCastByIdQuery,
    useLazyGetCastByIdQuery,
} = baseApiSlice;
