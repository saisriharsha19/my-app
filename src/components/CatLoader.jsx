import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const CatModel = ({ isWakingUp, isDarkMode }) => {
  const groupRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const tailRef = useRef();
  const eyeScaleY = useRef(0.1);

  // Animation loop for breathing when sleeping and eye opening
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();

    if (!isWakingUp) {
      // Breathing effect: slight scaling and vertical subtle movement
      groupRef.current.scale.y = 1 + Math.sin(t * 2.5) * 0.02;
      groupRef.current.scale.x = 1 + Math.cos(t * 2.5) * 0.01;
      groupRef.current.scale.z = 1 + Math.cos(t * 2.5) * 0.01;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.03 - 0.4;
      
      // Gentle tail wag while sleeping
      if (tailRef.current) {
        tailRef.current.rotation.z = -0.5 + Math.sin(t * 1.5) * 0.1;
      }
    } else {
      // Waking up effect: lift head, alert stance
      groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, 1.02, delta * 5);
      groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, 1, delta * 5);
      groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, 1, delta * 5);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.25, delta * 5);
      
      // Active tail wag
      if (tailRef.current) {
        tailRef.current.rotation.z = -0.5 + Math.sin(t * 8) * 0.2;
      }
    }

    // Smooth eye opening/closing
    const targetScale = isWakingUp ? 1 : 0.05;
    eyeScaleY.current = THREE.MathUtils.lerp(eyeScaleY.current, targetScale, delta * (isWakingUp ? 15 : 5));
    
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY.current;
      rightEyeRef.current.scale.y = eyeScaleY.current;
    }
  });

  // Extremely Cute Colors!
  // Cat is pure white in both modes so it strictly contrasts the background
  const catColor = "#ffffff"; 
  const earInnerColor = "#f472b6"; // Bright cute pink
  const eyeColor = "#0f172a"; // Deep cute dark blue eyes (very visible against white face)
  const noseColor = "#f472b6"; // Cute pink nose
  const cheekColor = "#fbcfe8"; // Very soft pink for blush

  // Shared material properties for a soft clay/matte look (fixes shimmering entirely)
  const matteMaterial = {
    roughness: 0.95,  // Very high roughness = ultra matte
    metalness: 0.0,   // Zero metalness = absolutely no glossy reflections
    clearcoat: 0.0
  };

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <Float
        speed={isWakingUp ? 3.5 : 1.5} 
        rotationIntensity={isWakingUp ? 0.2 : 0.05} 
        floatIntensity={isWakingUp ? 0.8 : 0.4}
        floatingRange={[-0.1, 0.1]}
      >
        {/* HUGE CUTE HEAD */}
        <mesh position={[0, 1.05, 0.1]} scale={[1.1, 0.9, 1.0]}>
          <sphereGeometry args={[0.95, 64, 64]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* TINY SQUATTY BODY */}
        <mesh position={[0, 0.35, -0.1]} rotation={[0.1, 0, 0]}>
          <capsuleGeometry args={[0.7, 0.3, 32, 32]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* --- EXTRA STUBBY PAWS --- */}
        {/* Front Left Paw */}
        <mesh position={[-0.35, 0.15, 0.55]} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>
        
        {/* Front Right Paw */}
        <mesh position={[0.35, 0.15, 0.55]} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* Back Left Paw */}
        <mesh position={[-0.45, 0.05, -0.3]} rotation={[0.2, 0, 0]}>
          <capsuleGeometry args={[0.18, 0.12, 16, 16]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* Back Right Paw */}
        <mesh position={[0.45, 0.05, -0.3]} rotation={[0.2, 0, 0]}>
          <capsuleGeometry args={[0.18, 0.12, 16, 16]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* TINY EARS */}
        {/* Left Ear */}
        <group position={[-0.6, 1.7, 0.1]} rotation={[0, 0, 0.45]}>
          <mesh>
            <coneGeometry args={[0.3, 0.5, 32]} />
            <meshStandardMaterial color={catColor} {...matteMaterial} />
          </mesh>
          <mesh position={[0, 0.02, 0.16]} rotation={[-0.15, 0, 0]}>
            <coneGeometry args={[0.16, 0.4, 32]} />
            <meshStandardMaterial color={earInnerColor} roughness={1.0} />
          </mesh>
        </group>
        
        {/* Right Ear */}
        <group position={[0.6, 1.7, 0.1]} rotation={[0, 0, -0.45]}>
          <mesh>
            <coneGeometry args={[0.3, 0.5, 32]} />
            <meshStandardMaterial color={catColor} {...matteMaterial} />
          </mesh>
          <mesh position={[0, 0.02, 0.16]} rotation={[-0.15, 0, 0]}>
            <coneGeometry args={[0.16, 0.4, 32]} />
            <meshStandardMaterial color={earInnerColor} roughness={1.0} />
          </mesh>
        </group>

        {/* HUGE CUTE EYES (Lower on the face) */}
        <group position={[0, 0.95, 0.98]}>
          {/* Left Eye */}
          <group position={[-0.38, 0, 0]}>
            <mesh ref={leftEyeRef}>
              <sphereGeometry args={[0.14, 32, 32]} />
              {/* No more emissive washout; solid dark slate eyes with standard lighting */}
              <meshStandardMaterial color={eyeColor} roughness={0.2} metalness={0.2} />
              {/* Anime eye shine */}
              <mesh position={[-0.04, 0.04, 0.11]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0.03, -0.03, 0.11]}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </mesh>
          </group>
          {/* Right Eye */}
          <group position={[0.38, 0, 0]}>
            <mesh ref={rightEyeRef}>
              <sphereGeometry args={[0.14, 32, 32]} />
              {/* No more emissive washout; solid dark slate eyes with standard lighting */}
              <meshStandardMaterial color={eyeColor} roughness={0.2} metalness={0.2} />
              {/* Anime eye shine */}
              <mesh position={[-0.04, 0.04, 0.11]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0.03, -0.03, 0.11]}>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </mesh>
          </group>
        </group>

        {/* Tiny Button Nose */}
        <mesh position={[0, 0.8, 1.05]}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color={noseColor} roughness={0.6} />
        </mesh>
        
        {/* Soft Blushing Cheeks */}
        <mesh position={[-0.45, 0.75, 0.95]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color={cheekColor} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.45, 0.75, 0.95]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color={cheekColor} transparent opacity={0.6} />
        </mesh>
        
        {/* Muzzle */}
        <mesh position={[-0.12, 0.72, 1.0]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>
        <mesh position={[0.12, 0.72, 1.0]} scale={[1, 0.8, 1]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={catColor} {...matteMaterial} />
        </mesh>

        {/* Very Thick Prominent Tail */}
        <group ref={tailRef} position={[0.7, 0.4, -0.6]} rotation={[0.4, 0, -0.7]}>
          <mesh position={[0, 0.45, 0]}>
            <capsuleGeometry args={[0.14, 0.9, 32, 32]} />
            <meshStandardMaterial color={catColor} {...matteMaterial} />
          </mesh>
        </group>

        {/* HTML Overlay anchored directly to 3D Space (Top Right of Head) */}
        <Html position={[0.9, 1.9, 0]} center zIndexRange={[100, 0]}>
          <AnimatePresence mode="wait">
            {!isWakingUp && (
              <motion.div
                key="zzz-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none relative w-32 h-32"
              >
                {/* Notice mapping [0, 1, 2] instead of [1, 2, 3] so the first Z starts exactly at delay 0! */}
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={`z-${i}`}
                    className={`absolute font-black drop-shadow-md ${isDarkMode ? 'text-indigo-300' : 'text-indigo-500'}`}
                    style={{
                      fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif",
                      top: '50px',
                      left: '0px',
                    }}
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [-5, -40 - (i * 12), -80 - (i * 18)], // Float straight up and slightly right
                      x: [0, 8 + (i * 8), 12 + (i * 12)], 
                      scale: [0.5, 0.9, 1.2] 
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.6, // Reduced delay for immediate appearance and snappier loop!
                      ease: "easeOut",
                      times: [0, 0.5, 1]
                    }}
                  >
                    <span style={{ fontSize: `${14 + (i + 1) * 6}px` }}>Z</span>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      </Float>
    </group>
  );
};

const CatLoader = ({ isWakingUp }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Highly robust dark mode checker covering class and data-theme approaches
    const checkDarkMode = () => {
      const html = document.documentElement;
      const body = document.body;
      const isDark = 
        html.classList.contains('dark') || 
        body.classList.contains('dark') ||
        html.getAttribute('data-theme') === 'dark' ||
        body.getAttribute('data-theme') === 'dark';
        
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();

    // Setup heavily robust observer for class and data-theme changes on HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full relative overflow-hidden"
      style={{
        minHeight: 'calc(100vh - var(--navbar-height))',
        paddingTop: 'var(--navbar-height)',
        paddingBottom: '80px',
        background: 'transparent'
      }}
    >
      <div className="relative w-80 h-80 md:w-96 md:h-96 select-none -mt-4">
        
        {/* 3D Canvas */}
        <Canvas camera={{ position: [0, 1.5, 6.5], fov: 45 }}>
          {/* Soft, gentle lighting for the incredibly matte, white cute cat */}
          <ambientLight intensity={isDarkMode ? 1.0 : 1.2} />
          
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={isDarkMode ? 0.8 : 0.8} 
            color="#ffffff" 
          />
          <directionalLight 
            position={[-5, 5, -5]} 
            intensity={isDarkMode ? 0.5 : 0.3} 
            color={isDarkMode ? "#c7d2fe" : "#e2e8f0"} 
          />
          
          <CatModel isWakingUp={isWakingUp} isDarkMode={isDarkMode} />
          
          <Environment preset="city" blur={1} />
          
          {/* Soft, natural Contact Shadows synced heavily to mode. */}
          {/* We use a high blur and deep opacity black for dark mode to ensure it grounds the cat nicely. */}
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={isDarkMode ? 0.8 : 0.3} 
            scale={12} 
            blur={isDarkMode ? 3 : 2.5} 
            far={10} 
            resolution={1024}
            color={isDarkMode ? "#ffffff" : "#000000ff"} 
          />
        </Canvas>
      </div>
      
      {/* Loading Text */}
      <motion.div 
        className={`mt-2 text-sm md:text-base font-bold tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-300 to-indigo-300' : 'from-indigo-600 to-purple-600'}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {isWakingUp ? "Waking Up..." : "Loading Awesome..."}
      </motion.div>
    </div>
  );
};

export default CatLoader;
