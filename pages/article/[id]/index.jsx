import style from "../../../styles/Article.module.css";
import { useRef } from "react";
import useCustomScroll from "../../../hooks/useCustomScroll";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FaCopy } from "react-icons/fa"


const Article = ({ article }) => {
    const sliderRef = useRef();
    const [handleSliderScroll, handleSliderMouseOut] =
        useCustomScroll(sliderRef);
    const [font, setFont] = useState(0)
    const [copied, setCopied] = useState(false);

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
                    <article className={style.article + " " +  style.font0 }>
                        <div className={style.selection}>

                            <div>
                            <label htmlFor="font1">small</label>
                            <input type="radio" id="font1" name="font" onClick={(font)=>setFont(0)}/>
                            </div>
                            <div>
                            <label htmlFor="font2">medium</label>
                            <input type="radio" id="font2" name="font" onClick={(font)=>setFont(1)}/>
                            </div>
                            <div>
                            <label htmlFor="font3">large</label>
                            <input type="radio" id="font3" name="font" onClick={(font)=>setFont(2)}/>
                            </div>
                            <div className={style.copy} onClick={()=>{
                                {
                                    const el = document.createElement('input');
                                    el.value = window.location.href;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(el);
                                    setCopied(true);
                                  }
                            }}>
                                {!copied ? "<FaCopy />" : "Copied!"} 
                            </div>
                            
                        </div>
                        <div className={style.imgbox}>
                            <Image src={article.banner} layout="fill" placeholder="blur" blurDataURL={article.banner} alt="banner" />
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
