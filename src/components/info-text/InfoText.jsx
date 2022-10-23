import "./info-text.scss";

const InfoText = ({ movieLatinName, name, story, about, top }) => {
    return (
        <div className={`info-text container ${top ? "top" : ""}`}>
            <h3>{movieLatinName ?? "movieLatinName not found!"}</h3>
            <h2>{name ?? "name not found!"}</h2>
            <p>{story ?? "story not found!"}</p>

            <p
                dangerouslySetInnerHTML={{
                    __html: about ?? "about not found!",
                }}
            />
        </div>
    );
};

export default InfoText;
