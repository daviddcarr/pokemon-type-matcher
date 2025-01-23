import { BattlePositions, DAMAGE_TYPES } from "@lib/types"
import { DamageRelationKey, PokeType, PokeTypeData, getDataFromType } from "@data/types"
import Pointer from "@components/Pointers/Pointer"

export interface PointersProps {
    selectedType: PokeTypeData
    radius: number
    battlePosition: BattlePositions
    parentMounted: boolean
}

const Pointers = ({
    selectedType,
    radius,
    battlePosition,
    parentMounted
}: PointersProps) => {

    return (
        <>
            <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                {/* Pointer Map */}
                {
                    DAMAGE_TYPES.map((damageType, damageIndex) => {
                        const damage_index: DamageRelationKey = `${damageType}_damage_${battlePosition}` as DamageRelationKey
                        const matchingTypes: PokeType[] = selectedType.damage_relations[damage_index]

                        return matchingTypes.map((type, index) => {
                        return (<Pointer 
                            key={`${damageIndex}_${index}`}
                            type={getDataFromType(type)}
                            radius={radius}
                            position={battlePosition}
                            damageType={damageType}
                            parentMounted={parentMounted}
                            />
                        )})
                    })
                }
            </div>
        </>
    )
}

export default Pointers