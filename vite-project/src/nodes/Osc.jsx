import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
 
import { useStore } from '../store';


const selector = (id) => (store) => ({
    setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
    setType: (e) => store.updateNode(id, { type: e.target.value }),
});
 
// Figure out how to add styling

export default function Osc({ id, data }) {
    const { setFrequency, setType } = useStore(selector(id), shallow);
  return (
    <div>
      <div>
        <p>Oscillator Node</p>
 
        <label>
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency} />
          <span>{data.frequency}Hz</span>
        </label>

        <p></p>

        <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
          </label>
      </div>
 
      <Handle type="source" position="bottom" />
    </div>
  );
};