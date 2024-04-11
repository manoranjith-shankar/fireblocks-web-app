"use client"

import { useEffect, useState } from "react";
import { useAppStore } from "@/app/AppStore";
import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import AssignDeviceModal from "@/components/AssignDevice/AssignDeviceModal";

export default function AssignDevice() {
  const { loggedUser, initAppStore, loginToDemoAppServerStatus, loginToDemoAppServer, setAppMode } = useAppStore();
  const [initialized, setInitialized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinWallet, setIsJoinWallet] = useState(false);

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

  const handleCreateWallet = () => {
    setAppMode("SIGN_IN");
    setIsModalOpen(true);
    setIsJoinWallet(false);
  };

  const handleJoinWallet = () => {
    setAppMode("JOIN");
    setIsModalOpen(true);
    setIsJoinWallet(true);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {loginToDemoAppServerStatus === "success" ? (
        <Card className="max-w-[500px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">App Mode</p>
              <p className="text-small text-default-500">Select App Mode</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-2">
              <Button className="m-3 p-4" onClick={handleCreateWallet}>
                Create new wallet
              </Button>
              <Button
                className="m-3 px-4"
                onClick={handleJoinWallet}
                isDisabled={true}
              >
                Join existing Wallet
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        "Not logging in to demo app server"
      )}
      <AssignDeviceModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} isJoinWallet={isJoinWallet} />
    </section>
  );
}