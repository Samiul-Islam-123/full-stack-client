// src/contexts/SocketContext.js
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

// Create the context
const SocketContext = createContext();

// Custom hook to use the socket context
export function useSocket() {
  return useContext(SocketContext);
}

// Provider component to wrap your application and provide the socket instance
export function SocketProvider({ url, options, children }) {
  // Create the socket instance
  const socket = io(url, options);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
