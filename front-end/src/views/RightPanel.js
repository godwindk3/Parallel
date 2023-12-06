// RightPanel.js
import React from 'react';
import { useSharedData } from './SharedDataContext';
import './PanelStyle.css'

const RightPanel = () => {
  const { sharedData, getMousePosition, updateMousePosition } = useSharedData();

  const handleMouseMove = (event) => {
    const x = parseInt(event.pageX - event.currentTarget.getBoundingClientRect().left);
    const y = parseInt(event.pageY - event.currentTarget.getBoundingClientRect().top);
    updateMousePosition({ x, y });
  };

  return (
    <div className="panel right-panel" onMouseMove={handleMouseMove}>
      <h2>Right Panel</h2>
      <p>Shared Data: {sharedData}</p>
      <p>Mouse Position: ({getMousePosition().x}, {getMousePosition().y})</p>
    </div>
  );
};

export default RightPanel;
