import style from "../../../styles/Article.module.css";
import ReactDOMServer from "react-dom/server";
import parse, { domToReact } from "html-react-parser";
import { useRef } from "react";
import useCustomScroll from "../../../hooks/useCustomScroll";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { BsFonts } from "react-icons/bs";
import { ImFontSize } from "react-icons/im";
import { RiFontSize2 } from "react-icons/ri";

const Article = ({ article }) => {
    const sliderRef = useRef();
    const [handleSliderScroll, handleSliderMouseOut] =
        useCustomScroll(sliderRef);

    const [font, setFont] = useState(0);
    const getFont = () => {
        switch (font) {
            case 0:
                return style.font1;
            case 1:
                return style.font2;
            case 2:
                return style.font3;
        }
    };

    useEffect(() => {}, []);

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

                    <div className={style.selection}>
                        <div className={style.radios}>
                            <div className={style.radio}>
                                <input
                                    type="radio"
                                    id="font1"
                                    name="font"
                                    onClick={() => setFont(2)}
                                    checked={2 === font}
                                />
                                <label htmlFor="font1">
                                    <RiFontSize2 />
                                </label>
                            </div>
                            <div className={style.radio}>
                                <input
                                    type="radio"
                                    id="font2"
                                    name="font"
                                    onClick={() => setFont(0)}
                                    checked={0 === font}
                                />
                                <label htmlFor="font2">
                                    <BsFonts />
                                </label>
                            </div>
                            <div className={style.radio}>
                                <input
                                    type="radio"
                                    id="font3"
                                    name="font"
                                    onClick={() => setFont(1)}
                                    checked={1 === font}
                                />
                                <label htmlFor="font3">
                                    <ImFontSize />
                                </label>
                            </div>
                        </div>
                        <div
                            className={style.share}
                            onClick={() => {
                                {
                                    const el = document.createElement("input");
                                    el.value = window.location.href;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand("copy");
                                    document.body.removeChild(el);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2500);
                                }
                            }}
                        >
                            {!copied ? <FaShare /> : "Copied!"}
                        </div>
                    </div>
                    <article className={style.article + " " + getFont()}>
                        <div className={style.imgbox}>
                            <Image
                                src={article.banner}
                                layout="fill"
                                placeholder="blur"
                                blurDataURL={article.banner}
                                alt="banner"
                            />
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
    const og_article = await response.json();
    const { body, ...rest_of_article } = { ...og_article };

    //this is not good, make a npm package
    let urls = [];
    parse(body, {
        replace: (x) => {
            if (x.name === "oembed" && x.type === "tag") {
                urls.push(x.children[0].attribs.href);
            }
        },
    });

    const html_embeds = await Promise.all(
        urls.map((x) =>
            fetch(`https://${process.env.IFRAMELY_URL}/oembed?url=${x}`)
                .then((x) => x.json())
                .then((x) => x.html)
        )
    );
    let index = -1;

    const parsed_body = parse(body, {
        htmlparser2: {
            xmlMode: true,
        },
        replace: (x) => {
            if (x.name === "oembed" && x.type === "tag") {
                index += 1;
                if (typeof html_embeds[index] !== "string") {
                    return x;
                }
                const parsed = parse(`<div>${html_embeds[index]}</div>`);
                return parsed;
            }
            return x;
        },
    });

    const article = {
        ...rest_of_article,
        body: ReactDOMServer.renderToStaticMarkup(parsed_body),
    };

    return {
        props: { article },
    };
};

export default Article;
