// src/components/WebGLBackground.jsx
import { useRef, useMemo, useContext, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from '../ThemeContext';

// 2. Vertex Shader (Position & Point Size)
const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
    vUv = uv;
    vec3 pos = position;

    // Wave 1: Large swell
    float wave1 = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
    
    // Wave 2: Crossing swell
    float wave2 = sin(pos.y * 0.8 + uTime * 0.3 + pos.x * 0.2) * 0.3;
    
    // Wave 3: Choppy interference
    float wave3 = sin(pos.x * 2.0 + pos.y * 1.5 + uTime * 1.2) * 0.15;

    // Combine waves
    float elevation = wave1 + wave2 + wave3;

    // Apply elevation to Z axis
    pos.z += elevation;

    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Particle Size Attenuation
    gl_PointSize = 4.0 * (10.0 / -mvPosition.z);
}
`;

// 3. Fragment Shader (Circular Particles)
const fragmentShader = `
uniform vec3 uColorDeep;
uniform vec3 uColorSurface;
uniform vec3 uColorCrest;
varying float vElevation;

void main() {
    // Make it a circle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    // Color mixing
    vec3 color = mix(uColorDeep, uColorSurface, smoothstep(-0.8, 0.2, vElevation));
    vec3 finalColor = mix(color, uColorCrest, smoothstep(0.2, 0.9, vElevation));
    
    gl_FragColor = vec4(finalColor, alpha * 0.8);
}
`;

const Waves = ({ isDark }) => {
    const meshRef = useRef();
    const materialRef = useRef();

    // Define theme colors
    const colors = useMemo(() => {
        if (isDark) {
            // Dark Mode: Rich, Vibrant, Deep Ocean
            return {
                deep: new THREE.Color('#172554'),    // Blue-950 (Deep Ocean)
                surface: new THREE.Color('#4338ca'), // Indigo-700 (Vibrant Swell)
                crest: new THREE.Color('#818cf8')    // Indigo-400 (Glowing Peaks)
            };
        } else {
            // Light Mode: Sophisticated Cool Slate & Teal (Crystal Clear)
            return {
                deep: new THREE.Color('#f8fafc'),    // Slate-50 (Clean White/Grey base)
                surface: new THREE.Color('#cbd5e1'), // Slate-300 (Subtle depth)
                crest: new THREE.Color('#0f766e')    // Teal-700 (Sharp, deep contrast for peaks)
            };
        }
    }, [isDark]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColorDeep: { value: new THREE.Color('#000000') },
            uColorSurface: { value: new THREE.Color('#000000') },
            uColorCrest: { value: new THREE.Color('#000000') },
        }),
        []
    );

    // Update uniforms when theme changes
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uColorDeep.value.copy(colors.deep);
            materialRef.current.uniforms.uColorSurface.value.copy(colors.surface);
            materialRef.current.uniforms.uColorCrest.value.copy(colors.crest);
        }
    }, [colors]);

    useFrame((state) => {
        const { clock } = state;
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.5; // Faster, more dynamic

            // Smoothly interpolate
            materialRef.current.uniforms.uColorDeep.value.lerp(colors.deep, 0.05);
            materialRef.current.uniforms.uColorSurface.value.lerp(colors.surface, 0.05);
            materialRef.current.uniforms.uColorCrest.value.lerp(colors.crest, 0.05);
        }
    });

    return (
        <points ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -2]}>
            {/* Wider Span [30, 16] to cover edges, High Density */}
            <planeGeometry args={[30, 16, 256, 128]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending}
            />
        </points>
    );
};

const WebGLBackground = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [0, 2, 6], fov: 50 }}
                dpr={[1, 1.5]} // Cap DPR at 1.5 for performance
                gl={{
                    antialias: false, // POST-PROCESSING later if needed, or false for raw speed
                    powerPreference: "high-performance",
                    alpha: true,
                    stencil: false,
                    depth: false // Background doesn't need depth buffer if it's just a plane
                }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.domElement.style.touchAction = 'none'; // Improve scrolling perf on mobile
                }}
            >
                <Waves isDark={isDarkMode} />
            </Canvas>
        </div>
    );
};

export default WebGLBackground;
