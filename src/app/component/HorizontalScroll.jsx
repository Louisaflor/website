"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../../../styles/horitzonalScroll.module.scss";

export default function HorizontalScrollSection() {
  const ref = useRef(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll → horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  // -300% because we have 4 panels (0, -100, -200, -300)

  return (
    <section ref={ref} className={styles.wrapper}>
      <motion.div className={styles.inner} style={{ x }}>
        <div className={`${styles.panel} ${styles.panel1}`}>Panel 1</div>
        <div className={`${styles.panel} ${styles.panel2} `}>Panel 2</div>
        <div className={`${styles.panel} ${styles.panel3}`}>Panel 3</div>
        <div className={`${styles.panel} ${styles.panel4}`}>Panel 4</div>
      </motion.div>
    </section>
  );
}
