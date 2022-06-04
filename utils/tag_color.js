const color_set = [
    "#9D63C0",
    "#939278",
    "#6388C0",
    "#63C083",
    "#C06363",
    "#C0B763",
];

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const tag_color = (tag) => {
    const color_index = hashCode(tag) % color_set.length;
    return color_set[color_index];
};

export default tag_color;
