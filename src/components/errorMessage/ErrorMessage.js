import img from "../../assets/error.png";
const ErrorMessage = ({cusomStyle = null}) => {
    console.log(cusomStyle);
    return (
        <div>
            <img 
                src={img} 
                alt="Error"  
                style={{
                    display: "block", 
                    width: "350px", 
                    height: "200px", 
                    objectFit: "contain", 
                    margin: "30px auto 0 auto", 
                    ...cusomStyle
                }}/>
        </div>
    )
}

export default ErrorMessage;