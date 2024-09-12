import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import { FaRegCopy } from "react-icons/fa6";

import copy from "copy-to-clipboard";

import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "90%",
};

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
    <div data-testid={props.datatestid1}>
      <Modal
        keepMounted
        open={props.mailDraftModal}
        data-testid={props.datatestid2}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="border-0 rounded p-3">
          <Box className="d-flex justify-content-between align-items-center border-bottom">
            <Typography component='span' sx={{ fontWeight : 500 }}>
              Mail Draft
            </Typography>
            <IconButton
              className=" text-dark"
              style={{ fontSize: "x-large" }}
              data-testid="close-draft-modal"
              onClick={(e) => {
                handleClose();
              }}
            >
              <IoClose />
            </IconButton>
          </Box>
          <div className="p-1"></div>
          {/* <Typography> */}
            {/* to */}
            <TextField
              id="input-with-icon-textfield"
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
              multiline
              rows={15}
              className="maildraftMessage"
              style={{ width: "100%", border: "none" }}
              defaultValue={mailDraftData.message}
              name="message"
              onChange={handleChange}
            />

            <div className="p-1"></div>
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                className="d-flex flex-row justify-content-between align-items-center"
                onClick={(e) => {
                  copyTextFunc();
                }}
              >
                <FaRegCopy />
                <div className="p-1"></div>
                <Typography component="span" fontWeight={500}>Copy text</Typography>
              </Button>
            </div>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
