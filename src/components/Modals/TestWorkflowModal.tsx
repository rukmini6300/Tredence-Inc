import { useState } from "react";

interface TestWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  nodes: unknown[];
}

export default function TestWorkflowModal({
  open,
  onClose,
  nodes,
}: TestWorkflowModalProps) {
  const [result, setResult] = useState<{ message: string } | null>(null);

  const runTest = async () => {
    const res = await fetch("/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes }),
    });
    const data = await res.json();
    setResult(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-lg font-bold mb-4">Test Workflow</h2>

        <button
          onClick={runTest}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Run
        </button>

        {result && <p className="mt-4">Result: {result.message}</p>}

        <button
          onClick={onClose}
          className="mt-4 block w-full text-center"
        >
          Close
        </button>
      </div>
    </div>
  );
}
