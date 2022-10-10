import { useMemo } from "react";

import { useGetMenuQuery } from "../../features/apis/baseApi";
import { Header } from "../";

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
        <div>
            <Header data={dataHeader} />
        </div>
    );
};

export default NamavaApp;
