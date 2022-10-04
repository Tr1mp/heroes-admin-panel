import './heroesListItem.scss';

const HeroesListItem = ({name, description, element, onDelete}) => {
    let elementClassName;
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger';
            break;
        case 'water':
            elementClassName = 'bg-primary';
            break;
        case 'wind':
            elementClassName = 'bg-success';
            break;
        case 'earth':
            elementClassName = 'bg-secondary';
            break;
        default:
            elementClassName = 'bg-warning';
    }
    const changedDescription = description.length > 84
                ? `${description.substr(0, 84)}...`
                : description;
    const deleteItem = (e) => {
        e.currentTarget.disabled = true;
        onDelete()
    }
    return(
        <>
            <li className={`card flex-row mb-4 shadow-lg text-white bg-gradient ${elementClassName}`}>
                <img 
                    alt="gg"
                    src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                    className="img-fluid w-25 d-inline"
                />
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text text-wrap" style={{width: "386px", height: "42px"}}>{changedDescription}</p>
                </div>
                    <button 
                        className='btn-closee'
                        aria-label="Close"
                        onClick={deleteItem}
                        >
                    </button>
            </li>
        </>
    )
}

export default HeroesListItem;