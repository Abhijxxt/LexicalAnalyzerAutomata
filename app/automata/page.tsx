"use client";
import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  Position
} from "reactflow";
import "reactflow/dist/style.css";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

export default function AutomataGraphPage({ word , state}: {word: string | null, state: number}) {
  console.log(word)
  const initialNodes: Node[] = useMemo(() => [
    {
      id: "0",
      position: { x: 100, y: 200 },
      data: { label: `START (code)` },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "1",
      position: { x: 300, y: 200 },
      data: { label: `split code` },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "2",
      position: { x: 500, y: 200 },
      data: { label: `Token: ${word}` },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "3",
      position: { x: 900, y: 100 },
      data: { label: "IDENTIFIER" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "4",
      position: { x: 900, y: 150 },
      data: { label: "DATA TYPE" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "5",
      position: { x: 900, y: 200 },
      data: { label: "KEYWORD" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "6",
      position: { x: 900, y: 250 },
      data: { label: "OPERATOR" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "7",
      position: { x: 900, y: 300 },
      data: { label: "SYMBOL" },
      style: {
       background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "8",
      position: { x: 900, y: 350 },
      data: { label: "SPECIAL CHARACTER" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
      },
      ...nodeDefaults,
    },
    {
      id: "9",
      position: { x: 1200, y: 230 },
      data: { label: "Final" },
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        padding: "10px",
        border: "5px solid #000",
      },
      ...nodeDefaults

    },
  ], [word, state]);

  const initialEdges: Edge[] = [
    { id: "e1", source: "0", target: "1", label: "E" },
    { id: "e2", source: "1", target: "2", label: "E" },
    { id: "e3", source: "2", target: "3", label: "Identifier" },
    { id: "e4", source: "2", target: "4", label: "int/float/double/char" },
    { id: "e5", source: "2", target: "7", label: "{,},(,),#" },
    { id: "e6", source: "2", target: "5", label: "Keyword" },
    { id: "e7", source: "2", target: "6", label: "Operator" },
    { id: "e8", source: "2", target: "8", label: "Special characters" },
    { id: "e9", source: "3", target: "9", label: "E" },
    { id: "e10", source: "4", target: "9", label: "E" },
    { id: "e11", source: "5", target: "9", label: "E" },
    { id: "e12", source: "6", target: "9", label: "E" },
    { id: "e13", source: "7", target: "9", label: "E" },
    { id: "e14", source: "8", target: "9", label: "E" },
    { id: "e15", source: "9", target: "1", label: "E" },
  ];

  // ✅ Make nodes & edges reactive
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ✅ Function to change a node's color dynamically
  const highlightNode = (id: string, color: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              style: {
                ...node.style,
                background: color,
                transition: "background 0.4s ease-in-out",
              },
            }
          : node
      )
    );
  };

  const setOriginalColor = () => {
    for(let id=0; id<=9; id++) {

      setNodes((nds) =>
        nds.map((node) =>
          node.id === id.toString()
      ? {
        ...node,
        style: {
          ...node.style,
          background: "#dc2626",
          transition: "background 0.4s ease-in-out",
        },
      }
      : node
    )
  );
  }
  }

  useEffect(() => {
    setOriginalColor();
    highlightNode(state.toString(), "#16a34a");
    if (word !== null) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === "2"
            ? {
                ...node,
                data: { label: `Token: ${word}` },
              }
            : node
        )
      );
    }
  },[word,state])

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ width: "100%", height: "500px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView={true}
          panOnDrag={false}          // disable panning
          zoomOnScroll={false}       // disable zooming
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          nodesDraggable={false}     // disable dragging nodes
          nodesConnectable={false}   // disable connecting edges
          elementsSelectable={false} 
        >
          {/* <Controls showFitView={false} /> */}
          <Background gap={0} color="#FFF" />
        </ReactFlow>
      </div>

      {/* Buttons to change color */}
      {/* <div className="flex gap-4">
        <button
          onClick={() => highlightNode("keyword", "#16a34a")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Highlight KEYWORD
        </button>
        <button
          onClick={() => highlightNode("id", "#dc2626")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Highlight IDENTIFIER
        </button>
      </div> */}
    </div>
  );
}
