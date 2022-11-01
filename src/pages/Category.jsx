import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import CheckComponent from "../components/check-component/CheckComponent";

const Category = ({ data }) => {
    const { slug, slugMore } = useParams();

    const pagesItems = data.find(
        (pageItem) =>
            pageItem.slug === (slugMore ? `${slug}-${slugMore}` : slug)
    );
    return (
        <>
            <CheckComponent data={pagesItems} Index={1} />
        </>
    );
};

export default Category;
