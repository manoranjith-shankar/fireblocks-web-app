"use client"

import { useEffect, useState } from "react";
import { useAppStore } from "./AppStore";
import { Card, CardHeader, CardBody, Divider, Button, Snippet } from "@nextui-org/react";
import FireblocksNcwInitializer from "@/components/Initializer/FireblocksNcwInitializer";
import { FireblocksNCWActions } from "@/components/FireblocksNCWActions";
import AssignDevice from "@/components/AssignDevice/AssignDevice.tsx";

export default function Home() {
  const { loggedUser, appStoreInitialized, initAppStore, loginToDemoAppServer, deviceId, setAppMode, assignDeviceStatus, walletId, fireblocksNCWStatus } = useAppStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      initAppStore();
      setInitialized(true);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (initialized && loggedUser) {
      loginToDemoAppServer();
    }
  }, [loggedUser, initialized]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card>
        <CardHeader>
          {loggedUser ? (
            <>
              <p>Welcome! {loggedUser.displayName}</p>
              {appStoreInitialized ? null : (
                <p>Oops! Something went wrong</p>
              )}
            </>
          ) : (
            <h1>Welcome! Please Login to use the Application</h1>
          )}
        </CardHeader>
      </Card>
        <AssignDevice />
      {assignDeviceStatus === "success" && (
        <Card className="max-w-[500px]">
          <CardHeader className="flex justify-center">
            <p className="text-lg font-medium">Device Information</p>
          </CardHeader>
          <CardBody>
            <div className="mb-2 text-start">Device Id</div>
            <Snippet symbol=" " variant="bordered">
              {deviceId}
            </Snippet>
            <div className="mt-4 mb-2 text-start">Wallet Id</div>
            <Snippet symbol=" " variant="bordered">
              {walletId}
            </Snippet>
          </CardBody>
        </Card>
      )}
      {assignDeviceStatus === "success" && (
        <>
          <FireblocksNcwInitializer />
          {fireblocksNCWStatus === "sdk_available" && <FireblocksNCWActions />}
        </>
      )}
    </section>
  );
}