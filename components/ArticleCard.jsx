import tag_color from "../utils/tag_color";
import style from "../styles/ArticleCard.module.css";

const ArticleCard = ({ article, list }) => {
    const { title, banner, tags, level, read_time } = { ...article };
    console.log(article);
    return (
        <div className={list === true ? style.cardlist : style.card}>
            <a href={`/article/${title.replaceAll(" ", "_")}`}>
                <div className={style.imgbox}>
                    <img src={banner} />
                </div>
                <div className={style.content}>
                    <h4>{title}</h4>
                    <br />
                    <h5
                        style={{ color: `var(--level-${level.toLowerCase()})` }}
                    >
                        {level}
                    </h5>
                    <p>
                        {tags.map((tag) => (
                            <span
                                style={{
                                    color: `${tag_color(tag)}`,
                                    border: `1px solid ${tag_color(tag)}`,
                                }}
                                key={tag}
                            >
                                {tag}
                            </span>
                        ))}
                    </p>
                    <h6>Reading time : {read_time}</h6>
                </div>
            </a>
        </div>
    );
};

export default ArticleCard;
