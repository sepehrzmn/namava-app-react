import "./App.scss";
import { useGetConfigQuery } from "./features/apis/baseApi";

import { NamavaApp } from "./components";

function App() {
    const { isError, error, isFetching, isLoading, isSuccess } =
        useGetConfigQuery();

    let content;

    if (isLoading || isFetching) {
        content = <div className=""></div>;
    } else if (isError) {
        <div>{error.message.toString()}</div>;
    } else if (isSuccess) {
        content = (
            <div>
                <NamavaApp />
            </div>
        );
    }

    return <>{content}</>;
}

export default App;
