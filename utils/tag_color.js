const color_set = [
    "#9D63C0",
    "#E5E5E5",
    "#6388C0",
    "#63C083",
    "#C06363",
    "#C0B763",
];

const tag_color = (tag) => {
    let chars_sum = 0;
    for (let i = 0; i < tag.length; i++) {
        chars_sum += tag.charAt(i).charCodeAt(0) - "a".charCodeAt(0) + 1;
    }
    const color_index = chars_sum % color_set.length;
    return color_set[color_index];
};

export default tag_color;
