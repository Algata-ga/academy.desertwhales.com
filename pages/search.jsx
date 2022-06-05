import SearchResultsView from "../components/SearchResultsView";
import MultiSelectionButtons from "../components/MultiSelectionButtons";
import useSearch from "../hooks/useSearch";
import style from "../styles/Search.module.css";

import { useState, useEffect, useRef, useReducer } from "react";

const Search = ({ tags, initialData }) => {
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

    useEffect(() => console.log(filterParams), [filterParams]);

    const [results, setResults] = useState(initialData);

    const { data, isLoading, isError } = useSearch(filterParams);

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
                                onChange={(e) => {
                                    e.preventDefault();
                                    dispatch({
                                        type: "level",
                                        value: x.toLowerCase(),
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
                {isLoading || results.length === 0 ? (
                    <h2>Loading</h2>
                ) : (
                    <SearchResultsView data={results} />
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

    const response = await fetch(process.env.BASE_URL + "/api/tags");
    const tags = await response.json();

    return { props: { tags, initialData: latest_articles } };
};

export default Search;
