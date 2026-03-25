'use client'
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from '../../styles/page.module.scss'
import AnimatedText from "./component/AnimatedText";
import CustomTypewriter from "./component/CustomTypewriter";


export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress: mainScroll } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(mainScroll, [0, 0.5], [0, -15]);
  const scale = useTransform(mainScroll, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(mainScroll, [0, 0.5], [1, 0]);

   const aboutRef = useRef(null);
   const {scrollYProgress} = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"],
   });

   const aboutY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const aboutScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // smooth it out (recommended)
  const smoothY = useSpring(aboutY, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(aboutScale, { stiffness: 100, damping: 20 });

  return (
    <div >
      <section ref={ref} className={styles.main}>
        <motion.div className={styles.header} style={{ opacity, y, scale }} >
        <div className={styles.title}>
           <CustomTypewriter text="Hi there! My name is Louisa Yonzon" /> 
          <p className={styles.scrollDown} >Scroll down to continue</p>
        </div>
         
        </motion.div>
       
      </section>
      <motion.section style={{ y: smoothY, scale: smoothScale }} ref={aboutRef} className={styles.about}>
        <motion.div className={styles.aboutGroup} style={{ y: smoothY, scale: smoothScale }}>
          <div className={styles.imageDiv}>
            <img className={styles.image} src="/nationalPark_walking.jpg" />
          </div>
          <div className={styles.description}>
            <div className={styles.aboutTitle}>
              About Me
            </div>
            Nice to meet you! I'm a frontend developer based in San Diego — and yes, I actually made the switch from healthcare! 
            I went from scheduling patients and navigating insurance calls to building websites, creating email templates, and setting up analytics to improve how our sites perform. 
            Somewhere along the way I realized I love solving problems and picking up new skills, and this career lets me do both every day. When I'm not coding you'll catch me trail running, hiking at a national park, or hunting down a good restaurant. I've ran 8 marathons, 2 ultra marathons, and I'm currently training for my first Ironman so I'm no stranger to putting in the work. 
          </div>
        </motion.div>
      </motion.section>
      <section className={styles.experience}>
        <div>
           Wht do I do?
        </div>

      </section>
    </div>
  );
}
