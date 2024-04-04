"use client"

import { useEffect, useState } from "react";
import { useAppStore } from "./AppStore";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/react";
import CreateWalletModal from "../components/AssignDevice";
import FireblocksNcwInitializer from "@/components/FireblocksNcwInitializer";
import { FireblocksNCWActions } from "@/components/FireblocksNCWActions";
import GenerateMPCKeys from "@/components/GenerateMPCKeys";

export default function Home() {
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
        setDeviceId,
        fireblocksNCWStatus
      } = useAppStore();
  const [initialized, setInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinWallet, setIsJoinWallet] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      initAppStore();
      setInitialized(true);
    }
  }, [loggedUser]);

  // console.log(appStoreInitialized, "1")
  // console.log(loginToDemoAppServerStatus, "2")

  useEffect(() => {
    if (initialized && loggedUser ) {
      loginToDemoAppServer()
    }
  },[loggedUser, initialized])

  const handleCreateWallet = () => {
    setAppMode("SIGN_IN")
    setIsModalOpen(true)
    setIsJoinWallet(false)
  }

  const handleJoinWallet = () => {
    setAppMode("JOIN")
    setIsModalOpen(true)
    setIsJoinWallet(true)
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
      <Button className="m-3 p-4" onClick={() => handleCreateWallet()}>
        Create new wallet
      </Button>
      <Button className="m-3 px-4" onClick={() => handleJoinWallet()}>
        Join existing Wallet
      </Button>
      </div>
      </CardBody>
    </Card>
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
    <CreateWalletModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} isJoinWallet={isJoinWallet} />
    </section>
  );
}