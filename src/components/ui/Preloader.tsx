'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const terminalLines = [
  'INIT KINEMATIC_ENGINE... [OK]',
  'FETCHING ROOT_ASSETS... [OK]',
  'MOUNTING R3F_ENVIRONMENT... [STANDBY]',
  'ALLOCATING WEBGL_BUFFERS... [OK]',
  'INJECTING BRUTALIST_UI... [READY]',
  'STARTING SYSTEM...',
];

export default function Preloader() {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    // Smooth, aggressive ticking speed
    const interval = setInterval(() => {
      setLines((prev) => [...prev, terminalLines[currentLine]]);
      currentLine++;
      
      if (currentLine >= terminalLines.length) {
        clearInterval(interval);
        
        // Brief pause on the last line before executing transition
        setTimeout(() => {
          setIsComplete(true);
        }, 500); 
      }
    }, 250); // 250ms per line -> ~1.5 seconds total

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-end overflow-hidden"
          exit={{ 
            y: '-100%', 
            transition: { 
              duration: 1.0, 
              ease: [0.76, 0, 0.24, 1] // Aggressive custom cubic-bezier (brutalist split)
            } 
          }}
        >
          {/* Terminal Console Output */}
          <div className="p-8 mb-16 flex flex-col items-start gap-2">
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="font-mono text-xs md:text-sm tracking-wider text-white/70"
              >
                <span className="text-[var(--accent-cyan)] mr-4">&gt;_</span>
                {line}
              </motion.div>
            ))}
            
            {/* Blinking Cursor at the end */}
            {lines.length < terminalLines.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                className="w-3 h-4 bg-[var(--accent-cyan)] mt-1 ml-6"
              />
            )}
          </div>

          {/* Lower Progress Bar Container */}
          <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#111]">
            <motion.div
              className="h-full bg-[var(--accent-cyan)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 1.5, 
                ease: 'easeInOut' 
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
