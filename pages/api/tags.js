const handler = async (req, res) => {
    const response = await fetch(`${process.env.BACKEND_API_URL}/tags`);
    const data = await response.json();

    const tags = data.map((x) => x.name);
    res.status(200).json(tags);
};

export default handler;
