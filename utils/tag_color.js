const color_set = [
    "#C0d763",
    "#6388C0",
    "#63C083",
    "#6388C0",
    "#C06363",
    "#C0d763",
    "#6388C0",
    "#63C083",
    "#6388C0",
    "#C06363",
];

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash += 17 * chr + (chr % 3) + (chr - 3) * chr * (chr + 3);
    }
    hash = hash - str.length;
    return hash;
}

const tag_color = (tag) => {
    const color_index = hashCode(tag) % color_set.length;
    return color_set[color_index];
};

export default tag_color;
