import { useState, useEffect } from "react";

const useCustomScroll = (scrollSliderRef) => {
    const [scrolledByCustomSlider, setScrolledByCustomSlider] = useState(false);

    useEffect(() => (window.onscroll = setSliderScroll), []);

    const handleWindowScroll = () => {
        if (scrolledByCustomSlider === true) return;
        scrolledByCustomSlider(false);

        const scroll_percentage =
            (window.scrollY /
                (document.documentElement.offsetHeight -
                    document.documentElement.clientHeight)) *
            100;

        scrollSliderRef.current.value = scroll_percentage;
    };

    const handleSliderScroll = (e) => {
        const scroll_percentage = e.target.value;
        setScrolledByCustomSlider(true);
        const scroll_y =
            (scroll_percentage / 100) *
            (document.documentElement.offsetHeight -
                document.documentElement.clientHeight);

        window.scroll(0, scroll_y);
    };

    return handleSliderScroll;
};

export default useCustomScroll;
