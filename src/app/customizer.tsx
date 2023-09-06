"use client"

import { useState, useEffect } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"

import config from "../config/config"
import state from "@/store"
import { download } from "../assets"
import { downloadCanvasToImage, reader } from "../config/helpers"
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants"

import { fadeAnimation, slideAnimation } from "../config/motion"

import AIPicker from "./AIPicker"
import ColorPicker from "./ColorPicker"
import FilePicker from "./FilePicker"
import Tab from "./Tab"
import CustomButton from "./CustomButton"

export default function Customizer(){
    const snap = useSnapshot(state);
    const [file, setFile] = useState("")
    const [prompt, setPrompt] = useState("")
    const [generatingImg, setGeneratingImg] = useState(false)
    const [activeEditorTab, setActiveEditorTab] = useState("")
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true, 
        stylishShirt: false
    })

    const generateTabContent = () => {
        switch(activeEditorTab){
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingIMg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default: 
            return null;
        }
    }

    function handleDecals(type:string, result:any){
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if(!activeEditorTab[decalType.filterTab]){
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    function handleActiveFilterTab(tabName:string){
        switch(tabName){
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
            default:
                state.isFullTexture = true;
                state.isLogoTexture = false;
        }

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    function readFile(type: any) {
        reader(file)
            .then((result) => {
                handleDecals(type, result)
                setActiveEditorTab("")
            })
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                <motion.div
                    key="custom"
                    className="absolute top-0 left-0 z-10"
                    {...slideAnimation('left')}
                    >
                    <div className="flex items-center min-h-screen">
                        <div className="editortabs-container tabs">
                            {EditorTabs.map((tab) => (
                                <Tab 
                                    key={tab.name}
                                    tab={tab}
                                    handleClick={() => setActiveEditorTab(tab.name)}
                                />
                            ))}
                            {generateTabContent()}
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="absolute z-10 to-5 right-5"
                    {...fadeAnimation}
                >
                    <CustomButton  
                    type="filled" 
                    title="Go Back" 
                    handleClick={() => state.intro = true }
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
                </motion.div>
                <motion.div
                    className="filtertabs-container"
                    {...slideAnimation("up")}
                >
                    {FilterTabs.map((tab) =>
                    <Tab 
                        key={tab.name}
                        tab={tab}
                        isActiveTab={activeFilterTab[tab.name]}
                        handleClick={() => handleActiveFilterTab(tab.name)}
                        isFilterTab
                    />
                    )}
                </motion.div>
                </>
            )}
            
        </AnimatePresence>
    )
}