'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GraphLegend from './GraphLegend';

// Dynamically import ForceGraph2D
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then(mod => mod.default || mod),
  { ssr: false }
);

export default function GraphicalAnalysis({ publication }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!publication) return;

    const fetchGraph = async () => {
      setLoading(true);
      setError('');

      try {
        // Ensure we never send undefined
        const body = {
          pubTitle: publication.title || "Untitled Publication",
          pubAbstract: publication.abstract || "",
          source_url: publication.source_url || ""
        };

        // If all fields empty, skip API
        if (!body.pubAbstract && !body.source_url && !body.pubTitle) {
          setGraphData({ nodes: [], links: [] });
          setLoading(false);
          return;
        }

        const res = await fetch('/api/visualize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to generate graph");
        }

        const data = await res.json();
        setGraphData(data?.nodes?.length ? data : { nodes: [], links: [] });
      } catch (err) {
        console.error(err);
        setError(err.message);
        setGraphData({ nodes: [], links: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchGraph();
  }, [publication]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center text-white text-lg">
        Generating knowledge graph...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-black via-gray-900 to-gray-800 rounded-xl shadow-lg text-white mt-4">
      <h2 className="text-2xl font-bold mb-4">{publication.title} - Knowledge Graph</h2>
      <GraphLegend />

      <div className="w-full h-[600px] border border-gray-700 rounded-lg overflow-hidden">
        <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="group"
          nodeLabel="id"
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          linkWidth={(link) => link.value || 1}
          linkColor={() => 'rgba(255,255,255,0.3)'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / Math.max(globalScale, 1);
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = node.color || '#ffffff';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, node.x, node.y - 10);
          }}
        />
      </div>
    </div>
  );
}
