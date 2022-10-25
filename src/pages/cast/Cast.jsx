import { useParams } from "react-router-dom";
import { useGetCastByIdQuery } from "../../features/apis/baseApi";

const Cast = () => {
    const { id, name } = useParams();
    const { data, isSuccess } = useGetCastByIdQuery({ id });

    if (isSuccess) {
        console.log(data);
    }

    return <div>Cast</div>;
};

export default Cast;
