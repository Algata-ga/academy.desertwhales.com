import { useEffect, useReducer } from "react";
import tag_color from "../utils/tag_color";
import style from "../styles/MultiSelectionButtons.module.css";

const MultiSelectionButtons = ({ list, setCurrentSelection }) => {
    const reducer = (state, action) => {
        if (action.type === "reset") {
            return [];
        } else if (action.type === "toggle") {
            const value = action.value;
            if (state.includes(value)) {
                return state.filter((x) => x !== value);
            } else {
                return [...state, value];
            }
        }
    };
    const [toggleStates, toggle] = useReducer(reducer, []);
    useEffect(() => setCurrentSelection(toggleStates), [toggleStates]);

    return (
        <>
            {list.map((x) => (
                <button
                    key={x}
                    onClick={(e) => {
                        e.preventDefault();
                        toggle({ type: "toggle", value: x });
                    }}
                    style={{ color: tag_color(x) }}
                    className={
                        toggleStates.includes(x) ? style.active : style.inactive
                    }
                >
                    {x} {toggleStates.includes(x) ? "✓" : "x"}
                </button>
            ))}
        </>
    );
};

export default MultiSelectionButtons;
