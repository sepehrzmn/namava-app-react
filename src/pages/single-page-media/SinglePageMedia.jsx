import { useParams } from "react-router-dom";

const SinglePageMedia = () => {
    const { type, id, namePe } = useParams();
    return <div>{namePe}</div>;
};

export default SinglePageMedia;
