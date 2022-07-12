import parse from "html-react-parser";
import { useMemo } from "react";

const getOembedTagURLs = (body) => {
    let urls = [];
    parse(body, {
        replace: (x) => {
            if (x.name === "oembed" && x.type === "tag") {
                urls.push(x.children[0].attribs.href);
            }
        },
    });
    return urls;
};
const getHTMLforOembedURLs = async (urls) => {
    const html_embeds = await Promise.all(
        urls.map((x) =>
            fetch(`https://${process.env.IFRAMELY_URL}/oembed?url=${x}`)
                .then((x) => x.json())
                .then((x) => x.html)
        )
    );
    return html_embeds;
};
const oembedTagToHTML = async (body) => {
    let urls = getOembedTagURLs(body);
    const html_embeds = await getHTMLforOembedURLs(urls);

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
    return parsed_body;
};

export default oembedTagToHTML;
