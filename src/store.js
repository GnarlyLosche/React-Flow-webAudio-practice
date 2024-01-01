import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { updateAudioNode, removeAudioNode, connect, isRunning, toggleAudio, createAudioNode } from './audio';
 
export const useStore = create((set, get) => ({
//   nodes: [],
    nodes: [
        {   type: 'osc',
            id: 'a',
            data: { frequency: 220, type: 'square' },
            position: { x: 0, y: 0 },
        },
        { type: 'amp', id: 'b', data: { gain: 0.50 }, position: { x: 50, y: 150 } },
        { type: 'out', id: 'c', data: { label: 'output' }, position: { x: -50, y: 250 } }
    ],
    edges: [
        { id: 'e1-2', source: 'a', target: 'b', animated: true },
        { id: 'e2-3', source: 'b', target: 'c', animated: true },
    ],

    isRunning: isRunning(),

    createNode(type) {
        const id = nanoid();
     
        switch(type) {
          case 'osc': {
            const data = { frequency: 440, type: 'sine' };
            const position = { x: 0, y: 0 };
     
            createAudioNode(id, type, data);
            set({ nodes: [...get().nodes, { id, type, data, position }] });
     
            break;
          }
     
          case 'amp': {
            const data = { gain: 0.5 };
            const position = { x: 0, y: 0 };
     
            createAudioNode(id, type, data);
            set({ nodes: [...get().nodes, { id, type, data, position }] });
     
            break;
          }
        }
    },
 
    toggleAudio() {
        toggleAudio().then(() => {
            set({ isRunning: isRunning() });
        });
    },

    updateNode(id, data) {
        updateAudioNode(id, data);
    set({
        nodes: get().nodes.map(node =>
        node.id === id
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
    });
    },

    removeNodes(nodes) {
        for (const { id } of nodes) {
          removeAudioNode(id)
        }
    },

    onNodesChange(changes) {
    set({
        nodes: applyNodeChanges(changes, get().nodes),
    });
    },

    onEdgesChange(changes) {
    set({
        edges: applyEdgeChanges(changes, get().edges),
    });
    },

    addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    set({ edges: [edge, ...get().edges] });
    connect(data.source, data.target);
    },
}));