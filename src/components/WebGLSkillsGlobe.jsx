// src/components/WebGLSkillsGlobe.jsx
// 3D rotating tag cloud with hover tooltips
import { useRef, useMemo, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeContext } from '../ThemeContext';

const TECH_DATA = [
    { name: 'React', desc: 'Component-driven UI library for interactive frontends' },
    { name: 'TypeScript', desc: 'Typed superset of JavaScript for robust apps' },
    { name: 'Python', desc: 'Language for AI/ML, scripting, and APIs' },
    { name: 'Node.js', desc: 'Server-side JS runtime for scalable services' },
    { name: 'AWS', desc: 'Cloud platform for production infrastructure' },
    { name: 'Docker', desc: 'Containerization for dev-to-prod consistency' },
    { name: 'PostgreSQL', desc: 'Relational DB for complex, structured data' },
    { name: 'TensorFlow', desc: 'Deep learning framework for ML training' },
    { name: 'Redis', desc: 'In-memory store for caching and real-time data' },
    { name: 'Next.js', desc: 'Full-stack React framework with SSR' },
    { name: 'Kubernetes', desc: 'Container orchestration for deployments' },
    { name: 'MongoDB', desc: 'NoSQL database for flexible document storage' },
    { name: 'FastAPI', desc: 'High-performance Python API framework' },
    { name: 'GraphQL', desc: 'Query language for efficient data fetching' },
    { name: 'Tailwind', desc: 'Utility-first CSS for rapid styling' },
    { name: 'Git', desc: 'Version control for collaborative development' },
    { name: 'WebGL', desc: 'GPU-accelerated browser-based 3D graphics' },
    { name: 'Three.js', desc: '3D rendering library for the web' },
    { name: 'LangChain', desc: 'Framework for LLM-powered applications' },
    { name: 'OpenAI', desc: 'API platform for GPT and AI integration' },
];

function distributeOnSphere(count, radius) {
    const pts = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
        const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
        const phi = 2 * Math.PI * i / goldenRatio;
        pts.push({
            x: radius * Math.sin(theta) * Math.cos(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(theta),
        });
    }
    return pts;
}

const WebGLSkillsGlobe = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const wrapRef = useRef(null);
    const angleRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);
    const [hovered, setHovered] = useState(null);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
    const pausedRef = useRef(false);

    // Responsive sizing
    const [windowW, setWindowW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const onResize = () => setWindowW(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const isMobile = windowW < 600;
    const R = isMobile ? 120 : 190;
    const W = isMobile ? 300 : 520;
    const H = isMobile ? 300 : 440;
    const points = useMemo(() => distributeOnSphere(TECH_DATA.length, R), [R]);

    // Theme-aware colors
    const accentColor = isDarkMode ? '#818CF8' : '#4F46E5';
    const textFront = isDarkMode ? '#F1F5F9' : '#0F172A';
    const tooltipDesc = isDarkMode ? '#CBD5E1' : '#475569';
    const hoveredBg = isDarkMode ? 'rgba(129,140,248,0.15)' : 'rgba(79,70,229,0.1)';
    const dimColor = isDarkMode ? 'rgba(148,163,184,0.35)' : 'rgba(71,85,105,0.3)';

    const animate = useCallback(() => {
        if (!pausedRef.current) {
            angleRef.current.y += 0.003;
            angleRef.current.x += 0.001;
        }

        const wrap = wrapRef.current;
        if (!wrap) { rafRef.current = requestAnimationFrame(animate); return; }

        const spans = wrap.querySelectorAll('[data-gi]');
        const cosY = Math.cos(angleRef.current.y);
        const sinY = Math.sin(angleRef.current.y);
        const cosX = Math.cos(angleRef.current.x);
        const sinX = Math.sin(angleRef.current.x);

        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            // Rotate Y
            let x = p.x * cosY + p.z * sinY;
            let z = -p.x * sinY + p.z * cosY;
            let y = p.y;
            // Rotate X
            const y2 = y * cosX - z * sinX;
            const z2 = y * sinX + z * cosX;
            y = y2;
            z = z2;

            // depth scale: front (z=R) => 1.0, back (z=-R) => 0.3
            const depthNorm = (z + R) / (R * 2); // 0..1
            const scale = 0.3 + depthNorm * 0.7;
            const el = spans[i];
            if (el) {
                el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px)`;
                el.style.opacity = String(Math.max(0.15, depthNorm * depthNorm));
                el.style.fontSize = `${12 + scale * 5}px`;
                el.style.fontWeight = depthNorm > 0.6 ? '700' : '500';
                el.style.zIndex = String(Math.round(depthNorm * 100));
            }
        }
        rafRef.current = requestAnimationFrame(animate);
    }, [points, R]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [animate]);

    const onEnter = useCallback((i, e) => {
        setHovered(i);
        pausedRef.current = true;
        const r = wrapRef.current.getBoundingClientRect();
        setTooltip({ x: e.clientX - r.left, y: e.clientY - r.top - 16 });
    }, []);

    const onMove = useCallback((e) => {
        if (!wrapRef.current || hovered === null) return;
        const r = wrapRef.current.getBoundingClientRect();
        setTooltip({ x: e.clientX - r.left, y: e.clientY - r.top - 16 });
    }, [hovered]);

    const onLeave = useCallback(() => {
        setHovered(null);
        pausedRef.current = false;
    }, []);



    return (
        <section style={{ padding: '60px 0' }} className="px-6">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                    }}>
                        Tech Stack
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                        Hover to explore · Technologies I work with daily
                    </p>
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: W + 'px',
                    height: H + 'px',
                    margin: '0 auto',
                }}>
                    <div
                        ref={wrapRef}
                        onMouseMove={onMove}
                        onTouchStart={() => onLeave()}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            cursor: 'default',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Minimal globe backdrop */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {/* Soft ambient glow */}
                            <div style={{
                                position: 'absolute',
                                width: R * 2 + 'px',
                                height: R * 2 + 'px',
                                borderRadius: '50%',
                                background: isDarkMode
                                    ? 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, rgba(129,140,248,0.02) 50%, transparent 70%)'
                                    : 'radial-gradient(circle, rgba(79,70,229,0.04) 0%, rgba(79,70,229,0.01) 50%, transparent 70%)',
                            }} />
                            {/* Dotted circle boundary */}
                            <svg width={R * 2 + 20} height={R * 2 + 20} style={{ position: 'absolute' }}>
                                <circle
                                    cx={R + 10} cy={R + 10} r={R}
                                    fill="none"
                                    stroke={isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(79,70,229,0.08)'}
                                    strokeWidth="1"
                                    strokeDasharray="4 8"
                                />
                            </svg>
                        </div>

                        {/* Center origin for words */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
                            {TECH_DATA.map((t, i) => {
                                const isThis = hovered === i;
                                const isSomethingHovered = hovered !== null;
                                return (
                                    <span
                                        key={t.name}
                                        data-gi={i}
                                        onMouseEnter={(e) => onEnter(i, e)}
                                        onMouseLeave={onLeave}
                                        onTouchStart={(e) => {
                                            e.stopPropagation();
                                            const touch = e.touches[0];
                                            onEnter(i, { clientX: touch.clientX, clientY: touch.clientY });
                                            setTimeout(() => onLeave(), 2500);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            whiteSpace: 'nowrap',
                                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                                            color: isThis
                                                ? accentColor
                                                : (isSomethingHovered ? dimColor : textFront),
                                            cursor: 'default',
                                            transition: 'color 0.2s, background 0.2s',
                                            userSelect: 'none',
                                            willChange: 'transform, opacity, font-size',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            background: isThis ? hoveredBg : 'transparent',
                                            letterSpacing: '0.01em',
                                            textShadow: isThis
                                                ? `0 0 12px ${accentColor}40`
                                                : 'none',
                                        }}
                                    >
                                        {t.name}
                                    </span>
                                );
                            })}
                        </div>

                    </div>

                    {/* Chat Bubble Tooltip - Outside overflow:hidden */}
                    {hovered !== null && (
                        <div style={{
                            position: 'absolute',
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translate(0%, -100%)',
                            pointerEvents: 'none',
                            zIndex: 200,
                            filter: isDarkMode
                                ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 0.5px rgba(129,140,248,0.5))'
                                : 'drop-shadow(0 4px 12px rgba(0,0,0,0.08)) drop-shadow(0 0 0.5px rgba(79,70,229,0.2))',
                        }}>
                            <div style={{
                                background: isDarkMode ? '#1E293B' : '#FFFFFF',
                                borderRadius: '12px 12px 12px 0px',
                                padding: '10px 14px',
                                maxWidth: Math.max(120, W - tooltip.x - 20) + 'px',
                            }}>
                                <div style={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    color: accentColor,
                                    marginBottom: '2px',
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    letterSpacing: '0.01em',
                                }}>
                                    {TECH_DATA[hovered].name}
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: tooltipDesc,
                                    lineHeight: '1.45',
                                    fontFamily: "'Inter', system-ui, sans-serif",
                                    whiteSpace: 'normal',
                                }}>
                                    {TECH_DATA[hovered].desc}
                                </div>
                            </div>
                            {/* Right-triangle tail at left corner */}
                            <div style={{
                                width: 0,
                                height: 0,
                                marginLeft: '0px',
                                borderRight: '10px solid transparent',
                                borderTop: `8px solid ${isDarkMode ? '#1E293B' : '#FFFFFF'}`,
                            }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WebGLSkillsGlobe;
