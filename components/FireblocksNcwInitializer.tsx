import React, { useState } from 'react'
import { useAppStore } from '@/app/AppStore'
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { ENV_CONFIG } from '@/app/env_config';
import ConfirmModal from "@/components/confirmModal";


const FireblocksNcwInitializer = () => {
    const {
        automateInitialization,
        fireblocksNCWStatus,
        initFireblocksNCW,
        fireblocksNCWSdkVersion,
        disposeFireblocksNCW,
        clearSDKStorage,
      } = useAppStore();

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [confirmation, setConfirmation] = useState(false);

      const handleConfirmation = (confirmed) => {
        if (confirmed) {
          setConfirmation(true);
        }
        setIsModalOpen(false);
      };

      const handleClearSDKStorage = () => {
        setIsModalOpen(true);
        if (confirmation === true) {
            clearSDKStorage();
        }
      }

  return (
    <div>
        <Card className="max-w-[500px]">
        <CardHeader className="flex justify-center">
            <p className="text-lg font-medium">{`Fireblocks SDK (${ENV_CONFIG.NCW_SDK_ENV}) - Version ${fireblocksNCWSdkVersion}`}</p>
        </CardHeader>
        <CardBody>
            {fireblocksNCWStatus === "sdk_not_ready" && (
                <Button
                    className="m-3 p-4"
                    onClick={() => initFireblocksNCW()}
                    isLoading={fireblocksNCWStatus === "initializing_sdk"}
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
                    Initialize Fireblocks SDK
                </Button>
                    )}
            {fireblocksNCWStatus === "sdk_available" && (
                <>
                <Button
                className="m-3 px-4"
                onClick={() => disposeFireblocksNCW()}
                >
                Dispose Fireblocks SDK
            </Button>
                <Button
                className="m-3 px-4"
                onClick={handleClearSDKStorage}
                >
                    Clear SDK Storage
                </Button>
                </>
            )}
        </CardBody>
        </Card>
        <ConfirmModal
        isOpen={isModalOpen}
        title="Are you sure you want to proceed? "
        content="Warning! All data will be lost."
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmation}
      />
    </div>
  )
}

export default FireblocksNcwInitializer