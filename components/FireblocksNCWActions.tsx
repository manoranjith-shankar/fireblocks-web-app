import React from "react";

import GenerateMPCKeys  from "./GenerateMPCKeys";
import { BackupAndRecover } from "./BackupAndRecover";
import { Assets } from "@/components/Assets";
import { Transactions } from "./Transactions";
import { useAppStore } from "@/app/AppStore";
import { Logs } from "./Logs";

export const FireblocksNCWActions: React.FC = () => {
  const { keysStatus } = useAppStore();
  const secP256K1Status = keysStatus?.MPC_CMP_ECDSA_SECP256K1?.keyStatus ?? null;
  const ed25519Status = keysStatus?.MPC_EDDSA_ED25519?.keyStatus ?? null;

  const hasAKey = secP256K1Status === "READY" || ed25519Status === "READY";

  return (
    <>
      <GenerateMPCKeys />
      <BackupAndRecover />
      {hasAKey && (
        <>
          <Assets />
          {/* <Transactions />
          <Logs /> */}
        </>
      )}
    </>
  );
};