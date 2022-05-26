import tag_color from "../utils/tag_color";

const ArticleCard = ({ article }) => {
    const { title, banner, tags, body, level } = { ...article };
    return (
        <div>
            <a href={`/article/${title.replaceAll(" ", "_")}`}>
                <img src={banner} height="250px" width="250px" />
                <h4>{title}</h4>
                <h7>lorem ipsum...</h7>
                {/*make it show the first 2 lines of body*/}
                <br />
                {tags.map((tag) => (
                    <span style={{ color: `${tag_color(tag)}` }}>{tag}</span>
                ))}
                <h5 style={{ color: `var(--level-${level.toLowerCase()})` }}>
                    {level}
                </h5>
            </a>
        </div>
    );
};

export default ArticleCard;
