import { useEffect, useState } from "react"
import isDeviceIos from "@lib/isDeviceIos"
import useApp from "@lib/useApp"
import useStyles from "@lib/useStyles";

import { MdIosShare, MdSwapHorizontalCircle } from "react-icons/md";

import InstallButton from "@components/InfoPanel/InstallButton"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton";
import { GiCrossedSwords, GiVibratingShield } from "react-icons/gi";
import TypeButton from "@components/HubSelector/TypeButton";
import PointerIcon from "@components/Pointers/PointerIcon";

import ALL_POKE_TYPES from "@data/types";
import classNames from "classnames";

const InfoPanel = () => {

    const { setShowInfo } = useApp()
    const styles = useStyles()

    const [ isIos, setIsIos ] = useState(false);

    useEffect(() => {
      setIsIos(isDeviceIos())
    }, [])

    const classes = {
        header: classNames(styles.headingFont, "text-slate-900 dark:text-white text-xl uppercase"),
        section: "flex flex-col gap-4",
        iconGrid: "grid gap-4 grid-cols-[auto,1fr] items-center",
    }

    return (
        <>
            <div className="absolute inset-0 w-full h-full z-40 grid grid-rows-[auto,1fr,auto] bg-white dark:bg-slate-900">
                
                <div className="p-4 bg-slate-200 dark:bg-slate-950">
                    <h2 className={classNames(
                        styles.headingFont,
                        "text-slate-900 dark:text-white text-xl uppercase"
                        )}>Info</h2>
                </div>
                
                <div className="overflow-y-scroll h-full w-full p-8 text-slate-900 dark:text-white space-y-8">
   
                    <div className={classes.section}>
                        <h3 className={classes.header}>What Is This?</h3>

                        <p>PokéType Matcher is a tool to visualize how different Pokémon types affect each other.</p>
                        {/* <p>There are various charts and infographics to illustrate how types affect each other but I wanted something more interactive and explicit.</p> */}
                    </div>

                    <div className={classes.section}>

                        <h3 className={classes.header}>How Do I Use It?</h3>

                        <div className={classes.iconGrid}>
                            <PokemonSelectorButton className="w-10 h-10" />
                            <div>
                                <p className="">Select a Pokemon to autofill types.</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <TypeButton
                                selectedType={ALL_POKE_TYPES[0]} 
                                className="w-10 h-10"
                                onClick={() => {}}
                                />
                            <div>
                                <p className="">Select a Main or Dual Type. In Attack Mode, only the Main type is used to calculate damage.</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <button
                                className="h-10 w-10 flex items-center justify-center text-slate-900 dark:text-slate-200 p-2 rounded-full bg-slate-400 dark:bg-slate-600"
                                onClick={() => {}}
                                ><MdSwapHorizontalCircle className="text-4xl" />
                            </button>
                            <div>
                                <p className="">Swap Main and Dual Types (Doesn't affect damage in Defense Mode.)</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="coin-face face-front w-10 h-10 bg-red-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                                <GiCrossedSwords className="text-white text-[1.4rem]" />
                            </div>
                            <div>
                                <p className="">Attack Mode: When in this mode the selected type (the one in the center of the wheel) is 'attacking' the types around it. The pointers indicate how the selected type would affect the ones around it.</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="coin-face face-back rotate w-10 h-10 bg-blue-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                                <GiVibratingShield className="text-white text-[1.4rem]" />
                            </div>
                            <div>
                                <p className="">Defense Mode: When in this mode the selected type(s) are defending against the types around the wheel. The pointers indicate how the surrounding types would affect a Pokémon with the selected types.</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="flex gap-2 justify-center">
                                <PointerIcon damageType="double" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                                <PointerIcon damageType="quadruple" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                            </div>
                            <div>
                                <p className="">The arrow pointers indicate 'Super Effective' damage and the direction of attack. The '+' indicates that an attack may do quadruple damage.</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="flex gap-2 justify-center">
                                <PointerIcon damageType="half" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                                <PointerIcon damageType="quarter" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                            </div>
                            <div>
                                <p className="">The shields indicate 'Not Very Effective' damage. The '+' indicates that an attack may do quarter damage.</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h3 className={classes.header}>Install on Device:</h3>
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
                            <>
                                <InstallButton />
                            </>
                        )
                        }
                    </div>
                </div>
                
                
                <button
                    className={classNames(
                        styles.headingFont,
                        "w-full p-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-slate-200"
                        )}
                    >
                    <h2 onClick={() => setShowInfo(false)}>Close</h2>
                </button>
                
            </div>
        </>
    )
}

export default InfoPanel