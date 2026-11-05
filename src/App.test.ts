import { describe, expect, it } from 'vitest';
import { engines, industries, resolveRoute } from './App';

describe('Caeliaris site navigation', () => {
  it('resolves the home route', () => {
    expect(resolveRoute('#/')).toEqual({ type: 'home' });
  });

  it('resolves the projects section', () => {
    expect(resolveRoute('#/projects')).toEqual({ type: 'section', anchor: 'projects' });
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
});
