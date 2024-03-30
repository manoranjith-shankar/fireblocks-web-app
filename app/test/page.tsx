"use client"

import React, { useEffect } from "react";
import { useAppStore } from "@/app/AppStore";
import LoginToDemoAppServer from "./DemoLogin";
import { Button } from "@nextui-org/button";

const App = () => {
  const { loggedUser, userId, initAppStore, loginToDemoAppServer, appStoreInitialized } = useAppStore();
  console.log(loggedUser, '1')

    if(loggedUser != null) {
      console.log(appStoreInitialized, 'appstore')
    }

    const handleLogin = async () => {
      if (!appStoreInitialized) {
        await initAppStore();
      } else {
        await loginToDemoAppServer();
      }
      setTimeout(() => {
        loginToDemoAppServer();
      }, 1000)
    }

  return (
      <div className="justify-items-center">
        <Button onClick={handleLogin}>
          login
        </Button>
        {/* <div>{loggedUser ? <AppContent /> : <Login />}</div> */}
      </div>
  );
};

export default App