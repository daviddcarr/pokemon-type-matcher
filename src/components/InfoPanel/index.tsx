import { useEffect, useState } from "react"
import isDeviceIos from "@lib/isDeviceIos"
import useApp from "@lib/useApp"

import { MdIosShare, MdSwapHorizontalCircle } from "react-icons/md";

import InstallButton from "@components/InfoPanel/InstallButton"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton";
import { GiCrossedSwords, GiVibratingShield } from "react-icons/gi";
import TypeButton from "@components/HubSelector/TypeButton";
import Pointer from "@components/Pointers/Pointer";

import ALL_POKE_TYPES from "@data/types";

const InfoPanel = () => {

    const { setShowInfo } = useApp()

    const [ isIos, setIsIos ] = useState(false);

    useEffect(() => {
      setIsIos(isDeviceIos())
    }, [])

    return (
        <>
            <div className="absolute inset-0 w-full h-full z-40 grid grid-rows-[auto,1fr,auto] bg-white dark:bg-slate-900">
                <div className="p-2 bg-slate-200 dark:bg-slate-950">
                    <h2 className="text-slate-900 dark:text-white text-xl uppercase">Info</h2>
                </div>
                <div className="overflow-y-scroll h-full w-full p-2 text-slate-900 dark:text-white">
   
                    <h3>What Is This?</h3>

                    <p>PokéType Matcher is a tool to visualize how different Pokémon types affect each other.</p>
                    {/* <p>There are various charts and infographics to illustrate how types affect each other but I wanted something more interactive and explicit.</p> */}
        
                    <h3>How Do I Use It?</h3>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <PokemonSelectorButton className="w-10 h-10" />
                        <div>
                            <p className="">Select a Pokemon to autofill types.</p>
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <TypeButton
                            selectedType={ALL_POKE_TYPES[0]} 
                            className="w-10 h-10"
                            onClick={() => {}}
                            />
                        <div>
                            <p className="">Select either a Main and/or Dual Type. In Attack Mode, only the Main type is used to calculate damage.</p>
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <button
                            className="h-10 w-10 flex items-center justify-center text-slate-900 dark:text-slate-200 p-2 rounded-full bg-slate-400 dark:bg-slate-600"
                            onClick={() => {}}
                            ><MdSwapHorizontalCircle className="text-4xl" />
                        </button>
                        <div>
                            <p className="">Swap Main and Dual Types (Doesn't affect damage in Defense Mode.)</p>
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <div className="coin-face face-front w-10 h-10 bg-red-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                            <GiCrossedSwords className="text-white text-[1.4rem]" />
                        </div>
                        <div>
                            <p className="">Attack Mode: When in this mode the selected type (the one in the center of the wheel) is 'attacking' the types around it. The pointers indicate how the selected type would affect the ones around it.</p>
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <div className="coin-face face-back rotate w-10 h-10 bg-blue-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                            <GiVibratingShield className="text-white text-[1.4rem]" />
                        </div>
                        <div>
                            <p className="">Defense Mode: When in this mode the selected type(s) are defending against the types around the wheel. The pointers indicate how the surrounding types would affect a Pokémon with the selected types.</p>
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-[auto,1fr] items-center">
                        <div></div>
                        <div>
                            <p className=""></p>
                        </div>
                    </div>


                    <p className="">Install on Device:</p>
                    {
                      isIos ? (
                        <>
                          <ol>
                            <li>Tap the 'Share' button <MdIosShare />.</li>
                            <li>Tap 'Add to Home Screen'.</li>
                            <li>Tap 'Add'.</li>
                          </ol>
                        </>
                      ) : (
                          <InstallButton />
                      )
                    }
                </div>
                <button>
                    <h2 onClick={() => setShowInfo(false)}>Close</h2>
                </button>
                
            </div>
        </>
    )
}

export default InfoPanel