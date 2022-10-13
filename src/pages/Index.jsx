import React, { useMemo } from "react";
import {
    HeroSlide,
    PostGroup,
    ExclusiveContent,
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
        { name: "ExclusiveContent", Component: ExclusiveContent },
        { name: "Latest", Component: Latest },
        { name: "CategoryGroup", Component: CategoryGroup },
        { name: "StarGroup", Component: StarGroup },
        { name: "BannerGroup", Component: BannerGroup },
    ];
    const ids = useMemo(() => {
        const idsArray = [];
        data.pageItems.forEach((item) =>
            idsArray.push({
                key: item.payloadKey,
                type: item.payloadType,
                caption: item.caption,
            })
        );
        return idsArray;
    }, [data]);

    return (
        <>
            {ids.map((id, index) => {
                const Component = Components.find(
                    (component) => component.name === id.type
                );

                if (data.key === "") return "";
                if (Component) {
                    return (
                        <Component.Component
                            key={index}
                            data={id}
                            className={index === 2 ? true : false}
                        />
                    );
                }

                return "";
            })}
        </>
    );
};

export default Index;
