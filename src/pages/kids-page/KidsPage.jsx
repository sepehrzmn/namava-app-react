import CheckComponent from "../../components/check-component/CheckComponent";
import { useGetMenuQuery } from "../../features/apis/baseApi";

import "./kids-page.scss";

const KidsPage = ({ data, className }) => {
    const { data: menu } = useGetMenuQuery();

    const pagesItems = menu?.result?.find(
        (pageItem) => pageItem?.menuId === 27
    );
    return (
        <div className="kids-page">
            <CheckComponent data={pagesItems} />;
        </div>
    );
};

export default KidsPage;
