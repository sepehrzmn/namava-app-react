import "./gallery.scss";

const Gallery = () => {
    return (
        <div className="gallery container">
            {dataContent?.slideImageList.map((slideImage) => {
                return (
                    <Fragment key={slideImage?.url}>
                        <LazyLoadImage
                            src={`${base}${slideImage?.url}?anchor=middlecenter&crop=auto&scale=both&w=200&h=150`}
                            alt={slideImage?.title}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default Gallery;
