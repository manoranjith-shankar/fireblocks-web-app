"use client"

import React from "react";

import { useAppStore } from "../AppStore";
import { LoginToDemoAppServer } from "./DemoLogin";

export const AppContent: React.FC = () => {
  const {
    loginToDemoAppServerStatus,
    assignDeviceStatus,
    appStoreInitialized,
    fireblocksNCWStatus,
    initAppStore,
    disposeAppStore,
    appMode,
  } = useAppStore();

  React.useEffect(() => {
    if (appStoreInitialized) {
      return () => {
        disposeAppStore();
      };
    } else {
      initAppStore();
    }
  }, [disposeAppStore, appStoreInitialized, initAppStore]);

  if (!appStoreInitialized) {
    return null;
  }

  return (
    <>
      <LoginToDemoAppServer />
      {loginToDemoAppServerStatus === "success" && (
        <p>Logged in the Server</p>
      )}
    </>
  );
};