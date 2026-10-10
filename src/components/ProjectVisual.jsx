export default function ProjectVisual({ type = 'signals', name }) {
  return <div className={'project-visual visual-' + type} aria-hidden="true">
    <div className="visual-topline"><span>{name.toUpperCase()}</span><span>PROJECT STUDY ↗</span></div>
    {type === 'signals' && <div className="signal-art"><div className="signal-label">EVENTS → INSIGHT</div><div className="signal-bars">{[28, 46, 34, 70, 53, 82, 62, 92, 75, 100, 85, 110, 95, 124].map((height, i) => <i key={i} style={{ height }} />)}</div><div className="signal-baseline"><span>INGEST</span><span>PROCESS</span><span>OBSERVE</span></div></div>}
    {type === 'browser' && <div className="browser-art"><div className="browser-chrome"><i /><i /><i /><span>context → conversation</span></div><div className="browser-content"><div className="browser-document"><span /><span /><span /><span /></div><div className="browser-spark">✳</div><div className="browser-answer"><span /><span /><span /></div></div><div className="browser-prompt">A little more context. A better answer. <b>↗</b></div></div>}
    {type === 'retrieval' && <div className="retrieval-art"><div className="document-stack"><div>01<br /><i /><i /></div><div>02<br /><i /><i /></div><div>03<br /><i /><i /></div></div><span className="retrieval-line" /><div className="retrieval-core">✳<small>CONTEXT</small></div><span className="retrieval-line" /><div className="retrieval-result">A<span>GROUNDED<br />ANSWERS</span></div></div>}
    <span className="visual-bottom">{type === 'signals' ? 'SYSTEMS THAT MAKE SENSE OF SIGNAL' : type === 'browser' ? 'INTELLIGENCE, IN CONTEXT' : 'THE RIGHT INFORMATION. CONNECTED.'}</span>
  </div>;
}

