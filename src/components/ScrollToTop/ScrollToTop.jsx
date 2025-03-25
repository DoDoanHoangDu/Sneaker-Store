import "./ScrollToTop.css"

function ScrollToTop() {
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <img className="scroll-to-top" src="/scroll_up.png" onClick={scrollToTop}/>
    )
}

export default ScrollToTop