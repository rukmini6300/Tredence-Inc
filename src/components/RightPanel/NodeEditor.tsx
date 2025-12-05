export default function NodeEditor({ selectedNode, updateNode }: { selectedNode: any; updateNode: (label: string) => void }) {
  if (!selectedNode) return (
    <div className="p-6 text-gray-500">Select a node to edit</div>
  );

  return (
    <div className="p-6 border-l w-64 bg-white">
      <h2 className="text-lg font-bold">Edit Node</h2>

      <label className="block mt-4 text-sm font-semibold">Label</label>
      <input
        className="border p-2 w-full mt-1"
        value={selectedNode.data.label}
        onChange={(e) => updateNode(e.target.value)}
      />
    </div>
  );
}
