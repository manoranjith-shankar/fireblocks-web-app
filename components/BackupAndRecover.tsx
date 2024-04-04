import React, { useEffect } from "react";

import { useAppStore } from "@/app/AppStore";
import { randomPassPhrase } from "@/app/services/randomPassPhrase";
import { TPassphraseLocation } from "@/app/services/ApiService";
import { gdriveBackup, gdriveRecover } from "@/app/services/GoogleDrive";
import { handleError } from "@/utils/error-utils";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import toast from "react-hot-toast";

export const BackupAndRecover: React.FC = () => {
  const [err, setErr] = React.useState<string | null>(null);
  const [backupCompleted, setBackupCompleted] = React.useState(false);
  const [recoverCompleted, setRecoverCompleted] = React.useState(false);
  const [isBackupInProgress, setIsBackupInProgress] = React.useState(false);
  const [isRecoverInProgress, setIsRecoverInProgress] = React.useState(false);
  const {
    keysStatus,
    getGoogleDriveCredentials,
    backupKeys,
    recoverKeys,
    getPassphraseInfos,
    getLatestBackup,
    createPassphraseInfo,
    latestBackup,
    passphrases,
    walletId,
  } = useAppStore();

  useEffect(() => {
    if (!passphrases) {
      getPassphraseInfos();
    }
  }, [passphrases]);

  useEffect(() => {
    if (!latestBackup) {
      getLatestBackup();
    }
  }, [latestBackup, walletId]);

  const recoverGoogleDrive = async (passphraseId: string) => {
    const token = await getGoogleDriveCredentials();
    return gdriveRecover(token, passphraseId);
  };

  const backupGoogleDrive = async (passphrase: string, passphraseId: string) => {
    const token = await getGoogleDriveCredentials();
    return gdriveBackup(token, passphrase, passphraseId);
  };

  const passphraseRecover: (
    location: TPassphraseLocation,
  ) => Promise<{ passphrase: string; passphraseId: string }> = async (location) => {
    if (passphrases === null) {
      throw new Error();
    }

    // try to reuse previous
    for (const info of Object.values(passphrases)) {
      if (info.location === location) {
        switch (location) {
          case "GoogleDrive": {
            const passphrase = await recoverGoogleDrive(info.passphraseId);
            return { passphraseId: info.passphraseId, passphrase };
          }
          default:
            throw new Error(`Unsupported backup location ${location}`);
        }
      }
    }

    throw new Error(`Not found backup location ${location}`);
  };

  const passphrasePersist: (
    location: TPassphraseLocation,
  ) => Promise<{ passphrase: string; passphraseId: string }> = async (location) => {
    if (passphrases === null) {
      throw new Error();
    }

    try {
      const recover = await passphraseRecover(location);
      if (recover) {
        return recover;
      }
    } catch (e) {
      console.warn(`failed to load previous passphrase, creating new`, e, location);
    }

    // creating new
    const passphrase = randomPassPhrase();
    const passphraseId = crypto.randomUUID();

    switch (location) {
      case "GoogleDrive": {
        await backupGoogleDrive(passphrase, passphraseId);
        await createPassphraseInfo(passphraseId, location);
        return { passphraseId, passphrase };
      }
      default:
        throw new Error(`Unsupported backup location ${location}`);
    }
  };

  const doBackupKeys = async (passphrasePersist: () => Promise<{ passphrase: string; passphraseId: string }>) => {
    setErr(null);
    setIsBackupInProgress(true);
    setBackupCompleted(false);
    setRecoverCompleted(false);
    try {
      const { passphrase, passphraseId } = await passphrasePersist();
      await backupKeys(passphrase, passphraseId);
      setBackupCompleted(true);
      setIsBackupInProgress(false);
    } catch (err: unknown) {
      handleError(err, setErr);
    } finally {
      setIsBackupInProgress(false);
    }
    await getLatestBackup();
  };

  const doRecoverKeys = async (passphraseResolver: (passphraseId: string) => Promise<string>) => {
    setErr(null);
    setIsRecoverInProgress(true);
    setRecoverCompleted(false);
    setBackupCompleted(false);
    try {
      await recoverKeys(passphraseResolver);
      setRecoverCompleted(true);
      setIsRecoverInProgress(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErr(err.message);
      } else {
        setErr("Unknown Error");
      }
    } finally {
      setIsRecoverInProgress(false);
    }
  };

  const secP256K1Status = keysStatus?.MPC_CMP_ECDSA_SECP256K1?.keyStatus ?? null;
  const ed25519Status = keysStatus?.MPC_EDDSA_ED25519?.keyStatus ?? null;
  const hasReadyAlgo = secP256K1Status === "READY" || ed25519Status === "READY";

  const handleGoogleDriveBackup = async () => {
    await doBackupKeys(() => passphrasePersist("GoogleDrive"));
  }

  const handleRecovery = async () => {
    await doRecoverKeys(recoverGoogleDrive);
  }

  if (passphrases === null) {
    return;
  }
  return (
    <Card className="max-w-[500px] min-w-[400px]">
      <CardHeader className="flex justify-center">
      <p className="text-lg font-medium">Backup your keys</p>
    </CardHeader>
    <CardBody>
      <div className="grid grid-cols-2">
        <div className="m-3 px-4">
      <Button
        onClick={handleGoogleDriveBackup}
        isDisabled={isBackupInProgress || hasReadyAlgo === false}
        >
        Backup to Google Drive
      </Button>
      </div>
      <div className="m-3 px-4">
      <Button
        onClick={handleRecovery}
        isDisabled={isRecoverInProgress || hasReadyAlgo === false}
        >
        Recover from Google Drive
      </Button>
        </div>
      </div>
      </CardBody>
      {latestBackup && (
        <div className="flex flex-col items-center">
          <p className="text-center">Last known backup</p>
          <p className="text-center">Location: {latestBackup.location}</p>
          <p className="text-center">Created: {new Date(latestBackup.createdAt).toString()}</p>
      </div>    
      )}
      {backupCompleted && (
        toast.success("Backup completed successfully!", {
          duration: 5000,
        })
      )}
      {recoverCompleted && (
        toast.success("Recover completed successfully!", {
          duration: 5000,
        })
      )}
      {err && (
        toast.error(err, {
          duration: 10000,
        })
      )}
    </Card>
  );
};