import { useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';

const captions = {
  guard: 'EXECUTION CONTEXT → RISK ANALYSIS → YOUR DECISION',
  browser: 'PAGE CONTEXT → PRIVACY FILTER → CONVERSATION',
  retrieval: 'DOCUMENTS → RETRIEVAL → GROUNDED ANSWERS',
  analytics: 'EVENTS → AGGREGATION → OBSERVABILITY',
  vision: 'IMAGES + DOCUMENTS → CONTEXT',
  orchestration: 'PROMPTS → MODELS → EVALUATION',
  streaming: 'INGEST → PROCESS → STREAM',
  dashboard: 'STREAMING DATA → ANALYTICAL VIEWS',
  etl: 'EXTRACT → TRANSFORM → LOAD',
  resume: 'PARSE → MATCH → REFINE',
  redaction: 'DETECT ENTITIES → REDACT SENSITIVE CONTENT',
  crawler: 'DISCOVER → COLLECT → STRUCTURE',
  chat: 'MESSAGES → DELIVERY → CONVERSATION',
  api: 'REQUESTS → SERVICES → CONTENT',
  geo: 'LOCATION → GEOSPATIAL CONTEXT',
  compiler: 'SOURCE → TOKENS → SYNTAX TREE',
};

function Box({ x, y, width = 80, height = 44, label, phase = 0 }) {
  return <g><rect className="diagram-node" x={x} y={y} width={width} height={height} rx="5" /><rect className="node-activity" x={x} y={y} width={width} height={height} rx="5" style={{ animationDelay: '-' + phase + 's' }} /><text className="diagram-label" x={x + width / 2} y={y + height / 2 + 4} textAnchor="middle">{label}</text></g>;
}
function Flow({ d, phase = 0 }) {
  return <g><path className="diagram-line" d={d} /><path className="flow-activity" d={d} style={{ animationDelay: '-' + phase + 's' }} /></g>;
}
function Pipeline({ labels }) {
  return <><Flow d="M100 85H140" /><Flow d="M220 85H260" phase={3} />{labels.map((label, i) => <Box key={label} x={20 + i * 120} y={63} label={label} phase={i * 2} />)}</>;
}

function Diagram({ type }) {
  switch (type) {
    case 'guard':
      return <><rect className="diagram-node" x="20" y="27" width="195" height="118" rx="5" /><text className="terminal-label" x="34" y="51">intentguard exec</text><path className="diagram-line" d="M34 68H188M34 88H140M34 108H167" /><rect className="guard-review" x="31" y="76" width="166" height="22" rx="3" /><Flow d="M215 86H246" /><path className="guard-shield diagram-node" d="M289 40L324 54V84C324 111 306 127 289 137C272 127 254 111 254 84V54Z" /><path className="shield-check" d="M273 85L285 97L306 73" /><text className="diagram-label" x="118" y="169" textAnchor="middle">CONTEXT + COMMAND</text><text className="diagram-label" x="289" y="169" textAnchor="middle">REVIEW</text></>;
    case 'browser':
      return <><rect className="diagram-node" x="16" y="25" width="160" height="132" rx="5" /><path className="diagram-line" d="M16 46H176M30 62H135M30 81H154M30 103H116M30 123H145" /><circle className="diagram-dot" cx="29" cy="35" r="3" /><circle className="diagram-dot" cx="41" cy="35" r="3" /><rect className="browser-context" x="25" y="72" width="137" height="21" rx="2" /><Flow d="M176 91H216" /><rect className="diagram-node" x="216" y="46" width="128" height="111" rx="5" /><text className="diagram-label" x="230" y="68">CONTEXTUAL CHAT</text><path className="diagram-line" d="M230 87H322M230 103H306M230 119H316" /><rect className="chat-stream" x="230" y="133" width="80" height="4" rx="2" /></>;
    case 'retrieval':
      return <><rect className="diagram-node" x="17" y="30" width="47" height="62" rx="3" /><rect className="diagram-node" x="32" y="64" width="47" height="62" rx="3" /><path className="diagram-line" d="M27 48H53M27 62H49M43 85H68M43 100H63" /><Flow d="M79 96H126" /><Box x={126} y={63} width={98} label="VECTOR INDEX" phase={2} /><Flow d="M224 85H270" phase={3} /><Box x={270} y={63} width={74} label="ANSWER" phase={5} /><text className="diagram-label" x="49" y="156" textAnchor="middle">DOCUMENTS</text><path className="retrieval-match" d="M151 121H198" /><text className="diagram-label" x="175" y="156" textAnchor="middle">RELEVANT CONTEXT</text></>;
    case 'analytics':
      return <><text className="diagram-label" x="20" y="35">EVENT AGGREGATION</text><path className="diagram-line" d="M20 145H340M20 62H340M20 102H340" />{[38,58,44,81,67,99,75,110,92,118].map((height, i) => <rect key={i} className="analytics-bar" x={30 + i * 30} y={145 - height} width="18" height={height} rx="2" style={{ animationDelay: '-' + i * .6 + 's' }} />)}<path className="analytics-trace" d="M39 112L69 91L99 98L129 76L159 81L189 53L219 65L249 48L279 52L309 31" /></>;
    case 'vision':
      return <><rect className="diagram-node" x="21" y="27" width="188" height="133" rx="5" /><circle className="vision-object" cx="70" cy="67" r="17" /><path className="vision-landscape" d="M36 141L89 92L126 121L163 78L194 141Z" /><rect className="vision-detection" x="48" y="44" width="46" height="46" rx="3" /><rect className="vision-detection second" x="124" y="63" width="64" height="84" rx="3" /><Flow d="M209 94H244" /><text className="diagram-label" x="249" y="54">OCR + RAG</text><path className="diagram-line" d="M249 77H336M249 96H323M249 115H332M249 134H313" /></>;
    case 'orchestration':
      return <><Box x={14} y={65} width={76} label="PROMPT" /><Flow d="M90 87H118V36H142M118 87H142M118 87V138H142" /><Box x={142} y={15} width={80} label="MODEL A" phase={1} /><Box x={142} y={66} width={80} label="MODEL B" phase={3} /><Box x={142} y={117} width={80} label="MODEL C" phase={5} /><Flow d="M222 37H248V87H272M222 88H272M222 139H248V87" phase={3} /><Box x={272} y={65} width={74} label="EVALUATE" phase={6} /></>;
    case 'streaming':
      return <><text className="diagram-label" x="20" y="27">INCIDENT EVENT STREAMS</text>{[62,96,130].map((y, i) => <g key={y}><path className="diagram-line" d={'M25 ' + y + 'H335'} /><rect className="stream-packet" x="29" y={y - 5} width="12" height="10" rx="2" style={{ animationDelay: '-' + i * 2 + 's' }} /></g>)}<rect className="stream-processor" x="156" y="43" width="48" height="108" rx="5" /><path className="diagram-line" d="M168 69H192M168 94H192M168 119H192" /></>;
    case 'dashboard':
      return <><rect className="diagram-node" x="20" y="25" width="320" height="137" rx="5" /><path className="diagram-line" d="M20 48H340M178 48V162" /><text className="diagram-label" x="33" y="41">INCIDENT OVERVIEW</text><path className="dashboard-trace" d="M36 136L58 114L81 126L104 83L126 94L149 66L166 76" />{Array.from({length:12}, (_,i) => <rect className="dashboard-cell" key={i} x={194+(i%4)*31} y={66+Math.floor(i/4)*28} width="23" height="20" rx="2" style={{animationDelay:'-'+i*.5+'s'}} />)}</>;
    case 'etl':
      return <><Pipeline labels={['EXTRACT', 'TRANSFORM', 'LOAD']} /><g className="etl-source">{[0,1,2].map(i=><rect key={i} className="diagram-dot" x={38+i*17} y="137" width="9" height="9" rx="1" />)}</g><g className="etl-transform">{[0,1,2].map(i=><rect key={i} className="diagram-dot" x={158+i*17} y="137" width="9" height="9" rx="2" />)}</g><path className="etl-loaded" d="M282 140L288 147L302 132" /></>;
    case 'resume':
      return <><rect className="diagram-node" x="29" y="18" width="126" height="145" rx="5" /><path className="diagram-line" d="M44 40H120M44 60H138M44 82H127M44 103H138M44 126H121M44 145H134" /><rect className="resume-selection" x="39" y="73" width="104" height="39" rx="3" /><Flow d="M155 92H218" /><circle className="resume-target" cx="275" cy="92" r="43" /><circle className="diagram-line" cx="275" cy="92" r="27" /><path className="resume-check" d="M257 91L269 103L294 77" /></>;
    case 'redaction':
      return <><rect className="diagram-node" x="24" y="23" width="312" height="138" rx="5" /><text className="diagram-label" x="40" y="46">ENTITY-AWARE DOCUMENT PROCESSING</text><path className="diagram-line" d="M40 69H319M40 93H283M40 117H311M40 141H272" />{[0,1,2].map(i=><rect key={i} className="redaction-mask" x={i===1?53:160} y={60+i*24} width={i===1?95:118} height="17" rx="2" style={{animationDelay:'-'+i*2+'s'}} />)}</>;
    case 'crawler':
      return <><Box x={20} y={18} width={81} label="PAGE" /><Box x={20} y={71} width={81} label="PAGE" phase={2} /><Box x={20} y={124} width={81} label="PAGE" phase={4} /><Flow d="M101 40H133V93H164M101 93H164M101 146H133V93" /><Box x={164} y={71} width={82} label="COLLECT" phase={4} /><Flow d="M246 93H275" phase={5} /><Box x={275} y={71} width={71} label="DATA" phase={6} /></>;
    case 'chat':
      return <><path className="diagram-node" d="M25 30H239Q247 30 247 38V70Q247 78 239 78H61L42 92V78H33Q25 78 25 70Z" /><path className="diagram-line" d="M43 49H220M43 62H178" /><path className="diagram-node chat-response" d="M118 100H325Q333 100 333 108V139Q333 147 325 147H316V161L298 147H118Q110 147 110 139V108Q110 100 118 100Z" /><path className="diagram-line" d="M128 117H312M128 132H269" />{[0,1,2].map(i=><circle className="typing-dot" key={i} cx={276+i*12} cy="132" r="3" style={{animationDelay:'-'+i*.8+'s'}} />)}</>;
    case 'api':
      return <><Box x={14} y={15} width={89} label="PROJECTS" /><Box x={14} y={69} width={89} label="JOURNAL" phase={2} /><Box x={14} y={123} width={89} label="CONTACT" phase={4} /><Flow d="M103 37H133V91H166M103 91H166M103 145H133V91" /><Box x={166} y={69} width={70} label="API" phase={3} /><Flow d="M236 91H278" phase={5} /><path className="diagram-node" d="M280 52C280 40 337 40 337 52V133C337 145 280 145 280 133Z" /><ellipse className="diagram-line" cx="308.5" cy="52" rx="28.5" ry="10" /></>;
    case 'geo':
      return <><path className="geo-grid" d="M30 37H330M30 72H330M30 107H330M30 142H330M65 22V157M120 22V157M175 22V157M230 22V157M285 22V157" /><circle className="geo-boundary" cx="182" cy="90" r="57" /><circle className="geo-boundary inner" cx="182" cy="90" r="33" /><circle className="diagram-dot" cx="182" cy="90" r="7" />{[[80,58],[114,126],[252,52],[286,134]].map(([x,y],i)=><circle className="geo-point" key={i} cx={x} cy={y} r="4" style={{animationDelay:'-'+i*2+'s'}} />)}</>;
    case 'compiler':
      return <><rect className="diagram-node" x="18" y="17" width="135" height="44" rx="4" /><text className="terminal-label" x="33" y="44">a := 1 + 2</text><Flow d="M153 39H189" /><Box x={189} y={17} width={150} label="LEXER → PARSER" phase={2} /><Flow d="M264 61V82H180V95" phase={3} /><circle className="compiler-node" cx="180" cy="108" r="13" /><path className="diagram-line" d="M168 119L135 146M192 119L225 146" /><circle className="compiler-node leaf" cx="128" cy="152" r="11" /><circle className="compiler-node leaf second" cx="232" cy="152" r="11" /><text className="diagram-label" x="180" y="112" textAnchor="middle">+</text><text className="diagram-label" x="128" y="156" textAnchor="middle">1</text><text className="diagram-label" x="232" y="156" textAnchor="middle">2</text></>;
    default:
      return <Pipeline labels={['INPUT', 'PROCESS', 'OUTPUT']} />;
  }
}

export default function ProjectVisual({ type = 'api', name }) {
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new window.IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: .15 });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className={'project-visual visual-' + type} data-animation={type} data-active={visible && !paused}>
    <div className="visual-topline"><span>{name.toUpperCase()}</span><button type="button" className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={(paused ? 'Play' : 'Pause') + ' animation for ' + name} aria-pressed={paused}>{paused ? <FiPlay /> : <FiPause />}</button></div>
    <svg className="project-diagram" viewBox="0 0 360 180" aria-hidden="true" focusable="false"><Diagram type={type} /></svg>
    <span className="visual-bottom">{captions[type] || 'INPUT → PROCESS → OUTPUT'}</span>
  </div>;
}

