import { Fragment } from "react";

const ListHorizontal = ({ title, dataContent, itemName }) => {
    return (
        <>
            {dataContent?.length ? (
                <div className="">
                    <span>{title}:‌ </span>
                    {dataContent.map((cast, index) => {
                        return (
                            <Fragment key={index}>
                                <span
                                    className={
                                        index === dataContent.length - 1
                                            ? ""
                                            : "space"
                                    }
                                >
                                    {cast?.[itemName]}
                                </span>
                            </Fragment>
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default ListHorizontal;
