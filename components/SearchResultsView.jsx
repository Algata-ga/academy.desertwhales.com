import { useState } from "react";
import ArticleCard from "./ArticleCard";
import style from "../styles/Search.module.css";

const SearchResultsView = ({ data }) => {
    const [isListView, setListView] = useState(false);

    return (
        <div>
            
                <div className={style.viewbox}>
                    <h4>view | </h4>
                    <button onClick={() => setListView(() => !isListView)}>
                        {isListView ? "Card" : "List"}
                    </button>
                </div>
            
            <div className={isListView ? style.searchboxlist : style.searchbox}>
                {data.length == 0 ? (
                    <h2>Not articles found</h2>
                ) : (
                    data.map((x) => (
                        <ArticleCard
                            article={x}
                            key={x.title}
                            list={isListView}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
export default SearchResultsView;
