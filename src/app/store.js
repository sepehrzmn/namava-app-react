import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { baseApiSlice } from "../features/apis/baseApi";

const rootReduce = combineReducers({
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
});

export default configureStore({
    reducer: rootReduce,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApiSlice.middleware),
});
