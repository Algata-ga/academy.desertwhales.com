const handler = async (req, res) => {
    const { query } = req;
    const params = Object.keys(query).reduce((prev, x) => {
        if (Array.isArray(query[x])) {
            return (
                prev + query[x].reduce((prev, cur) => prev + `&{x}=${cur}`, "")
            );
        }
        return prev + `&${x}=${query[x]}`;
    }, "");
    console.log(params);
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
