"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

// ... (imports)

const initialState = {
  userData: null,
  matchedUsers: null,
  username: null,
  messages: null,
  // add other global variables as needed
};

const GlobalContext = createContext(initialState);

const isBrowser = typeof window !== "undefined";

export const GlobalProvider = ({ children }) => {
  // Parse values from localStorage with defaults
  const valueUser = isBrowser
    ? JSON.parse(localStorage.getItem("globalState"))?.userData || null
    : null;
  const valueMatch = isBrowser
    ? JSON.parse(localStorage.getItem("globalState"))?.matchedUsers || null
    : null;
  const valueUsername = isBrowser
    ? JSON.parse(localStorage.getItem("globalState"))?.username || null
    : null;
  const valueMessages = isBrowser
    ? JSON.parse(localStorage.getItem("globalState"))?.messages || null
    : null;

  // Use the functional update form of setGlobalUser
  const [globalUser, setGlobalUser] = useState(() => ({
    userData: valueUser,
    matchedUsers: valueMatch,
    username: valueUsername,
    messages: valueMessages,
  }));

  useEffect(() => {
    // Use the functional update form to ensure the latest state
    setGlobalUser((prevGlobalUser) => {
      // Persist the updated state to localStorage
      localStorage.setItem("globalState", JSON.stringify(prevGlobalUser));
      return prevGlobalUser;
    });
  }, [globalUser]);

  return (
    <GlobalContext.Provider value={{ globalUser, setGlobalUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
