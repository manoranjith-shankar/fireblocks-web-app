import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ConfirmModal({ title, content, isOpen, onClose, onConfirm }) {
  const { isOpen: modalIsOpen, onOpen, onClose: closeModal } = useDisclosure();

  const handleConfirm = () => {
    onConfirm(true);
    closeModal();
  };

  const handleCancel = () => {
    onConfirm(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleCancel}>
            No
          </Button>
          <Button color="danger" variant="light" onPress={handleConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}