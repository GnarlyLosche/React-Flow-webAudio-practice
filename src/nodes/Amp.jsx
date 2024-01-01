import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
 
import { useStore } from '../store';


const selector = (id) => (store) => ({
    setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});
 
// Figure out how to add styling

export default function Amp({ id, data }) {
    const { setGain } = useStore(selector(id), shallow);
  return (
    <div>
      <div className ='nodeTitle-container'> <strong>Amplitude</strong> </div>
 
        <label>
          <span>Gain</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.gain}
            onChange={setGain} />
          <span>{data.gain}</span>
        </label>
 
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};