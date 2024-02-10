import React, { createContext, useContext, useState } from 'react';

// Define a context for managing notifications
const NotificationContext = createContext();

// Custom hook to consume the notification context
export const useNotification = () => useContext(NotificationContext);

// NotificationProvider component to wrap your application and provide notification functionality
export const NotificationProvider = ({ children }) => {
  // State to store notification counts and their data
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (notificationData) => {
    setNotifications((prevNotifications) => [...prevNotifications, notificationData]);
  };

  // Function to remove a notification
  const removeNotification = (notificationId) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Value to be provided by the context
  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
