import "./DropdownItem.css"
function DropdownItem(props) {
    return (
        <div className="dropdown-item" onClick={props.onClick}>
            {props.content}
        </div>
    )
}

export default DropdownItem