import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  RadioGroup,
  Radio,
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";
import { useAppStore } from "@/app/AppStore";
import { INewTransactionData } from "@/app/IAppState";

export default function CreateTx({ isOpen, onClose, assetsToSelectFrom }) {
  const { onClose: closeModal } = useDisclosure();

  const { createTransaction, deviceId } = useAppStore();
  const [loading, setLoading ] = React.useState<boolean>(false);
  const [assetIdPrompt, setAssetIdPrompt] = React.useState<string>("");
  const [amount, setAmount] = React.useState<string>("");
  const [destinationAddress, setDestinationAddress] = React.useState<string>("");
  const [txFee, setTXFee] = React.useState<"LOW" | "MEDIUM" | "HIGH">("LOW");

  const onSelectionChange = (value) => {
    setAssetIdPrompt(value);
  };

  const onCreateTransactionClicked = async () => {
    setLoading(true);
    let dataToSend: INewTransactionData | undefined;
      dataToSend = {
        note: `API Transaction by ${deviceId}`,
        accountId: "0",
        assetId: assetIdPrompt,
        amount: amount,
        destAddress: destinationAddress,
        feeLevel: txFee,
        estimateFee: false
      };

    await createTransaction(dataToSend);
    onClose();
    setLoading(false);
  };

  const selectedAsset = assetsToSelectFrom?.find(asset => asset.id === assetIdPrompt);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Create Transaction</ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <p className="label-text font-bold pb-1">Select asset</p>
                <Autocomplete 
                  value={assetIdPrompt ?? ""}
                  onInputChange={onSelectionChange}
                >
                  {Object.entries(assetsToSelectFrom).map(([key, asset]) => (
                    <AutocompleteItem key={key} value={key}>{asset.id}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <Input 
                placeholder={`Enter Amount (Max: ${selectedAsset?.balance ?? ""})`}
                variant="bordered" 
                max={selectedAsset ? `${selectedAsset.balance}` : undefined}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input 
                placeholder="Enter Destination Address" 
                variant="bordered"
                onChange={(e) => setDestinationAddress(e.target.value)}
              />
              <RadioGroup label="Select Fee Level">
                <Radio value="Low">Low</Radio>
                <Radio value="Medium">Medium</Radio>
                <Radio value="High">High</Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button 
                onPress={onCreateTransactionClicked}
                isDisabled={!assetIdPrompt || !amount || !destinationAddress}
                isLoading={loading}
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
                Transfer
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}