import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import state from '../store/index.js';
import {CustomButton} from '../components';
import  logo  from '../assets/396adz.png'



import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

const Home = () => {
  const snap = useSnapshot(state);
  return (
      <AnimatePresence>
        {snap.intro && (
          <motion.section className='home'
          {...slideAnimation('left')}>
            <motion.header {...slideAnimation("down")} >
              <img
                 src={logo}
                 alt='logo'
                 className='object-contain h-8 w-100 md:h-12 md:w-100'
              />
            </motion.header>
            <motion.div {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
              <h1 className="font-sans text-5xl font-bold text-gray-100 md:text-9xl md:mb-6">
            LET'S <br className="hidden xl:block " /> CHOOSE IT.
            </h1>
              </motion.div>
              <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
              style={{ width: "clamp(20rem, 50vw, 40rem)" }}
              >
              <p className="my-3 text-base text-blue-400 md:text-xl">
              Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
              </p>
              </motion.div>

              <CustomButton 
                type='filled'
                title='Customize It' 
                handleClick={() => state.intro = false}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm md:my-10'
              />
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
  )
}

export default Home;