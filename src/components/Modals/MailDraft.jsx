import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TextField from "@mui/material/TextField";
import { FaRegCopy } from "react-icons/fa6";

import copy from "copy-to-clipboard";

import { toast } from "react-toastify";
export default function MailDraft(props) {
  const [mailDraftData, setMailDraftData] = useState({
    to: "ABC Agency",
    subject: "Requested documents",
    message: `Hello,
                                I hope this message finds you well. As per your request, I am submitting the required documents. Please find attached the following documents:
                1. Statement in PDF/Excel
                2. Beneficiary details of UPI/IMPS
                3. Beneficiary details of UPI Txns
                4. IP Logs
                5. Device details
                If there are any further documents or information required, please let me know, and I will be happy to provide them promptly.
                Thank you for your assistance.

                Best regards,
                Kotak Bank Ltd`,
  });

  const handleClose = () => props.setMailDraftModal(false);

  function handleChange(e) {
    setMailDraftData({
      ...mailDraftData,
      [e.target.name]: e.target.value || "",
    });

    // console.log("eeeeeeee", e.target.name, "---", e.target.value);
  }

  function copyTextFunc() {
    copy(mailDraftData.message);
    let resp = copy(mailDraftData.message);
    if (resp) {
      toast.success("Message copied successfully");
      handleClose();
    } else {
      toast.error("Unable to copy message");
    }
  }

  return (
    <>
      <Modal
        show={props.mailDraftModal}
        onHide={() => handleClose()}
        size="lg"
        // xl
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "rgba(245, 248, 250, 1)", padding: "1.5% 2%" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Mail Draft
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* to */}
          <TextField
            id="input-with-icon-textfield"
            // label="TextField"
            InputProps={{
              startAdornment: "To:",
            }}
            variant="standard"
            style={{ width: "100%" }}
            defaultValue={mailDraftData.to}
            name="to"
            onChange={handleChange}
          />
          {/* space */}
          <div className="p-1"></div>

          {/* subject */}

          <TextField
            id="input-with-icon-textfield"
            // label="TextField"
            InputProps={{
              startAdornment: "Subject:",
            }}
            variant="standard"
            style={{ width: "100%" }}
            defaultValue={mailDraftData.subject}
            name="subject"
            onChange={handleChange}
          />

          {/* message */}
          <TextField
            id="outlined-multiline-static"
            // label="Multiline"
            multiline
            rows={14}
            className="maildraftMessage"
            style={{ width: "100%", border: "none" }}
            defaultValue={mailDraftData.message}
            name="message"
            onChange={handleChange}
          />

          <div className="d-flex justify-content-end">
            <Button
              style={{ background: "rgba(0, 56, 116, 1)", border: "none" }}
              className="d-flex flex-row justify-content-between align-items-center"
              onClick={(e) => {
                copyTextFunc();
              }}
            >
              <FaRegCopy />
              <div className="p-1"></div>
              <span>Copy text</span>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
