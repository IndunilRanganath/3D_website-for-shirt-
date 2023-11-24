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
                 className='w-100 h-12 object-contain'
              />
            </motion.header>
            <motion.div {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
              <h1 className="head-text"
                  style={{
                  fontSize: "clamp(3.5rem, 8vw, 8rem)",
                  lineHeight: "clamp(4.5rem, 8vw, 9rem)",
                  color: "#fff"
                }}
              >
            LET'S <br className="xl:block hidden" /> CHOOSE IT.
            </h1>
              </motion.div>
              
              <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
              style={{ width: "clamp(20rem, 50vw, 40rem)" }}
              >
              <p className="max-w-md mt-10 mb-10 font-normal text-blue-400 text-base">
              Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
              </p>
              </motion.div>

              <CustomButton 
                type='filled'
                title='Customize It' 
                handleClick={() => state.intro = false}
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />


            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
  )
}

export default Home;