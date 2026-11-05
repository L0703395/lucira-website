import { describe, expect, it } from 'vitest';
import { engines, industries, projects, resolveRoute } from './App';

describe('Caeliaris site navigation', () => {
  it('resolves the home route', () => {
    expect(resolveRoute('#/')).toEqual({ type: 'home' });
  });

  it('resolves the projects section', () => {
    expect(resolveRoute('#/projects')).toEqual({ type: 'section', anchor: 'projects' });
  });

  it('resolves the ULI explainer page', () => {
    expect(resolveRoute('#/uli')).toEqual({ type: 'section', anchor: 'uli' });
  });

  it('resolves the Refraction demonstration page', () => {
    expect(resolveRoute('#/refraction')).toEqual({ type: 'section', anchor: 'refraction' });
  });

  it('keeps engine routes case-insensitive', () => {
    expect(resolveRoute('#/engines/rie')).toEqual({ type: 'engine', engine: 'RIE' });
  });

  it('resolves industry detail routes', () => {
    expect(resolveRoute('#/industries/research')).toEqual({
      type: 'industry',
      industry: 'research',
    });
  });
});

describe('Caeliaris platform content', () => {
  it('contains six named platform engines', () => {
    expect(engines).toHaveLength(6);
    expect(engines.map((engine) => engine.key)).toEqual([
      'RIE', 'MIE', 'DAFE', 'EIIE', 'LIE', 'TAXE',
    ]);
  });

  it('contains six application areas', () => {
    expect(industries).toHaveLength(6);
  });

  it('features the selected three projects in the requested order', () => {
    expect(projects.map((project) => project.title)).toEqual([
      'Project Refract',
      'MS DAO',
      'Cellular Precision',
    ]);
    expect(projects.map((project) => project.image)).toEqual([
      '/images/project-refract.svg',
      '/images/ms-dao.svg',
      '/images/cellular-precision.svg',
    ]);
  });
});
