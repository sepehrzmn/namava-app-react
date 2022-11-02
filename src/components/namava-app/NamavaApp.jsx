import { Suspense, useMemo } from "react";

import { useGetMenuQuery } from "../../features/apis/baseApi";
import { Header } from "../";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { componentsPages } from "../../utils/segment";

import { Cast, Category, Collection, SinglePageMedia } from "../../pages";
import { useEffect } from "react";
import Loading from "../loading/Loading";

const NamavaApp = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0 });

        window.location.pathname === "/kids" ||
        window.location.search.split("=")[1]
            ? document.body.classList.add("kids")
            : document.body.classList.remove("kids");
    }, [pathname]);

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

    const categoriesMemo = useMemo(() => {
        if (data?.result || Boolean(data?.succeeded)) {
            return data?.result.filter((item) => Number(item?.parentId) === 5);
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
                <Content dataPages={menu} dataCategory={categoriesMemo} />
            </>
        );
    }

    return <>{content}</>;
};

const Content = ({ dataPages, dataCategory }) => {
    return (
        <>
            <Header data={dataPages} />
            <Suspense fallback={<Loading />}>
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
                            path="/collection-:id-:slug"
                            element={<Collection />}
                        />
                        <Route path="/category">
                            <Route
                                path=":slug"
                                element={<Category data={dataCategory} />}
                            />
                            <Route
                                path=":slug-:slugMore"
                                element={<Category data={dataCategory} />}
                            />
                        </Route>
                        <Route path="/person-:id-:name" element={<Cast />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </Suspense>
        </>
    );
};

export default NamavaApp;
