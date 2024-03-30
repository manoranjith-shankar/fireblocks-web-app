"use client"

import { useEffect, useState } from "react";
import { useAppStore } from "./AppStore";

export default function Home() {
  const { loggedUser, appStoreInitialized, initAppStore, loginToDemoAppServerStatus, loginToDemoAppServer } = useAppStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      initAppStore();
      setInitialized(true);
    }
  }, [loggedUser]);

  console.log(appStoreInitialized, "1")
  console.log(loginToDemoAppServerStatus, "2")

  useEffect(() => {
    if (initialized && loggedUser ) {
      loginToDemoAppServer()
    }
  },[loggedUser, initialized])

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      loggedUser: {loggedUser ? loggedUser.email : "No user logged in"} <br />
      {appStoreInitialized ? "App store initialized" : "App store not initialized"}
    </section>
  );
}