// SharedDataContext.js
import React, { createContext, useState, useContext } from 'react';

const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 , z: 0});

  const updateSharedData = (data) => {
    setSharedData(data);
  };

  const updateMousePosition = (position) => {
    setMousePosition(position);
  };

  const getMousePosition = () => {
    return mousePosition;
  };

  return (
    <SharedDataContext.Provider value={{ sharedData, updateSharedData, updateMousePosition, getMousePosition }}>
      {children}
    </SharedDataContext.Provider>
  );
};

export const useSharedData = () => {
  return useContext(SharedDataContext);
};
