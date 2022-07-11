import { useState, useLayoutEffect } from "react";

const scrollPercentageToHeight = (percentage) =>
    (percentage / 100) *
    (document.documentElement.offsetHeight -
        document.documentElement.clientHeight);

const scrollHeighttoPercentage = (height) =>
    (height /
        (document.documentElement.offsetHeight -
            document.documentElement.clientHeight)) *
    100;

const useCustomScroll = (scrollSliderRef) => {
    let scrolledByCustomSlider = false;
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleWindowScroll = (e) => {
        if (!e) return;
        if (scrolledByCustomSlider === true) return;
        scrolledByCustomSlider = false;

        setScrollPercentage(scrollHeighttoPercentage(window.scrollY));
    };

    const handleSliderScroll = (e) => {
        const scroll_percentage = e.target.value;
        scrolledByCustomSlider = true;

        setScrollPercentage(scroll_percentage);
    };

    const handleSliderMouseOut = () => {
        scrolledByCustomSlider = false;
    };

    useLayoutEffect(() => {
        if (scrollSliderRef.current !== null)
            scrollSliderRef.current.value = scrollPercentage;
        window.scroll(0, scrollPercentageToHeight(scrollPercentage));
    }, [scrollPercentage]);

    useLayoutEffect(() => {
        window.onscroll = handleWindowScroll;
        scrollSliderRef.current.value = 0;
    }, []);

    return [handleSliderScroll, handleSliderMouseOut];
};

export default useCustomScroll;
