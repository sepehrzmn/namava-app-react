import { useParams } from "react-router-dom";

import {
    useGetCastByIdQuery,
    useGetConfigQuery,
} from "../../features/apis/baseApi";

import { CardPost } from "../../components";

import "./cast.scss";
import { Helmet } from "react-helmet";

const Cast = () => {
    const { id, name } = useParams();
    const { data, isSuccess } = useGetCastByIdQuery({ id });
    const { data: config } = useGetConfigQuery();

    let content;
    if (isSuccess) {
        const dataContent = data?.result ?? null;
        const base = config?.result?.staticBaseUrl ?? "";

        content = dataContent && (
            <>
                <Helmet>
                    {data?.result?.metaKeywords && (
                        <meta
                            name="keyword"
                            content={data.result.metaKeywords}
                        />
                    )}
                    {data?.result?.metaDescription && (
                        <meta
                            name="description"
                            content={data.result.metaDescription}
                        />
                    )}
                    {data?.result?.metaTitle && (
                        <title>{data.result.metaTitle}</title>
                    )}
                </Helmet>
                <div className="info container">
                    <div className="poster">
                        <img
                            src={`${base}${dataContent?.imageUrl}`}
                            alt={name.replace(/_/g, " ")}
                        />
                    </div>
                    <div className="text">
                        <h2> بیوگرافی {name.replace(/_/g, " ")}</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: dataContent?.fullDescription,
                            }}
                        />
                    </div>
                </div>
                <div className="medias container">
                    {dataContent.medias.map((item, index) => {
                        return <CardPost base={base} data={item} key={index} />;
                    })}
                </div>
            </>
        );
    }

    return <div className="cast-page">{content}</div>;
};

export default Cast;
