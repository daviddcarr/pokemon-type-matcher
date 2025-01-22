import { PokeTypeData } from "../data/types"
import TypeIcon from "./TypeIcon"

export type SliceProps = {
    type: PokeTypeData,
    selected: boolean,
    onClick?: () => void
}

const Slice = ({type, selected = false, onClick}: SliceProps) => {
    return (
        <div 
            className="w-full h-full relative"
            >
            <div className={`${selected ? "-translate-y-8" : ""} w-full h-full relative transition-transform`}>
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 199 573" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    xmlnsXlink="http://www.w3.org/1999/xlink" 
                    xmlSpace="preserve" 
                    style={{ 
                        fillRule: "evenodd", 
                        clipRule: "evenodd", 
                        strokeLinejoin: "round", 
                        strokeMiterlimit: 2,
                    }}>
                    <path 
                        d="M1.158,15.196c-0.307,-1.743 0.095,-3.536 1.118,-4.981c1.022,-1.444 2.579,-2.42 4.325,-2.709c30.247,-4.938 61.276,-7.506 92.899,-7.506c31.623,0 62.652,2.568 92.899,7.508c1.745,0.289 3.302,1.265 4.324,2.709c1.022,1.444 1.424,3.236 1.117,4.979c-9.439,53.537 -73.866,418.923 -92.996,527.413c-0.457,2.593 -2.71,4.484 -5.344,4.484c-2.634,0 -4.887,-1.891 -5.344,-4.484c-19.13,-108.49 -83.557,-473.876 -92.998,-527.413Z" 
                        style={{ fill: type.color }}
                        onClick={onClick}
                        />
                </svg>
                <TypeIcon 
                    type={type.name} 
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 object-contain opacity-50" 
                    style={{
                        top: '12%'
                    }}
                    />
            </div>
        </div>
    )
}

export default Slice