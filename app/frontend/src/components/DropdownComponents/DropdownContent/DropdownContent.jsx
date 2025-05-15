import "./DropdownContent.css";
import React, { forwardRef } from "react";

const DropdownContent = forwardRef((props, ref) => {
    return (
        <div
            ref={ref} className={`dropdown-content ${props.open ? "dropdown-content-open" : ""}`} style={{ top: props.top !== null ? `${props.top}px` : "100%" }}>
            {props.content}
        </div>
    );
});

export default DropdownContent;
