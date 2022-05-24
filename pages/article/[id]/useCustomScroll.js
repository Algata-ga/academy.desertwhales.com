import { useEffect } from "react";

export const useCustomScroll = (scrollSliderRef) => {
    let scrolledByCustomSlider = false;

    const handleWindowScroll = (e) => {
        if (!e) return;
        console.log("Window:");
        console.log(e);
        console.log("-------------------------------------------------------");
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
        scrolledByCustomSlider = true;
        const scroll_y =
            (scroll_percentage / 100) *
            (document.documentElement.offsetHeight -
                document.documentElement.clientHeight);
        console.log("Slider: ");
        window.scroll(0, scroll_y);
    };

    const handleSliderMouseOut = () => {
        scrolledByCustomSlider = false;
    };

    useEffect(() => (window.onscroll = handleWindowScroll), []);

    return [handleSliderScroll, handleSliderMouseOut];
};
