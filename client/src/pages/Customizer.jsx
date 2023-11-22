import React,{useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio';
import Config  from '../config/config';


import state from '../store'
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPiker, CustomButton, FilePicker, Tab } from '../components';



const Customizer = () => {

  const snap = useSnapshot(state);

  const [file , setFile] = useState(state);

  const [promt, setPrompt] = useState('');
  const [generatingImg, setgeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPiker />;
      case 'filepicker':
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile={readFile}
        />;
      case 'aipicker':
        return <AIPicker 
          promt={promt}
          setPrompt={generatingImg}
          handleSubmit={handleSubmit}
        />;
      default:
        return null;

    }
  }

  const handleSubmit = async(type) => {
    if(!promt) return alert("Please enter a prompt");
    try {
      //call backend
    }catch(error){
      alert(error);
    }finally{
      setgeneratingImg(false);
      setActiveEditorTab('');
    }
  }

const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
  }
}

const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
      break;
    case 'stylishShirt':
      state.isFullTexture = !activeFilterTab[tabName];
    default:
      state.isLogoTexture = true;
      state.isFullTexture = false;
  }

  //after setting the state, activeFilterTab will be updated
  setActiveEditorTab((prevState) => {
    return{
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })

}

const readFile = (type) => {
    reader(file)
    .then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    })
  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
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
            className='absolute top-5 right-5 z-10'
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div 
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

          </motion.div>
        </>
      )}
    

    </AnimatePresence>
  )
}

export default Customizer