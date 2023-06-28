import { PulseLoader } from "react-spinners"

const Spinner = ({color="white", loading="true", size="6px"})=>{
    return(
        <PulseLoader 
        color={color}
        loading={loading}
        size={size}/>
    );
}

export default Spinner;