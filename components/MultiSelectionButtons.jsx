import tag_color from "../utils/tag_color";
import style from "../styles/MultiSelectionButtons.module.css";

const MultiSelectionButtons = ({ list, toggleStates, setCurrentSelection }) => {
    return (
        <>
            {list.map((x) => {
                //console.log(`${x} ${toggleStates.includes(x)}`);
                return (
                    <button
                        key={`${x.name} ${toggleStates.includes(x)}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentSelection(x.id);
                        }}
                        style={{ color: tag_color(x.name) }}
                        className={
                            toggleStates.includes(x.id)
                                ? style.active
                                : style.inactive
                        }
                    >
                        {x.name} {toggleStates.includes(x.name) ? "✓" : ""}
                    </button>
                );
            })}
        </>
    );
};

export default MultiSelectionButtons;
