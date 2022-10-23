import { useMemo } from "react";

import { useGetMenuQuery } from "../../features/apis/baseApi";
import { Header } from "../";
import { Navigate, Route, Routes } from "react-router-dom";

import { componentsPages } from "../../utils/segment";

import { Collection, SinglePageMedia } from "../../pages";

const NamavaApp = () => {
    const {
        data = [],
        isError,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetMenuQuery();

    const menu = useMemo(() => {
        if (data?.result || Boolean(data?.succeeded)) {
            return data?.result.filter((item) => Number(item?.parentId) === 1);
        } else return [];
    }, [data]);

    let content;

    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <>
                <Content dataPages={menu} />
            </>
        );
    }

    return <>{content}</>;
};

const Content = ({ dataPages }) => {
    return (
        <>
            <Header data={dataPages} />
            <main>
                <Routes>
                    <>
                        {dataPages.map((data) => {
                            const Component = componentsPages.find(
                                (item) => item.name === data.entityType
                            );

                            if (Component) {
                                return (
                                    <Route
                                        key={data.slug}
                                        path={`/${
                                            data.slug === "index"
                                                ? ""
                                                : data.slug
                                        }`}
                                        element={
                                            <Component.Component
                                                data={data}
                                                dataPages={dataPages}
                                            />
                                        }
                                    />
                                );
                            }
                            return "";
                        })}
                    </>
                    <Route
                        path="/:type/:id-:namePe"
                        element={<SinglePageMedia />}
                    />
                    <Route
                        path="/:collection-:id-:slug"
                        element={<Collection />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </>
    );
};

export default NamavaApp;
