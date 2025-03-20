import { FaChevronDown, FaChevronUp} from "react-icons/fa"
import "./DropdownButton.css"
function DropdownButton(props) {
    return (
        <div ref={props.ref} className={`dropdown-btn ${props.open ? "dropdown-btn-open":null}`} onClick={props.toggle}>
            <span>{props.text}</span>
            <span className="toggle-icon" >{props.open ? <FaChevronUp/> : <FaChevronDown/>}</span>
        </div>
    )
}

export default DropdownButton