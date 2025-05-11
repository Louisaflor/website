import React from 'react'

export default function AnimatedText({el: Wrapper = 'p' , text, className}) {
  return (
    <Wrapper className={className}>{text}</Wrapper>
  )
}
