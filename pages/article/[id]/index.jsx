import style from "../../../styles/Article.module.css";
import { useRef } from "react";
import useCustomScroll from "../../../hooks/useCustomScroll";
import Head from "next/head";

const Article = ({ article }) => {
    const sliderRef = useRef();
    const [handleSliderScroll, handleSliderMouseOut] =
        useCustomScroll(sliderRef);

    return (
        <>
            <Head>
                <title>{article.title} | Desertwhales Academy</title>
                <meta name="description" content={article.summary} />
                <meta name="keywords" content={article.tags} />
            </Head>
            <section className={style.section}>
                <div className={style.containbox}>
                    <div className={style.sliderbox}>
                        <input
                            type="range"
                            id="scroll"
                            name="scroll"
                            className={style.slider}
                            min="0"
                            max="100"
                            step="any"
                            ref={sliderRef}
                            onChange={handleSliderScroll}
                            onMouseOut={handleSliderMouseOut}
                        />
                    </div>
                    <article className={style.article}>
                        <div className={style.imgbox}>
                            <img src={article.banner} alt="" />
                        </div>
                        <h1>{article.title}</h1>
                        <h6>{article.read_time} mins</h6>
                        <div
                            dangerouslySetInnerHTML={{ __html: article.body }}
                        ></div>
                    </article>
                </div>
            </section>
        </>
    );
};

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=1000, stale-while-revalidate=1000"
    );
    const { id } = context.params;
    const response = await fetch(`${process.env.BASE_URL}/api/article/${id}`);
    if (response.status === 404) {
        return { notFound: true };
    }
    const article = await response.json();
    return {
        props: { article },
    };
};

export default Article;
