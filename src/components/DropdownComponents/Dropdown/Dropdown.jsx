import DropdownButton from "../DropdownButton/DropdownButton"
import DropdownContent from "../DropdownContent/DropdownContent"
import "./Dropdown.css"
import { useState, useRef, useEffect } from "react"
function Dropdown(props) {
    const [open,setOpen] = useState(false);
    const [dropdownTop, setDropdownTop] = useState(0);
    const dropdownRef = useRef();
    const buttonRef = useRef();
    const contentRef = useRef();
    function toggleDropdown() {
        if (!open) {
            const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
            const contentHeight = contentRef.current.clientHeight;
            const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;
            setDropdownTop(topPosition);
        }
        setOpen(open => !open);
    };
    useEffect( () => {
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            };
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    },[]);
    return(
        <div className="dropdown" ref = {dropdownRef}>
            <DropdownButton ref = {buttonRef} text = {props.buttonText} open = {open} toggle = {toggleDropdown}>
            </DropdownButton>
            <DropdownContent ref = {contentRef} content = {props.content} open = {open} top = {dropdownTop}  > 
            </DropdownContent>
        </div>
    );
};

export default Dropdown;