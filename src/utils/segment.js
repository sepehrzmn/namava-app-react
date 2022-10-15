import HeroSlide from "../components/hero-slide/HeroSlide";
import BannerGroup from "../components/banner-group/BannerGroup";
import CategoryGroup from "../components/category-group/CategoryGroup";
import ExclusiveContent from "../components/exclusive-content/ExclusiveContent";
import ExclusiveDubs from "../components/exclusive-dubs/ExclusiveDubs";
import Latest from "../components/latest/Latest";
import PostGroup from "../components/post-group/PostGroup";
import StarGroup from "../components/star-group/StarGroup";
import LatestSeries from "../components/latest-series/LatestSeries";

import { Index, Movies, Series, LatestPage } from "../pages/index";
import MostPopular from "../components/most-popular/MostPopular";
import LatestMovies from "../components/latest-movies/LatestMovies";

export const componentsPages = [
    { name: "Index", Component: Index },
    { name: "Movies", Component: Movies },
    { name: "Series", Component: Series },
    { name: "Latest", Component: LatestPage },
];

export const componentsPageItems = [
    {
        name: "Slider",
        Component: HeroSlide,
    },
    { name: "PostGroup", Component: PostGroup },
    { name: "ExclusiveContent", Component: ExclusiveContent },
    { name: "ExclusiveDubs", Component: ExclusiveDubs },
    { name: "Latest", Component: Latest },
    { name: "CategoryGroup", Component: CategoryGroup },
    { name: "StarGroup", Component: StarGroup },
    { name: "BannerGroup", Component: BannerGroup },
    { name: "LatestSeries", Component: LatestSeries },
    { name: "MostPopular", Component: MostPopular },
    { name: "LatestMovies", Component: LatestMovies },
];
