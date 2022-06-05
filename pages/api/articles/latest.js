const handler = async (req, res) => {
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/latest_articles?_format=json`
    );
    const data = await response.json();
    const latest_articles = data.map((x) => {
        const { title, banner, level, tags, read_time } = x;
        return {
            title: title,
            banner: process.env.BACKEND_API_URL.replace("/api", "") + banner,
            level: level,
            tags: tags.split(","),
            read_time: read_time,
        };
    });
    return res.status(200).json(latest_articles);
};

export default handler;
