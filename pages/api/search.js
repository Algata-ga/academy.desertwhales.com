const handler = async (req, res) => {
    const { query } = req;
    const params = Object.keys(query).reduce(
        (prev, x) => prev + `&${x}=${query[x]}`,
        ""
    );
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/search?_format=json${params}`
    );
    const data = await response.json();
    const results = data.map((x) => {
        const { title, banner, level, tags, read_time } = x;
        return {
            title: title,
            banner: process.env.BACKEND_API_URL.replace("/api", "") + banner,
            level: level,
            tags: tags.split(","),
            read_time: read_time,
        };
    });

    return res.status(200).json(results);
};

export default handler;
