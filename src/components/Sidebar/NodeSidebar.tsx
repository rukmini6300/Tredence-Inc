import React from "react";
import { useDrag } from "react-dnd";

const nodeTypes = [
  { type: "start", label: "Start", color: "#4ade80" },
  { type: "task", label: "Task", color: "#60a5fa" },
  { type: "approval", label: "Approval", color: "#fbbf24" },
  { type: "automated", label: "Automated", color: "#a78bfa" },
  { type: "end", label: "End", color: "#fb7185" },
];

interface DraggableNodeProps {
  type: string;
  label: string;
  color: string;
}

const DraggableNode = ({ type, label, color }: DraggableNodeProps) => {
  const [, drag] = useDrag(() => ({
    type: "NODE",
    item: { type },
  }));

  return (
    <div
      ref={drag}
      className="p-3 rounded-lg shadow cursor-pointer text-white mb-3"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
};

export default function NodeSidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Nodes</h2>
      {nodeTypes.map((n) => (
        <DraggableNode key={n.type} {...n} />
      ))}
    </div>
  );
}
