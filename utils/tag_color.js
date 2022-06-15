const color_set = [
    "var(--tag1)",
    "var(--tag2)",
    "var(--tag3)",
    "var(--tag4)",
    "var(--tag1)",
    "var(--tag2)",
    "var(--tag3)",
    "var(--tag4)",
    "var(--tag1)",
    "var(--tag2)",
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
