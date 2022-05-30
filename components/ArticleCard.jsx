import tag_color from "../utils/tag_color";
import style from '../styles/ArticleCard.module.css'

const ArticleCard = ({ article }) => {
    const { title, banner, tags, body, level } = { ...article };
    return (
        <div className={style.card}>
            <a href={`/article/${title.replaceAll(" ", "_")}`}>
                <img src={banner} height="250px" width="250px" />
                <h4>{title}</h4>
                <h6 className={style.lines}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, eaque?</h6>
                {/*make it show the first 2 lines of body*/}
                <br />
                <h5 style={{ color: `var(--level-${level.toLowerCase()})` }}>
                    {level}
                </h5>
                <p>{tags.map((tag) => (
    
    <span style={{ color: `${tag_color(tag)}`,border: `1px solid ${tag_color(tag)}` }}>{tag}</span>
                ))}</p>

            </a>
        </div>
    );
};

export default ArticleCard;
