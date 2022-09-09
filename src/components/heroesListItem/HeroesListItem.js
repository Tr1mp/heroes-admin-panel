const HeroesListItem = ({name, description, element}) => {
    let elementClassName;
    console.log(element)
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return(
        <>
            <ul>
                <li className={`card flex-row mb-4 shadow-lg text-white bg-gradient ${elementClassName}`}>
                    <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" alt="gg" className="img-fluid w-25 d-inline"/>
                    <div className="card-body">
                        <h3 className="card-title">{name}</h3>
                        <p className="card-text">{description}</p>
                    </div>
                    <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                        <button className="btn-close" aria-label="Close"></button>
                    </span>
                </li>
            </ul>
        </>
    )
}

export default HeroesListItem;