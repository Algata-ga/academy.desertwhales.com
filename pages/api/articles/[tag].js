const handler = async (req, res) => {
    const { tag } = req.query;
    const query_params = tag === "latest" ? "" : "?tags=" + tag;

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/feed${query_params}`
    );
    const data = await response.json();

    const results = data.map((x) => {
        const { title, banner, level, tags, read_time } = x;
        const article = {
            title: title,
            banner: process.env.BACKEND_API_URL.replace("/api", "") + banner,
            level: level,
            tags: tags.split(","),
            read_time: read_time,
        };
        return article;
    });

    res.status(200).json(results);
};
export default handler;
