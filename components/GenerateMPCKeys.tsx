"use client"

import React from "react";
import { useAppStore } from "@/app/AppStore";
import { handleError } from "@/utils/error-utils";
import { Card, CardHeader, CardBody, Divider, Button, Progress } from "@nextui-org/react";
import toast from "react-hot-toast";

const GenerateMPCKeys: React.FC = () => {
  const [err, setErr] = React.useState<string | null>(null);
  const [isGenerateInProgress, setIsGenerateInProgress] = React.useState(false);
  const [isStopInProgress, setIsStopInProgress] = React.useState(false);
  const [generateMPCKeysResult, setGenerateMPCKeysResult] = React.useState<string | null>(null);
  const { keysStatus, generateMPCKeys, stopMpcDeviceSetup } = useAppStore();

  const secP256K1Status = keysStatus?.MPC_CMP_ECDSA_SECP256K1?.keyStatus ?? null;

  const handleGenerateMPCKeys = async () => {
    setGenerateMPCKeysResult(null);
    setErr(null);
    setIsGenerateInProgress(true);
    try {
      await generateMPCKeys();
      setGenerateMPCKeysResult("Success");
      setIsGenerateInProgress(false);
    } catch (err: unknown) {
      handleError(err, setErr);
    } finally {
      setIsGenerateInProgress(false);
    }
  }

  const handleStopMPCKeyGeneration = async () => {
    setErr(null);
    setIsStopInProgress(true);
    try {
      await stopMpcDeviceSetup();
      setIsStopInProgress(false);
    } catch (err: unknown) {
      handleError(err, setErr);
    } finally {
      setIsStopInProgress(false);
    }
  };

  const secP256K1Ready = secP256K1Status === "READY";

  return (
    <>
    <Card className="max-w-[500px] min-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Generate MPC Keys</p>
          <p className="text-small text-default-500">Algorithm: ECDSA SECP256K1</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <div className="grid grid-rows-2">
      <Button 
        className="flex justify-center" 
        onClick={() => handleGenerateMPCKeys()}
        isDisabled={isGenerateInProgress || secP256K1Ready}
        >
        Generate MPC Keys
      </Button>
      {isGenerateInProgress &&
      <>
      <Progress 
            size="sm"
            isIndeterminate
            aria-label="Generating..."
            className="max-w-md" 
        />
      <Divider />
      <Button 
          className="flex justify-center" 
          onClick={() => handleStopMPCKeyGeneration()}
          isDisabled={isStopInProgress}>
            Stop MPC Key Generation
          </Button>
      </>
      }
      </div>
      </CardBody>
    </Card>
    {err && (
        toast.error(err)
      )}
      {generateMPCKeysResult && (
        toast.success("MPC Keys generated successfully")
      )}
      </>
  );
};

export default GenerateMPCKeys;