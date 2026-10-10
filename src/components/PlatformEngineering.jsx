import { platformSystems } from '../data/profile';

export default function PlatformEngineering() {
  return <section className="platform-engineering" aria-labelledby="platform-engineering-title"><div className="section-heading"><div><p className="eyebrow">ENGINEERING / CONTROL PLANE TO CLIENT</p><h2 id="platform-engineering-title">The systems<br /><em>behind the scale.</em></h2></div></div><div className="platform-system-grid">{platformSystems.map(system => <article className="platform-system" key={system.title}><p className="eyebrow">{system.domain}</p><h3>{system.title}</h3><ol className="platform-flow">{system.flow.map(step => <li key={step}>{step}</li>)}</ol><p>{system.detail}</p><div className="tag-list">{system.components.map(component => <span key={component}>{component}</span>)}</div><strong className="platform-scale">{system.scale}</strong></article>)}</div></section>;
}
