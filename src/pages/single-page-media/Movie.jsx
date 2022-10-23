import { useGetSingleMovieQuery } from "../../features/apis/baseApi";

import { Banner, CarouselsPostCard, Gallery, InfoText } from "../../components";

const Movie = ({ id, name, config }) => {
    const { data, isSuccess } = useGetSingleMovieQuery(id);

    let content;
    if (isSuccess) {
        const dataContent = data?.result ?? undefined;
        const base = config?.result?.staticBaseUrl ?? "";

        content = dataContent && (
            <>
                <Banner base={base} dataContent={dataContent} name={name} />
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
                    name={name}
                    story={dataContent?.story}
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
                        caption: `ستارگان فیلم  ${name}`,
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
                        caption: `عوامل فیلم  ${name}`,
                    }}
                />
            </>
        );
    }

    return <div className="single-media">{content}</div>;
};

export default Movie;
