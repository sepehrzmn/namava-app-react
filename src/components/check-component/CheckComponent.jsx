import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { useLazyGetCategoryTagQuery } from "../../features/apis/baseApi";

import { componentsPageItems } from "../../utils/segment";
import LazyComponent from "../lazy-component/LazyComponent";

const CheckComponent = ({ data, Index }) => {
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

    const idsTags = data?.tagItems ?? {};

    return (
        <>
            <Helmet>
                <meta name="description" content={data?.metaDescription} />
                <meta name="keywords" content={data?.metaKeywords} />
                <title>{data?.metaTitle}</title>
            </Helmet>
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
                            className={index === Index ? true : false}
                        />
                    );
                }

                return "";
            })}
            {idsTags.length
                ? idsTags.map((item, index) => {
                      return (
                          <LazyComponent
                              key={index}
                              data={item}
                              useLazyApi={useLazyGetCategoryTagQuery}
                              slugItem={data.slug}
                          />
                      );
                  })
                : ""}
        </>
    );
};

export default CheckComponent;
