import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./gallery.scss";

const Gallery = ({ base, slides }) => {
    console.log(slides);
    return (
        <div className="gallery">
            {slides
                ? slides.map((slideImage) => {
                      return (
                          <Fragment key={slideImage?.url}>
                              <LazyLoadImage
                                  src={`${base}${slideImage?.url}?anchor=middlecenter&crop=auto&scale=both&w=200&h=150`}
                                  alt={slideImage?.title}
                              />
                          </Fragment>
                      );
                  })
                : ""}
        </div>
    );
};

export default Gallery;
