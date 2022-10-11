import React, { useMemo } from "react";
import { HeroSlide } from "../components";

const Index = ({ data }) => {
    const ids = useMemo(() => {
        const idsArray = [];
        data.pageItems.forEach((item) =>
            idsArray.push({ key: item.payloadKey, type: item.payloadType })
        );
        return idsArray;
    }, [data]);

    const Slider = ids.find((id) => id.type === "Slider");

    return (
        <>
            <HeroSlide data={Slider} />
        </>
    );
};

export default Index;
