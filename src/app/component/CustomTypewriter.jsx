'use client'; // Required for client-side hooks and interactive components in Next.js App Router
import React, { useState, useEffect } from 'react';

const CustomTypewriter = ({ text, speed = 80 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount or re-render
    }
  }, [currentIndex, speed, text]); // Dependencies for useEffect

  return <span>{displayedText}</span>;
};

export default CustomTypewriter;
