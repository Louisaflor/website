import React from 'react';
import { motion } from "motion/react";

export default function AnimatedText({el: Wrapper = 'p' , text, className}) {
  return (
    <Wrapper className={className}>
        <motion.span>{text.split('').map(char => {
            <span>{char}</span>
        })}</motion.span>
    </Wrapper>
  )
}
