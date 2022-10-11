import { useMemo } from "react";

import { useGetMenuQuery } from "../../features/apis/baseApi";
import { Header } from "../";
import { Route, Routes } from "react-router-dom";
import Index from "../../pages/Index";

const Components = [{ name: "Index", Component: Index }];

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
            <div>
                <Content dataPages={menu} />
            </div>
        );
    }

    return <>{content}</>;
};

const Content = ({ dataPages }) => {
    return (
        <div>
            <Header data={dataPages} />
            <Routes>
                <>
                    {dataPages.map((data) => {
                        const Component = Components.find(
                            (item) => item.name === data.entityType
                        );
                        if (Component) {
                            return (
                                <Route
                                    key={data.slug}
                                    path={`/${data.slug}`}
                                    element={
                                        <Component.Component data={data} />
                                    }
                                />
                            );
                        }
                        return "";
                    })}
                </>
            </Routes>
        </div>
    );
};

export default NamavaApp;
