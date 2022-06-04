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
    return res.status(200).json(data);
};

export default handler;
