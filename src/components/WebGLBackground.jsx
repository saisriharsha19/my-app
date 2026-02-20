// src/components/WebGLBackground.jsx
import { useRef, useMemo, useContext, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from '../ThemeContext';

// Vertex Shader: Displaces vertices using multiple sine waves to simulate clashing water
const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

// Simple pseudo-random noise
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vUv = uv;
    vec3 pos = position;

    // Wave 1: Large swell
    float wave1 = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
    
    // Wave 2: Crossing swell
    float wave2 = sin(pos.y * 0.8 + uTime * 0.3 + pos.x * 0.2) * 0.3;
    
    // Wave 3: Choppy interference (clashing)
    float wave3 = sin(pos.x * 2.0 + pos.y * 1.5 + uTime * 1.2) * 0.15;

    // Combine waves
    float elevation = wave1 + wave2 + wave3;

    // Apply elevation to Z axis
    pos.z += elevation;

    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment Shader: Colors based on elevation (peaks = bright/foam, valleys = deep)
const fragmentShader = `
uniform vec3 uColorDeep;
uniform vec3 uColorSurface;
uniform vec3 uColorCrest;
varying float vElevation;

void main() {
    // Normalize elevation somewhat (approx range -1.0 to 1.0)
    // Adjust mix strength to be less aggressive
    
    // Base gradient: Deep -> Surface
    vec3 color = mix(uColorDeep, uColorSurface, smoothstep(-0.8, 0.2, vElevation));
    
    // Crest/Crash highlight at peaks: Surface -> Crest
    vec3 finalColor = mix(color, uColorCrest, smoothstep(0.2, 0.9, vElevation));

    gl_FragColor = vec4(finalColor, 0.6); // 0.6 opacity for glass effect
}
`;

const Waves = ({ isDark }) => {
    const meshRef = useRef();

    // Define theme colors
    const colors = useMemo(() => {
        if (isDark) {
            return {
                deep: new THREE.Color('#1e1b4b'),    // Indigo 950
                surface: new THREE.Color('#6366f1'), // Indigo 500
                crest: new THREE.Color('#e0e7ff')    // Indigo 100
            };
        } else {
            return {
                deep: new THREE.Color('#f8fafc'),    // Slate 50 (or White)
                surface: new THREE.Color('#38bdf8'), // Sky 400
                crest: new THREE.Color('#0284c7')    // Sky 600
            };
        }
    }, [isDark]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorDeep: { value: colors.deep },
        uColorSurface: { value: colors.surface },
        uColorCrest: { value: colors.crest }
    }), []); // Initial uniforms

    // Update uniforms when theme changes
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uColorDeep.value.lerp(colors.deep, 1);
            meshRef.current.material.uniforms.uColorSurface.value.lerp(colors.surface, 1);
            meshRef.current.material.uniforms.uColorCrest.value.lerp(colors.crest, 1);
        }
    }, [colors]);

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, 0, -2]}>
            {/* High segment plane for smooth waves */}
            <planeGeometry args={[20, 10, 128, 64]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                wireframe={true} // Wireframe looks techy and "efficient"
                side={THREE.DoubleSide}
            />
        </mesh>
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
