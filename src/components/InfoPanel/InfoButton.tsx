import { GrInfo } from "react-icons/gr";

export interface InfoButtonProps {
    onClick: () => void
}

const InfoButton = ({ onClick }: InfoButtonProps) => {

    return (
        <>
            <button 
                className="info-button p-1 text-slate-900 dark:text-white pointer-events-auto" 
                title="Info" 
                onClick={onClick} 
                ><GrInfo /></button>
        </>
    )
}

export default InfoButton