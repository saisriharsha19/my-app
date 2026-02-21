// src/components/WebGLBackground.jsx
import { useRef, useMemo, useContext, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from '../ThemeContext';

// Vertex Shader
const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
    vUv = uv;
    vec3 pos = position;

    float wave1 = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
    float wave2 = sin(pos.y * 0.8 + uTime * 0.3 + pos.x * 0.2) * 0.3;
    float wave3 = sin(pos.x * 2.0 + pos.y * 1.5 + uTime * 1.2) * 0.15;

    float elevation = wave1 + wave2 + wave3;
    pos.z += elevation;
    vElevation = elevation;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 4.0 * (10.0 / -mvPosition.z);
}
`;

// Fragment Shader
const fragmentShader = `
uniform vec3 uColorDeep;
uniform vec3 uColorSurface;
uniform vec3 uColorCrest;
uniform float uTime;
varying float vElevation;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alphaShape = 1.0 - smoothstep(0.1, 0.5, dist);
    float twinkle = sin(uTime * 2.0 + random(vUv) * 10.0) * 0.5 + 0.5;
    float shimmer = 0.5 + 0.5 * twinkle;

    vec3 color = mix(uColorDeep, uColorSurface, smoothstep(-0.8, 0.2, vElevation));
    vec3 finalColor = mix(color, uColorCrest, smoothstep(0.2, 0.9, vElevation));

    gl_FragColor = vec4(finalColor, alphaShape * shimmer * 0.8);
}
`;

const TARGET_INTERVAL = 1 / 24;

const IS_TOUCH = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

// Full-density particle field — 256×128 on desktop, 96×48 on mobile
const SEG_X = IS_TOUCH ? 96 : 256;
const SEG_Y = IS_TOUCH ? 48 : 128;

const Waves = ({ isDark, visible }) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const elapsedRef = useRef(0);

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

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uColorDeep.value.copy(colors.deep);
            materialRef.current.uniforms.uColorSurface.value.copy(colors.surface);
            materialRef.current.uniforms.uColorCrest.value.copy(colors.crest);
        }
    }, [colors]);

    useFrame((state, delta) => {
        if (!visible) return;

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
            {/* Full-density particle field — 256×128 on desktop, 96×48 on mobile */}
            <planeGeometry args={[30, 16, SEG_X, SEG_Y]} />
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
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [contextLost, setContextLost] = useState(false);

    // Mount guard — prevents state updates after the component has unmounted.
    // Without this, the recovery setTimeout fires during navigation (Home → Experience)
    // and calls setState on a dead component, causing the console "context lost" error.
    const mountedRef = useRef(true);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // IntersectionObserver: stop rendering when the hero section is off-screen
    useEffect(() => {
        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Context-loss recovery: only attempt recovery if the component is still mounted.
    // Navigating away (Home → Experience) causes a normal context destruction that fires
    // the webglcontextlost event — we must NOT attempt recovery in that case.
    const recoveryTimerRef = useRef(null);

    const handleContextLost = () => {
        // Clear any in-flight recovery timer
        if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);

        if (!mountedRef.current) return; // Component is unmounting — do nothing

        setContextLost(true);
        recoveryTimerRef.current = setTimeout(() => {
            if (mountedRef.current) {
                setContextLost(false);
            }
        }, 500);
    };

    // Clear the recovery timer when unmounting to prevent memory leaks
    useEffect(() => {
        return () => {
            if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
        >
            {!contextLost && (
                <Canvas
                    camera={{ position: [0, 2, 6], fov: 50 }}
                    dpr={IS_TOUCH ? [1, 1] : [1, 1.5]}
                    gl={{
                        antialias: false,
                        powerPreference: 'default',
                        alpha: true,
                        stencil: false,
                        depth: false,
                        failIfMajorPerformanceCaveat: false,
                    }}
                    style={{ background: 'transparent' }}
                    onCreated={({ gl }) => {
                        gl.domElement.style.touchAction = 'pan-y';
                        gl.domElement.addEventListener('webglcontextlost', (e) => {
                            // Allow recovery (tells the browser we intend to restore)
                            e.preventDefault();
                            handleContextLost();
                        });
                    }}
                >
                    <Waves isDark={isDarkMode} visible={isVisible} />
                </Canvas>
            )}
        </div>
    );
};

export default WebGLBackground;
