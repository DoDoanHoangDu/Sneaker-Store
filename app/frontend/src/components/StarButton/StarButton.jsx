import { useState,useEffect } from 'react';
import './StarButton.css';

function StarButton({initialStarred = false, interactive = false, onClick = () => {console.log("StarButton clicked")}}) {
    const [starred, setStarred] = useState(initialStarred);
    const [interactiveState, setInteractive] = useState(interactive);
    useEffect(() => {
        setStarred(initialStarred);
        setInteractive(interactive);
    }, [initialStarred,interactive]);

    const handleClick = () => {
        if (interactiveState) {
            onClick();
        }
        else {
            console.warn("StarButton is not interactive");
        }
    }
    return (
        <button 
            className={`star-button ${starred ? 'starred' : ''} ${interactiveState ? '' : 'disabled'}`} 
            onClick={handleClick}
            title={interactiveState ? (starred ? 'Unmark as featured' : 'Mark as featured') : 'Not interactive'}
        >
            {starred ? '⭐' : '☆'}
        </button>
    );
}

export default StarButton;
