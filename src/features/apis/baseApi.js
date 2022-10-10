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
    }),
});

export const { useGetConfigQuery, useGetMenuQuery } = baseApiSlice;
