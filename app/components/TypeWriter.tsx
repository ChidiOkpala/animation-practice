import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay, onTypingDone }: { text: string; delay:  number, onTypingDone: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(text.length - 1);

  // Typing logic goes here
  useEffect(() => {
    if (currentIndex >= 0) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => text[currentIndex] + prevText);
        setCurrentIndex(prevIndex => prevIndex - 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        onTypingDone();
      }, 2000)
    }
  }, [currentIndex, delay, onTypingDone, text]);

  return <span className="text-white text-4xl font-bold z-50 animate-typing">{currentText}</span>;
};

export default Typewriter;