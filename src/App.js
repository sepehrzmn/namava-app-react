import "./App.scss";

import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
            <>
                <NamavaApp />
            </>
        );
    }

    return <>{content}</>;
}

export default App;
