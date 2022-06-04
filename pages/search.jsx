import SearchResultsView from "../components/SearchResultsView";
import tag_color from "../utils/tag_color";
import useSearch from "../hooks/useSearch";

import { useState, useEffect, useRef } from "react";

const Search = ({ tags, initialData }) => {
    const [results, setResults] = useState(initialData);
    const [params, setParams] = useState({});
    const filterFormRef = useRef();

    const { data, isLoading, isError } = useSearch(params);

    useEffect(() => console.log("hi") && console.log(data), [data]);

    const handleSearch = () => {
        const data = new FormData(filterFormRef.current);
        const value = Object.fromEntries(data.entries());
        console.log(value);
    };

    return (
        <>
            <fieldset>
                <form onChange={handleSearch} ref={filterFormRef}>
                    <h2>Tags</h2>
                    {tags.map((x) => (
                        <>
                            <label htmlFor={x} style={{ color: tag_color(x) }}>
                                {x}
                            </label>
                            <input value={x} name="tags" type="checkbox" />
                        </>
                    ))}
                    <h2>Level</h2>
                    {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((x) => (
                        <span
                            key={x}
                            style={{
                                color: `var(--level-${x.toLowerCase()})`,
                            }}
                        >
                            <label htmlFor={x.toLowerCase}>{x}</label>
                            <input
                                name="level"
                                value={x.toLowerCase()}
                                type="radio"
                            />
                        </span>
                    ))}
                    <h2>Reading Time</h2>
                    <input type="range" name="reading_time" />
                </form>
            </fieldset>
            {isLoading || results.length === 0 ? (
                <h2>Loading</h2>
            ) : (
                <SearchResultsView data={results} />
            )}
        </>
    );
};

export const getServerSideProps = async ({ req, res }) => {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=600"
    );

    const articles_response = await fetch(
        `${process.env.BASE_URL}/api/articles/latest`
    );
    const latest_articles = await articles_response.json();

    const response = await fetch(process.env.BASE_URL + "/api/tags");
    const tags = await response.json();

    return { props: { tags, initialData: latest_articles } };
};

export default Search;
