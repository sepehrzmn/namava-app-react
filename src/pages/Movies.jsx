import { useMemo } from "react";
import { componentsPageItems } from "../utils/segment";

const Movies = ({ data }) => {
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
                const Component = componentsPageItems.find(
                    (component) => component.name === id.type
                );

                if (data.key === "") return "";
                if (Component) {
                    return (
                        <Component.Component
                            key={index}
                            data={id}
                            className={index === 1 ? true : false}
                        />
                    );
                }

                return "";
            })}
        </>
    );
};

export default Movies;
