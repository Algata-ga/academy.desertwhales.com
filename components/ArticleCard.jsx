import tag_color from "../utils/tag_color";
import style from "../styles/ArticleCard.module.css";
import Image from "next/image";

const ArticleCard = ({ article, list }) => {
    const { title, banner, tags, level, read_time } = { ...article };
    return (
        <div className={list === true ? style.cardlist : style.card}>
            <a href={`/article/${title.replaceAll(" ", "_")}`}>
                <div className={style.imgbox}>
                    <Image className={style.img} src={banner} placeholder="blur" blurDataURL={banner} layout="fill" alt="banner img" />
                </div>
                <div className={style.content}>
                    <h4>{title}</h4>
                    <h5
                        className={style.h5}
                        style={{ color: `var(--level-${level.toLowerCase()})` }}
                    >
                        <div
                            className={style.dot}
                            style={{
                                background: `var(--level-${level.toLowerCase()})`,
                            }}
                        ></div>
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
                    <h6>{read_time} min</h6>
                </div>
            </a>
        </div>
    );
};

export default ArticleCard;
