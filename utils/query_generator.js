const query_generator = (params) => {
    const tags_string =
        params.tags.length !== 0
            ? params.tags.reduce((prev, x) => prev + `&tags[]=${x}`, "")
            : "";
    const level_string =
        params.level !== null ? `&difficulty[]=${params.level}` : "";
    const reading_time_string =
        params.reading_time !== 0 ? `&reading_time=${params.reading_time}` : "";
    const title_string = params.title !== null ? `&title=${params.title}` : "";
    return tags_string + level_string + reading_time_string + title_string;
};

export default query_generator;
