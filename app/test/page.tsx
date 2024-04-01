"use client"

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";

export default function Page({isJoinWallet, isCreateNewWallet}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create new Wallet</ModalHeader>
              <ModalBody>
                  Device Id
                <Snippet symbol= " " variant="bordered">Device Id</Snippet>
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Generate New Device Id
                </Button>
                <Button color="primary" onPress={onClose}>
                  Assign Device
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}