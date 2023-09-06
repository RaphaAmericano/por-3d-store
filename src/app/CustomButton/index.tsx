interface Props {
    type?: any;
    title?:any;
    handleClick?:any;
    customStyles?:any;
}
import { useSnapshot } from "valtio";
import state from "@/store"; 
import { getContrastingColor } from "@/config/helpers";

export default function CustomButton( { type, title, handleClick, customStyles } : Props ){
    const snap = useSnapshot(state);

    function generateStyle(type: string ){
        if(type === "filled"){
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if( type === "outline"){
            return {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

    return (
        <button
        style={generateStyle(type)}
        className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
        onClick={handleClick}
        >{title}</button>
    )
}