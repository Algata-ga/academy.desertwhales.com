import tag_color from "../utils/tag_color";
import style from "../styles/MultiSelectionButtons.module.css";

const MultiSelectionButtons = ({ list, toggleStates, setCurrentSelection }) => {
    return (
        <>
            {list.map((x) => {
                //console.log(`${x} ${toggleStates.includes(x)}`);
                return (
                    <button
                        key={`${x} ${toggleStates.includes(x)}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentSelection(x);
                        }}
                        style={{ color: tag_color(x) }}
                        className={
                            toggleStates.includes(x)
                                ? style.active
                                : style.inactive
                        }
                    >
                        {x} {toggleStates.includes(x) ? "✓" : "x"}
                    </button>
                );
            })}
        </>
    );
};

export default MultiSelectionButtons;
