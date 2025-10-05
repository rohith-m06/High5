export default function GraphLegend() {
  return (
    <div className="p-4 bg-gray-900/80 backdrop-blur-md rounded-xl text-white text-sm shadow-lg">
      <h3 className="font-bold mb-2 text-cyan-300">Legend</h3>
      <ul className="space-y-1">
        <li><span className="text-blue-400 font-bold">●</span> Research Topics</li>
        <li><span className="text-orange-400 font-bold">●</span> Mission Planning</li>
        <li><span className="text-green-400 font-bold">●</span> Knowledge Gaps</li>
        <li><span className="text-purple-400 font-bold">●</span> Consensus Areas</li>
      </ul>
    </div>
  );
}
