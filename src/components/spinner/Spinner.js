import MoonLoader from "react-spinners/MoonLoader";

import './spinner.scss';

const Spinner = () => {
    return(
        <div className="spinner">
            <div className="inner">
                <MoonLoader
                    color="#000"
                    loading
                    size={70}
                    speedMultiplier={0.5}
                />
            </div>
            
        </div>
        
    )
}

export default Spinner;