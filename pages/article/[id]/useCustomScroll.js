import { useEffect } from "react";

export const useCustomScroll = (scrollSliderRef) => {
    let scrolledByCustomSlider = false;

    const handleWindowScroll = (e) => {
        if (!e) return;
        if (scrolledByCustomSlider === true) return;
        scrolledByCustomSlider = false;
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
        window.scroll(0, scroll_y);
    };

    const handleSliderMouseOut = () => {
        scrolledByCustomSlider = false;
    };

    useEffect(() => {
        window.onscroll = handleWindowScroll;
        scrollSliderRef.current.value = 0;
    }, []);

    return [handleSliderScroll, handleSliderMouseOut];
};
