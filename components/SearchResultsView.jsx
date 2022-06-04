import { useState } from "react";
import ArticleCard from "./ArticleCard";

const SearchResultsView = ({ data }) => {
    const [isListView, setListView] = useState(false);

    return (
        <div>
            <button onClick={() => setListView(() => !isListView)}>
                {isListView ? "Card" : "List"}
            </button>
            {data.length == 0 ? (
                <h2>Not articles found</h2>
            ) : (
                data.map((x) => <ArticleCard article={x} key={x.title} />)
            )}
        </div>
    );
};
export default SearchResultsView;
