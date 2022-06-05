import SearchResultsView from "../components/SearchResultsView";
import MultiSelectionButtons from "../components/MultiSelectionButtons";
import useSearch from "../hooks/useSearch";
import style from "../styles/Search.module.css";

import { useEffect, useReducer } from "react";

const Search = ({ tags, difficulty, initialData }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "level":
                return { ...state, level: action.value };
            case "tags":
                if (state.tags.includes(action.value)) {
                    const updatedTags = state.tags.filter(
                        (x) => x !== action.value
                    );
                    return { ...state, tags: updatedTags };
                } else {
                    return { ...state, tags: [...state.tags, action.value] };
                }
            case "reading_time":
                return { ...state, reading_time: action.value };
            case "reset":
                return { tags: [], level: null, reading_time: 0 };
        }
    };

    const [filterParams, dispatch] = useReducer(reducer, {
        tags: [],
        level: null,
        reading_time: 0,
    });

    const query_generator = (params) => {
        const tags_string =
            params.tags.length !== 0
                ? params.tags.reduce((prev, x) => prev + `&tags[]=${x}`, "")
                : "";
        const level_string =
            params.level !== null ? `&difficulty[]=${params.level}` : "";
        const reading_time_string =
            params.reading_time !== 0
                ? `&reading_time=${params.reading_time}`
                : "";

        return tags_string + level_string + reading_time_string;
    };

    const { data, isLoading, isError } = useSearch(
        query_generator(filterParams)
    );

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className={style.search}>
            <div className={style.searchcontain}>
                <div className={style.form}>
                    <h2>Tags</h2>
                    <MultiSelectionButtons
                        list={tags}
                        toggleStates={filterParams.tags}
                        setCurrentSelection={(x) =>
                            dispatch({ type: "tags", value: x })
                        }
                    />
                    <h2>Level</h2>
                    {difficulty.map((x) => (
                        <span
                            key={x.name}
                            style={{
                                color: `var(--level-${x.name.toLowerCase()})`,
                            }}
                        >
                            <label htmlFor={x.name.toLowerCase()}>
                                {x.name}
                            </label>

                            <input
                                name="level"
                                value={x.name.toLowerCase()}
                                type="radio"
                                onChange={(e) => {
                                    e.preventDefault();
                                    dispatch({
                                        type: "level",
                                        value: x.id,
                                    });
                                }}
                            />
                        </span>
                    ))}
                    <h2>Reading Time</h2>
                    <input
                        type="range"
                        name="reading_time"
                        onChange={(e) => {
                            e.preventDefault();
                            dispatch({
                                type: "reading_time",
                                value: e.currentTarget.value,
                            });
                        }}
                    />
                    <button onClick={() => dispatch({ type: "reset" })}>
                        Reset
                    </button>
                </div>
                {isLoading || data.length === 0 ? (
                    <h2>Loading</h2>
                ) : (
                    <SearchResultsView data={data} />
                )}
            </div>
        </div>
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

    const tags_response = await fetch(process.env.BASE_URL + "/api/tags");
    const tags = await tags_response.json();

    const difficulty_response = await fetch(
        process.env.BASE_URL + "/api/difficulty"
    );
    const difficulty = await difficulty_response.json();

    return { props: { tags, difficulty, initialData: latest_articles } };
};

export default Search;
