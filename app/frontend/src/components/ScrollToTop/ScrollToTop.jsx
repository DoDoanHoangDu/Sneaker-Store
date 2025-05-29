import "./ScrollToTop.css"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <img className="scroll-to-top" src="/scroll_up.png" onClick={scrollToTop}/>
    )
}

export default ScrollToTop