const handler = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/article/${id.replaceAll(
            "_",
            " "
        )}?_format=json`
    );
    const data = await response.json();
    if (data.length === 0)
        res.status(404).json({ message: "article not found" });

    const { title, banner, level, tags, summary, body } = data[0];
    const article = {
        title: title,
        banner: process.env.BACKEND_API_URL.replace("/api", "") + banner,
        level: level,
        tags: tags.split(","),
        summary: summary,
        body: body,
    };

    res.status(200).json(article);
};

export default handler;
