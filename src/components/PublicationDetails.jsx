'use client';
import { useState } from 'react';
import AIInsightsPanel from './AIInsightsPanel';
import GraphicalAnalysis from './GraphicalAnalysis/GraphicalAnalysis';

export default function PublicationDetails({ publication }) {
  const [showVisualization, setShowVisualization] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-blue-900 rounded-2xl shadow-2xl shadow-blue-900/30 overflow-hidden">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-950 to-black p-6 border-b-2 border-blue-800">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {publication.title || "Untitled Publication"}
          </h1>
        </div>

        {/* Abstract */}
        <div className="p-6 md:p-8">
          {publication.abstract && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-300 mb-2">Abstract</h2>
              <p className="text-gray-300">{publication.abstract}</p>
            </div>
          )}

          {/* AI Insights */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-cyan-300 mb-2 flex items-center gap-2">🤖 AI Analysis</h2>
            <AIInsightsPanel publication={publication} />
          </div>

          {/* Visualize Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowVisualization(!showVisualization)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {showVisualization ? 'Hide Visualization' : 'Visualize Knowledge Graph 📊'}
            </button>
          </div>

          {/* Graph */}
          {showVisualization && <GraphicalAnalysis publication={publication} />}
        </div>
      </div>
    </div>
  );
}
