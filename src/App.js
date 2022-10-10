import "./App.css";
import { useGetConfigQuery } from "./features/apis/baseApi";

import { NavamaApp } from "./components";

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
                <NavamaApp />
            </div>
        );
    }

    return <>{content}</>;
}

export default App;
