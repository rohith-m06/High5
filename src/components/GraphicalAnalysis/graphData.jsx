// src/components/GraphicalAnalysis/graphData.js
export const sampleGraphData = {
  nodes: [
    { id: 'Microgravity Effects', group: 1, color: '#3b82f6' },
    { id: 'Plant Growth', group: 1, color: '#3b82f6' },
    { id: 'Radiation Impact', group: 2, color: '#f97316' },
    { id: 'Mission Planning', group: 3, color: '#f97316' },
    { id: 'Knowledge Gaps', group: 4, color: '#10b981' },
    { id: 'Consensus Areas', group: 5, color: '#8b5cf6' },
  ],
  links: [
    { source: 'Microgravity Effects', target: 'Plant Growth', value: 1 },
    { source: 'Radiation Impact', target: 'Mission Planning', value: 2 },
    { source: 'Knowledge Gaps', target: 'Microgravity Effects', value: 3 },
    { source: 'Consensus Areas', target: 'Plant Growth', value: 1 },
    { source: 'Radiation Impact', target: 'Knowledge Gaps', value: 2 },
    { source: 'Mission Planning', target: 'Consensus Areas', value: 1 },
  ],
};

// Color mapping for groups
export const groupColors = {
  1: '#3b82f6', // blue
  2: '#f97316', // orange
  3: '#f97316', // orange
  4: '#10b981', // green
  5: '#8b5cf6', // purple
};