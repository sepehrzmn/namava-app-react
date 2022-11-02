import { lazy } from "react";

// export { default as Index } from "./Index";
export const Index = lazy(() => import("./Index.jsx"));

// export { default as Movies } from "./Movies";
export const Movies = lazy(() => import("./Movies.jsx"));

// export { default as Series } from "./Series";
export const Series = lazy(() => import("./Series.jsx"));

// export { default as LatestPage } from "./LatestPage";
export const LatestPage = lazy(() => import("./LatestPage.jsx"));

// export { default as SinglePageMedia } from "./single-page-media/SinglePageMedia";
export const SinglePageMedia = lazy(() =>
    import("./single-page-media/SinglePageMedia.jsx")
);

// export { default as Collection } from "./collection/Collection";
export const Collection = lazy(() => import("./collection/Collection.jsx"));

// export { default as Category } from "./Category";
export const Category = lazy(() => import("./Category"));

// export { default as Cast } from "./cast/Cast";
export const Cast = lazy(() => import("./cast/Cast.jsx"));

// export { default as KidsPage } from "./kids-page/KidsPage";
export const KidsPage = lazy(() => import("./kids-page/KidsPage.jsx"));

// export { default as CategoryList } from "./category-list/CategoryList";
export const CategoryList = lazy(() =>
    import("./category-list/CategoryList.jsx")
);
