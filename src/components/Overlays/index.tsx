import useApp from "@lib/useApp"

import TypeSelector from "@components/TypeSelector"
import PokemonSelector from "@components/PokemonSelector"
import InfoPanel from "@components/InfoPanel"

const Overlays = () => {

    const {
      selectedType,
      selectedDualType,
      showTypeSelector,
      showDualTypeSelector,
      showPokemonSelector,
      showInfo,
      setSelectedType,
      setSelectedDualType
    } = useApp()

    return (showTypeSelector || showDualTypeSelector || showPokemonSelector || showInfo) ? (
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
                <div className="w-full h-full md:max-w-[80vw] md:max-h-[80vh] relative md:rounded-md overflow-hidden">
                  <PokemonSelector />
                </div>
              )
            }

            {
              showInfo && (
                <div className="w-full h-full md:max-w-[60vw] md:max-h-[85vh] relative md:rounded-md overflow-hidden">
                  <InfoPanel />
                </div>
              )
            }
        </div>
      ) : <></>
}

export default Overlays