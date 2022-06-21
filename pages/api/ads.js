const handler = async (req, res) => {
    const response = await fetch(
        `${process.env.BACKEND_API_URL}/ads_feed?_format=json`
    );
    const data = await response.json();

    const results = data.map((x) => {
        const { title, image } = x;
        const ad = {
            title: title,
            image: process.env.BACKEND_API_URL.replace("/api", "") + image,
        };
        return ad;
    });
    console.log(results);
    res.status(200).json(results);
};

export default handler;
