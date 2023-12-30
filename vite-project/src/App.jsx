import React, { memo } from 'react';
import ReactFlow, { Background, Panel } from 'reactflow';
import { shallow } from 'zustand/shallow';

import { useStore } from './store';
import Osc from './nodes/Osc';
import Amp from './nodes/Amp';
import Out from './nodes/Out';

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes,
  onEdgesDelete: store.onEdgesDelete,
  createNode: store.createNode,
});

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};
 
export default function App() {
  const store = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={store.nodes}
      nodeTypes={nodeTypes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onEdgesChange={store.onEdgesChange}
      onConnect={store.addEdge}
      onNodesDelete={store.onNodesDelete}
      onEdgesDelete={store.onEdgesDelete}
    >
      <Panel position="top-right">
        <button onClick={() => store.createNode('osc')}>osc</button>
        <button onClick={() => store.createNode('amp')}>amp</button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}