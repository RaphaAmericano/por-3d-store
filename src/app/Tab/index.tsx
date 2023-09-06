import { useSnapshot } from "valtio"
import state from "@/store"
interface IProps {
    tab?:any; 
    isFilterTab?: any;
    isActiveTab?:any;
    handleClick?: any;
}
export default function Tab({ tab, isFilterTab, isActiveTab, handleClick}: IProps ){
    const snap = useSnapshot(state);
    const activeStyles = isFilterTab && isActiveTab 
        ? { backgroundColor: snap.color, opacity: 0.5 } 
        : { backgroundColor: "transparent", opacity: 1 } 
    return (
        <div
        key={tab.name}
        className={`tab-btn ${isFilterTab ? 'rounded-full classmorhism' : 'rounded-4'}` }
        onClick={handleClick}
        >
            <img src={tab.icon.src} alt={tab.name} className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}/>
        </div>
    )
}