import SearchResultsView from "../components/SearchResultsView";
import MultiSelectionButtons from "../components/MultiSelectionButtons";
import useSearch from "../hooks/useSearch";
import style from "../styles/Search.module.css";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

import query_generator from "../utils/query_generator";

const Search = ({ query, tags, difficulty, initialData }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "level":
                return {
                    ...state,
                    level:
                        state.level === null
                            ? action.value
                            : state.level === action.value
                            ? null
                            : action.value,
                };
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
            case "set":
                return action.value;
            case "reset":
                return { tags: [], level: null, reading_time: 0, title: null };
        }
    };

    const [filterParams, dispatch] = useReducer(
        reducer,
        initialData.filterParams
    );

    const { data, isLoading, isError } = useSearch(
        query_generator(filterParams)
    );

    const router = useRouter();
    useEffect(() => {
        console.log(filterParams);
    }, []);

    useEffect(() => console.log(filterParams));
    return (
        <div className={style.search}>
            <div className={style.searchcontain}>
                <div className={style.form}>
                    <h2>Topics</h2>
                    <div className={style.multi}>
                        <MultiSelectionButtons
                            list={tags}
                            toggleStates={filterParams.tags}
                            setCurrentSelection={(x) =>
                                dispatch({ type: "tags", value: x })
                            }
                        />
                    </div>
                    <div className={style.difftime}>
                        <div className={style.diffbox}>
                            <h2>Level</h2>
                            <div className={style.levelbox}>
                                {difficulty.map((x) => (
                                    <span
                                        className={style.difficulty}
                                        key={x.name}
                                        style={{
                                            color: `var(--level-${x.name.toLowerCase()})`,
                                            border: `1px solid var(--level-${x.name.toLowerCase()})`,
                                        }}
                                    >
                                        <label
                                            onClick={() => {
                                                dispatch({
                                                    type: "level",
                                                    value: x.id,
                                                });
                                            }}
                                            style={{
                                                backgroundColor:
                                                    filterParams.level === x.id
                                                        ? "black"
                                                        : "red",
                                            }}
                                        >
                                            {x.name}
                                        </label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={style.timebox}>
                            <h2>Reading Time</h2>

                            <div className={style.sliderbox}>
                                <div className={style.readslider}>
                                    <input
                                        type="range"
                                        name="reading_time"
                                        className={style.slider}
                                        min="0"
                                        max="25"
                                        step="5"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            dispatch({
                                                type: "reading_time",
                                                value: e.currentTarget.value,
                                            });
                                        }}
                                    />
                                    <ul className={style.num}>
                                        <li>&nbsp;&nbsp;1</li>
                                        <li>&nbsp;&nbsp;5</li>
                                        <li>10</li>
                                        <li>15</li>
                                        <li>20</li>
                                        <li>&infin;</li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={() => dispatch({ type: "reset" })}>
                                Reset
                            </button>
                        </div>
                    </div>
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

export const getServerSideProps = async ({ query, req, res }) => {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=600, stale-while-revalidate=600"
    );

    const tags_response = await fetch(process.env.BASE_URL + "/api/tags");
    const tags = await tags_response.json();

    const difficulty_response = await fetch(
        process.env.BASE_URL + "/api/difficulty"
    );
    const difficulty = await difficulty_response.json();

    let params = { tags: [], level: null, reading_time: 0, title: null };
    let areKeysPresent = false;
    if (Object.keys(query).length !== 0) {
        const validPrams = ["title", "tag"];
        const keys_present = Object.keys(query).filter((x) =>
            validPrams.includes(x)
        );
        areKeysPresent = keys_present.length !== 0;
        if (keys_present.includes("title")) {
            params.title = query.title;
        }
        if (keys_present.includes("tag")) {
            const tag_index = tags.map((x) => x.name).indexOf(query.tag);
            if (tag_index !== -1) params.tags.push(tags[tag_index].id);
        }
    }
    const endpoint = areKeysPresent
        ? `/search?${query_generator(params)}`
        : "/articles/latest";

    console.log(endpoint);
    const search_results_response = await fetch(
        process.env.BASE_URL + "/api" + endpoint
    );
    const search_results = await search_results_response.json();

    return {
        props: {
            tags,
            difficulty,
            initialData: { search_results, filterParams: params },
        },
    };
};

export default Search;
