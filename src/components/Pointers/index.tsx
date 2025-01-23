import { BattlePositions, DAMAGE_TYPES, DUAL_DAMAGE_TYPES } from "@lib/types"
import { 
    DamageRelationKey, 
    DualPokeDamageRelations, 
    PokeType, 
    PokeTypeData, 
    getDataFromType,
    combineDualTypes,
    DualDamageRelationKey
} from "@data/types"
import Pointer from "@components/Pointers/Pointer"

export interface PointersProps {
    selectedType: PokeTypeData
    selectedDualType?: PokeTypeData | null
    radius: number
    battlePosition: BattlePositions
    parentMounted: boolean
}

const Pointers = ({
    selectedType,
    selectedDualType,
    radius,
    battlePosition,
    parentMounted
}: PointersProps) => {


    let combined: DualPokeDamageRelations | null = null;
    if (battlePosition === "from" && selectedDualType && selectedType !== selectedDualType) {
        combined = combineDualTypes(selectedType, selectedDualType)
    }

    return (
        <>
            <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                {/* Pointer Map */}
                {
                    battlePosition === "from" && combined !== null ? 
                        DUAL_DAMAGE_TYPES.map((damageType, damageIndex) => {
                            const damage_index: DualDamageRelationKey = `${damageType}_damage_from` as DualDamageRelationKey
                            const matchingTypes: PokeType[] = combined[damage_index]
    
                            return matchingTypes.map((type, index) => {
                                return (
                                    <Pointer 
                                        key={`${damageIndex}_${index}`}
                                        type={getDataFromType(type)}
                                        radius={radius}
                                        position={battlePosition}
                                        damageType={damageType}
                                        parentMounted={parentMounted}
                                        />
                                )
                        })
                        })
                     : DAMAGE_TYPES.map((damageType, damageIndex) => {
                            const damage_index: DamageRelationKey = `${damageType}_damage_${battlePosition}` as DamageRelationKey
                            const matchingTypes: PokeType[] = selectedType.damage_relations[damage_index]
    
                            return matchingTypes.map((type, index) => {
                                return (
                                    <Pointer 
                                        key={`${damageIndex}_${index}`}
                                        type={getDataFromType(type)}
                                        radius={radius}
                                        position={battlePosition}
                                        damageType={damageType}
                                        parentMounted={parentMounted}
                                        />
                                )
                            })
                        })
                }
            </div>
        </>
    )
}

export default Pointers