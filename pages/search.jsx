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
                                    <span className={style.difficulty}
                                        key={x.name}
                                        style={{
                                            color: `var(--level-${x.name.toLowerCase()})`,
                                            border: `1px solid var(--level-${x.name.toLowerCase()})`
                                        }}
                                    >
                                        <label htmlFor={x.name.toLowerCase()}>
                                            {x.name}
                                        </label>

                                        <input
                                            name="level"
                                            id={x.name.toLowerCase()}
                                            value={x.name.toLowerCase()}
                                            type="radio"
                                            onChange={(e) => {
                                                dispatch({
                                                    type: "level",
                                                    value: x.id,
                                                });
                                            }}
                                        />
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
