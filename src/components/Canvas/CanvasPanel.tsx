import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar";

// Basic mapping from palette type -> reactflow node type / default label
const TYPE_MAP: Record<string, { rfType?: string; label: string }> = {
  start: { rfType: "input", label: "Start" },
  task: { rfType: "default", label: "Task" },
  approval: { rfType: "default", label: "Approval" },
  automated: { rfType: "default", label: "Automated" },
  end: { rfType: "output", label: "End" },
};

const initialNodes: Node[] = [
  {
    id: "n1",
    type: "input",
    position: { x: 100, y: 80 },
    data: { label: "Welcome (example)" },
  },
];

const initialEdges: Edge[] = [];

function FlowComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const reactFlowInstance = useReactFlow();

  // connect handler
  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // allow drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // onDrop: read the node type and create a node at drop position
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = (event.target as HTMLElement).closest(
        ".reactflow-wrapper"
      ) as HTMLElement | null;

      // prefer reading from reactflow instance if available
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // compute position
      let position = { x: event.clientX, y: event.clientY };
      if (reactFlowBounds) {
        const bounds = reactFlowBounds.getBoundingClientRect();
        position = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };
      }

      // convert screen coords to canvas coords
      const rfPos = reactFlowInstance.project
        ? reactFlowInstance.project(position)
        : position;

      const newNode: Node = {
        id: uuidv4(),
        type: TYPE_MAP[type]?.rfType ?? "default",
        position: rfPos,
        data: { label: TYPE_MAP[type]?.label ?? type, nodeType: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Sidebar />
      <div className="canvas-wrap" style={{ flex: 1 }}>
        <div className="reactflow-wrapper" style={{ width: "100%", height: "100%" }}
             onDrop={onDrop}
             onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            fitView
           >
            <Background gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default function CanvasPanel() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
}
