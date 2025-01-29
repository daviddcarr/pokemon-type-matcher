import { useEffect, useState } from "react"
import isDeviceIos from "@lib/isDeviceIos"
import useApp from "@lib/useApp"
import useStyles from "@lib/useStyles";
import useLanguage from "@lib/useLanguage";

import { MdIosShare, MdSwapHorizontalCircle } from "react-icons/md";

import InstallButton from "@components/InfoPanel/InstallButton"
import PokemonSelectorButton from "@components/HubSelector/PokemonSelectorButton";
import { GiCrossedSwords, GiVibratingShield } from "react-icons/gi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiBuymeacoffee } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";
import TypeButton from "@components/HubSelector/TypeButton";
import PointerIcon from "@components/Pointers/PointerIcon";

import ALL_POKE_TYPES from "@data/types";
import classNames from "classnames";

const InfoPanel = () => {

    const { setShowInfo } = useApp()
    const styles = useStyles()
    const { info, close } = useLanguage()

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
            <div className="absolute inset-0 w-full h-full z-40 grid grid-rows-[auto,1fr,auto] bg-white dark:bg-slate-900 rounded-md overflow-hidden">
                
                <div className="p-4 bg-slate-200 dark:bg-slate-950">
                    <h2 className={classNames(
                        styles.headingFont,
                        "text-slate-900 dark:text-white text-xl uppercase"
                        )}>{info.info}</h2>
                </div>
                
                <div className="overflow-y-scroll h-full w-full p-8 text-slate-900 dark:text-white space-y-8">
   
                    <div className={classes.section}>
                        <h3 className={classes.header}>{ info.whatTitle }</h3>

                        <p>{ info.whatMessage }</p>
                    </div>

                    <div className={classes.section}>

                        <h3 className={classes.header}>{ info.howTitle }</h3>

                        <div className={classes.iconGrid}>
                            <PokemonSelectorButton className="w-10 h-10" />
                            <div>
                                <p>{ info.pokemonButton }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <TypeButton
                                selectedType={ALL_POKE_TYPES[0]} 
                                className="w-10 h-10"
                                onClick={() => {}}
                                />
                            <div>
                                <p>{ info.typeButton }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <button
                                className="h-10 w-10 flex items-center justify-center text-slate-900 dark:text-slate-200 p-2 rounded-full bg-slate-400 dark:bg-slate-600"
                                onClick={() => {}}
                                ><MdSwapHorizontalCircle className="text-4xl text-white dark:text-slate-900" />
                            </button>
                            <div>
                                <p>{ info.swapButton }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="coin-face face-front w-10 h-10 bg-red-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                                <GiCrossedSwords className="text-white text-[1.4rem]" />
                            </div>
                            <div>
                                <p>{ info.attackButton }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="coin-face face-back rotate w-10 h-10 bg-blue-400 rounded-full border-[3px] border-slate-100 dark:border-slate-800 pointer-events-auto flex items-center justify-center">
                                <GiVibratingShield className="text-white text-[1.4rem]" />
                            </div>
                            <div>
                                <p>{ info.defenseButton }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="flex gap-2 justify-center">
                                <PointerIcon damageType="double" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                                <PointerIcon damageType="quadruple" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                            </div>
                            <div>
                                <p>{ info.pointerArrow }</p>
                            </div>
                        </div>

                        <div className={classes.iconGrid}>
                            <div className="flex gap-2 justify-center">
                                <PointerIcon damageType="half" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                                <PointerIcon damageType="quarter" className="w-[14px] h-10 fill-slate-900 dark:fill-white" />
                            </div>
                            <div>
                                <p>{ info.pointerShield }</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.section}>
                        <h3 className={classes.header}>{ info.installTitle }</h3>
                        {
                        isIos ? (
                            <>
                            <ol className="list-decimal ml-5 space-y-2">
                                {
                                    info.iosInstructions.map((instruction, index) => {
                                        
                                        return (
                                            <li key={index}><span className="flex items-center gap-1">{instruction} { index === 0 && (<MdIosShare />) }</span></li>
                                        )
                                    })
                                }
                            </ol>
                            </>
                        ) : (
                            <>
                                <InstallButton />
                                <ol className="list-decimal ml-5 space-y-2">
                                {
                                    info.androidInstructions.map((instruction, index) => {
                                        
                                        return (
                                            <li key={index}><span className="flex items-center gap-1">{instruction} { index === 0 && (<MdIosShare />) }</span></li>
                                        )
                                    })
                                }
                            </ol>
                            </>
                        )
                        }
                    </div>

                    <div className={classes.section}>
                        <h3 className={classes.header}>{ info.whatElse }</h3>

                        <p>{ info.disclaimer }</p>

                        <nav>
                            <ul className='flex space-x-4'>
                                <li>
                                    <a href="https://github.com/daviddcarr" target="_blank" rel="noreferrer" aria-label="Developer GitHub Profile">
                                        <AiFillGithub />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/david--dylan/" target="_blank" rel="noreferrer" aria-label="Developer LinkedIn Profile">
                                        <AiFillLinkedin />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://bmc.link/davidcarr" target="_blank" rel="noreferrer" aria-label="Buy me a coffee">
                                        <SiBuymeacoffee />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://account.venmo.com/u/david__dylan" target="_blank" rel="noreferrer" aria-label="Venmo">
                                        <BiLogoVenmo />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                
                
                <button
                    onClick={() => setShowInfo(false)}
                    className={classNames(
                        styles.headingFont,
                        "w-full p-4 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-slate-200"
                        )}
                    >
                    <h2>{ close }</h2>
                </button>
                
            </div>
        </>
    )
}

export default InfoPanel