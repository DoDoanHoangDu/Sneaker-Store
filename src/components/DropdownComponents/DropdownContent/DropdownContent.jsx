import "./DropdownContent.css"
function DropdownContent(props) {

    return (
        <div ref={props.ref} className={`dropdown-content  ${props.open ? "dropdown-content-open" : null}` } style = {{top: props.top ? `${props.top}px` : "100%"}}>
            {props.content}
        </div>
    )
}

export default DropdownContent