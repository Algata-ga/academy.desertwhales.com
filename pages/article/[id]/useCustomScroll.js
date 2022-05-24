import { useEffect } from "react";

export const useCustomScroll = (scrollSliderRef) => {
    let scrolledByCustomSlider = false;

    const handleWindowScroll = () => {
        console.log(scrolledByCustomSlider, "please be true");
        if (scrolledByCustomSlider === true) return;
        scrolledByCustomSlider = false;
        console.log("dont happen");
        const scroll_percentage =
            (window.scrollY /
                (document.documentElement.offsetHeight -
                    document.documentElement.clientHeight)) *
            100;

        scrollSliderRef.current.value = scroll_percentage;
    };

    const handleSliderScroll = (e) => {
        const scroll_percentage = e.target.value;
        console.log(scrolledByCustomSlider, "please work");
        scrolledByCustomSlider = true;
        const scroll_y =
            (scroll_percentage / 100) *
            (document.documentElement.offsetHeight -
                document.documentElement.clientHeight);

        window.scroll(0, scroll_y);
    };

    useEffect(
        () => console.log("y wont u work", scrolledByCustomSlider),
        [scrolledByCustomSlider]
    );

    useEffect(() => (window.onscroll = handleWindowScroll), []);

    return handleSliderScroll;
};
