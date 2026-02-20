import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

// Detect touch-only devices once at module level — the magnetic
// effect is invisible on touch screens, so we skip it entirely.
const IS_TOUCH_DEVICE =
  typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

const MagneticButton = ({ children, className = "", onClick, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // Cache bounding rect on mouseenter to avoid forced layout on every mousemove.
  const rectRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = rectRef.current;
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setPosition({ x: 0, y: 0 });
  }, []);

  // On touch devices return a plain motion.button — no magnetic calc overhead.
  if (IS_TOUCH_DEVICE) {
    return (
      <motion.button
        className={className}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
