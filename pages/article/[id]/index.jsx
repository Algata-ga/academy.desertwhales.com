import { Router } from "next/router";
import { Container } from "react-bootstrap";
import style from "../../../styles/Article.module.css"

const article = ({ article }) => {
    // TODO : add slider

    return (
        <section className={style.section}>
            <div className={style.containbox}>
            <div className={style.sliderbox}>
                <input type="range" id="scroll" name="scroll" className={style.slider}
                    min="0" max="100" />
                    </div>
                    {/*
                    <div className={style.slider}>
                        <div className={style.inner + ' ' + "inner"}></div>
                        <div className={style.round + ' ' + "round"}></div>
                    </div>
    </div>*/}
                    <article className={style.article}>
                        <img src={article.banner} alt="" />
                        <h1>{article.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
                    </article>
            </div>
            <style jsx>{`
        .inner{
            width: 40%;
        }
        .round{
            left: 40%;   
        }

    `}</style>
        </section>

    );
};

export const getServerSideProps = async (context) => {
    const article = {
        banner: "https://picsum.photos/500/300",
        title: "Lorem Ipsum Dolor LoL",
        body: '<p>Lorem ipsum dolor sit amet, consectetur</p>\n\n<blockquote> \n <p>Lorem ipsum dolor sit amet, consectetur</p>\n</blockquote>\n\n<p><a href="https://loremipsum.io/">see source</a></p>\n\n<p> <u>Lorem ipsum dolor sit amet</u>, consectetur adipiscing elit, sed do eiusmod tempor incididuntEtiam sit amet nisl purus in. Neque laoreet suspendisse interdum consectetur libero id.<em> Proin fermentum leo vel orci porta non. </em >Nec feugiat nisl pretium fusce. Molestie nunc non blandit massa enim. Pellentesque nec nam aliquam sem et tortor consequat. Consequat ac felis donec et. Sed augue lacus viverra vitae congue eu consequat ac. Condimentum id venenatis a condimentum vitae sapien pellentesque. Faucibus nisl tincidunt eget <strong>nullam</strong>. Posuere urna nec tincidunt praesent semper. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sed faucibus turpis in eu mi. Ac odio tempor orci dapibus ultrices in iaculis nunc. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Ut pharetra sit amet aliquam id diam.</p>\n\n<p> </p>\n\n<p> <img alt="sdada" data-entity-type="file" data-entity-uuid="ca5c3e36-a700-456f-9b84-1ae780dad808" src="https://dwadmin.preview.algata.in/sites/default/files/inline-images/2022-05-18T22%3A42%3A31%2C838081690%2B05%3A30.png" width="670" height="315" loading="lazy"/></p>\n\n<p> </p>\n\n<ul> \n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n</ul>\n\n<p>Lorem ipsum dolor</p>\n\n<ol> \n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n\t <li>Lorem ipsum dolor sit amet, consectetur</li>\n</ol>\n\n<p> <img alt="asdasd" data-entity-type="file" data-entity-uuid="a4e7c3c1-150a-4d59-b645-56ea687a9ecf" src="https://dwadmin.preview.algata.in/sites/default/files/inline-images/2022-05-18T22%3A41%3A19%2C079438744%2B05%3A30.png" width="500" height="254" loading="lazy"/></p>\n\n<p> </p>\n\n<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntEtiam sit amet nisl purus in. Neque laoreet suspendisse interdum consectetur libero id. Proin fermentum leo vel orci porta non. Nec feugiat nisl pretium fusce. Molestie nunc non blandit massa enim. Pellentesque nec nam aliquam sem et tortor consequat. Consequat ac felis donec et. Sed augue lacus viverra vitae congue eu consequat ac. Condimentum id venenatis a condimentum vitae sapien pellentesque. Faucibus nisl tincidunt eget nullam. Posuere urna nec tincidunt praesent semper. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Sed faucibus turpis in eu mi. Ac odio tempor orci dapibus ultrices in iaculis nunc. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed. Ut pharetra sit amet aliquam id diam.</p>',
    };

    return {
        props: { article },
    };
};

export default article;
