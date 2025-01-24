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
    setSelectedType: (type: PokeTypeData) => void;
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
    setSelectedType: (type: PokeTypeData) => set({ selectedType: type }),
    setSelectedDualType: (type: PokeTypeData | null) => set({ selectedDualType: type }),
    setBattlePosition: (pos: BattlePositions) => set({ battlePosition: pos }),
    setShowTypeSelector: (show: boolean) => set({ showTypeSelector: show }),
    setShowDualTypeSelector: (show: boolean) => set({ showDualTypeSelector: show }),
    setShowPokemonSelector: (show: boolean) => set({ showPokemonSelector: show }),
    setSelectedPokemon: (p: Pokemon | null) => set({ selectedPokemon: p }),
    setLanguage: (lang: SupportedLanguage) => set({ language: lang }),
}))

export default useApp