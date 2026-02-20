// src/components/WebGLOrb.jsx
// Floating torus knot with gentle glow — fits outside the photo bounding box
import { useRef, useContext, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from '../ThemeContext';

function GlowRing({ isDark }) {
    const meshRef = useRef();
    const materialRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(isDark ? '#818CF8' : '#4F46E5') },
        uColor2: { value: new THREE.Color(isDark ? '#A78BFA' : '#7C3AED') },
    }), [isDark]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.12;
        meshRef.current.rotation.y = t * 0.18;
        meshRef.current.rotation.z = t * 0.05;
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = t;
        }
    });

    const vertexShader = `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    varying vec3 vNormal;
    varying vec2 vUv;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTime;
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      vec3 color = mix(uColor1, uColor2, vUv.x + sin(vUv.y * 6.28 + uTime * 0.5) * 0.3);
      float alpha = 0.2 + fresnel * 0.55;
      gl_FragColor = vec4(color, alpha);
    }
  `;

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1.6, 0.35, 80, 12, 2, 3]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

const WebGLOrb = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <div
            style={{
                position: 'absolute',
                top: '-60px',
                left: '-60px',
                right: '-60px',
                bottom: '-60px',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'visible',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true, // Keep AA for the orb as it's a focal point
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false
                }}
                style={{ background: 'transparent' }}
            >
                <GlowRing isDark={isDarkMode} />
            </Canvas>
        </div>
    );
};

export default WebGLOrb;
