"use client"; 
import React, {useRef} from 'react';
import styles from '../page.module.scss'
import { motion, useInView } from 'framer-motion';

export default function AnimatedText({ el: Wrapper = 'p', text, className, once }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {amount: 0.5, once} ) //returns a boolean -> amount is letting the function know how much of the element needs to be visible until it can be called
  const defaultAnimation= {
     hidden: {
      opacity: 0,
      y: 50
     },
     visible: {
      opacity: 1,
      y: 0
     }
  }

  return (
    <Wrapper className={className}>
      <motion.span 
      initial="hidden" 
      animate={isInView ? 'visible' : 'hidden'}
      transition={{staggerChildren: 0.08}}
      ref={ref}
      >
        {text.split('').map((char, i) => (
          <motion.span className={styles.textSpan} variants={defaultAnimation} key={i}>{char}</motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}