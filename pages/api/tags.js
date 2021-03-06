const handler = async (req, res) => {
    const response = await fetch(`${process.env.BACKEND_API_URL}/tags`);
    const data = await response.json();

    res.status(200).json(data);
};

export default handler;
