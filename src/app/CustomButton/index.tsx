interface Props {
    type?: any;
    title?:any;
    handleClick?:any;
    customStyles?:any;
}
import state from "@/store"; 
import { useSnapshot } from "valtio";

export default function CustomButton( { type, title, handleClick, customStyles } : Props ){
    const snap = useSnapshot(state);

    function generateStyle(type: string ){
        if(type === "filled"){
            return {
                backgroundColor: snap.color,
                color: "#fff"
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