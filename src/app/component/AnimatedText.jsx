"use client"; 
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({ el: Wrapper = 'p', text, className }) {
  const defaultAnimation= {
     hidden: {
      opacity: 0
     },
     visible: {
      opacity: 1
     }
  }

  return (
    <Wrapper className={className}>
      <motion.span>
        {text.split('').map((char, i) => (
          <motion.span initial={{opacity: 0 }} animate={{opacity: 1 }} key={i}>{char}</motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}