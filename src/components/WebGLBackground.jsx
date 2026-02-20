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

// 3. Fragment Shader (Glowing Pulse Orbs)
const fragmentShader = `
uniform vec3 uColorDeep;
uniform vec3 uColorSurface;
uniform vec3 uColorCrest;
uniform float uTime;
varying float vElevation;
varying vec2 vUv;

// Pseudo-random for twinkle
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // 1. Shape: Soft Glowing Orb (Cleanest for high density)
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Soft edge for glow
    float alphaShape = 1.0 - smoothstep(0.1, 0.5, dist);

    // 2. Twinkle Effect: Random pulse based on position + time
    float twinkle = sin(uTime * 2.0 + random(vUv) * 10.0) * 0.5 + 0.5;
    // Modulate alpha brightness
    float shimmer = 0.5 + 0.5 * twinkle; 

    // 3. Color Mixing
    vec3 color = mix(uColorDeep, uColorSurface, smoothstep(-0.8, 0.2, vElevation));
    vec3 finalColor = mix(color, uColorCrest, smoothstep(0.2, 0.9, vElevation));
    
    gl_FragColor = vec4(finalColor, alphaShape * shimmer * 0.8);
}
`;

// Target ~30 fps for the background — imperceptible vs 60fps but halves GPU work.
const TARGET_INTERVAL = 1 / 30;

const Waves = ({ isDark }) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const elapsedRef = useRef(0); // accumulate time between frame advances

    // Define theme colors
    const colors = useMemo(() => {
        if (isDark) {
            return {
                deep: new THREE.Color('#172554'),
                surface: new THREE.Color('#4338ca'),
                crest: new THREE.Color('#818cf8')
            };
        } else {
            return {
                deep: new THREE.Color('#f8fafc'),
                surface: new THREE.Color('#cbd5e1'),
                crest: new THREE.Color('#0f766e')
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

    useFrame((state, delta) => {
        // Throttle updates to ~30fps. Skip shader work on frames that arrive before interval.
        elapsedRef.current += delta;
        if (elapsedRef.current < TARGET_INTERVAL) return;
        elapsedRef.current = 0;

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5;
            materialRef.current.uniforms.uColorDeep.value.lerp(colors.deep, 0.05);
            materialRef.current.uniforms.uColorSurface.value.lerp(colors.surface, 0.05);
            materialRef.current.uniforms.uColorCrest.value.lerp(colors.crest, 0.05);
        }
    });

    return (
        <points ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -2]}>
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

// Use device pixel ratio caps based on device capability.
// Mobile GPUs are taxed by high DPR; desktop can afford 1.5.
const IS_TOUCH = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

const WebGLBackground = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [0, 2, 6], fov: 50 }}
                dpr={IS_TOUCH ? [1, 1] : [1, 1.5]}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    alpha: true,
                    stencil: false,
                    depth: false
                }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    // pan-y allows native vertical scroll on mobile
                    gl.domElement.style.touchAction = 'pan-y';
                }}
            >
                <Waves isDark={isDarkMode} />
            </Canvas>
        </div>
    );
};

export default WebGLBackground;
