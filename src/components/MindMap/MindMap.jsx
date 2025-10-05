'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tooltip } from 'react-tooltip';

// Dynamic import for react-d3-tree
const Tree = dynamic(
  () => import('react-d3-tree').then(mod => mod.default || mod),
  { ssr: false }
);

// Define a new color palette that is vibrant and dark enough to contrast with a white background
const LEVEL_COLORS_LIGHT_THEME = [
  '#E63946', // Red/Crimson: Root/Publication Title - High impact
  '#457B9D', // Steel Blue: Level 1/Main Themes - Deep blue
  '#1D3557', // Prussian Blue: Level 2/Sub-concepts - Dark blue/Blackish
  '#5D2E8C', // Deep Purple: Level 3+/Details - Rich purple
  '#38A3A5', // Teal: Fallback for deeper levels
];

// Function to determine node color based on depth
const getNodeColor = (depth) => {
    return LEVEL_COLORS_LIGHT_THEME[depth] || LEVEL_COLORS_LIGHT_THEME[LEVEL_COLORS_LIGHT_THEME.length - 1];
};

export default function MindMap({ publication }) {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (!publication) return;

    const fetchMindMap = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/mindmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pubTitle: publication.title,
            pubAbstract: publication.abstract,
            source_url: publication.source_url
          })
        });
        const data = await res.json();
        const addIds = (node) => {
            node.id = node.name.replace(/\s/g, '-') + '-' + Math.random().toString(36).substr(2, 9);
            node.children && node.children.forEach(addIds);
        };
        addIds(data);
        setTreeData(data);
      } catch (err) {
        console.error(err);
        setTreeData({ name: publication.title || "Publication Mind Map", children: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchMindMap();
  }, [publication]);

  // --- Loading State UI Enhancement (White background enforced) ---
  if (loading) return (
    // Set background to white and text to a dark color (gray-700)
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"></div>
      <div className="text-gray-700 text-lg font-semibold animate-pulse">
        Analyzing text and synthesizing concepts...
      </div>
      <style jsx>{`
        .loader {
          border-top-color: #E63946; /* Red spinner */
          animation: spinner 1.5s linear infinite;
        }
        @keyframes spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // --- Main Component UI Enhancement (White background enforced) ---
  return (
    // Enforce solid white background and black text
    <div className="w-full h-[600px] bg-white text-gray-800 rounded-2xl p-2 shadow-2xl border border-gray-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full p-4 overflow-auto">
        {treeData && (
          <Tree
            data={treeData}
            collapsible={true}
            orientation="vertical"
            pathFunc="diagonal" 
            translate={{ x: 350, y: 50 }}
            // Apply vibrant colors to the node circles
            nodeSvgShape={{ 
                shape: 'circle', 
                shapeProps: { 
                    r: 10, 
                    fill: nodeDatum => getNodeColor(nodeDatum.depth), 
                    stroke: '#FFFFFF', // White stroke to make color pop
                    strokeWidth: 2 
                } 
            }}
            linkDashed={false}
            styles={{
                // Link color is a light gray for a subtle look on white
                links: { stroke: '#ccc', strokeWidth: 2, transition: 'stroke 0.3s' },
                // Force label text color black using D3-Tree styles
                nodes: {
                    node: { fill: '#000000', stroke: '#000000' }, 
                    leafNode: { fill: '#000000', stroke: '#000000' },
                }
            }}
            onNodeClick={(node) => setActiveNode(node.data.id)}
            nodeLabelComponent={{
              render: <NodeLabel activeNodeId={activeNode} />,
              foreignObjectWrapper: { x: -75, y: 15, width: 150, height: 40 }
            }}
          />
        )}
      </div>
      {/* Tooltip for light theme (dark background, white text) */}
      <Tooltip 
        id="mindmap-tooltip" 
        className="bg-gray-800 text-white font-medium text-sm p-2 rounded-md opacity-100 shadow-xl z-50 border border-gray-700" 
      />
    </div>
  );
}

// --- Node Label Component UI Enhancement ---
function NodeLabel({ nodeDatum, activeNodeId }) {
  const isRoot = nodeDatum.depth === 0;
  const isSelected = nodeDatum.id === activeNodeId;
  const nodeColor = getNodeColor(nodeDatum.depth);

  // Base classes for all nodes
  const baseClasses = "text-xs font-sans transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] text-gray-800";
  
  // Classes for the root node (Level 0)
  const rootClasses = `text-lg font-extrabold border-b-2 pb-1`;
  
  // Classes for child nodes (Level 1+)
  const childClasses = `font-semibold px-2 py-1 rounded-md shadow-lg border border-transparent`;

  return (
    <div
      data-tooltip-id="mindmap-tooltip"
      data-tooltip-content={nodeDatum.name}
      data-tooltip-place="top"
      className={`${baseClasses} ${isRoot ? rootClasses : childClasses}`}
      style={{
        maxWidth: isRoot ? '200px' : '150px',
        transform: isRoot ? 'translateX(-50%)' : 'none',
        // Text is forced black/gray-800
        color: isRoot ? nodeColor : '#1F2937', // Use node color for root, dark gray for children
        backgroundColor: isRoot ? 'transparent' : isSelected ? 'rgba(243, 244, 246, 0.9)' : 'rgba(255, 255, 255, 0.9)', // Light backgrounds
        // Use the vibrant color for the root underline and selection border/glow
        borderBottomColor: isRoot ? nodeColor : 'transparent', 
        borderColor: isSelected ? nodeColor : 'transparent', 
        fontWeight: isSelected ? 'bold' : 'normal',
        filter: isSelected ? `drop-shadow(0 0 5px ${nodeColor})` : 'none',
      }}
    >
      {nodeDatum.name}
    </div>
  );
}