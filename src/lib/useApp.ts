import { create } from 'zustand'
import pokeTypes from '@data/types'
import {
    BattlePositions,
    Pokemon,
    PokeTypeData,
    SupportedLanguage
} from '@lib/types'

interface AppState {
    // Info States
    selectedType: PokeTypeData;
    selectedDualType: PokeTypeData | null;
    battlePosition: BattlePositions;
    selectedPokemon: Pokemon | null;

    // UI States
    language: SupportedLanguage;
    showTypeSelector: boolean;
    showDualTypeSelector: boolean;
    showPokemonSelector: boolean;

    // Actions
    setSelectedType: (type: PokeTypeData | null) => void;
    setSelectedDualType: (type: PokeTypeData | null) => void;
    setBattlePosition: (pos: BattlePositions) => void;
    setShowTypeSelector: (show: boolean) => void;
    setShowDualTypeSelector: (show: boolean) => void;
    setShowPokemonSelector: (show: boolean) => void;
    setSelectedPokemon: (p: Pokemon | null) => void;
    setLanguage: (lang: SupportedLanguage) => void;
}

const useApp = create<AppState>((set) => ({
    // Initial Values
    selectedType: pokeTypes[0],
    selectedDualType: null,
    battlePosition: 'to',
    showTypeSelector: false,
    showDualTypeSelector: false,
    showPokemonSelector: false,
    selectedPokemon: null,
    language: 'en',

    // Actions
    setSelectedType: (type: PokeTypeData | null) => set((state) => {
        if (!type) {
            return { showTypeSelector: false }
        }

        let newSelectedDual = state.selectedDualType
        let newSelectedPokemon = state.selectedPokemon

        if (newSelectedDual === type) {
            newSelectedDual = null
        }

        if (newSelectedPokemon && newSelectedPokemon.types[0] !== type.name) {
            newSelectedPokemon = null
        }

        return { 
            selectedType: type,
            selectedDualType: newSelectedDual,
            selectedPokemon: newSelectedPokemon,
            showTypeSelector: false
        }
    }),
    setSelectedDualType: (type: PokeTypeData | null) => set((state) => {
        if (!type) {
            return {
                selectedDualType: null,
                showDualTypeSelector: false
            }
        }

        const newDual = type !== state.selectedType ? type : null

        let newSelectedPokemon = state.selectedPokemon
        if (newSelectedPokemon && newSelectedPokemon.types[1] !== type.name) {
            newSelectedPokemon = null;
        }

        return { 
            selectedDualType: newDual,
            selectedPokemon: newSelectedPokemon,
            showDualTypeSelector: false
        }
    }),

    
    setBattlePosition: (pos: BattlePositions) => set({ battlePosition: pos }),
    setShowTypeSelector: (show: boolean) => set({ showTypeSelector: show }),
    setShowDualTypeSelector: (show: boolean) => set({ showDualTypeSelector: show }),
    setShowPokemonSelector: (show: boolean) => set({ showPokemonSelector: show }),
    setSelectedPokemon: (p: Pokemon | null) => set({ selectedPokemon: p }),
    setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
}))

export default useApp