"use client"

import React from "react";
import { useAppStore } from "@/app/AppStore";

const App = () => {
  const { loggedUser, userId, initAppStore } = useAppStore();
  console.log(loggedUser, '1')

    if(loggedUser != null) {
      initAppStore();
    }

  return (
      <div>
        <p>{userId}</p>
        {/* <div>{loggedUser ? <AppContent /> : <Login />}</div> */}
      </div>
  );
};

export default App