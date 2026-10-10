import content from './profile.json';
import engineering from './engineering.json';
export const { profile, impact, education, experiences, platformSystems } = content;
export const projects = content.projects.map(project => ({ ...project, technical: engineering.find(item => String(item.id) === String(project.id)) }));
export const findProject = slug => projects.find(project => project.technical?.slug === slug);

