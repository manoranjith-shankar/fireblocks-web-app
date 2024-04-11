import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Snippet
} from "@nextui-org/react";
import { useAppStore } from "@/app/AppStore";
import { validateGuid } from "@/components/validateGuid";

export default function AssignDeviceModal({ isOpen, onClose, isJoinWallet }) {
  const {
    deviceId,
    walletId,
    generateNewDeviceId,
    assignCurrentDevice,
    assignDeviceStatus,
    setWalletId
  } = useAppStore();

  const isValidDeviceId = validateGuid(deviceId);
  const isValidWalletId = validateGuid(walletId);

  const handleGenerateNewDeviceId = () => {
    generateNewDeviceId();
  };

  const handleAssignDevice = () => {
    assignCurrentDevice();
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isJoinWallet ?
              <span>Join existing wallet</span>
              : <span>
                Create new Wallet
              </span>
              }
            </ModalHeader>
            <ModalBody>
              Device Id
              <Snippet hideSymbol variant="bordered">
                {deviceId}
              </Snippet>
              {walletId && isJoinWallet === false ? (
                <>
                  <span>Wallet Id</span>
                  <Snippet hideSymbol variant="bordered">
                    {walletId}
                  </Snippet>
                </>
              ) : null}
              {isJoinWallet ? (
                <>
                  <Input
                    type="text"
                    value={""}
                    className="input input-bordered"
                    variant="bordered"
                    onChange={(e) => setWalletId(e.target.value)}
                    placeholder="Wallet id"
                  />
                </>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onClick={handleGenerateNewDeviceId}
                isDisabled={assignDeviceStatus === "started"}
              >
                Generate new Device Id
              </Button>
              <Button
                onClick={handleAssignDevice}
                isDisabled={assignDeviceStatus === "started"}
                isLoading={assignDeviceStatus === "started"}
                spinner={
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                }
              >
                Assign Device
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}