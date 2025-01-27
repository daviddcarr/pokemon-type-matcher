import useApp from "@lib/useApp"

import TypeSelector from "@components/TypeSelector"
import PokemonSelector from "@components/PokemonSelector"

const Overlays = () => {

    const {
      selectedType,
      selectedDualType,
      showTypeSelector,
      showDualTypeSelector,
      showPokemonSelector,
      setSelectedType,
      setSelectedDualType
    } = useApp()

    return (showTypeSelector || showDualTypeSelector || showPokemonSelector) ? (
        <div className="absolute inset-0 bg-slate-100/60 dark:bg-slate-800/60 flex items-center justify-center z-40">

            {
              showTypeSelector && (
                <div className="w-full h-full md:max-w-80 md:max-h-[80vh] relative md:rounded-md overflow-hidden">
                  <TypeSelector
                    onChange={setSelectedType}
                    selectedType={selectedType}
                    />
                </div>
              )
            }

            {
              showDualTypeSelector && (
                <div className="w-full h-full md:max-w-80 md:max-h-[80vh] relative md:rounded-md overflow-hidden">
                  <TypeSelector
                    onChange={setSelectedDualType}
                    selectedType={selectedDualType}
                    />
                </div>
              )
            }
      
            {
              showPokemonSelector && (
                <div className="w-full h-full md:max-w-[80vw] md:max-h-[80vh] relative">
                  <PokemonSelector />
                </div>
              )
            }
        </div>
      ) : <></>
}

export default Overlays