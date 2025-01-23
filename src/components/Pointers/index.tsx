import { BattlePositions, DAMAGE_TYPES } from "@lib/types"
import { DamageRelationKey, DualPokeDamageRelations, PokeType, PokeTypeData, getDataFromType } from "@data/types"
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


    // Need to write a function that can take two PokeTypeData and return DualPokeDamageRelations based on how they would combine
    const combineDualTypes = (selectedType: PokeTypeData, selectedDualType: PokeTypeData): DualPokeDamageRelations => {
        // We need to look into selectedType.damage_relations and see if any of the types in the various arrays has
        // a duplicate in selectedDualType.damage_relations. If it does, we need to see if they amplify or cancel out each other.

        return {
            "quadruple_damage_from": [],
            "quadruple_damage_to": [],
            "double_damage_from": [],
            "double_damage_to": [],
            "half_damage_from": [],
            "half_damage_to": [],
            "quarter_damage_from": [],
            "quarter_damage_to": [],
            "no_damage_from": [],
            "no_damage_to": [],
        }
    }

    return (
        <>
            <div className="absolute left-1/2 top-1/2 w-0 h-0 ">
                {/* Pointer Map */}
                {
                    DAMAGE_TYPES.map((damageType, damageIndex) => {
                        const damage_index: DamageRelationKey = `${damageType}_damage_${battlePosition}` as DamageRelationKey
                        const matchingTypes: PokeType[] = selectedType.damage_relations[damage_index]
                        const dualTypeMatchingTypes: PokeType[] = selectedDualType?.damage_relations[damage_index] ?? []

                        return matchingTypes.map((type, index) => {
                        return (<Pointer 
                            key={`${damageIndex}_${index}`}
                            type={getDataFromType(type)}
                            radius={radius}
                            position={battlePosition}
                            damageType={damageType}
                            parentMounted={parentMounted}
                            isDouble={false}
                            />
                        )})
                    })
                }
            </div>
        </>
    )
}

export default Pointers