import { Modal } from "@mui/material";
import React from "react";

export default function CustomModal({
  key,
  open,
  onClose,
  testid,
  contentLabel,
  keepMounted,
  children,
}) {
  return (
    <Modal
      key={key}
      open={open}
      onClose={onClose}
      className="preview-modal"
      data-testid={testid}
      contentLabel={contentLabel}
      keepMounted={keepMounted}
    >
      {children}
    </Modal>
  );
}
