import "./DropdownItem.css";

function DropdownItem({ content, onClick, checkbox, checked }) {
    return (
        <div className="dropdown-item" onClick={checkbox ? undefined : onClick}>
            {checkbox ? (
                <label className="flex items-center space-x-2 w-full cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onClick}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span>{content}</span>
                </label>
            ) : (
                content
            )}
        </div>
    );
}

export default DropdownItem;
