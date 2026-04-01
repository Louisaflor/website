'use client'
import Image from "next/image";
import React, {useState, useEffect, useRef} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from '@studio-freight/lenis'
import styles from '../../styles/page.module.scss'
import AnimatedText from "./component/AnimatedText";
import CustomTypewriter from "./component/CustomTypewriter";
// import HorizontalScrollSection from "./component/HorizontalScroll";


export default function Home() {
  const [displayText, setDisplayText] = useState(false)
  const mainRef = useRef(null)
  const ref = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const projectRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { title: "Project One" },
    { title: "Project Two" },
    { title: "Project Three" },
    { title: "Project Four" },
    { title: "Project Five" },
  ];

  // detect which project is centered
  useEffect(() => {
    const handleScroll = () => {
      projectRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.5
        ) {
          setCurrentIndex(i);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   // smooth animated index
  const motionIndex = useSpring(currentIndex, {
    stiffness: 80,
    damping: 20,
  });

   // translateY for number reel
  const projectsY = useTransform(motionIndex, (i) => `${-i * 100}%`);


  useEffect(() => {
  const lenis = new Lenis({
    lerp: 0.08, // smoothness
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}, []);

  //this is for the entire page to make it scroll vertically and tracking to scroll for the div
  const {scrollYProgress: entirePageScroll} = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

   // Map vertical scroll → horizontal movement
   const mainX = useTransform(entirePageScroll, [0, 1], ["0%", "-300%"]);

  //this is for the top of the page
  const { scrollYProgress: mainScroll } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  //smoother transition
  const y = useTransform(mainScroll, [0, 0.5], [0, -15]);
  const scale = useTransform(mainScroll, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(mainScroll, [0, 0.5], [1, 0]);

  // this is for the about section
   const {scrollYProgress} = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"],
   });

   const aboutY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const aboutScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // smooth it out (recommended)
  const smoothY = useSpring(aboutY, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(aboutScale, { stiffness: 100, damping: 20 });

  
  //this is for the services section
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start start", "end end"],
  });

 

  const section2Y = useTransform(servicesProgress, [0.1, 0.5], [570, -565]);
  const section3Y = useTransform(servicesProgress, [0.3, 0.8], [1270, -1195]);

  const smoothSection2Y = useSpring(section2Y, {
  stiffness: 80,
  damping: 25,
});

const smoothSection3Y = useSpring(section3Y, {
  stiffness: 80,
  damping: 25,
});

  return (
    <>
    <section>
      <motion.div className={styles.mainWrapper} > 
        <motion.div
         initial={{ height: "150vh"  }}
         animate={{ height: "0vh"}}
        transition={{ type: "spring", stiffness: 90, damping: 45 }} 
         style={{ overflow: "hidden" }}
        className={styles.entrance}
        onAnimationComplete={() => setDisplayText(true)}>
          <div className={styles.archWrapper}>
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"  style={{ width: "100%", height: "100%", display: "block" }}>
              <path d="M0,88 Q50,60 100,88 V100 H0 Z" fill="#ede5d5"/>
            </svg>
          </div>
         

        </motion.div>
        <section ref={ref} className={styles.main}>
          <motion.div className={styles.header} style={{ opacity, y, scale }} >
          {displayText && <div className={styles.title}>
            <CustomTypewriter text="Hi there! My name is Louisa Yonzon" /> 
            <p className={styles.scrollDown} >Scroll down to continue</p>
          </div>}
          </motion.div>
        </section>

        <motion.section ref={aboutRef} className={styles.about}>
          <motion.div className={styles.aboutGroup} style={{ y: smoothY, scale: smoothScale }}>
            <div className={styles.imageDiv}>
              <img className={styles.image} src="/nationalPark_walking.jpg" />
            </div>
            <div className={styles.description}>
              <div className={styles.aboutTitle}>
                About Me
              </div>
              <div>
                Nice to meet you! I'm a frontend developer based in San Diego — and yes, I actually made the switch from healthcare! 
                I went from scheduling patients and navigating insurance calls to building websites, creating email templates, and setting up analytics to help improve how our sites perform. 
                Somewhere along the way I realized I love solving problems and picking up new skills, and this career lets me do both every day. When I'm not coding you'll catch me trail running, hiking at a national park, or hunting down a good restaurant. I've ran 8 marathons, 2 ultra marathons, and I'm currently training for my first Ironman so I'm no stranger to putting in the work. 
              </div>
            </div>
          </motion.div>
        </motion.section>

        <section ref={servicesRef} className={styles.servicesWrapper}>
          <div className={styles.servicesSticky}>

            <div className={styles.servicesHeader}>
              What I do
            </div>

              <div className={styles.servicesContent}>
                {/* SECTION 1 */}
                <motion.div 
                  className={`${styles.serviceBlock} ${styles.block1}`}
                  // style={{ y: section1Y }}
                >
                  <h2>Full-Stack Development</h2>
                  <p>
                  I build scalable, end-to-end web applications that seamlessly connect intuitive frontends with robust backend systems, 
                  ensuring performance, reliability, and maintainability across the entire stack.
                  </p>
                  <ul>
                    <li>Develop modern web apps using React, Next.js, and TypeScript</li>
                    <li>Build APIs and server-side logic with Node.js, Express, and GraphQL</li>
                    <li>Implement cloud infrastructure and deployments (AWS, Azure, DigitalOcean)</li>
                    <li>Ensure clean architecture, scalability, and long-term maintainability</li>
                  </ul>
                </motion.div>

                {/* SECTION 2 */}
                <motion.div 
                  className={styles.section2Block}
                  style={{ y: smoothSection2Y }}
                >
                  <div className={`${styles.serviceBlock} ${styles.block2}`}>
                    <h2>UI/UX & Frontend</h2>
                    <p>
                      I create responsive, user-focused interfaces that balance aesthetics and usability, delivering seamless digital experiences across devices.
                    </p>
                    <ul>
                      <li>Build reusable UI components with Tailwind CSS, Chakra UI, Styled Components, and Sass</li>
                      <li>Develop responsive, accessible layouts using HTML5, CSS3, and modern JavaScript</li>
                      <li>Structure scalable and maintainable styles using Sass and component-based architecture</li>
                      <li>Focus on performance, accessibility, and intuitive user interactions</li>
                      <li>Translate design concepts into polished, production-ready interfaces</li>
                      <li>Enhance user experience through smooth animations and micro-interactions</li>
                    </ul>
                  </div>
                </motion.div>
                {/* SECTION 3 */}
                <motion.div 
                  className={`${styles.serviceBlock} ${styles.block3}`}
                  style={{ y: smoothSection3Y }}
                >
                  <h2>Marketing & Analytics</h2>
                  <p>
                    I leverage data, tracking, and marketing technologies to uncover insights, measure performance, and drive meaningful user engagement and conversion improvements.
                  </p>
                  <ul>
                    <li>Implement tracking systems using Google Tag Manager and Google Analytics 4</li>
                    <li>Analyze user behavior and journeys with FullStory and Looker Studio</li>
                    <li>Build dashboards and reports to translate data into actionable insights</li>
                    <li>Integrate marketing and CMS platforms like Contentstack, WordPress, and Marketo</li>
                    <li>upport A/B testing, funnel optimization, and conversion tracking strategies</li>
                    <li>Collaborate with marketing teams to align data with business and growth goals</li>
                  </ul>
                </motion.div>
                
              </div>
            </div>
          </section>
          <section className={styles.selectedWork}>
            <div className={styles.grid}>
              <div className={styles.left}>
                <span className={styles.counterWrapper}>
                  <span className={styles.leading}>0</span>
                  <div className={styles.viewport}>
                    <motion.div className={styles.track} style={{ y: projectsY }}>
                      {projects.map((_, i) => (
                        <span key={i}>
                          {i + 1}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </span>
              </div>

              <div className={styles.right}>
                {projects.map((project, i) => (
                  <div key={i} ref={(el) => (projectRefs.current[i] = el)} className={styles.project}>
                    <div> {project.title} </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      </motion.div>
    </section>
    
    </>
  );
}


