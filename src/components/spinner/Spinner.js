import MoonLoader from "react-spinners/MoonLoader";

import './spinner.scss';

const Spinner = ({size = 70, customStyle = null}) => {
    return(
        <div className="spinner"
        style={{...customStyle}}>
            <div className="inner">
                <MoonLoader
                    color="#000"
                    loading
                    size={size}
                    speedMultiplier={0.5}
                />
            </div>
            
        </div>
        
    )
}

export default Spinner;