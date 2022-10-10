import { useMemo } from "react";

import { useGetMenuQuery } from "../../features/apis/baseApi";
import { Header } from "../";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";

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
                <Content dataHeader={menu} />
            </div>
        );
    }

    return <>{content}</>;
};

const Content = ({ dataHeader }) => {
    return (
        <div style={{ height: "500vh" }}>
            <Header data={dataHeader} />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default NamavaApp;
