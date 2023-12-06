// LeftPanel.js
import React from 'react';
import { useSharedData } from './SharedDataContext';
import './PanelStyle.css';

const LeftPanel = () => {
  const { sharedData, getMousePosition, updateMousePosition } = useSharedData();

  const handleMouseMove = (event) => {
    const x = parseInt(event.pageX - event.currentTarget.getBoundingClientRect().left);
    const y = parseInt(event.pageY - event.currentTarget.getBoundingClientRect().top);
    updateMousePosition({ x, y });
  };

  const handleClick = () => {
    const newData = 'New Data from Left Panel';
    // Correct the function name here to updateMousePosition
    updateMousePosition(newData);
  };

  return (
    <div className="panel left-panel" onMouseMove={handleMouseMove}>
      <h2>Left Panel</h2>
      <p>Shared Data: {sharedData}</p>
      <p>Mouse Position: ({getMousePosition().x}, {getMousePosition().y})</p>
    </div>
  );
};

export default LeftPanel;
