import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  createTheme,
  Input,
  ThemeProvider,
  AccordionSummary,
  MenuList,
  AccordionDetails,
  FormHelperText,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Select from "@mui/material/Select";
import { Button } from "@mui/base/Button";
import { Modal } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import Box, { boxClasses } from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import dayjs, { Dayjs } from "dayjs";
import Accordion from "@mui/material/Accordion";
import InputAdornment from "@mui/material/InputAdornment";
import { setRequestPayloads } from "../../Redux/csnsReducers";
import Fade from "@mui/material/Fade";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";
import { useTranslation } from "react-i18next";
import {
  requiredReportsData,
  availableParameters,
} from "../../components/data/requestsData";
import Loader from "../../components/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MaterialToast from "../../components/Snackbar";
import Skeleton from "@mui/material/Skeleton";
import { readOnly } from "../../components/data/requestsData";
import ErrorIcon from "@mui/icons-material/Error";

// document.documentElement.style.setProperty('--rmsc-h', '48px');

function strLength(s) {
  var length = 0;
  while (s[length] !== undefined) length++;
  return length;
}

const validatedDetail = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "0.25rem" }}>
      {/* <Typography
        sx={{ color: "rgb(67, 91, 102)", fontSize: "0.785rem", fontWeight: 400 }}
      >
        Valid
      </Typography> */}
      <CheckCircleIcon
        sx={{
          color: "green",
          marginTop: "0.05rem",
          fontSize: "1rem",
        }}
      />
    </Box>
  );
};

const warningHelperText = (text) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem",
        margin: "0.1rem 0rem 0rem 0rem",
      }}
    >
      <ErrorIcon
        sx={{
          color: "rgb(92, 84, 112)",
          marginTop: "0.075rem",
          fontSize: "1rem",
        }}
      />
      <Typography
        sx={{
          color: "rgb(92, 84, 112)",
          fontSize: "0.785rem",
          fontWeight: 400,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const validatedHelperText = (text) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem",
        margin: "0.1rem 0rem 0rem 0.85rem",
      }}
    >
      {/* <Typography
        sx={{ color: "rgb(67, 91, 102)", fontSize: "0.785rem", fontWeight: 400 }}
      >
        {text}
      </Typography> */}
      <CheckCircleIcon
        sx={{
          color: "green",
          marginTop: "0.075rem",
          fontSize: "1rem",
        }}
      />
    </Box>
  );
};

const customFormText = (text, color, visibility) => {
  return (
    <FormHelperText
      sx={{ marginLeft: "0.85rem", color: color, opacity: visibility }}
    >
      {text}
    </FormHelperText>
  );
};

export default function CreateRequest() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastDuration, setToastDuration] = useState(0);
  const [toastBackground, setToastBackground] = useState("brown");
  const [toastColor, setToastColor] = useState("");
  const [toastFontWeight, setToastFontWeight] = useState();

  const displayToast = (message, duration, background, color, fontWeight) => {
    setToastMessage(message);
    setToastDuration(duration);
    setToastBackground(background);
    setToastColor(color);
    setToastFontWeight(fontWeight);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 240);
  });

  const route_to = useNavigate();
  const dispatch = useDispatch();

  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [Creator, setCreator] = useState("");

  const [selectedReports, setSelectedReports] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const new_date = new Date();
  // new_date.setDate(new_date.getDate()).toLocaleString("en-Us");

  const currentDate = dayjs(dayjs().format("DD-MM-YYYY"), "DD-MM-YYYY");
  const reduxDate = dayjs(new Date()).format("DD-MM-YYYY");
  ////console.log("Current Date", currentDate);

  const inputControl = {
    textfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.45px solid rgb(67, 91, 102)",
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.5px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.65px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    validatedTextfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.85px solid green",
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.5px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.65px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    inputProps: {
      style: {
        fontSize: "0.88rem",
        height: "0.6rem",
        // backgroundColor : "blue"
      },
      maxLength: 10,
    },
    inputLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        alignSelf: "center",
        display: "flex",
        color: "rgb(92, 84, 112)",
        alignItems: "center",
        marginTop: "0.125rem",
      },
    },
    validatedInputLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        alignSelf: "center",
        color: "green",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        marginTop: "0.125rem",
      },
    },
    textAreaProps: {
      style: {
        fontSize: "0.88rem",
        minHeight: "1.65rem",
      },
      // maxLength : 69
    },
    textAreaLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        paddingTop: "0.15rem",
        alignSelf: "center",
        display: "flex",
        color: "rgb(92, 84, 112)",
        alignItems: "center",
        height: "auto",
      },
    },
    validatedTextAreaLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        paddingTop: "0.15rem",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        height: "auto",
        fontWeight: 500,
        color: "green",
      },
    },
  };

  const SelectProps = {
    containerProps: {
      ".MuiOutlinedInput-notchedOutline": {
        border: "1.4px solid red",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgba(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border:
          ticketNumber.length === 0 || ticketDescription.length === 0
            ? "0.25px solid grey"
            : "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill:
          ticketNumber.length === 0 || ticketDescription.length === 0
            ? "silver"
            : "",
      },
    },
    validatedContainerProps: {
      ".MuiOutlinedInput-notchedOutline": {
        border: "1.85px solid green",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgb(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill: "rgb(67, 91, 102) !important",
      },
    },
    REPORT_SELECT_PROPS: {
      PaperProps: {
        style: {
          maxHeight: "19.6rem",
          marginTop: "-0.5rem",
          boxShadow: "1px 2px 12px 0px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    PARAM_SELECT_PROPS: {
      PaperProps: {
        style: {
          maxHeight: "9.36rem",
          marginTop: "-0.15rem",
          overflow: "auto",
        },
      },
      MenuListProps: {
        sx: {
          border: "1.5px solid rgba(161, 161, 161, 1)",
          borderWidth: "1.5px 0px 1.5px 1.5px",
          margin: 0,
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          padding: 0,
        },
      },
    },
    TYPE_SELECT_PROPS: {
      PaperProps: {
        style: {
          marginTop: "-0.5rem",
          boxShadow: "1px 2px 12px 0px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const datePickerControl = {
    slotProps: {
      popper: {
        sx: {
          ".MuiPaper-root": { borderRadius: "10px", padding: 0 },
          "&.MuiPickersPopper-root": { padding: 0 },
          ...{
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "gray",
              color: "white",
            },
          },
        },
      },
      field: {
        readOnly: true,
      },
      openPickerIcon: {
        sx: {
          fontSize: "1.5rem",
        },
      },
      textField: {
        InputLabelProps: {
          sx: {
            paddingTop: "0.05rem",
            color: "rgb(92, 84, 112)",
            fontSize: "0.92rem",
          },
        },
        color: "primary",
        size: "small",
        // "aria-readonly": true,
        sx: {
          backgroundColor: "transparent",
          width: "100%",

          "& .MuiInputBase-input": {
            height: "1.575rem",
            //  width : '100%',
            width: "100%",
            fontSize: "0.85rem",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1.45px solid rgb(67, 91, 102)",
            },
            "&:hover fieldset": {
              border: "1.5px solid rgb(131, 131, 210)",
            },
            "&.Mui-focused fieldset": {
              border: "1.65px solid rgb(131, 131, 210)",
            },
          },
        },
      },
    },

    validatedSlotProps: {
      popper: {
        sx: {
          ".MuiPaper-root": { borderRadius: "10px", padding: 0 },
          "&.MuiPickersPopper-root": { padding: 0 },
          ...{
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "gray",
              color: "white",
            },
          },
        },
      },
      // field: {
      //   readOnly: true,
      // },
      openPickerIcon: {
        sx: {
          fontSize: "1.5rem",
          color: "rgb(67, 91, 102)",
        },
      },
      textField: {
        InputLabelProps: {
          sx: {
            paddingTop: "0.05rem",
            fontSize: "0.92rem",
            color: "green",
            fontWeight: 500,
          },
        },
        color: "primary",
        size: "small",
        // "aria-readonly": true,
        sx: {
          backgroundColor: "transparent",
          width: "100%",

          "& .MuiInputBase-input": {
            height: "1.575rem",
            //  width : '100%',
            width: "100%",
            fontSize: "0.85rem",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1.85px solid green",
            },
            "&:hover fieldset": {
              border: "1.5px solid rgb(131, 131, 210)",
            },
            "&.Mui-focused fieldset": {
              border: "1.65px solid rgb(131, 131, 210)",
            },
          },
        },
      },
    },

    sx: {
      backgroundColor: "transparent",
    },
  };

  const [reportsState, setReportsState] = useState([]);

  useEffect(() => {
    setReportsState((prevReportsState) => {
      const updatedReportState = selectedReports.map((report) => {
        const existingReport = prevReportsState.find(
          (existing) => existing.selectedReport === report
        );

        if (
          report === "Beneficiary details for Single IMPS transactions" ||
          report === "Beneficiary details for Single UPI transactions"
        ) {
          return (
            existingReport || {
              selectedReport: report,
              selectedParams: ["RRN"],
              accountNumberDetails: [],
              PANdetails: [],
              CRNdetails: [],
              RRNdetails: [
                {
                  name: "RRN",
                  accountNo: "",
                  aadhar: "",
                  crnNo: "",
                  fromDate: "",
                  toDate: "",
                  rrn: "",
                  panNo: "",
                  debitCard: "",
                  creditCardNo: "",
                  email: "",
                  amount: "",
                  mobileNo: "",
                  req_status: "In-progress",
                  type: "excel",
                  filePath: "",
                },
              ],
              aadharDetails: [],
              emailDetails: [],
              creditCardDetails: [],
              debitCardDetails: [],
              mobileNoDetails: [],
              viewState: "Expanded",
            }
          );
        } else {
          return (
            existingReport || {
              selectedReport: report,
              selectedParams: [],
              accountNumberDetails: [],
              PANdetails: [],
              CRNdetails: [],
              RRNdetails: [],
              aadharDetails: [],
              emailDetails: [],
              creditCardDetails: [],
              debitCardDetails: [],
              mobileNoDetails: [],
              viewState: "Expanded",
            }
          );
        }
      });
      return updatedReportState;
    });
  }, [selectedReports]);

  // //////console.log('Selected REPORTS : ',selectedReports);
  // //////console.log('Selected REPORTS : ',selectedReports);

  // //////console.log('selected reports : ',selectedReports);

  const availableReportTypes = ["PDF", "Excel"];

  // const autoScrollDown = (scrollingSpace) => {
  //   var height = 0;
  //   var scrollStep = 200;
  //   var selectedReportsSection = document.querySelector('.selected-reports-section');

  //   if (selectedReportsSection) {
  //       var sectionHeight = selectedReportsSection.scrollHeight;
  //       var windowHeight = window.innerHeight;

  //       if (sectionHeight > windowHeight) {
  //           var scrollInterval = setInterval(() => {
  //               if (height <= sectionHeight - windowHeight) {
  //                   window.scrollBy(0, scrollStep);
  //                   height += scrollStep;
  //               } else {
  //                   clearInterval(scrollInterval);
  //               }
  //           }, 100); // Adjust the interval time as needed
  //       }
  //   }
  // };

  // const autoScrollUp = (detailIndex, scrollingSpace2) => {
  //   let height = document.body.scrollHeight;
  //   let scrollingSpace1 = 48;
  //   if (detailIndex > 3 && height > 0) {
  //     window.scrollBy(0, -scrollingSpace1);
  //     height -= scrollingSpace1;
  //   }
  //   if (detailIndex < 4) {
  //     window.scrollBy(0, -scrollingSpace2);
  //     height -= scrollingSpace2;
  //   }
  // };

  // //////console.log('Final Selected',selectedParams);

  const handleMinimizedView = (reportIndex) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex].viewState = "Minimized";
      return newState;
    });
  };

  const handleExpandedView = (reportIndex) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex].viewState = "Expanded";
      return newState;
    });
  };

  const handleReportSelection = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedReports(typeof value === "string" ? value.split(",") : value);
  };

  // useEffect(() => {
  //   if (selectedReports.length > 1) {
  //     document.querySelector('#selected-reports-section').scrollIntoView();
  //   }
  // }, [selectedReports.length]);
  // useEffect(() => {
  //   if (selectedReports.length > 1) {
  //     document.querySelector('#selected-reports-section').scrollIntoView();
  //   }
  // }, [selectedReports.length]);

  const handleParamSelection = (event, reportIndex, reportName) => {
    setReportsState((prevState) => {
      const {
        target: { value },
      } = event;

      const newState = [...prevState];
      const report = newState[reportIndex];

      if (!report) {
        return prevState;
      }

      report.selectedParams =
        typeof value === "string" ? value.split(",") : value;

      if (
        value.some((param) => param === "Account number") &&
        report.accountNumberDetails.length === 0
      ) {
        report.accountNumberDetails.push({
          name: "Account number",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "PAN") &&
        report.PANdetails.length === 0
      ) {
        report.PANdetails.push({
          name: "PAN",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "CRN") &&
        report.CRNdetails.length === 0
      ) {
        report.CRNdetails.push({
          name: "CRN",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "Aadhar") &&
        report.aadharDetails.length === 0
      ) {
        report.aadharDetails.push({
          name: "Aadhar",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "Email ID") &&
        report.emailDetails.length === 0
      ) {
        report.emailDetails.push({
          name: "Email ID",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "Credit Card") &&
        report.creditCardDetails.length === 0
      ) {
        report.creditCardDetails.push({
          name: "Credit Card",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "Debit Card") &&
        report.debitCardDetails.length === 0
      ) {
        report.debitCardDetails.push({
          name: "Debit Card",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      if (
        value.some((param) => param === "Mobile No.") &&
        report.mobileNoDetails.length === 0
      ) {
        report.mobileNoDetails.push({
          name: "Mobile No.",
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        });
      }

      return newState;
    });
  };

  const deleteDetail = (reportIndex, detailIndex, details) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][details].splice(detailIndex, 1);
      // document.querySelector("#selected-reports-section").scrollIntoView();
      return newState;
    });
  };

  const addDetail = (reportIndex, detailName, name, reportName) => {
    //////console.log("for detail", reportIndex, detailName);
    //////console.log("for detail", reportIndex, detailName);
    setReportsState((prevState) => {
      const newState = [...prevState];

      newState[reportIndex][detailName] = [
        ...newState[reportIndex][detailName],
        // detailName === "accountNumberDetails" ||
        // detailName === "PANdetails" ||
        // detailName === "RRNdetails" ||
        // detailName === "CRNdetails" ||
        // detailName === "creditCardDetails" ||
        // detailName === "debitCardDetails" ||
        // detailName === "mobileNoDetails" ||
        // detailName === "emailDetails" ||
        // detailName === "aadharDetails"
        // ?
        {
          name: name,
          accountNo: "",
          aadhar: "",
          crnNo: "",
          fromDate: "",
          toDate: "",
          rrn: "",
          panNo: "",
          debitCard: "",
          creditCardNo: "",
          email: "",
          amount: "",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
        },
        // : {},
      ];

      // document.querySelector("#selected-reports-section").scrollIntoView();
      return newState;
    });
  };

  const handleInputValue = (
    value,
    reportIndex,
    detailIndex,
    detailName,
    reportName,
    detailsArray
  ) => {
    setReportsState((prevState) => {
      const newState = [...prevState];

      if (detailName === "accountNumberDetails") {
        newState[reportIndex][detailName][detailIndex].accountNo = value;
      }

      if (detailName === "PANdetails") {
        newState[reportIndex][detailName][detailIndex].panNo = value;
      }

      if (detailName === "CRNdetails") {
        newState[reportIndex][detailName][detailIndex].crnNo = value;
      }

      if (detailName === "RRNdetails") {
        newState[reportIndex][detailName][detailIndex].rrn = value;
      }

      if (detailName === "aadharDetails") {
        newState[reportIndex][detailName][detailIndex].aadhar = value;
      }

      if (detailName === "emailDetails") {
        newState[reportIndex][detailName][detailIndex].email = value;
      }

      if (detailName === "creditCardDetails") {
        newState[reportIndex][detailName][detailIndex].creditCardNo = value;
      }

      if (detailName === "debitCardDetails") {
        newState[reportIndex][detailName][detailIndex].debitCard = value;
      }

      if (detailName === "mobileNoDetails") {
        newState[reportIndex][detailName][detailIndex].mobileNo = value;
      }
      // detailName === "creditCardDetails" ||
      // detailName === "aadharDetails" ||
      // detailName === "debitCardDetails" ||
      // detailName === "RRNdetails"
      //   ? parseInt(value, 10)
      //   : value;

      return newState;
    });
  };

  const handleMobileNoValue = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].mobileNo = value;
      return newState;
    });
  };

  const handleAmountValue = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].amount = value;
      // parseInt(value, 10);
      return newState;
    });
  };

  const handleReportType = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].type = value;
      return newState;
    });
  };

  const disableInvalidDates = (day, to) => {
    return dayjs(day).isAfter(dayjs(to, "DD-MM-YYYY"), "day");
  };

  //////console.log('ULTIMATE',reportsState);

  const handleFromDate = (date, reportIndex, detailIndex, detail, to) => {
    const selected_date = new Date(date);
    selected_date.setDate(selected_date.getDate()).toLocaleString("en-Us");

    const formatted_date = new Date(selected_date)
      .toLocaleDateString("en-Us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .map((part, index, array) => (index < 2 ? array[1 - index] : part))
      .join("-");

    //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);
    //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //////console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //////console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //////console.log("time2");
        //////console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////console.log("time3");
        return prevState;
      }

      newState[reportIndex][detail][detailIndex].fromDate = formatted_date;
      return newState;
    });
  };

  const handleToDate = (date, reportIndex, detailIndex, detail, from) => {
    const selected_date = new Date(date);
    selected_date.setDate(selected_date.getDate()).toLocaleString("en-Us");

    const formatted_date = new Date(selected_date)
      .toLocaleDateString("en-Us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .map((part, index, array) => (index < 2 ? array[1 - index] : part))
      .join("-");

    // //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);
    // //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //////console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //////console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //////console.log("time2");
        //////console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////console.log("time3");
        return prevState;
      }

      newState[reportIndex][detail][detailIndex].toDate = formatted_date;
      return newState;
    });
  };

  const handleDate = (date, reportIndex, detailIndex, detailName) => {
    //////console.log("RRN date", date);
    //////console.log("RRN reportIndex", reportIndex);
    //////console.log("RRN detailIndex", detailIndex);
    //////console.log("RRN Detail", detailName);
    //////console.log("RRN date", date);
    //////console.log("RRN reportIndex", reportIndex);
    //////console.log("RRN detailIndex", detailIndex);
    //////console.log("RRN Detail", detailName);
    const selected_date = new Date(date);
    selected_date.setDate(selected_date.getDate()).toLocaleString("en-Us");

    const formatted_date = new Date(selected_date)
      .toLocaleDateString("en-Us", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .map((part, index, array) => (index < 2 ? array[1 - index] : part))
      .join("-");

    // //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);
    // //////console.log(formatted_date);
    // //////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      newState[reportIndex][detailName][detailIndex].fromDate = formatted_date;

      //////console.log("time4", date);
      //////console.log("time4", date);
      return newState;
    });
  };

  // const accountNumberDetailsValid =

  const displayRequestedReports = (
    detailsArray,
    reportIndex,
    detailName,
    param,
    reportName
  ) =>
    detailsArray.map((detail, detailIndex) => (
      <Box
        className="selected-param-details"
        marginTop={
          (reportName === "Beneficiary details for Single IMPS transactions" ||
            reportName === "Beneficiary details for Single UPI transactions") &&
          detailIndex === 0
            ? "0rem"
            : "2.65rem"
        }
        key={detailIndex}
        data-testid={`detail-fieldset-${detailIndex}`}
      >
        {/* {//////console.log(detailsArray, reportIndex, detailName, param, reportName)} */}

        <FormControl
          variant="outlined"
          margin="none"
          sx={{ width: reportName === "IP Logs" ? "24%" : "32%" }}
        >
          <TextField
            sx={
              (detail.name === "Account number" &&
                detail.accountNo.length === 16) ||
              (detail.name === "Email ID" &&
                detail.email.length >= 12 &&
                detail.email.length <= 320) ||
              (detail.name === "PAN" && detail.panNo.length === 10) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length === 16) ||
              (detail.name === "Aadhar" && detail.aadhar.length === 12) ||
              (detail.name === "Debit Card" &&
                detail.debitCard.length === 16) ||
              (detail.name === "Mobile No." && detail.mobileNo.length === 10) ||
              (detail.name === "RRN" && detail.rrn.length === 12) ||
              (detail.name === "CRN" && detail.crnNo.length === 10)
                ? inputControl.validatedTextfield
                : inputControl.textfield
            }
            data-testid={`detail-name-input-${detailIndex}`}
            helperText={
              (detail.name === "Account number" &&
                detail.accountNo.length < 16) ||
              (detail.name === "Email ID" && detail.email.length < 12) ||
              (detail.name === "PAN" && detail.panNo.length < 10) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length < 16) ||
              (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
              (detail.name === "Debit Card" && detail.debitCard.length < 16) ||
              (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
              (detail.name === "RRN" && detail.rrn.length < 12) ||
              (detail.name === "CRN" && detail.crnNo.length < 10)
                ? warningHelperText(
                    `
                    ${t("only")} 

                    ${
                      detail.name === "Account number"
                        ? 16
                        : detail.name === "Email ID"
                          ? "12-320"
                          : detail.name === "PAN"
                            ? 10
                            : detail.name === "Credit Card"
                              ? 16
                              : detail.name === "Aadhar"
                                ? 12
                                : detail.name === "Debit Card"
                                  ? 16
                                  : detail.name === "Mobile No."
                                    ? 10
                                    : detail.name === "RRN"
                                      ? 12
                                      : detail.name === "CRN"
                                        ? 10
                                        : 0
                    }   ${t("characters")} 
`,
                    1
                  )
                : validatedDetail()
            }
            InputLabelProps={
              (detail.name === "Account number" &&
                detail.accountNo.length < 16) ||
              (detail.name === "Email ID" && detail.email.length < 12) ||
              (detail.name === "PAN" && detail.panNo.length < 10) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length < 16) ||
              (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
              (detail.name === "Debit Card" && detail.debitCard.length < 16) ||
              (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
              (detail.name === "RRN" && detail.rrn.length < 12) ||
              (detail.name === "CRN" && detail.crnNo.length < 10)
                ? inputControl.inputLabelProps
                : inputControl.validatedInputLabelProps
            }
            InputProps={{
              startAdornment: detail.name === "Mobile No." && (
                <InputAdornment
                  variant="standard"
                  component="text"
                  position="start"
                >
                  <Typography sx={{ fontSize: "0.92rem" }} component="span">
                    +91
                  </Typography>
                </InputAdornment>
              ),
            }}
            required
            inputProps={{
              style: {
                fontSize: "0.88rem",
                height: "0.6rem",
                // backgroundColor : "blue"
              },
              maxLength:
                detail.name === "Account number"
                  ? 16
                  : detail.name === "Email ID"
                    ? 320
                    : detail.name === "PAN"
                      ? 10
                      : detail.name === "Credit Card"
                        ? 16
                        : detail.name === "Aadhar"
                          ? 12
                          : detail.name === "Debit Card"
                            ? 16
                            : detail.name === "Mobile No."
                              ? 10
                              : detail.name === "RRN"
                                ? 12
                                : detail.name === "CRN"
                                  ? 10
                                  : 0,
            }}
            className="selected-param-box"
            // value={
            //   (detail.name === "Credit Card" ||
            //     detail.name === "Aadhar" ||
            //     detail.name === "Debit Card" ||
            //     detail.name === "RRN") &&
            //   (detail.value === 0 || detail.value.length === 0)
            //     ? ""
            //     : (detail.name === "Credit Card" ||
            //           detail.name === "Aadhar" ||
            //           detail.name === "Debit Card" ||
            //           detail.name === "RRN") &&
            //         (detail.value !== 0 || detail.value.length !== 0)
            //       ? parseInt(detail.value, 10)
            //       : detail.value
            // }
            value={
              detail.name === "Account number"
                ? detail.accountNo
                : detail.name === "Email ID"
                  ? detail.email
                  : detail.name === "PAN"
                    ? detail.panNo
                    : detail.name === "Credit Card"
                      ? detail.creditCardNo
                      : detail.name === "Aadhar"
                        ? detail.aadhar
                        : detail.name === "Debit Card"
                          ? detail.debitCard
                          : detail.name === "Mobile No."
                            ? detail.mobileNo
                            : detail.name === "RRN"
                              ? detail.rrn
                              : detail.name === "CRN"
                                ? detail.crnNo
                                : ""
            }
            id="paramvalue"
            placeholder={`Enter ${detail.name}`}
            autoComplete="off"
            style={{
              margin: "0rem 0rem 0rem 0rem",
              fontSize: "0.88rem",
            }}
            label={detail.name}
            FormHelperTextProps={{ sx: { color: "rgb(92, 84, 112)" } }}
            margin="none"
            onChange={(e) =>
              handleInputValue(
                e.target.value,
                reportIndex,
                detailIndex,
                detailName,
                reportName,
                detailsArray
              )
            }
            // type={
            //   detail.name === "Account number"
            //     ? "text"
            //     : detail.name === "CRN"
            //       ? "text"
            //       : detail.name === "Email ID"
            //         ? "email"
            //         : detail.name === "PAN"
            //           ? "text"
            //           : detail.name === "Mobile No."
            //             ? "tel"
            //             : detail.name === "Credit Card"
            //               ? "number"
            //               : detail.name === "Aadhar"
            //                 ? "number"
            //                 : detail.name === "Debit Card"
            //                   ? "number"
            //                   : detail.name === "RRN"
            //                     ? "number"
            //                     : "text"
            // }
            type="text"
            inputMode="text"
            color="primary"
          />
        </FormControl>

        {((detailName === "accountNumberDetails" &&
          reportName !== "Device details") ||
          (detailName === "CRNdetails" && reportName === "IP Logs") ||
          reportName === "IP Logs" ||
          reportName === "Statement in PDF/Excel" ||
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions" ||
          (detailName === "RRNdetails" &&
            reportName === "Beneficiary details for Bulk IMPS transactions") ||
          (detailName === "RRNdetails" &&
            reportName ===
              "Beneficiary details for Bulk UPI transactions")) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "43%",
              backgroundColor: "transparent",
            }}
          >
            <Box flex={1} sx={{ cursor: "pointer" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  className="date-picker"
                  data-testid={`from-date-picker-${detailIndex}`}
                  shouldDisableDate={(day) =>
                    disableInvalidDates(day, detail.toDate, detail.toDate)
                  }
                  label={t("from")}
                  disabled={
                    (detail.name === "Account number" &&
                      detail.accountNo.length < 16) ||
                    (detail.name === "Email ID" && detail.email.length < 12) ||
                    (detail.name === "PAN" && detail.panNo.length < 10) ||
                    (detail.name === "Credit Card" &&
                      detail.creditCardNo.length < 16) ||
                    (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                    (detail.name === "Debit Card" &&
                      detail.debitCard.length < 16) ||
                    (detail.name === "Mobile No." &&
                      detail.mobileNo.length < 10) ||
                    (detail.name === "RRN" && detail.rrn.length < 12) ||
                    (detail.name === "CRN" && detail.crnNo.length < 10)
                      ? true
                      : false
                  }
                  value={
                    detail.fromDate === ""
                      ? null
                      : dayjs(detail.fromDate, "DD-MM-YYYY")
                  }
                  maxDate={currentDate}
                  defaultValue={dayjs.Dayjs}
                  slotProps={
                    detail.fromDate === ""
                      ? datePickerControl.slotProps
                      : datePickerControl.validatedSlotProps
                  }
                  sx={datePickerControl.sx}
                  onChange={(date) =>
                    handleFromDate(
                      date,
                      reportIndex,
                      detailIndex,
                      detailName,
                      detail.toDate
                    )
                  }
                />
                {
                  // detail.fromDate !== "" ? validatedHelperText("Dated") :
                  ((detail.name === "Account number" &&
                    detail.accountNo.length < 16) ||
                    (detail.name === "Email ID" && detail.email.length < 12) ||
                    (detail.name === "PAN" && detail.panNo.length < 10) ||
                    (detail.name === "Credit Card" &&
                      detail.creditCardNo.length < 16) ||
                    (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                    (detail.name === "Debit Card" &&
                      detail.debitCard.length < 16) ||
                    (detail.name === "Mobile No." &&
                      detail.mobileNo.length < 10) ||
                    (detail.name === "RRN" && detail.rrn.length < 12) ||
                    (detail.name === "CRN" && detail.crnNo.length < 10)) &&
                  detail.fromDate === ""
                    ? customFormText("")
                    : ((detail.name === "Account number" &&
                          detail.accountNo.length === 16) ||
                          (detail.name === "Email ID" &&
                            detail.email.length >= 12 &&
                            detail.email.length <= 320) ||
                          (detail.name === "PAN" &&
                            detail.panNo.length === 10) ||
                          (detail.name === "Credit Card" &&
                            detail.creditCardNo.length === 16) ||
                          (detail.name === "Aadhar" &&
                            detail.aadhar.length === 12) ||
                          (detail.name === "Debit Card" &&
                            detail.debitCard.length === 16) ||
                          (detail.name === "Mobile No." &&
                            detail.mobileNo.length === 10) ||
                          (detail.name === "RRN" && detail.rrn.length === 12) ||
                          (detail.name === "CRN" &&
                            detail.crnNo.length === 10)) &&
                        detail.fromDate === ""
                      ? customFormText("If needed, select from date", "grey", 1)
                      : detail.fromDate !== ""
                        ? validatedHelperText("Dated")
                        : ""
                }
              </LocalizationProvider>
            </Box>

            <Box flex={1} sx={{ cursor: "pointer" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  className="date-picker"
                  label={t("to")}
                  disabled={
                    (detail.name === "Account number" &&
                      detail.accountNo.length < 16) ||
                    (detail.name === "Email ID" && detail.email.length < 12) ||
                    (detail.name === "PAN" && detail.panNo.length < 10) ||
                    (detail.name === "Credit Card" &&
                      detail.creditCardNo.length < 16) ||
                    (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                    (detail.name === "Debit Card" &&
                      detail.debitCard.length < 16) ||
                    (detail.name === "Mobile No." &&
                      detail.mobileNo.length < 10) ||
                    (detail.name === "RRN" && detail.rrn.length < 12) ||
                    (detail.name === "CRN" && detail.crnNo.length < 10)
                      ? true
                      : false
                  }
                  value={
                    detail.toDate === ""
                      ? null
                      : dayjs(detail.toDate, "DD-MM-YYYY")
                  }
                  defaultValue={dayjs.Dayjs}
                  maxDate={currentDate}
                  shouldDisableDate={(day) =>
                    dayjs(day).isBefore(
                      dayjs(detail.fromDate, "DD-MM-YYYY"),
                      "day"
                    )
                  }
                  slotProps={
                    detail.toDate === ""
                      ? datePickerControl.slotProps
                      : datePickerControl.validatedSlotProps
                  }
                  sx={datePickerControl.sx}
                  onChange={(date) =>
                    handleToDate(
                      date,
                      reportIndex,
                      detailIndex,
                      detailName,
                      detail.fromDate
                    )
                  }
                />
                {
                  // detail.fromDate !== "" ? validatedHelperText("Dated") :
                  ((detail.name === "Account number" &&
                    detail.accountNo.length < 16) ||
                    (detail.name === "Email ID" && detail.email.length < 12) ||
                    (detail.name === "PAN" && detail.panNo.length < 10) ||
                    (detail.name === "Credit Card" &&
                      detail.creditCardNo.length < 16) ||
                    (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                    (detail.name === "Debit Card" &&
                      detail.debitCard.length < 16) ||
                    (detail.name === "Mobile No." &&
                      detail.mobileNo.length < 10) ||
                    (detail.name === "RRN" && detail.rrn.length < 12) ||
                    (detail.name === "CRN" && detail.crnNo.length < 10)) &&
                  detail.toDate === ""
                    ? customFormText("")
                    : ((detail.name === "Account number" &&
                          detail.accountNo.length === 16) ||
                          (detail.name === "Email ID" &&
                            detail.email.length >= 12 &&
                            detail.email.length <= 320) ||
                          (detail.name === "PAN" &&
                            detail.panNo.length === 10) ||
                          (detail.name === "Credit Card" &&
                            detail.creditCardNo.length === 16) ||
                          (detail.name === "Aadhar" &&
                            detail.aadhar.length === 12) ||
                          (detail.name === "Debit Card" &&
                            detail.debitCard.length === 16) ||
                          (detail.name === "Mobile No." &&
                            detail.mobileNo.length === 10) ||
                          (detail.name === "RRN" && detail.rrn.length === 12) ||
                          (detail.name === "CRN" &&
                            detail.crnNo.length === 10)) &&
                        detail.toDate === ""
                      ? customFormText("If needed, select to date", "grey", 1)
                      : detail.toDate !== ""
                        ? validatedHelperText("Dated")
                        : ""
                }
              </LocalizationProvider>
            </Box>
          </Box>
        )}

        {reportName === "IP Logs" && detailName !== "mobileNoDetails" && (
          <FormControl
            variant="outlined"
            margin="none"
            sx={{ width: "19.85%", marginLeft: "0%" }}
          >
            <TextField
              sx={
                detail.mobileNo.length === 10
                  ? inputControl.validatedTextfield
                  : inputControl.textfield
              }
              data-testid={`mobileno-input-${detailIndex}`}
              InputLabelProps={
                detail.mobileNo.length === 10
                  ? inputControl.validatedInputLabelProps
                  : inputControl.inputLabelProps
              }
              inputProps={{
                style: {
                  fontSize: "0.88rem",
                  height: "0.6rem",
                  // backgroundColor : "blue"
                },
                maxLength: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ opacity: 0.85 }}>
                    <Typography sx={{ fontSize: "0.88rem" }} component="span">
                      +91
                    </Typography>
                  </InputAdornment>
                ),
              }}
              placeholder="Enter Mobile No."
              className="number-box"
              helperText={
                detail.mobileNo.length < 10
                  ? customFormText(
                      t("only10Characters"),

                      "grey",
                      1
                    )
                  : validatedDetail()
              }
              value={detail.mobileNo}
              autoComplete="off"
              style={{ fontSize: "0.88rem" }}
              label="Mobile No."
              disabled={
                (detail.name === "Account number" &&
                  detail.accountNo.length < 16) ||
                (detail.name === "Email ID" && detail.email.length < 12) ||
                (detail.name === "PAN" && detail.panNo.length < 10) ||
                (detail.name === "Credit Card" &&
                  detail.creditCardNo.length < 16) ||
                (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                (detail.name === "Debit Card" &&
                  detail.debitCard.length < 16) ||
                (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
                (detail.name === "RRN" && detail.rrn.length < 12) ||
                (detail.name === "CRN" && detail.crnNo.length < 10)
                  ? true
                  : false
              }
              margin="none"
              onChange={(e) =>
                handleMobileNoValue(
                  e.target.value,
                  reportIndex,
                  detailIndex,
                  detailName,
                  reportName
                )
              }
              // sx={{ borderStyle: "solid",
              //   borderColor:
              //     detail.mobileNo === ''
              //       ? "rgba(128, 128, 128, 0.36)"
              //       : "rgba(128, 128, 128, 0.74)",
              //   borderWidth: "1px"}}
              // type="tel"
              // inputMode="tel"
              type="text"
              inputMode="text"
              color="primary"
            />
          </FormControl>
        )}

        {detailName === "RRNdetails" &&
          (reportName === "Beneficiary details for Single IMPS transactions" ||
            reportName ===
              "Beneficiary details for Single UPI transactions") && (
            <Box className="rrn-fields">
              <FormControl
                variant="outlined"
                margin="none"
                sx={{ width: "57%" }}
              >
                <TextField
                  sx={
                    detail.amount.length >= 1
                      ? inputControl.validatedTextfield
                      : inputControl.textfield
                  }
                  data-testid={`amount-detail-${detailIndex}`}
                  InputLabelProps={
                    detail.amount.length >= 1
                      ? inputControl.validatedInputLabelProps
                      : inputControl.inputLabelProps
                  }
                  inputProps={{
                    style: {
                      fontSize: "0.88rem",
                      height: "0.6rem",
                      // backgroundColor : "blue"
                    },
                    maxLength: 6,
                  }}
                  placeholder="Enter Amount"
                  disabled={
                    detail.rrn === "" || detail.rrn.length === 0 ? true : false
                  }
                  className="selected-param-box-3"
                  value={detail.amount.length === 0 ? "" : detail.amount}
                  helperText={
                    detail.rrn.length < 12
                      ? ""
                      : detail.rrn.length === 12 && detail.amount.length === 0
                        ? t("ifNeededAmountMustBe")
                        : validatedDetail()
                  }
                  autoComplete="off"
                  FormHelperTextProps={{ sx: { color: "rgb(92, 84, 112)" } }}
                  style={{
                    margin: "0rem 0rem 0rem 0rem",
                    // height: "5.5vh",
                    fontSize: "0.88rem",
                    width: "100%",
                  }}
                  label="Amount"
                  margin="none"
                  onChange={(e) =>
                    handleAmountValue(
                      e.target.value,
                      reportIndex,
                      detailIndex,
                      detailName
                    )
                  }
                  type="text"
                  inputMode="text"
                  color="primary"
                />
              </FormControl>

              <Box sx={{ width: "40%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD-MM-YYYY"
                    label={t("date")}
                    data-testid={`rrn-datepicker-${detailIndex}`}
                    disabled={
                      detail.rrn === "" || detail.rrn.length === 0
                        ? true
                        : false
                    }
                    value={
                      detail.fromDate === ""
                        ? null
                        : dayjs(detail.fromDate, "DD-MM-YYYY")
                    }
                    defaultValue={dayjs.Dayjs}
                    maxDate={currentDate}
                    slotProps={datePickerControl.slotProps}
                    sx={datePickerControl.sx}
                    onChange={(date) =>
                      handleDate(date, reportIndex, detailIndex, detailName)
                    }
                  />
                  {detail.fromDate !== ""
                    ? validatedHelperText("Dated")
                    : detail.rrn.length === 12
                      ? customFormText(t("ifNeededSelectDate"), "grey", 1)
                      : detail.fromDate === "" && detail.rrn.length === 12
                        ? customFormText(t("ifNeededSelectDate"), "grey", 1)
                        : ""}
                </LocalizationProvider>
              </Box>
            </Box>
          )}

        {reportName === "Statement in PDF/Excel" && (
          <FormControl
            variant="standard"
            sx={{
              width: "12%",
              marginLeft: "0%",
              backgroundColor: "transparent",
            }}
          >
            <Select
              id="report-type-dropdown"
              value={detail.type}
              label="Type"
              data-testid={`type-dropdown-${detailIndex}`}
              displayEmpty
              disabled={
                (detail.name === "Account number" &&
                  detail.accountNo.length < 16) ||
                (detail.name === "Email ID" && detail.email.length < 12) ||
                (detail.name === "PAN" && detail.panNo.length < 10) ||
                (detail.name === "Credit Card" &&
                  detail.creditCardNo.length < 16) ||
                (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                (detail.name === "Debit Card" &&
                  detail.debitCard.length < 16) ||
                (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
                (detail.name === "RRN" && detail.rrn.length < 12) ||
                (detail.name === "CRN" && detail.crnNo.length < 10)
                  ? true
                  : false
              }
              onChange={(e) =>
                handleReportType(
                  e.target.value.toLowerCase(),
                  reportIndex,
                  detailIndex,
                  detailName
                )
              }
              variant="standard"
              sx={
                detail.type === ""
                  ? SelectProps.containerProps
                  : SelectProps.validatedContainerProps
              }
              input={<OutlinedInput fullWidth={true} />}
              IconComponent={(props) => (
                <KeyboardArrowDownOutlinedIcon
                  className="reports-type-dropdownicon"
                  sx={{ fontSize: "1.4rem", color: "rgba(115, 115, 115, 1)" }}
                  {...props}
                />
              )}
              renderValue={(type) =>
                type.toLowerCase() !== "pdf" && type.toLowerCase() !== "excel"
                  ? `Type *`
                  : type === "pdf"
                    ? "PDF"
                    : type === "excel"
                      ? "Excel"
                      : ""
              }
              MenuProps={SelectProps.TYPE_SELECT_PROPS}
              inputProps={{ "aria-label": "Without label" }}
              autoWidth={false}
              style={{
                display: "flex",
                alignItems: "center",
                height: "2.65rem",
                fontSize: "0.88rem",
                color: detail.type === "" ? "rgba(0, 0, 0, 0.49)" : "black",
              }}
              placeholder={t("type")}
            >
              {availableReportTypes.map((type, typeIndex) => (
                <MenuItem
                  key={type}
                  data-testid={`type-dropdown-menuitem-${typeIndex}`}
                  value={type}
                  style={{
                    display: "flex",
                    border: "0px solid #cdcdcd",
                    width: "100%",
                    height: "1.8rem",
                    alignItems: "left",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemText
                    primary={type}
                    style={{ padding: "0rem" }}
                    color="black"
                    inputMode="text"
                    primaryTypographyProps={{ fontSize: "0.825rem" }}
                  />
                </MenuItem>
              ))}
            </Select>
            {(detail.name === "Account number" &&
              detail.accountNo.length < 16) ||
            (detail.name === "Email ID" && detail.email.length < 12) ||
            (detail.name === "PAN" && detail.panNo.length < 10) ||
            (detail.name === "Credit Card" &&
              detail.creditCardNo.length < 16) ||
            (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
            (detail.name === "Debit Card" && detail.debitCard.length < 16) ||
            (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
            (detail.name === "RRN" && detail.rrn.length < 12) ||
            (detail.name === "CRN" && detail.crnNo.length < 10)
              ? customFormText("")
              : detail.type === ""
                ? customFormText("select report type", "rgb(92, 84, 112)", 1)
                : validatedHelperText("Selected")}
          </FormControl>
        )}

        {detailIndex < reportsState[reportIndex][detailName].length && (
          <Button
            className="add-remove-button"
            data-testid={`delete-button-${detailIndex}`}
            disabled={
              reportsState[reportIndex][detailName].length === 1 ? true : false
            }
            style={{
              marginLeft:
                reportName === "IP Logs" && detailName === "mobileNoDetails"
                  ? "2%"
                  : "0%",
              opacity:
                reportsState[reportIndex][detailName].length === 1 ? 0.25 : 1,
            }}
            onClick={() => deleteDetail(reportIndex, detailIndex, detailName)}
          >
            <RemoveCircleOutlineRoundedIcon
              sx={{
                color: "red",
                alignSelf: "center",
                justifySelf: "center",
                fontSize: "2.35rem",
              }}
            />
          </Button>
        )}

        {/* <Box sx={{ display : "flex",flexDirection : "row",marginLeft : "0.55rem"}}> */}
        {detailIndex === reportsState[reportIndex][detailName].length - 1 && (
          <Button
            className="add-remove-button"
            data-testid={`add-button-${detailIndex}`}
            style={{
              marginLeft:
                reportName === "IP Logs" && detailName === "mobileNoDetails"
                  ? "2%"
                  : "0%",
              opacity:
                (detail.name === "Account number" &&
                  detail.accountNo.length < 16) ||
                (detail.name === "Email ID" && detail.email.length < 12) ||
                (detail.name === "PAN" && detail.panNo.length < 10) ||
                (detail.name === "Credit Card" &&
                  detail.creditCardNo.length < 16) ||
                (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
                (detail.name === "Debit Card" &&
                  detail.debitCard.length < 16) ||
                (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
                (detail.name === "RRN" && detail.rrn.length < 12) ||
                (detail.name === "CRN" && detail.crnNo.length < 10) ||
                detail.type === ""
                  ? 0.25
                  : 1,
            }}
            disabled={
              (detail.name === "Account number" &&
                detail.accountNo.length < 16) ||
              (detail.name === "Email ID" && detail.email.length < 12) ||
              (detail.name === "PAN" && detail.panNo.length < 10) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length < 16) ||
              (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
              (detail.name === "Debit Card" && detail.debitCard.length < 16) ||
              (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
              (detail.name === "RRN" && detail.rrn.length < 12) ||
              (detail.name === "CRN" && detail.crnNo.length < 10) ||
              detail.type === ""
                ? true
                : false
            }
            onClick={() =>
              addDetail(reportIndex, detailName, param, reportName)
            }
          >
            <AddCircleOutlineRoundedIcon
              sx={{
                color: "red",
                alignSelf: "center",
                justifySelf: "center",
                fontSize: "2.25rem",
              }}
            />
          </Button>
        )}
        {/* </Box> */}
      </Box>
    ));
  //     {detailIndex === reportsState[reportIndex][detailName].length - 1 ||
  //     reportsState[reportIndex][detailName].length === 1 ? (
  //       <Button
  //         className="add-remove-button"
  //         data-testid={`add-button-${detailIndex}`}
  //         style={{
  //           marginLeft:
  //             reportName === "IP Logs" && detailName === "mobileNoDetails"
  //               ? "2%"
  //               : "0%",
  //           opacity:
  //             detail.value === "" ||
  //             detail.value === 0 ||
  //             detail.type === ""
  //               ? 0.5
  //               : 1,
  //         }}
  //         disabled={
  //           detail.value === "" ||
  //           detail.value === 0 ||
  //           detail.type === ""
  //             ? true
  //             : false
  //         }
  //         onClick={() =>
  //           addDetail(reportIndex, detailName, param, reportName)
  //         }
  //       >
  //         <AddCircleOutlineRoundedIcon
  //           sx={{
  //             color: "red",
  //             alignSelf: "center",
  //             justifySelf: "center",
  //             fontSize: "2.25rem",
  //           }}
  //         />
  //       </Button>
  //     ) : (
  //       <Button
  //         className="add-remove-button"
  //         data-testid={`delete-button-${detailIndex}`}
  //         style={{
  //           marginLeft:
  //             reportName === "IP Logs" && detailName === "mobileNoDetails"
  //               ? "2%"
  //               : "0%",
  //         }}
  //         onClick={() => deleteDetail(reportIndex, detailIndex, detailName)}
  //       >
  //         <RemoveCircleOutlineRoundedIcon
  //           sx={{
  //             color: "red",
  //             alignSelf: "center",
  //             justifySelf: "center",
  //             fontSize: "2.35rem",
  //           }}
  //         />
  //       </Button>
  //     )}
  //   </Box>
  // ));

  const showPreview = (
    detailsArray,
    reportIndex,
    detailName,
    detail,
    reportName
  ) =>
    detailsArray.map((detail, detailIndex) => (
      <Box>
        {(detail.accountNo.length > 0 ||
          detail.panNo.length > 0 ||
          detail.rrn.length > 0 ||
          detail.crnNo.length > 0 ||
          detail.mobileNo.length > 0 ||
          detail.email.length > 0 ||
          detail.creditCardNo.length > 0 ||
          detail.debitCard.length > 0 ||
          detail.aadhar.length > 0) && (
          <>
            {/* { updateDetailed() } */}
            <Box
              className="preview-data"
              sx={{
                // backgroundColor : "blue",
                flex: 1,
                justifyContent:
                  // reportName ===
                  //   "Beneficiary details for Single IMPS transactions" ||
                  // reportName ===
                  //   "Beneficiary details for Single UPI transactions" ||
                  // (reportName === "IP Logs" &&
                  //   detail.fromDate === "" &&
                  //   detail.toDate === "") ||
                  // (reportName === "IP Logs" && detail.mobileNo.length === 0) ||
                  // (reportName === "Statement in PDF/Excel" &&
                  //   detail.fromDate === "" &&
                  //   detail.toDate === "")
                  //   ?
                  "space-evenly",
                // :
                // "space-between",
              }}
            >
              <Box
                className="detail-input"
                sx={{ minWidth: "12rem", maxWidth: "12rem" }}
                display={
                  detail.accountNo.length ||
                  detail.panNo.length > 0 ||
                  detail.rrn.length > 0 ||
                  detail.crnNo.length > 0 ||
                  detail.mobileNo.length > 0 ||
                  detail.email.length > 0 ||
                  detail.creditCardNo.length > 0 ||
                  detail.debitCard.length > 0 ||
                  detail.aadhar.length > 0
                    ? "block"
                    : "none"
                }
                // sx={{ minWidth: "12rem", maxWidth: "12rem" }}
              >
                <span className="preview-text" style={{ fontWeight: 500 }}>{`${
                  detail.name === "Account number" ? "Acc no." : detail.name
                }  : `}</span>
                <span className="preview-text">
                  {detail.name === "Account number"
                    ? detail.accountNo
                    : detail.name === "Email ID"
                      ? detail.email
                      : detail.name === "PAN"
                        ? detail.panNo
                        : detail.name === "Credit Card"
                          ? detail.creditCardNo
                          : detail.name === "Aadhar"
                            ? detail.aadhar
                            : detail.name === "Debit Card"
                              ? detail.debitCard
                              : detail.name === "Mobile No."
                                ? detail.mobileNo
                                : detail.name === "RRN"
                                  ? detail.rrn
                                  : detail.name === "CRN"
                                    ? detail.crnNo
                                    : ""}
                </span>
              </Box>

              {((detailName === "accountNumberDetails" &&
                reportName !== "Device details") ||
                (detailName === "CRNdetails" && reportName === "IP Logs") ||
                reportName === "IP Logs" ||
                reportName === "Statement in PDF/Excel" ||
                reportName ===
                  "Beneficiary details for Bulk IMPS transactions" ||
                reportName ===
                  "Beneficiary details for Bulk UPI transactions" ||
                (detailName === "RRNdetails" &&
                  reportName ===
                    "Beneficiary details for Bulk IMPS transactions") ||
                (detailName === "RRNdetails" &&
                  reportName ===
                    "Beneficiary details for Bulk UPI transactions")) && (
                // (detail.fromDate !== "" || detail.toDate !== "")
                // &&
                <Box
                  className="detail-range"
                  sx={{ minWidth: "12.5rem", maxWidth: "12.5rem" }}
                  // // display={detail.fromDate === "" && detail.toDate === "" ? "none" : "block"}
                  // display="none"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.15rem",
                    }}
                  >
                    <span className="preview-text" style={{ fontWeight: 500 }}>
                      Date :{" "}
                    </span>
                  </Box>

                  <span className="preview-text">
                    {detail.fromDate !== ""
                      ? `${detail.fromDate} - `
                      : `___________ - `}
                  </span>

                  <span className="preview-text">
                    {detail.toDate !== "" ? `${detail.toDate}` : `____________`}
                  </span>
                </Box>
              )}

              {((detailName === "RRNdetails" &&
                reportName ===
                  "Beneficiary details for Single IMPS transactions") ||
                (detailName === "RRNdetails" &&
                  reportName ===
                    "Beneficiary details for Single UPI transactions")) && (
                <Box className="detail-range" sx={{ gap: "5rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      minWidth: "7.5rem",
                      maxWidth: "7.5rem",
                      gap: "0.15rem",
                    }}
                  >
                    <span className="preview-text" style={{ fontWeight: 500 }}>
                      Amount :{" "}
                    </span>
                    <span className="preview-text">
                      {detail.amount.length === 0 ? "0" : detail.amount}
                    </span>
                  </Box>

                  {detail.fromDate !== "" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.15rem",
                      }}
                    >
                      <span
                        className="preview-text"
                        style={{ fontWeight: 500 }}
                      >
                        Date :{" "}
                      </span>
                      <span className="preview-text">{detail.fromDate}</span>
                    </Box>
                  )}
                </Box>
              )}

              {reportName === "IP Logs" && detailName !== "mobileNoDetails" && (
                <Box
                  sx={{ minWidth: "11.5rem", maxWidth: "11.5rem" }}
                  // display={
                  //   detail.mobileNo === "" || detail.mobileNo.length === 0
                  //     ? "none"
                  //     : "block"
                  // }
                >
                  <span
                    style={{ marginLeft: "0.92rem", fontWeight: 500 }}
                    className="preview-text"
                  >
                    Mobile No. :{" "}
                  </span>
                  <span className="preview-text">{detail.mobileNo}</span>
                </Box>
              )}

              {reportName === "Statement in PDF/Excel" && (
                <Box
                  sx={{ minWidth: "6.5rem", maxWidth: "6.5rem" }}
                  //  display={detail.type === "" ? "none" : "block"}
                >
                  <span
                    style={{ marginLeft: "0.92rem", fontWeight: 500 }}
                    className="preview-text"
                  >
                    Type :{" "}
                  </span>
                  <span className="preview-text">
                    {detail.type === ""
                      ? ""
                      : detail.type === "pdf"
                        ? "PDF"
                        : detail.type === "excel"
                          ? "Excel"
                          : ""}
                  </span>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    ));

  //////console.log("ticket number length", ticketNumber);

  const [reportDetails, setReportDetails] = useState([]);

  const [deviceDetails, setDeviceDetails] = useState([]);
  const [ipLogs, setIpLogs] = useState([]);

  const configurePayload = (callback) => {
    setReportDetails((prevState) => {
      const updatedReportState = reportsState.map((report) => {
        return {
          reportType: report.selectedReport,
          report_status: "In-progress",
          requestDetails: [
            ...report.accountNumberDetails,
            ...report.PANdetails,
            ...report.RRNdetails,
            ...report.CRNdetails,
            ...report.creditCardDetails,
            ...report.debitCardDetails,
            ...report.aadharDetails,
            ...report.mobileNoDetails,
            ...report.emailDetails,
          ],
        };
      });

      if (callback) callback(updatedReportState);

      return updatedReportState;
    });
  };

  const individualReportHandler = (updatedReportState) => {
    const deviceDetailData = updatedReportState.filter(
      (report) => report.reportName === "Device details"
    );
    setDeviceDetails(deviceDetailData);

    const ipLogData = updatedReportState.filter(
      (report) => report.reportName === "IP Logs"
    );
    setIpLogs(ipLogData);
  };

  const isValidDisplay =
    reportsState.every((state, index) =>
      // state.accountNumberDetails.length > 0 &&
      state.accountNumberDetails.every(
        (detail, subIndex) => state.accountNumberDetails[0].accountNo.length > 0
        // && state.accountNumberDetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.PANdetails.length > 0 &&
      state.PANdetails.every(
        (detail, subIndex) => state.PANdetails[0].panNo.length > 0
        // &&
        //   state.PANdetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.CRNdetails.length > 0 &&
      state.CRNdetails.every(
        (detail, subIndex) => state.CRNdetails[0].crnNo.length > 0
        // &&
        //   state.CRNdetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.RRNdetails.length > 0 &&
      state.RRNdetails.every(
        (detail, subIndex) => state.RRNdetails[0].rrn.length > 0
        // &&
        //   state.RRNdetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.aadharDetails.length > 0 &&
      state.aadharDetails.every(
        (detail, subIndex) => state.aadharDetails[0].aadhar.length > 0
        // &&
        //   state.aadharDetails[0].type !== ""
      )
    ) ||
    reportsState.every(
      (state, index) =>
        state.mobileNoDetails.length > 0 &&
        state.mobileNoDetails.every(
          (detail, subIndex) => state.mobileNoDetails[0].mobileNo.length > 0
          // &&
          //   state.mobileNoDetails[0].type !== ""
        )
    ) ||
    reportsState.every((state, index) =>
      // state.creditCardDetails.length > 0 &&
      state.creditCardDetails.every(
        (detail, subIndex) => state.creditCardDetails[0].creditCardNo.length > 0
        // &&
        //   state.creditCardDetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.debitCardDetails.length > 0 &&
      state.debitCardDetails.every(
        (detail, subIndex) => state.debitCardDetails[0].debitCard.length > 0
        // &&
        //   state.debitCardDetails[0].type !== ""
      )
    ) ||
    reportsState.every((state, index) =>
      // state.emailDetails.length > 0 &&
      state.emailDetails.every(
        (detail, subIndex) => state.emailDetails[0].email.length > 0
        // &&
        //   state.emailDetails[0].type !== ""
      )
    );

  const isValidReportData = reportsState.every(
    (state, index) =>
      (state.accountNumberDetails.length > 0 &&
        state.accountNumberDetails.every(
          (detail, subIndex) =>
            detail.accountNo.length === 16 && detail.type !== ""
        )) ||
      (state.PANdetails.length > 0 &&
        state.PANdetails.every(
          (detail, subIndex) => detail.panNo.length === 10 && detail.type !== ""
        )) ||
      (state.CRNdetails.length > 0 &&
        state.CRNdetails.every(
          (detail, subIndex) => detail.crnNo.length === 10 && detail.type !== ""
        )) ||
      (state.RRNdetails.length > 0 &&
        state.RRNdetails.every(
          (detail, subIndex) => detail.rrn.length === 12 && detail.type !== ""
        )) ||
      (state.aadharDetails.length > 0 &&
        state.aadharDetails.every(
          (detail, subIndex) =>
            detail.aadhar.length === 12 && detail.type !== ""
        )) ||
      (state.mobileNoDetails.length > 0 &&
        state.mobileNoDetails.every(
          (detail, subIndex) =>
            detail.mobileNo.length === 10 && detail.type !== ""
        )) ||
      (state.creditCardDetails.length > 0 &&
        state.creditCardDetails.every(
          (detail, subIndex) =>
            detail.creditCardNo.length === 16 && detail.type !== ""
        )) ||
      (state.debitCardDetails.length > 0 &&
        state.debitCardDetails.every(
          (detail, subIndex) =>
            detail.debitCard.length === 16 && detail.type !== ""
        )) ||
      (state.emailDetails.length > 0 &&
        state.emailDetails.every(
          (detail, subIndex) => detail.email.length > 16 && detail.type !== ""
        ))
  );

  const handleSubmit = () => {
    configurePayload((updatedReportState) => {
      individualReportHandler(updatedReportState);
    });

    if (isValidReportData === false) {
      displayToast(
        "All Mandatory Fields must be non-empty!",
        3000,
        "rgb(249, 228, 0)",
        "black",
        500
      );
    } else {
      //Submit API Function

      //Error Block
      // displayToast("Error Submitting Request",3200,"red","white",600);

      // SuccessBlock

      setSubmitted(true);
      // dispatch(setRequestPayloads(responsePayload));
      displayToast(
        "Successfully Submitted Request",
        2000,
        "rgb(7, 65, 115)",
        "white",
        600
      );
      setTimeout(() => {
        route_to("/ViewRequest");
      }, 1000);
    }
  };

  // ////console.log("Valid Report Data", isValidReportData);
  ////console.log("Spring Boot Payload", reportDetails);

  const createRequestPayload = {
    // ticketId: "",
    ticketNumber: ticketNumber,
    ticketDescription: ticketDescription,
    status: "In-progress",
    createdDate: reduxDate,
    createdBy: Creator,
    reportDetails: reportDetails,
  };

  // const deviceDetailsPayload = {
  //   // ticketId: "",
  //   ticketNumber: ticketNumber,
  //   ticketDescription: ticketDescription,
  //   status: "In-progress",
  //   createdDate: reduxDate,
  //   createdBy: Creator,
  //   reportDetails: deviceDetails,
  // };

  //console.log("Create Request Details array", createRequestPayload);
  //console.log("Device Details Array", deviceDetails);

  console.log("New State", reportsState);

  return (
    <Provider store={store}>
      <Typography component="span" fontWeight={500} fontSize="1.36rem">
        {t("createRequest")}
      </Typography>
      <Box className="page" data-testid="create-request-page">
        <Box className="create-request-screen">
          {/* <span style={{ fontWeight: "420", fontSize: "1.36rem" }}>
          {t("createRequest")}
        </span> */}

          <Box
            className="ticket-entry-section"
            sx={{
              minHeight: loading === true ? "10.275rem" : "auto",
              padding:
                ticketNumber.length === 10 && ticketDescription.length >= 10
                  ? "1.25rem 1.5rem 0.6rem 1.5rem"
                  : "1.25rem 1.5rem 1.15rem 1.5rem",
            }}
          >
            {/* {loading === true ? (
              <Loader />
            ) : ( */}
            <>
              <Box className="ticket-type-section">
                <FormControl
                  variant="outlined"
                  margin="none"
                  className="ticket-number-container"
                >
                  {/* {loading === true ? (
                      <Skeleton height="2.75rem" sx={{ borderRadius : '4px', backgroundColor : "rgb(230, 230, 235)"}} animation="pulse" variant="rectangular" />
                    ) : ( */}
                  <TextField
                    sx={
                      ticketNumber.length === 10
                        ? inputControl.validatedTextfield
                        : inputControl.textfield
                    }
                    helperText={
                      ticketNumber.length < 10
                        ? warningHelperText(t("only10Characters"), 1)
                        : validatedDetail()
                    }
                    InputLabelProps={
                      ticketNumber.length === 10
                        ? inputControl.validatedInputLabelProps
                        : inputControl.inputLabelProps
                    }
                    FormHelperTextProps={{
                      sx: { color: "rgb(92, 84, 112)" },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "0.88rem",
                        height: "0.6rem",
                        // backgroundColor : "blue"
                      },
                      maxLength: 10,
                    }}
                    data-testid="ticket-num-input"
                    placeholder={t("enterTicketNo")}
                    className="ticket-number-input"
                    value={ticketNumber}
                    autoComplete="off"
                    size="medium"
                    style={{
                      margin: "0rem 0rem 0rem 0rem",
                      height: "auto",
                      fontSize: "0.88rem",
                    }}
                    label={t("ticketNo")}
                    margin="dense"
                    onChange={(e) => setTicketNumber(e.target.value)}
                    type="text"
                    required
                    inputMode="text"
                    fullWidth={true}
                    color="primary"
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  margin="none"
                  className="ticket-description-container"
                >
                  <TextField
                    placeholder={
                      descriptionFocused === true ? t("enterTicketDesc") : ""
                    }
                    variant="outlined"
                    FormHelperTextProps={{
                      sx: { color: "rgb(92, 84, 112)" },
                    }}
                    helperText={
                      ticketNumber.length < 10
                        ? ""
                        : ticketNumber.length === 10 &&
                            ticketDescription.length === 0
                          ? warningHelperText(t("only1060Characters"), 1)
                          : ticketDescription.length < 10
                            ? warningHelperText(t("only1060Characters"), 1)
                            : validatedDetail()
                    }
                    required
                    label={t("ticketDesc")}
                    onFocus={() => {
                      //////console.log('desc length',ticketDescription.length);
                      //////console.log('desc rows',Math.ceil(ticketDescription.length / 59));
                      setDescriptionFocused(true);
                    }}
                    onBlur={() => setDescriptionFocused(false)}
                    multiline
                    // multiline
                    sx={
                      ticketDescription.length >= 10
                        ? inputControl.validatedTextfield
                        : inputControl.textfield
                    }
                    className="ticket-description-input"
                    autoComplete="off"
                    rows={Math.ceil(ticketDescription.length / 60)}
                    size="small"
                    fullWidth
                    inputProps={inputControl.textAreaProps}
                    InputLabelProps={
                      ticketDescription.length >= 10
                        ? inputControl.validatedTextAreaLabelProps
                        : inputControl.textAreaLabelProps
                    }
                    style={{
                      margin: "0rem 0rem 0rem 0rem",
                      backgroundColor: "white",
                      height: "auto",
                    }}
                    margin="none"
                    // InputProps={{
                    //   inputComponent : 'textarea',
                    //   sx : {
                    //      padding : 0,
                    //      margin : 0
                    //   }
                    // }}
                    type="text"
                    inputMode="text"
                    disabled={ticketNumber.length < 10 ? true : false}
                    color="primary"
                    value={ticketDescription}
                    data-testid="ticket-descr-input"
                    onChange={(e) => setTicketDescription(e.target.value)}
                  />
                </FormControl>
              </Box>

              <FormControl variant="standard" sx={{ width: "82.75%" }}>
                <Select
                  label="Reports Selection Dropdown"
                  name="reports-selection-dropdown"
                  id="reports-selection-dropdown"
                  data-testid="reports-selection-dropdown"
                  multiple={true}
                  value={selectedReports}
                  displayEmpty
                  disabled={
                    ticketNumber.length < 10 || ticketDescription.length < 10
                      ? true
                      : false
                  }
                  onChange={handleReportSelection}
                  variant="standard"
                  input={<OutlinedInput fullWidth={true} />}
                  IconComponent={(props) => (
                    <KeyboardArrowDownOutlinedIcon
                      className="reports-type-dropdownicon"
                      sx={{
                        fontSize: "1.4rem",
                        color: "rgba(115, 115, 115, 1)",
                      }}
                      {...props}
                    />
                  )}
                  renderValue={(reports) => {
                    if (reports.length === 0) {
                      return (
                        <span
                          style={{ opacity: 0.45 }}
                          data-testid="reports-dropdown-input-initial"
                        >
                          {" "}
                          {t("statementsReportRequire")}
                        </span>
                      );
                    }
                    return (
                      <Input
                        sx={{
                          width: "99%",
                          fontSize: "95%",
                          textOverflow: "ellipsis",
                          // overflow: "hidden",
                        }}
                        disableUnderline={true}
                        value={reports.join(" , ")}
                        data-testid="reports-dropdown-input-changed"
                      ></Input>
                    );
                  }}
                  inputProps={{}}
                  sx={
                    selectedReports.length === 0
                      ? SelectProps.containerProps
                      : SelectProps.validatedContainerProps
                  }
                  MenuProps={SelectProps.REPORT_SELECT_PROPS}
                  autoWidth={false}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "2.56rem",
                    fontSize: "0.88rem",
                    border: "none",
                  }}
                  placeholder={t("statementsReportRequire")}
                >
                  {requiredReportsData.map((report, index) => (
                    <MenuItem
                      key={report}
                      value={report}
                      data-testid={`reports-selection-dropdown-menu-item-${index}`}
                      style={{
                        display: "flex",
                        border: "1px solid #cdcdcd",
                        width: "96.25%",
                        margin: "1rem 0rem 1rem 1.25rem",
                        height: "2.65rem",
                        alignItems: "left",
                        borderRadius: "4px",
                        backgroundColor: "transparent",
                        fontSize: "2px",
                      }}
                    >
                      <Checkbox
                        size="medium"
                        data-testid={`reports-selection-dropdown-menu-item-checkbox-${index}`}
                        icon={
                          <CheckBoxOutlineBlankIcon
                            sx={{ fontSize: "1.5rem" }}
                          />
                        }
                        // inputProps={{
                        //   'data-testid' : `reports-selection-dropdown-menu-item-checkbox-${index}`
                        // }}
                        checkedIcon={
                          <CheckBoxOutlinedIcon
                            className="check-icon"
                            sx={{ fontSize: "1.5rem", color: "red" }}
                          />
                        }
                        sx={{ containIntrinsicSize: "2px" }}
                        checked={selectedReports.indexOf(report) > -1}
                        color="primary"
                        style={{
                          marginLeft: "-0.88rem",
                          backgroundColor: "transparent",
                          fontSize: "2px",
                        }}
                      />
                      <ListItemText
                        primary={report}
                        data-testid="reports-selection-dropdown-menu-item-text"
                        style={{ padding: "0.05rem 0rem 0rem 0rem" }}
                        color="black"
                        inputMode="text"
                        primaryTypographyProps={{ fontSize: "0.825rem" }}
                      />
                    </MenuItem>
                  ))}
                </Select>
                {selectedReports.length >= 1
                  ? validatedHelperText("Selected")
                  : ticketNumber.length === 0 || ticketDescription.length === 0
                    ? () => {}
                    : ticketNumber.length === 10 &&
                        ticketDescription.length >= 10 &&
                        selectedReports.length === 0
                      ? customFormText(t("selectReports"))
                      : () => {}}
              </FormControl>
            </>
            {/* )}  */}
          </Box>

          {selectedReports.length > 0 && (
            <Box
              className="selected-reports-section"
              id="selected-reports-section"
              data-testid="selected-reports-section"
            >
              <Typography
                component="span"
                sx={{
                  fontSize: "1.1rem",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
                className="selected-reports-heading"
              >
                {" "}
                {t("selectedRequest")}
              </Typography>

              <Box>
                {reportsState.length > 0 &&
                  reportsState.map((request, reportIndex) => (
                    <Box
                      key={reportIndex}
                      sx={{ marginTop: "0.25rem", marginBottom: "1.65rem" }}
                    >
                      <Accordion
                        className="selected-report-view"
                        //  defaultExpanded={true}
                        //  slots={{ transition : Fade }}
                        //  slotProps={{ transition: { timeout: 10000 } }}
                        //  sx={{
                        //    boxShadow : "none",
                        //   '& .MuiAccordion-region': { height: reportsState[reportIndex]?.viewState === 'Expanded' ? 'auto' : 0 },
                        //   '& .MuiAccordionDetails-root': { display: reportsState[reportIndex]?.viewState === 'Expanded' ? 'block' : 'none' },
                        // }}
                        disableGutters
                        sx={{ boxShadow: "none" }}
                        expanded={
                          reportsState[reportIndex]?.viewState === "Minimized"
                            ? false
                            : true
                        }
                      >
                        <AccordionSummary
                          sx={{ minHeight: "2.5rem", maxHeight: "2.75rem" }}
                          expandIcon={
                            <ExpandCircleDownOutlinedIcon
                              sx={{
                                color: "rgba(95, 99, 104, 0.87)",
                                fontSize: "1.6rem",
                              }}
                              className="view-icon"
                              data-testid={`selected-report-detail-control-${reportIndex}`}
                              onClick={() => {
                                if (
                                  reportsState[reportIndex].viewState ===
                                  "Minimized"
                                ) {
                                  handleExpandedView(reportIndex);
                                } else {
                                  handleMinimizedView(reportIndex);
                                }
                              }}
                            />
                          }
                          className="selected-report-header"
                        >
                          <span className="selected-report-heading">
                            {request.selectedReport}
                          </span>
                        </AccordionSummary>

                        <AccordionDetails
                          hidden={
                            reportsState[reportIndex]?.viewState === "Minimized"
                              ? true
                              : false
                          }
                          data-testid={`selected-report-detail-${reportIndex}`}
                          sx={{
                            padding: 0,
                            border: "1px solid rgba(205, 205, 205, 1)",
                            borderWidth: "1px 0px 0px 0px",
                          }}
                        >
                          <Box className="selected-report-details">
                            {reportsState[reportIndex] && (
                              <>
                                <Box
                                  sx={{ width: "100%" }}
                                  display={
                                    request.selectedReport ===
                                      "Beneficiary details for Single IMPS transactions" ||
                                    request.selectedReport ===
                                      "Beneficiary details for Single UPI transactions"
                                      ? "none"
                                      : "block"
                                  }
                                >
                                  <FormControl
                                    variant="standard"
                                    sx={{
                                      width: "34%",
                                      marginBottom:
                                        reportsState[reportIndex].selectedParams
                                          .length === 0
                                          ? "1.36rem"
                                          : "0.75rem",
                                    }}
                                  >
                                    <Select
                                      label="Param Selection Dropdown"
                                      name="param-selection-dropdown"
                                      role="combobox"
                                      id="param-selection-dropdown"
                                      data-testid={`param-dropdown-${reportIndex}`}
                                      multiple={true}
                                      sx={
                                        reportsState[reportIndex].selectedParams
                                          .length === 0
                                          ? SelectProps.containerProps
                                          : SelectProps.validatedContainerProps
                                      }
                                      SelectDisplayProps={{
                                        "data-testid": `param-dropdown-sas-${reportIndex}`,
                                        role: "combobox",
                                      }}
                                      aria-labelledby="param-selection-dropdown-label"
                                      value={
                                        reportsState[reportIndex]
                                          .selectedParams || []
                                      }
                                      displayEmpty
                                      onChange={(event) =>
                                        handleParamSelection(
                                          event,
                                          reportIndex,
                                          request.selectedReport
                                        )
                                      }
                                      variant="standard"
                                      input={
                                        <OutlinedInput
                                          sx={{
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                            justifyItems: "left",
                                          }}
                                          role="combobox"
                                          fullWidth={false}
                                        />
                                      }
                                      IconComponent={(props) => (
                                        <KeyboardArrowDownOutlinedIcon
                                          className="reports-type-dropdownicon"
                                          sx={{
                                            fontSize: "1.36rem",
                                            color: "rgba(115, 115, 115, 1)",
                                          }}
                                          {...props}
                                        />
                                      )}
                                      renderValue={(params) => {
                                        if (params.length === 0) {
                                          return (
                                            <span style={{ opacity: 0.45 }}>
                                              {t("selectDetails")}
                                            </span>
                                          );
                                        }
                                        return (
                                          <Input
                                            sx={{
                                              width: "99%",
                                              fontSize: "95%",
                                              textOverflow: "ellipsis",
                                              // overflow: "hidden",
                                            }}
                                            disableUnderline={true}
                                            data-testid={`param-dropdown-input-${reportIndex}`}
                                            value={params.join(" , ")}
                                          ></Input>
                                        );
                                      }}
                                      MenuProps={SelectProps.PARAM_SELECT_PROPS}
                                      inputProps={{
                                        "aria-label": "Select Parameters",
                                      }}
                                      autoWidth={false}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: "2.65rem",
                                        fontSize: "0.88rem",
                                      }}
                                      placeholder={t("selectDetails")}
                                    >
                                      {availableParameters.map(
                                        (param, paramIndex) => (
                                          <MenuItem
                                            key={param}
                                            value={param}
                                            data-testid={`param-dropdown-menu-item-${paramIndex}`}
                                            style={{
                                              display: "flex",
                                              borderStyle: "solid",
                                              borderColor:
                                                "rgba(232, 232, 232, 1)",
                                              borderBottomWidth: "1.75px",
                                              height: "2.36rem",
                                              alignItems: "left",
                                              borderRadius: "0px",
                                              backgroundColor: "transparent",
                                              fontSize: "2px",
                                            }}
                                          >
                                            <Checkbox
                                              checked={
                                                reportsState[
                                                  reportIndex
                                                ].selectedParams.indexOf(
                                                  param
                                                ) > -1
                                              }
                                              color="primary"
                                              data-testid={`param-dropdown-checkbox-${paramIndex}`}
                                              style={{
                                                marginLeft: "-0.88rem",
                                                backgroundColor: "transparent",
                                              }}
                                              icon={
                                                <CheckBoxOutlineBlankIcon
                                                  sx={{ fontSize: "1.4rem" }}
                                                />
                                              }
                                              checkedIcon={
                                                <CheckBoxOutlinedIcon
                                                  className="check-icon"
                                                  sx={{
                                                    fontSize: "1.4rem",
                                                    color: "red",
                                                  }}
                                                />
                                              }
                                            />
                                            <ListItemText
                                              primary={param}
                                              style={{
                                                padding:
                                                  "0.15rem 0rem 0rem 0rem",
                                              }}
                                              data-testid={`param-dropdown-listitemtext-${paramIndex}`}
                                              color="black"
                                              inputMode="text"
                                              primaryTypographyProps={{
                                                fontSize: "0.85rem",
                                              }}
                                            />
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                    {reportsState[reportIndex].selectedParams
                                      .length === 0
                                      ? customFormText(
                                          "",
                                          "rgb(92, 84, 112)",
                                          1
                                        )
                                      : validatedHelperText("Selected")}
                                  </FormControl>
                                </Box>

                                <Box
                                  className="details-subsection"
                                  style={{
                                    marginTop:
                                      request.selectedReport ===
                                        "Beneficiary details for Single IMPS transactions" ||
                                      request.selectedReport ===
                                        "Beneficiary details for Single UPI transactions"
                                        ? "0rem"
                                        : "-2rem",
                                    marginBottom:
                                      reportsState[reportIndex].selectedParams
                                        .length === 0
                                        ? "1.5rem"
                                        : "2.25rem",
                                  }}
                                >
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Account number"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex]
                                        .accountNumberDetails,
                                      reportIndex,
                                      "accountNumberDetails",
                                      "Account number",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "PAN"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].PANdetails,
                                      reportIndex,
                                      "PANdetails",
                                      "PAN",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "CRN"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].CRNdetails,
                                      reportIndex,
                                      "CRNdetails",
                                      "CRN",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "RRN"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].RRNdetails,
                                      reportIndex,
                                      "RRNdetails",
                                      "RRN",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Aadhar"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].aadharDetails,
                                      reportIndex,
                                      "aadharDetails",
                                      "Aadhar",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Email ID"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].emailDetails,
                                      reportIndex,
                                      "emailDetails",
                                      "Email ID",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Credit Card"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex]
                                        .creditCardDetails,
                                      reportIndex,
                                      "creditCardDetails",
                                      "Credit Card",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Debit Card"
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex]
                                        .debitCardDetails,
                                      reportIndex,
                                      "debitCardDetails",
                                      "Debit Card",
                                      request.selectedReport
                                    )}
                                  {reportsState[
                                    reportIndex
                                  ].selectedParams.some(
                                    (param) => param === "Mobile No."
                                  ) &&
                                    displayRequestedReports(
                                      reportsState[reportIndex].mobileNoDetails,
                                      reportIndex,
                                      "mobileNoDetails",
                                      "Mobile No.",
                                      request.selectedReport
                                    )}
                                </Box>
                              </>
                            )}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}

                <Box className="action-buttons">
                  <Button
                    className="submit-button"
                    style={{ opacity: isValidReportData === true ? 1 : 0.45 }}
                    title="Submit"
                    data-testid="submit-button"
                    // disabled={!isValidReportData}
                    onClick={handleSubmit}
                  >
                    {" "}
                    <Typography
                      fontFamily="Roboto"
                      fontSize="0.92rem"
                      fontWeight={600}
                      color={isValidReportData === true ? "white" : "black"}
                    >
                      {t("submit")}
                    </Typography>
                  </Button>
                  <Button
                    className="preview-button"
                    title="Preview"
                    data-testid="preview-button"
                    // disabled={isValidReportData === false ? true : false}
                    onClick={() => {
                      setViewPreview(true);
                    }}
                  >
                    {t("preview")}
                  </Button>
                </Box>

                <Box>
                  <Modal
                    open={viewPreview === true}
                    onClose={() => setViewPreview(false)}
                    className="preview-modal"
                    data-testid="preview-modal"
                    contentLabel="Preview Modal"
                  >
                    <Box className="preview-box">
                      <Box className="preview-header">
                        <Typography
                          sx={{
                            fontSize: "1.125rem",
                            fontFamily: "Roboto",
                            fontWeight: "500",
                          }}
                          component="span"
                        >
                          {t("preview")}
                        </Typography>
                        <Button
                          title="Close Preview"
                          style={{ background: "none", border: "none" }}
                          onClick={() => setViewPreview(false)}
                        >
                          <CloseOutlinedIcon
                            name="close-preview"
                            className="close-preview-button"
                            sx={{
                              fontSize: "1.75rem",
                              color: "rgba(95, 99, 104, 1)",
                            }}
                          />
                        </Button>
                      </Box>

                      <Box className="preview-scroll">
                        {/* {reportsState.length > 0 &&
                        reportsState.map((request, reportIndex) => ( */}
                        {reportsState.length > 0 &&
                          reportsState.map((request, reportIndex) => (
                            <Box className="preview-report" key={reportIndex}>
                              <Box className="preview-report-header">
                                {/* <CheckBoxOutlinedIcon */}
                                <CheckBoxOutlinedIcon className="check-icon" />
                                <h3 className="preview-title">
                                  {request.selectedReport}
                                </h3>
                              </Box>

                              <Box
                                sx={{
                                  backgroundColor: "rgba(245, 248, 250, 1)",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderBottomLeftRadius: "4px",
                                  borderBottomRightRadius: "4px",
                                }}
                              >
                                <Box
                                  className="preview-report-details"
                                  sx={{
                                    // flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "rgba(245, 248, 250, 1)",
                                  }}
                                  display={
                                    isValidDisplay === true ? "block" : "none"
                                  }
                                >
                                  {reportsState[reportIndex] && (
                                    <>
                                      {showPreview(
                                        reportsState[reportIndex]
                                          .accountNumberDetails,
                                        reportIndex,
                                        "accountNumberDetails",
                                        "Account number",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex].PANdetails,
                                        reportIndex,
                                        "PANdetails",
                                        "PAN",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex].CRNdetails,
                                        reportIndex,
                                        "CRNdetails",
                                        "CRN",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex].RRNdetails,
                                        reportIndex,
                                        "RRNdetails",
                                        "RRN",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex].aadharDetails,
                                        reportIndex,
                                        "aadharDetails",
                                        "Aadhar",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex].emailDetails,
                                        reportIndex,
                                        "emailDetails",
                                        "Email ID",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex]
                                          .creditCardDetails,
                                        reportIndex,
                                        "creditCardDetails",
                                        "Credit Card",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex]
                                          .debitCardDetails,
                                        reportIndex,
                                        "debitCardDetails",
                                        "Debit Card",
                                        request.selectedReport
                                      )}
                                      {showPreview(
                                        reportsState[reportIndex]
                                          .mobileNoDetails,
                                        reportIndex,
                                        "mobileNoDetails",
                                        "Mobile No.",
                                        request.selectedReport
                                      )}
                                    </>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Box>
            </Box>
            // </Box>
          )}
        </Box>
      </Box>
      {showToast === true && (
        <MaterialToast
          message={toastMessage}
          duration={toastDuration}
          backgroundColor={toastBackground}
          color={toastColor}
          fontWeight={toastFontWeight}
        />
      )}
    </Provider>
  );
}
