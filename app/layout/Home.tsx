'use client'

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

import Typewriter from '../components/TypeWriter';
import { usePathname } from 'next/navigation';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [animationStatus, setAnimationStatus] = useState("");

  const pathname = usePathname();

  const controls = useAnimation();

  const completeAnimation = async () => {
    const finalDo = { width: 'fit-content', height: 'fit-content', left: '2rem', top: '2rem', bottom: 'unset', transform: 'none', transition: { duration: 1 } };

    await controls.start(finalDo);

    setAnimationStatus("done");
  };

  useEffect(() => {
    const animatePage = async () => {
      // Step 1: Animate from the bottom to the center
      await controls.start({ left: '50%', bottom: '50%', transform: 'translate(-50%, 50%)', transition: { duration: 1 } });

      // Step 2: Animate to a smaller circular box
      await controls.start({ width: '50px', height: '50px', transition: { duration: 1 } });

      setLoading(true);

      // Step 3: Wait for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoading(false);

      // Step 4: Animate to a much smaller white background circular box 
      await controls.start({ width: '5px', height: '5px', backgroundColor: 'white', position: 'absolute', transition: { duration: 0.65 } });

      await controls.start({ backgroundColor: 'transparent', transition: { duration: 0.01 }})
    };

    animatePage();

    return controls.stop;
  }, [controls]);

  return (
    <div className="w-screen h-screen">
      <div className="flex relative">
        <div className={`flex flex-col w-2/12 bg-purple-700 ${animationStatus == "done" ? "fixed" : ""}`}>
          <motion.div
            className="w-36 h-36 rounded-full fixed left-1/2 bottom-[-250px] flex items-center bg-slate-600 justify-center -translate-x-1/2 -translate-y-1/2"
            animate={controls}
          >
            <AnimatePresence>
              {loading === true && (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="animate-spin rounded-full w-6 h-6 bg-transparent border-2 border-black border-r-0 border-b-0"
                />
              )}
            </AnimatePresence>
            
            {loading === false && (
              <Typewriter
                text="Do."
                delay={700}
                onTypingDone={completeAnimation}
              />
            )}
          </motion.div>

          <div className="h-10 w-full bg-black mt-8 absolute" />
          <div className="bg-black h-screen ml-8 w-16 pt-20">
            {animationStatus === "done" && (
              <>
                {/* Side bar */}
                {/* <div className="bg-white w-full h-full" /> */}
              </>
            )}
          </div>
        </div>
      
        {
          animationStatus === "done" && (
            <motion.div className="w-10/12 flex absolute overflow-scroll right-0">
              <div className="w-9/12 overflow-auto flex flex-col">
                <div className="h-[4.5rem] w-full fixed bg-black" />
                <div className="w-full min-h-[calc(100vh-4.5rem)] h-auto mt-[4.5rem] bg-white relative">
                  {/* Main Page content... */}
                  <AnimatePresence key={pathname}>
                    <motion.div
                      key={pathname}
                      initial={{ position: 'absolute', bottom: '50%', opacity: 0, width: '100%' }}
                      animate={{ bottom: 'unset', top: '0px', opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
                      exit={{ opacity: 0, transition: { duration: 2 } }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-3/12 bg-blue-800 absolute flex flex-col right-0 pt-8 h-screen">
                <div className="w-full h-[calc(100vh-2rem)] fixed bg-purple-500">
                  {/* Right side bar will go here... */}
                  Omo
                </div>
              </div>
            </motion.div>
          )
        }
      </div>
    </div>
  );
};

export default HomeLayout;
