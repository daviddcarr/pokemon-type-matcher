import { getIdFromType } from "@data/types"
import { PokeTypeData } from "@lib/types"
import TypeIcon from "@components/TypeIcon"
import classNames from "classnames"

export type SliceProps = {
    type: PokeTypeData,
    radius: number,
    selected: boolean,
    onClick?: () => void,
    className?: string,
    style?: React.CSSProperties
}

const Slice = ({type, radius, selected = false, onClick, className, style}: SliceProps) => {
    return (
        <div 
            className={ classNames(
                "w-full h-full relative",
                className
            )}
            style={style}
            >
            <div className={`${selected ? "-translate-y-8" : "hover:-translate-y-2"} w-full h-full relative transition-transform`}>
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
                        className="pointer-events-auto"
                        onClick={onClick}
                        />
                </svg>
                <TypeIcon 
                    type={type.name} 
                    className="pointer-events-none absolute left-1/2 origin-center opacity-50" 
                    style={{
                        top: '12%',
                        transform: `translateX(-50%) translateY(-50%) rotate(-${ (getIdFromType(type.name) - 1) * 20}deg)`,
                        width: `${radius * 0.15}px`,
                        height: `${radius * 0.15}px`,
                    }}
                    />
            </div>
        </div>
    )
}

export default Slice