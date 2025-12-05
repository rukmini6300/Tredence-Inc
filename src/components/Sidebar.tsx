import React from 'react';

type PaletteItem = {
  type: string;
  label: string;
};

const ITEMS: PaletteItem[] = [
  { type: 'start', label: 'Start' },
  { type: 'task', label: 'Task' },
  { type: 'approval', label: 'Approval' },
  { type: 'automated', label: 'Automated' },
  { type: 'end', label: 'End' },
];

export default function Sidebar() {
  const onDragStart = (e: React.DragEvent, itemType: string) => {
    // Put the node type in the transfer payload
    e.dataTransfer.setData('application/reactflow', itemType);
    // allowed effect
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <h4>Nodes</h4>
      {ITEMS.map((it) => (
        <div
          key={it.type}
          className="item"
          draggable
          onDragStart={(e) => onDragStart(e, it.type)}
          title={`Drag ${it.label} onto the canvas`}
        >
          {it.label}
        </div>
      ))}
      <div style={{fontSize:12, color:'#666', marginTop:12}}>
        Drag a node into the canvas to create it.
      </div>
    </aside>
  );
}
