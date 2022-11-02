import {
    useGetSingleMovieQuery,
    useLazyGetRecommendItemForUserQuery,
} from "../../features/apis/baseApi";

import {
    Banner,
    CarouselsPostCard,
    Gallery,
    InfoText,
    LazyComponent,
} from "../../components";
import { Helmet } from "react-helmet";

const Movie = ({ id, name, config, isKids }) => {
    const { data, isSuccess } = useGetSingleMovieQuery({ id });

    let content;
    if (isSuccess) {
        const dataContent = data?.result ?? undefined;
        const base = config?.result?.staticBaseUrl ?? "";

        const nameSet = name.split("_").join(" ");

        content = dataContent && (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content={dataContent?.metaDescription}
                    />
                    <meta name="keywords" content={dataContent?.metaKeywords} />
                    <title> {nameSet}</title>
                </Helmet>
                <Banner
                    base={base}
                    dataContent={dataContent}
                    name={nameSet}
                    isKids={isKids}
                />
                <div className="container">
                    <Gallery
                        slides={dataContent?.slideImageList}
                        base={base}
                        top
                    />
                </div>

                <InfoText
                    about={dataContent?.about}
                    movieLatinName={dataContent?.movieLatinName}
                    name={nameSet}
                    story={dataContent?.story}
                    isKids={isKids}
                />
                <CarouselsPostCard
                    castCard
                    config={config}
                    posts={dataContent.casts.filter(
                        (item) => item.castRole === "Actor"
                    )}
                    data={{
                        key: "",
                        type: "",
                        caption: `ستارگان فیلم  ${nameSet}`,
                    }}
                />
                <CarouselsPostCard
                    castCard
                    config={config}
                    posts={dataContent.casts.filter(
                        (item) => item.castRole !== "Actor"
                    )}
                    data={{
                        key: "",
                        type: "",
                        caption: `عوامل فیلم  ${nameSet}`,
                    }}
                />
                <LazyComponent
                    data={{ key: id }}
                    useLazyApi={useLazyGetRecommendItemForUserQuery}
                />
            </>
        );
    }

    return <div className="single-media">{content}</div>;
};

export default Movie;
