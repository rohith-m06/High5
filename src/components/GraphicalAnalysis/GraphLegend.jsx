export default function GraphLegend() {
  return (
    <div className="p-4 bg-gray-900 rounded-lg text-white text-sm mb-4 shadow">
      <h3 className="font-bold mb-2">Legend</h3>
      <ul>
        <li><span className="text-blue-400">●</span> Research Topics</li>
        <li><span className="text-orange-400">●</span> Mission Planning</li>
        <li><span className="text-green-400">●</span> Knowledge Gaps</li>
        <li><span className="text-purple-400">●</span> Consensus Areas</li>
      </ul>
    </div>
  );
}
