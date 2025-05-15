import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./DropdownButton.css";
import React, { forwardRef } from "react";

const DropdownButton = forwardRef((props, ref) => {
    return (
        <div ref={ref} className={`dropdown-btn ${props.open ? "dropdown-btn-open" : ""}`} onClick={props.toggle}>
            <span>{props.text}</span>
            <span className="toggle-icon">
                {props.open ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </div>
    );
});

export default DropdownButton;
