"use client"

import { useEffect, useState } from "react";
import { useAppStore } from "./AppStore";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/react";
import { validateGuid } from "@/components/validateGuid";

export default function Home() {

  const [device, setDevice] = useState("");
  const { loggedUser,
    appStoreInitialized,
     initAppStore,
      loginToDemoAppServerStatus,
       loginToDemoAppServer,
        userId,
        deviceId,
        setAppMode,
        generateNewDeviceId,
        assignCurrentDevice,
        assignDeviceStatus,
        appMode,
        walletId,
        setDeviceId
      } = useAppStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      initAppStore();
      setInitialized(true);
    }
  }, [loggedUser]);

  // console.log(appStoreInitialized, "1")
  // console.log(loginToDemoAppServerStatus, "2")

  const validDeviceId = validateGuid(deviceId);
  // const isValidWalletId = validateGuid(walletId);

  useEffect(() => {
    if (initialized && loggedUser ) {
      loginToDemoAppServer()
    }
  },[loggedUser, initialized])

  const handleCreateWallet = () => {
    setAppMode("SIGN_IN")
  }

  const handleAssignDevice = () => {
      console.log("login status", loginToDemoAppServerStatus)
      setDeviceId(deviceId)
      assignCurrentDevice();
      console.log("assigning device", assignDeviceStatus)
  }

  const handlegenerateNewDeviceId = () => {
    generateNewDeviceId()
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      loggedUser: {loggedUser ? loggedUser.email : "No user logged in"} <br />
      {appStoreInitialized ? "App store initialized" : "App store not initialized"} <br />
      {loginToDemoAppServerStatus === "success" ? userId: "Not logging in to demo app server"}
      <Card className="max-w-[500px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">App Mode</p>
          <p className="text-small text-default-500">select App Mode</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <div className="grid grid-cols-2">
      <Button className="m-3 p-4" onClick={handleCreateWallet}>
        Create new wallet
      </Button>
      <Button className="m-3 px-4">
        Join existing Wallet
      </Button>
      </div> 
      </CardBody>
      <CardFooter>
        <div className="flex flex-col">
        <Snippet symbol= " " variant="bordered">
          {deviceId}
          </Snippet>
          <Button className="m-4" onClick={handlegenerateNewDeviceId}>
            Generate new Device Id
          </Button>
          <Button className="m-4" onClick={handleAssignDevice}>
            Assign Device
          </Button>
          </div>
        </CardFooter>
    </Card>
    </section>
  );
}