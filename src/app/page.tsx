'use client'
import Image from 'next/image'

import Canvas from '@/canvas'
import Customizer from './customizer'


import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'

import { 
  headContainerAnimation, 
  headContentAnimation, 
  headTextAnimation, 
  slideAnimation 
} from '../config/motion'
import CustomButton from './CustomButton'

export default function Home() {
  const snap = useSnapshot(state);

  return (
    <main className="app transtion-all ease-in">
      <AnimatePresence>
        {snap.intro && ( 
        <motion.section className="home" {...slideAnimation('left')} > 
          <motion.header {...slideAnimation('down')}>
            <img src="../threejs.png" alt="logo" className="w-8 h-8 object-contain" />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">Let&apos;s <br className="xl:block hidden" /> do it.</h1>
            </motion.div>
            <motion.div {...headContentAnimation}
            className="flex flex-col gap-5">
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shit with our brand-new 3D customization tool. 
                <strong>Unleash your imagination</strong>{" "} and define your own style
              </p>
              <CustomButton />
            </motion.div>
          </motion.div>
        </motion.section> )}
      </AnimatePresence>
      <Canvas />
      <Customizer />
    </main>
  )
}
