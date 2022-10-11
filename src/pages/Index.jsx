import React, { useMemo } from "react";
import {
    HeroSlide,
    PostGroup,
    ExclusiveDubs,
    Latest,
    CategoryGroup,
    StarGroup,
    BannerGroup,
} from "../components";

const Index = ({ data }) => {
    const Components = [
        {
            name: "Slider",
            Component: HeroSlide,
        },
        { name: "PostGroup", Component: PostGroup },
        { name: "ExclusiveDubs", Component: ExclusiveDubs },
        { name: "Latest", Component: Latest },
        { name: "CategoryGroup", Component: CategoryGroup },
        { name: "StarGroup", Component: StarGroup },
        { name: "BannerGroup", Component: BannerGroup },
    ];

    const ids = useMemo(() => {
        const idsArray = [];
        data.pageItems.forEach((item) =>
            idsArray.push({ key: item.payloadKey, type: item.payloadType })
        );
        return idsArray;
    }, [data]);

    return (
        <>
            {/* <HeroSlide data={Slider} /> */}
            {ids.map((id) => {
                const Component = Components.find(
                    (component) => component.name === id.type
                );
                console.log(id);

                if (Component) {
                    return <Component.Component data={id} />;
                }

                if (data.type === "") return "";

                return "";
            })}
        </>
    );
};

export default Index;
