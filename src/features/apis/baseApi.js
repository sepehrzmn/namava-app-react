import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.namava.ir/api" }),
    endpoints: (builder) => ({
        getConfig: builder.query({
            query: () => "/v1.0/applications/configs",
        }),
        getMenu: builder.query({
            query: () => "/v3.0/menus",
        }),
        getSlider: builder.query({
            query: (id) => `/v2.0/medias/sliders/${id}`,
        }),
        getPostGroup: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/post-groups/${id}/medias`,
                params: { pi, ps },
            }),
        }),
        getBriefPreview: builder.query({
            query: (id) => `v1.0/medias/${id}/brief-preview`,
        }),
        getLatest: builder.query({
            query: (pi = 1, ps = 20) => ({
                url: "/v1.0/medias/latest",
                params: { pi, ps },
            }),
        }),
        getExclusiveContent: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/exclusive-content/${id}/`,
                params: { pi, ps },
            }),
        }),

        getBanner: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/banners/${id}`,
                params: { pi, ps },
            }),
        }),

        getExclusiveDubs: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/medias/exclusive-dubs/${id}/`,
                params: { pi, ps },
            }),
        }),

        getCasts: builder.query({
            query: (id, pi = 1, ps = 20) => ({
                url: `v1.0/casts/collection/${id}/`,
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
} = baseApiSlice;
