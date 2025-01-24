import { 
    PokeType, 
    DamageRelationKey, 
    DualPokeDamageRelations,  
    DualDamageRelationKey
} from "@lib/types"
import { 
    DAMAGE_TYPES, 
    DUAL_DAMAGE_TYPES, 
    getDataFromType,
    combineDualTypes,
} from "@data/types"
import Pointer from "@components/Pointers/Pointer"

import useApp from "@lib/useApp"

export interface PointersProps {
    radius: number
    parentMounted: boolean
}

const Pointers = ({
    radius,
    parentMounted
}: PointersProps) => {

    const { selectedType, selectedDualType, battlePosition } = useApp()
 
    // If Defending and Dual Type has value
    if (battlePosition === "from" && selectedDualType && selectedType !== selectedDualType) {
        const combined: DualPokeDamageRelations = combineDualTypes(selectedType, selectedDualType)

        return (
            <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                {
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
                }
            </div>
        )

    // Default Pointers
    } else {

        return (
            <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                {
                    DAMAGE_TYPES.map((damageType, damageIndex) => {
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
        )
    }
}

export default Pointers