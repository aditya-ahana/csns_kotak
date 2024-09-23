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
  InputBase,
  Autocomplete,
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
import Fade from "@mui/material/Fade";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MaterialToast from "../../components/Snackbar";
import Skeleton from "@mui/material/Skeleton";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";

// document.documentElement.style.setProperty('--rmsc-h', '48px');

export default function CreateRequest() {
  const readOnly = useSelector((state) => state.csns.readOnly);
  const availableReportTypes = useSelector(
    (state) => state.csns.availableReportTypes
  );
  const availableParameters = useSelector(
    (state) => state.csns.availableParameters
  );
  const requiredReportsData = useSelector(
    (state) => state.csns.requiredReportsData
  );

  const countries = useSelector((state) =>
    state.csns.countryCodeData.map((code) => code)
  );

  const countryCodes = countries.sort((array, sortedArray) =>
    array.phone.localeCompare(sortedArray.phone)
  );

  const [showToast, setShowToast] = useState(false);
  const [searchedReports, setSearchedReports] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastDuration, setToastDuration] = useState(0);
  const [toastBackground, setToastBackground] = useState("brown");
  const [toastColor, setToastColor] = useState("");
  const [toastFontWeight, setToastFontWeight] = useState();
  const [payloadConfigured, setPayloadConfigured] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState(true);

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
    }, 275);
  });

  const route_to = useNavigate();

  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [Creator, setCreator] = useState("");

  const [selectedReports, setSelectedReports] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // const new_date = new Date();
  // new_date.setDate(new_date.getDate()).toLocaleString("en-Us");

  const maxDate = dayjs(dayjs().format("DD-MM-YYYY"), "DD-MM-YYYY");
  const currentDate = useSelector((state) => state.csns.currentDate);

  ////////console.log("Current Date", currentDate);

  const previewProps = {
    name: {
      fontWeight: 500,
      fontFamily: "Roboto",
      fontSize: "0.85rem",
    },
    value: {
      fontWeight: 400,
      fontFamily: "Roboto",
      fontSize: "0.85rem",
    },
  };

  const inputControl = {
    textfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.45px solid rgb(103, 125, 106)",
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
      },
      // maxLength: 10,
    },
    inputLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        alignSelf: "center",
        display: "flex",
        color: "rgb(95, 105, 91)",
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
        minHeight: "1.6rem",
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
        color: "rgb(95, 105, 91)",
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
        border: "1.4px solid rgb(103, 125, 106)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgba(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          // ? "0.25px solid grey"
          // :
          "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          //   ? "silver"
          // :
          "rgba(95, 99, 104, 1)",
      },
    },
    mobileNoProps: {
      ".MuiOutlinedInput-notchedOutline": {
        border: "1.4px solid rgb(103, 125, 106)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgba(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          // ? "0.25px solid grey"
          // :
          "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          //   ? "silver"
          // :
          "rgba(95, 99, 104, 1)",
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
        fill: "rgba(95, 99, 104, 1) !important",
      },
    },
    REPORT_SELECT_PROPS: {
      PaperProps: {
        style: {
          maxHeight: "21.75rem",
          marginTop: "-0.5rem",
          boxShadow: "1px 2px 12px 0px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    PARAM_SELECT_PROPS: {
      PaperProps: {
        style: {
          maxHeight: "14rem",
          marginTop: "-0.15rem",
          overflow: "auto",
        },
      },
      MenuListProps: {
        sx: {
          border: "1.5px solid rgba(161, 161, 161, 1)",
          borderWidth: "1.5px 0px 1.5px 1.5px",
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
    CC_SELECT_PROPS: {
      PaperProps: {
        style: {
          marginTop: "-0.5rem",
          boxShadow: "1px 2px 12px 0px rgba(0, 0, 0, 0.1)",
          maxHeight: "27.6rem",
          overflow: "auto",
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
      // field: {
      //   readOnly: true,
      // },
      openPickerIcon: {
        sx: {
          fontSize: "1.5rem",
        },
      },
      textField: {
        InputLabelProps: {
          sx: {
            paddingTop: "0.05rem",
            color: "rgb(95, 105, 91)",
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
              border: "1.45px solid rgb(103, 125, 106)",
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
      actionBar: {
        actions: ["clear"],
      },
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
          color: "rgb(103, 125, 106)",
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
              searchQuery: "",
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
              searchQuery: "",
            }
          );
        }
      });
      return updatedReportState;
    });
  }, [selectedReports]);

  // //////////console.log('Selected REPORTS : ',selectedReports);
  // //////////console.log('Selected REPORTS : ',selectedReports);

  // //////////console.log('selected reports : ',selectedReports);

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

  // //////////console.log('Final Selected',selectedParams);

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

  const handleParamSearch = (value, reportIndex) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex].searchQuery = value;
      return newState;
    });
  };

  const handleReportSelection = (event) => {
    const {
      target: { value },
    } = event;

    ////console.log("event",event)
    // ////console.log("Value first length",value[0] );
    if (event.target.value.length > 0 && event.target.value[0] !== undefined) {
      setSelectedReports(typeof value === "string" ? value.split(",") : value);
    } else {
      setSelectedReports([]);
    }
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

      if (
        event.target.value.length > 0 &&
        event.target.value[0] !== undefined
      ) {
        report.selectedParams =
          typeof value === "string" ? value.split(",") : value;
      } else {
        report.selectedParams = [];
      }

      if (
        // value.some((param) => param === "Account number")
        value.includes("Account number") &&
        report.accountNumberDetails.length === 0
      ) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }

      // else {
      //   report.accountNumberDetails = [];
      // }

      if (value.includes("PAN") && report.PANdetails.length === 0) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.PANdetails = [];
      // }

      if (value.includes("CRN") && report.CRNdetails.length === 0) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.CRNdetails = [];
      // }

      if (value.includes("RRN") && report.RRNdetails.length === 0) {
        if (reportName === "IP Logs") {
          report.RRNdetails.push({
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
          report.RRNdetails.push({
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
          report.RRNdetails.push({
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
          report.RRNdetails.push({
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
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
          });
        }
      }
      // else {
      //   report.RRNdetails = [];
      // }

      if (value.includes("Aadhar") && report.aadharDetails.length === 0) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.aadharDetails = [];
      // }

      if (value.includes("Email ID") && report.emailDetails.length === 0) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.emailDetails = [];
      // }

      if (
        value.includes("Credit Card") &&
        report.creditCardDetails.length === 0
      ) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.creditCardDetails = [];
      // }

      if (
        value.includes("Debit Card") &&
        report.debitCardDetails.length === 0
      ) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.debitCardDetails = [];
      // }

      if (value.includes("Mobile No.") && report.mobileNoDetails.length === 0) {
        if (reportName === "IP Logs") {
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLastLogin",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogTxn",
          });
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
            countryCode: "91",
            mobileNo: "",
            req_status: "In-progress",
            type: reportName === "Statement in PDF/Excel" ? "" : "excel",
            filePath: "",
            subRequest: "IPLogUpi",
          });
        } else {
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
      }
      // else {
      //   report.mobileNoDetails = [];
      // }

      if (!value.includes("Account number")) {
        report.accountNumberDetails = [];
      }

      if (!value.includes("CRN")) {
        report.CRNdetails = [];
      }

      if (!value.includes("RRN")) {
        report.RRNdetails = [];
      }

      if (!value.includes("PAN")) {
        report.PANdetails = [];
      }

      if (!value.includes("Aadhar")) {
        report.aadharDetails = [];
      }

      if (!value.includes("Mobile No.")) {
        report.mobileNoDetails = [];
      }

      if (!value.includes("Debit Card")) {
        report.debitCardDetails = [];
      }

      if (!value.includes("Credit Card")) {
        report.creditCardDetails = [];
      }

      if (!value.includes("Email ID")) {
        report.emailDetails = [];
      }

      return newState;
    });
  };

  //console.log("device log", searchInput);

  const deleteDetail = (reportIndex, detailIndex, details, reportName) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][details].splice(detailIndex, 1);
      if (reportName === "IP Logs") {
        newState[reportIndex][details].splice(detailIndex - 1, 1);
        newState[reportIndex][details].splice(detailIndex - 2, 1);
      }
      // document.querySelector("#selected-reports-section").scrollIntoView();
      return newState;
    });
  };

  const addDetail = (reportIndex, detailName, name, reportName) => {
    //////////console.log("for detail", reportIndex, detailName);
    //////////console.log("for detail", reportIndex, detailName);
    setReportsState((prevState) => {
      const newState = [...prevState];
      const report = newState[reportIndex];

      // newState[reportIndex][detailName] = [
      //   ...newState[reportIndex][detailName],
      //   // reportName === "IP Logs" ? [{},{},{}] : {}
      //   // detailName === "accountNumberDetails" ||
      //   // detailName === "PANdetails" ||
      //   // detailName === "RRNdetails" ||
      //   // detailName === "CRNdetails" ||
      //   // detailName === "creditCardDetails" ||
      //   // detailName === "debitCardDetails" ||
      //   // detailName === "mobileNoDetails" ||
      //   // detailName === "emailDetails" ||
      //   // detailName === "aadharDetails"
      //   // ?
      //   reportName === "IP Logs"
      //     ? [
      //         {
      //           name: name,
      //           accountNo: "",
      //           aadhar: "",
      //           crnNo: "",
      //           fromDate: "",
      //           toDate: "",
      //           rrn: "",
      //           panNo: "",
      //           debitCard: "",
      //           creditCardNo: "",
      //           email: "",
      //           amount: "",
      //           mobileNo: "",
      //           req_status: "In-progress",
      //           type: reportName === "Statement in PDF/Excel" ? "" : "excel",
      //           filePath: "",
      //           subRequest: "IPLastLogin",
      //         },
      //         {
      //           name: name,
      //           accountNo: "",
      //           aadhar: "",
      //           crnNo: "",
      //           fromDate: "",
      //           toDate: "",
      //           rrn: "",
      //           panNo: "",
      //           debitCard: "",
      //           creditCardNo: "",
      //           email: "",
      //           amount: "",
      //           mobileNo: "",
      //           req_status: "In-progress",
      //           type: reportName === "Statement in PDF/Excel" ? "" : "excel",
      //           filePath: "",
      //           subRequest: "IPLogTxn",
      //         },
      //         {
      //           name: name,
      //           accountNo: "",
      //           aadhar: "",
      //           crnNo: "",
      //           fromDate: "",
      //           toDate: "",
      //           rrn: "",
      //           panNo: "",
      //           debitCard: "",
      //           creditCardNo: "",
      //           email: "",
      //           amount: "",
      //           mobileNo: "",
      //           req_status: "In-progress",
      //           type: reportName === "Statement in PDF/Excel" ? "" : "excel",
      //           filePath: "",
      //           subRequest: "IPLogUpi",
      //         },
      //       ]
      //     : {
      //         name: name,
      //         accountNo: "",
      //         aadhar: "",
      //         crnNo: "",
      //         fromDate: "",
      //         toDate: "",
      //         rrn: "",
      //         panNo: "",
      //         debitCard: "",
      //         creditCardNo: "",
      //         email: "",
      //         amount: "",
      //         mobileNo: "",
      //         req_status: "In-progress",
      //         type: reportName === "Statement in PDF/Excel" ? "" : "excel",
      //         filePath: "",
      //       },
      // ];

      if (reportName === "IP Logs") {
        newState[reportIndex][detailName].push({
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
          countryCode: "91",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
          subRequest: "IPLastLogin",
        });

        newState[reportIndex][detailName].push({
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
          countryCode: "91",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
          subRequest: "IPLogTxn",
        });

        newState[reportIndex][detailName].push({
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
          countryCode: "91",
          mobileNo: "",
          req_status: "In-progress",
          type: reportName === "Statement in PDF/Excel" ? "" : "excel",
          filePath: "",
          subRequest: "IPLogUpi",
        });
      } else {
        newState[reportIndex][detailName].push({
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
        });
      }

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
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].accountNo = value;
          newState[reportIndex][detailName][detailIndex - 2].accountNo = value;
        }
        newState[reportIndex][detailName][detailIndex].accountNo = value;
      }

      if (detailName === "PANdetails") {
        newState[reportIndex][detailName][detailIndex].panNo = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].panNo = value;
          newState[reportIndex][detailName][detailIndex - 2].panNo = value;
        }
      }

      if (detailName === "CRNdetails") {
        newState[reportIndex][detailName][detailIndex].crnNo = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].crnNo = value;
          newState[reportIndex][detailName][detailIndex - 2].crnNo = value;
        }
      }

      if (detailName === "RRNdetails") {
        newState[reportIndex][detailName][detailIndex].rrn = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].rrn = value;
          newState[reportIndex][detailName][detailIndex - 2].rrn = value;
        }
      }

      if (detailName === "aadharDetails") {
        newState[reportIndex][detailName][detailIndex].aadhar = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].aadhar = value;
          newState[reportIndex][detailName][detailIndex - 2].aadhar = value;
        }
      }

      if (detailName === "emailDetails") {
        newState[reportIndex][detailName][detailIndex].email = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].email = value;
          newState[reportIndex][detailName][detailIndex - 2].email = value;
        }
      }

      if (detailName === "creditCardDetails") {
        newState[reportIndex][detailName][detailIndex].creditCardNo = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].creditCardNo =
            value;
          newState[reportIndex][detailName][detailIndex - 2].creditCardNo =
            value;
        }
      }

      if (detailName === "debitCardDetails") {
        newState[reportIndex][detailName][detailIndex].debitCard = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].debitCard = value;
          newState[reportIndex][detailName][detailIndex - 2].debitCard = value;
        }
      }

      if (detailName === "mobileNoDetails") {
        newState[reportIndex][detailName][detailIndex].mobileNo = value;
        if (reportName === "IP Logs") {
          newState[reportIndex][detailName][detailIndex - 1].mobileNo = value;
          newState[reportIndex][detailName][detailIndex - 2].mobileNo = value;
        }
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

  const handleCountryCode = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      const report = newState[reportIndex][detail];

      const newMobileNum0 = report[detailIndex].mobileNo.replace(
        report[detailIndex].countryCode,
        ""
      );
      const newMobileNum1 = report[detailIndex].mobileNo.replace(
        report[detailIndex - 1].countryCode,
        ""
      );
      const newMobileNum2 = report[detailIndex].mobileNo.replace(
        report[detailIndex - 2].countryCode,
        ""
      );

      report[detailIndex].countryCode = value;
      report[detailIndex - 1].countryCode = value;
      report[detailIndex - 2].countryCode = value;

      // if (report[detailIndex].mobileNo.length >= 10) {
      report[detailIndex].mobileNo = value + newMobileNum0;
      report[detailIndex - 1].mobileNo = value + newMobileNum1;
      report[detailIndex - 2].mobileNo = value + newMobileNum2;
      // }
      return newState;
    });
  };

  const handleMobileNoValue = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      const report = newState[reportIndex][detail];

      report[detailIndex].mobileNo = value;
      report[detailIndex - 1].mobileNo = value;
      report[detailIndex - 2].mobileNo = value;

      // if (value.length >= 10) {
      report[detailIndex].mobileNo =
        report[detailIndex].countryCode +
        value.replace(report[detailIndex].countryCode, "");
      report[detailIndex - 1].mobileNo =
        report[detailIndex - 1].countryCode +
        value.replace(report[detailIndex - 1].countryCode, "");
      report[detailIndex - 2].mobileNo =
        report[detailIndex - 2].countryCode +
        value.replace(report[detailIndex - 2].countryCode, "");
      // }
      return newState;
    });
  };

  const handleNewMobileNo = (reportIndex, detailIndex, detail) => {
    console.log("New params", reportIndex, detailIndex, detail);
    setReportsState((prevState) => {
      const newState = [...prevState];
      const report = newState[reportIndex][detail];

      // if (value.length >= 10) {
      report[detailIndex].mobileNo =
        report[detailIndex].countryCode + report[detailIndex].mobileNo;
      report[detailIndex - 1].mobileNo =
        report[detailIndex - 1].countryCode + report[detailIndex].mobileNo;
      report[detailIndex - 2].mobileNo =
        report[detailIndex - 2].countryCode + report[detailIndex].mobileNo;
      // }
      return newState;
    });
  };

  // const completeMobileNo = (value, reportIndex, detailIndex, detail) => {
  //   setReportsState((prevState) => {
  //     const newState = [...prevState];
  //     const report = newState[reportIndex][detail];

  //     report[detailIndex].mobileNo =
  //       report[detailIndex].countryCode + report[detailIndex].mobileNo;
  //     report[detailIndex - 1].mobileNo =
  //       report[detailIndex - 1].countryCode + report[detailIndex - 1].mobileNo;
  //     report[detailIndex - 2].mobileNo =
  //       report[detailIndex - 2].countryCode + report[detailIndex - 2].mobileNo;

  //     return newState;
  //   });
  // };

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

  //////////console.log('ULTIMATE',reportsState);

  const handleFromDate = (
    date,
    reportIndex,
    detailIndex,
    detail,
    to,
    reportName
  ) => {
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

    //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);
    //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //////////console.log("time2");
        //////////console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        return prevState;
      }

      if (formatted_date === "01-01-1970") {
        ////console.log("Clear Date");
        newState[reportIndex][detail][detailIndex].fromDate = "";
        if (reportName === "IP Logs") {
          newState[reportIndex][detail][detailIndex - 1].fromDate = "";
          newState[reportIndex][detail][detailIndex - 2].fromDate = "";
        }
      } else {
        ////console.log("Set Date");
        newState[reportIndex][detail][detailIndex].fromDate = formatted_date;
        if (reportName === "IP Logs") {
          newState[reportIndex][detail][detailIndex - 1].fromDate =
            formatted_date;
          newState[reportIndex][detail][detailIndex - 2].fromDate =
            formatted_date;
        }
      }

      return newState;
    });
  };

  const handleToDate = (
    date,
    reportIndex,
    detailIndex,
    detail,
    from,
    reportName
  ) => {
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

    // //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);
    // //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //////////console.log("time2");
        //////////console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        return prevState;
      }

      if (formatted_date === "01-01-1970") {
        ////console.log("Clear Date");
        newState[reportIndex][detail][detailIndex].toDate = "";
        if (reportName === "IP Logs") {
          newState[reportIndex][detail][detailIndex - 1].toDate = "";
          newState[reportIndex][detail][detailIndex - 2].toDate = "";
        }
      } else {
        ////console.log("Set Date");
        newState[reportIndex][detail][detailIndex].toDate = formatted_date;
        if (reportName === "IP Logs") {
          newState[reportIndex][detail][detailIndex - 1].toDate =
            formatted_date;
          newState[reportIndex][detail][detailIndex - 2].toDate =
            formatted_date;
        }
      }

      return newState;
    });
  };

  const handleDate = (
    date,
    reportIndex,
    detailIndex,
    detail,
    to,
    reportName
  ) => {
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

    //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);
    //////////console.log(formatted_date);
    // //////////console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //////////console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //////////console.log("time2");
        //////////console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //////////console.log("time3");
        return prevState;
      }

      if (formatted_date === "01-01-1970") {
        ////console.log("Clear Date");
        newState[reportIndex][detail][detailIndex].fromDate = "";
      } else {
        ////console.log("Set Date");
        newState[reportIndex][detail][detailIndex].fromDate = formatted_date;
      }

      return newState;
    });
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      const queried_reports = requiredReportsData.filter((report) =>
        report.toLowerCase().includes(searchInput.toLowerCase().trim())
      );
      setSearchedReports(queried_reports);
    }
  }, [searchInput]);

  // useEffect(() => {
  //   setReportsState(prevState => {
  //     const newState = [...prevState]
  //     const IPLOGS = newState.filter(state => state.selectedReport === "IP Logs");

  //     //console.log("NEW STATE",IPLOGS);

  //     IPLOGS

  //     return newState;
  //   })

  // },[reportsState]);

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
          detailIndex === 0
            ? reportName ===
                "Beneficiary details for Single IMPS transactions" ||
              reportName === "Beneficiary details for Single UPI transactions"
              ? "0rem"
              : "2rem"
            : "2.35rem"
        }
        key={detailIndex}
        display={
          (reportName === "IP Logs" && detail.subRequest === "IPLastLogin") ||
          (reportName === "IP Logs" && detail.subRequest === "IPLogTxn")
            ? "none"
            : "flex"
        }
        data-testid={`detail-fieldset-${detailIndex}`}
      >
        {/* {//////////console.log(detailsArray, reportIndex, detailName, param, reportName)} */}

        <FormControl
          variant="outlined"
          margin="none"
          className={
            reportName === "IP Logs"
              ? // (detail.name === "Mobile No." ? "mobile-input-iplogs" :
                "primary-input-iplogs"
              : "primary-input"
          }
        >
          <TextField
            sx={
              (detail.name === "Account number" &&
                detail.accountNo.length > 0) ||
              (detail.name === "Email ID" && detail.email.length > 0) ||
              (detail.name === "PAN" && detail.panNo.length > 0) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length > 0) ||
              (detail.name === "Aadhar" && detail.aadhar.length > 0) ||
              (detail.name === "Debit Card" && detail.debitCard.length > 0) ||
              (detail.name === "Mobile No." && detail.mobileNo.length > 0) ||
              (detail.name === "RRN" && detail.rrn.length > 0) ||
              (detail.name === "CRN" && detail.crnNo.length > 0)
                ? inputControl.validatedTextfield
                : inputControl.textfield
            }
            data-testid={`detail-name-input-${detailIndex}`}
            //             helperText={
            //               (detail.name === "Account number" &&
            //                 detail.accountNo.length < 16) ||
            //               (detail.name === "Email ID" && detail.email.length < 12) ||
            //               (detail.name === "PAN" && detail.panNo.length < 10) ||
            //               (detail.name === "Credit Card" &&
            //                 detail.creditCardNo.length < 16) ||
            //               (detail.name === "Aadhar" && detail.aadhar.length < 12) ||
            //               (detail.name === "Debit Card" && detail.debitCard.length < 16) ||
            //               (detail.name === "Mobile No." && detail.mobileNo.length < 10) ||
            //               (detail.name === "RRN" && detail.rrn.length < 12) ||
            //               (detail.name === "CRN" && detail.crnNo.length < 10)
            //                 ? warningHelperText(
            //                     `
            //                     ${t("only")}

            //                     ${
            //                       detail.name === "Account number"
            //                         ? 16
            //                         : detail.name === "Email ID"
            //                         ? "12-320"
            //                         : detail.name === "PAN"
            //                         ? 10
            //                         : detail.name === "Credit Card"
            //                         ? 16
            //                         : detail.name === "Aadhar"
            //                         ? 12
            //                         : detail.name === "Debit Card"
            //                         ? 16
            //                         : detail.name === "Mobile No."
            //                         ? 10
            //                         : detail.name === "RRN"
            //                         ? 12
            //                         : detail.name === "CRN"
            //                         ? 10
            //                         : 0
            //                     }   ${t("characters")}
            // `,
            //                     1
            //                   )
            //                 : validatedDetail()
            //             }
            InputLabelProps={
              (detail.name === "Account number" &&
                detail.accountNo.length < 1) ||
              (detail.name === "Email ID" && detail.email.length < 1) ||
              (detail.name === "PAN" && detail.panNo.length < 1) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length < 1) ||
              (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
              (detail.name === "Debit Card" && detail.debitCard.length < 1) ||
              (detail.name === "Mobile No." && detail.mobileNo.length < 1) ||
              (detail.name === "RRN" && detail.rrn.length < 1) ||
              (detail.name === "CRN" && detail.crnNo.length < 1)
                ? inputControl.inputLabelProps
                : inputControl.validatedInputLabelProps
            }
            InputProps={{
              startAdornment: reportName === "IP Logs" &&
                detail.name === "Mobile No." && (
                  <>
                    <InputLabel
                      htmlFor="cc-selectbox"
                      variant="outlined"
                      className={
                        detail.mobileNo === ""
                          ? "mobile-label"
                          : "valid-mobile-label"
                      }
                    >
                      {detail.name}
                    </InputLabel>
                    <FormControl
                      className="cc-dropdown"
                      sx={{
                        width:
                          detail.countryCode.length === 5
                            ? "51%"
                            : detail.countryCode.length === 3
                            ? "42%"
                            : detail.countryCode.length === 2
                            ? "36%"
                            : "32%",
                      }}
                      size="medium"
                    >
                      <Select
                        id="cc-dropdown"
                        value={detail.countryCode}
                        label="Code"
                        data-testid={`cc-dropdown-${detailIndex}`}
                        displayEmpty
                        onChange={(e) =>
                          handleCountryCode(
                            e.target.value,
                            reportIndex,
                            detailIndex,
                            detailName
                          )
                        }
                        // sx={
                        //   detail.countryCode === ""
                        //     ? SelectProps.countryProps
                        //     : SelectProps.validatedCountryProps
                        // }
                        input={<OutlinedInput fullWidth={true} />}
                        IconComponent={(props) => (
                          <KeyboardArrowDownOutlinedIcon {...props} />
                        )}
                        renderValue={(code) => `+${code}`}
                        MenuProps={SelectProps.CC_SELECT_PROPS}
                        inputProps={{ "aria-label": "Country Code Dropdown" }}
                        autoWidth={false}
                        variant="outlined"
                        style={{
                          // fontSize: "0.88rem",
                          color:
                            // detail.countryCode === ""
                            //   ? "rgba(0, 0, 0, 0.49)"

                            // :
                            "black",
                          boxShadow: "none",
                        }}
                        className="cc-selectbox"
                        placeholder="CC"
                      >
                        {countryCodes.map((code, codeIndex) => (
                          <MenuItem
                            key={codeIndex}
                            data-testid={`cc-menuitem`}
                            value={code.phone}
                            className="cc-menuitem"
                          >
                            <ListItemText
                              primary={`${code.phone} ${code.name}`}
                              color="black"
                              inputMode="text"
                              primaryTypographyProps={{ fontSize: "0.825rem" }}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                ),
            }}
            required
            inputProps={{
              style: {
                fontSize: "0.88rem",
                height: "0.6rem",
              },
              //   maxLength:
              //     detail.name === "Account number"
              //       ? 16
              //       : detail.name === "Email ID"
              //       ? 320
              //       : detail.name === "PAN"
              //       ? 10
              //       : detail.name === "Credit Card"
              //       ? 16
              //       : detail.name === "Aadhar"
              //       ? 12
              //       : detail.name === "Debit Card"
              //       ? 16
              //       : detail.name === "Mobile No."
              //       ? 10
              //       : detail.name === "RRN"
              //       ? 12
              //       : detail.name === "CRN"
              //       ? 10
              //       : 0,
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
                ? reportName === "IP Logs"
                  ? detail.mobileNo.replace(detail.countryCode, "")
                  : detail.mobileNo
                : detail.name === "RRN"
                ? detail.rrn
                : detail.name === "CRN"
                ? detail.crnNo
                : ""
            }
            id="paramvalue"
            placeholder={
              // reportName === "IP Logs" &&
              // detail.name === "Mobile No." &&
              // detail.countryCode === ""
              //   ? "Select Country Code"
              //   :
              `Enter ${detail.name}`
            }
            autoComplete="off"
            // style={{
            //   margin: "0rem 0rem 0rem 0rem",
            //   fontSize: "0.88rem",
            // }}
            label={
              reportName === "IP Logs" && detail.name === "Mobile No."
                ? ""
                : detail.name
            }
            // FormHelperTextProps={{ sx: { color: "rgb(95, 105, 91)" } }}
            margin="none"
            onChange={(e) => {
              if (reportName === "IP Logs" && detail.name === "Mobile No.") {
                handleMobileNoValue(
                  e.target.value,
                  reportIndex,
                  detailIndex,
                  detailName
                );
              } else {
                handleInputValue(
                  e.target.value,
                  reportIndex,
                  detailIndex,
                  detailName,
                  reportName,
                  detailsArray
                );
              }
            }}
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
          reportName === "IP Logs" ||
          reportName === "Statement in PDF/Excel" ||
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions" ||
          (detailName === "RRNdetails" &&
            reportName === "Beneficiary details for Bulk IMPS transactions") ||
          (detailName === "RRNdetails" &&
            reportName ===
              "Beneficiary details for Bulk UPI transactions")) && (
          <Box className="detail-datepickers">
            <Box flex={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  index={detailIndex}
                  className="date-picker"
                  data-testid={`from-date-${detailIndex}`}
                  shouldDisableDate={(day) =>
                    disableInvalidDates(day, detail.toDate, detail.toDate)
                  }
                  label={t("from")}
                  // disabled={
                  //   (detail.name === "Account number" &&
                  //     detail.accountNo.length < 1) ||
                  //   (detail.name === "Email ID" && detail.email.length < 1) ||
                  //   (detail.name === "PAN" && detail.panNo.length < 1) ||
                  //   (detail.name === "Credit Card" &&
                  //     detail.creditCardNo.length < 1) ||
                  //   (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
                  //   (detail.name === "Debit Card" &&
                  //     detail.debitCard.length < 1) ||
                  //   (detail.name === "Mobile No." &&
                  //     detail.mobileNo.length < 1) ||
                  //   (detail.name === "RRN" && detail.rrn.length < 1) ||
                  //   (detail.name === "CRN" && detail.crnNo.length < 1)
                  //     ? true
                  //     : false
                  // }
                  value={
                    detail.fromDate === ""
                      ? null
                      : dayjs(detail.fromDate, "DD-MM-YYYY")
                  }
                  maxDate={maxDate}
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
                      detail.toDate,
                      reportName
                    )
                  }
                />
                {/* {
                  // detail.fromDate !== "" ? datePickerHelper("Dated") :
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
                          detail.email.length > 02 &&
                          detail.email.length <= 320) ||
                        (detail.name === "PAN" && detail.panNo.length === 10) ||
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
                    ? datePickerHelper()
                    : ""
                } */}
              </LocalizationProvider>
            </Box>

            <Box flex={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  className="date-picker"
                  label={t("to")}
                  // disabled={
                  //   (detail.name === "Account number" &&
                  //     detail.accountNo.length < 1) ||
                  //   (detail.name === "Email ID" && detail.email.length < 1) ||
                  //   (detail.name === "PAN" && detail.panNo.length < 1) ||
                  //   (detail.name === "Credit Card" &&
                  //     detail.creditCardNo.length < 1) ||
                  //   (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
                  //   (detail.name === "Debit Card" &&
                  //     detail.debitCard.length < 1) ||
                  //   (detail.name === "Mobile No." &&
                  //     detail.mobileNo.length < 1) ||
                  //   (detail.name === "RRN" && detail.rrn.length < 1) ||
                  //   (detail.name === "CRN" && detail.crnNo.length < 1)
                  //     ? true
                  //     : false
                  // }
                  value={
                    detail.toDate === ""
                      ? null
                      : dayjs(detail.toDate, "DD-MM-YYYY")
                  }
                  defaultValue={dayjs.Dayjs}
                  maxDate={maxDate}
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
                      detail.fromDate,
                      reportName
                    )
                  }
                />
                {/* {
                  // detail.fromDate !== "" ? datePickerHelper("Dated") :
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
                          detail.email.length > 02 &&
                          detail.email.length <= 320) ||
                        (detail.name === "PAN" && detail.panNo.length === 10) ||
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
                    ? datePickerHelper("Dated")
                    : ""
                } */}
              </LocalizationProvider>
            </Box>
          </Box>
        )}

        {reportName === "IP Logs" && (
          <FormControl
            variant="outlined"
            margin="none"
            size="small"
            className="iplogs-mobileno-input"
            data-testid={`iplogs-mobileno-input-${detailIndex}`}
          >
            {detail.name === "Mobile No." ? (
              <></>
            ) : (
              <TextField
                // disabled={detail.countryCode === ""}
                size="small"
                sx={
                  detail.mobileNo.length > 1
                    ? inputControl.validatedTextfield
                    : inputControl.textfield
                }
                data-testid={`mobileno-input-${detailIndex}`}
                InputLabelProps={
                  detail.mobileNo.length > 1
                    ? inputControl.validatedInputLabelProps
                    : inputControl.inputLabelProps
                }
                fullWidth={false}
                inputProps={{
                  style: {
                    fontSize: "0.88rem",
                    height: "0.6rem",

                    // marginLeft : "3rem"
                  },
                  // maxLength: 10,
                }}
                placeholder={
                  // detail.countryCode === ""
                  //   ? "Select Country Code"
                  //   :
                  "Enter Mobile No."
                }
                className="number-box"
                value={detail.mobileNo.replace(detail.countryCode, "")}
                autoComplete="off"
                // label="Mobile No."

                margin="none"
                onChange={(e) => {
                  handleMobileNoValue(
                    e.target.value,
                    reportIndex,
                    detailIndex,
                    detailName,
                    reportName
                  );
                }}
                type="tel"
                inputMode="tel"
                // type="text"
                // inputMode="text"
                color="primary"
                InputProps={{
                  startAdornment: (
                    <>
                      <InputLabel
                        htmlFor="cc-selectbox"
                        variant="outlined"
                        className={
                          detail.mobileNo === ""
                            ? "mobile-label"
                            : "valid-mobile-label"
                        }
                        // color={detail.mobileNo === "" ? "grey" : "green"}
                      >
                        Mobile No.
                      </InputLabel>
                      <FormControl
                        className="cc-dropdown"
                        sx={{
                          width:
                            detail.countryCode.length === 5
                              ? "80%"
                              : detail.countryCode.length === 3
                              ? "62%"
                              : detail.countryCode.length === 2
                              ? "54%"
                              : "48%",
                        }}
                        size="medium"
                      >
                        <Select
                          id="cc-dropdown"
                          value={detail.countryCode}
                          label="Code"
                          data-testid={`cc-dropdown-${detailIndex}`}
                          displayEmpty
                          onChange={(e) => {
                            handleCountryCode(
                              e.target.value,
                              reportIndex,
                              detailIndex,
                              detailName
                            );

                            // if(detail.mobileNo.length === 10){
                            // handleNewMobileNo(
                            //   reportIndex,
                            //   detailIndex,
                            //   detailName,
                            // )
                            // }
                          }}
                          sx={SelectProps.validatedContainerProps}
                          input={<OutlinedInput fullWidth={true} />}
                          IconComponent={(props) => (
                            <KeyboardArrowDownOutlinedIcon {...props} />
                          )}
                          renderValue={(code) =>
                            // detail.countryCode === "" ? "CC"
                            // :
                            `+${code}`
                          }
                          MenuProps={SelectProps.CC_SELECT_PROPS}
                          inputProps={{ "aria-label": "Country Code Dropdown" }}
                          autoWidth={false}
                          variant="outlined"
                          style={{
                            // fontSize: "0.88rem",
                            color:
                              // detail.countryCode === ""
                              //   ? "rgba(0, 0, 0, 0.49)"
                              //   :
                              "black",
                            boxShadow: "none",
                            paddingLeft: 0,
                          }}
                          className="cc-selectbox"
                          placeholder="CC"
                        >
                          {countryCodes.map((code, codeIndex) => (
                            <MenuItem
                              key={codeIndex}
                              data-testid={`cc-menuitem`}
                              value={code.phone}
                              className="cc-menuitem"
                            >
                              <ListItemText
                                primary={`${code.phone} ${code.name}`}
                                color="black"
                                inputMode="text"
                                primaryTypographyProps={{
                                  fontSize: "0.825rem",
                                }}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  ),
                }}
              />
            )}
            {/* {handleNewMobileNo(
            reportIndex,
            detailIndex,
            detailName
          )} */}
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
                className="single-rrn-field"
              >
                <TextField
                  sx={
                    detail.amount.length > 0
                      ? inputControl.validatedTextfield
                      : inputControl.textfield
                  }
                  data-testid={`amount-detail-${detailIndex}`}
                  InputLabelProps={
                    detail.amount.length > 0
                      ? inputControl.validatedInputLabelProps
                      : inputControl.inputLabelProps
                  }
                  inputProps={{
                    style: {
                      fontSize: "0.88rem",
                      height: "0.6rem",
                    },
                    // maxLength: 6,
                  }}
                  placeholder="Enter Amount"
                  // disabled={
                  //   detail.rrn === "" || detail.rrn.length === 0 ? true : false
                  // }
                  className="selected-param-box-3"
                  value={detail.amount.length === 0 ? "" : detail.amount}
                  // helperText={
                  //   detail.rrn.length < 12
                  //     ? ""
                  //     : detail.rrn.length === 12 && detail.amount.length === 0
                  //     ? t("ifNeededAmountMustBe")
                  //     : validatedDetail()
                  // }
                  autoComplete="off"
                  // FormHelperTextProps={{ sx: { color: "rgb(95, 105, 91)" } }}
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

              <Box flex={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD-MM-YYYY"
                    label={t("date")}
                    data-testid={`rrn-datepicker-${detailIndex}`}
                    // disabled={
                    //   detail.rrn === "" || detail.rrn.length === 0
                    //     ? true
                    //     : false
                    // }
                    value={
                      detail.fromDate === ""
                        ? null
                        : dayjs(detail.fromDate, "DD-MM-YYYY")
                    }
                    defaultValue={dayjs.Dayjs}
                    maxDate={maxDate}
                    slotProps={
                      detail.fromDate === ""
                        ? datePickerControl.slotProps
                        : datePickerControl.validatedSlotProps
                    }
                    sx={datePickerControl.sx}
                    onChange={(date) =>
                      handleDate(
                        date,
                        reportIndex,
                        detailIndex,
                        detailName,
                        detail.toDate,
                        reportName
                      )
                    }
                  />
                  {/* {detail.fromDate !== ""
                    ? datePickerHelper()
                    : detail.rrn.length === 12
                    ? customFormText(t("ifNeededSelectDate"), "grey", 1)
                    : detail.fromDate === "" && detail.rrn.length === 12
                    ? customFormText(t("ifNeededSelectDate"), "grey", 1)
                    : ""} */}
                </LocalizationProvider>
              </Box>
            </Box>
          )}

        {reportName === "Statement in PDF/Excel" && (
          <FormControl className="report-type-dropdown" size="medium">
            <Select
              id="report-type-dropdown"
              value={detail.type}
              label="Type"
              data-testid={`type-dropdown-${detailIndex}`}
              displayEmpty
              // disabled={
              //   (detail.name === "Account number" &&
              //     detail.accountNo.length < 1) ||
              //   (detail.name === "Email ID" && detail.email.length < 1) ||
              //   (detail.name === "PAN" && detail.panNo.length < 1) ||
              //   (detail.name === "Credit Card" &&
              //     detail.creditCardNo.length < 1) ||
              //   (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
              //   (detail.name === "Debit Card" &&
              //     detail.debitCard.length < 1) ||
              //   (detail.name === "Mobile No." && detail.mobileNo.length < 1) ||
              //   (detail.name === "RRN" && detail.rrn.length < 1) ||
              //   (detail.name === "CRN" && detail.crnNo.length < 1)
              //     ? true
              //     : false
              // }
              onChange={(e) =>
                handleReportType(
                  e.target.value.toLowerCase(),
                  reportIndex,
                  detailIndex,
                  detailName
                )
              }
              sx={
                detail.type === ""
                  ? SelectProps.containerProps
                  : SelectProps.validatedContainerProps
              }
              input={<OutlinedInput fullWidth={true} />}
              IconComponent={(props) => (
                <KeyboardArrowDownOutlinedIcon {...props} />
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
              inputProps={{ "aria-label": "Report Type Dropdown" }}
              autoWidth={false}
              style={{
                // fontSize: "0.88rem",
                color: detail.type === "" ? "rgba(0, 0, 0, 0.49)" : "black",
              }}
              className="report-type-selectbox"
              placeholder={t("type")}
            >
              {availableReportTypes.map((type, typeIndex) => (
                <MenuItem
                  key={type}
                  data-testid={`type-dropdown-menuitem-${typeIndex}`}
                  value={type}
                  className="type-dropdown-menuitem"
                >
                  <ListItemText
                    primary={type}
                    color="black"
                    inputMode="text"
                    primaryTypographyProps={{ fontSize: "0.825rem" }}
                  />
                </MenuItem>
              ))}
            </Select>
            {/* {(detail.name === "Account number" &&
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
              ? customFormText(
                  "select report type",
                  "rgba(92, 84, 112, 0.75)",
                  1
                )
              : datePickerHelper()} */}
          </FormControl>
        )}

        {reportName === "IP Logs" && detailIndex === 2 && (
          <Box className="iplog-void-button"></Box>
        )}

        {detailIndex < reportsState[reportIndex][detailName].length && (
          <Button
            className="add-remove-button"
            data-testid={`delete-button-${detailIndex}`}
            disabled={
              reportName === "IP Logs" && detailIndex < 3
                ? true
                : reportsState[reportIndex][detailName].length === 1
                ? true
                : false
            }
            style={{
              marginLeft:
                reportName ===
                  "Beneficiary details for Single IMPS transactions" ||
                reportName === "Beneficiary details for Single UPI transactions"
                  ? "4.4%"
                  : "0%",
              opacity:
                reportName === "IP Logs" && detailIndex < 3
                  ? 0.25
                  : reportsState[reportIndex][detailName].length === 1
                  ? 0.25
                  : 1,
            }}
            onClick={() =>
              deleteDetail(reportIndex, detailIndex, detailName, reportName)
            }
          >
            <RemoveCircleOutlineRoundedIcon
              className="remove-icon"
              fontSize="2.35rem"
            />
          </Button>
        )}

        {detailIndex === reportsState[reportIndex][detailName].length - 1 && (
          <Button
            className="add-remove-button"
            data-testid={`add-button-${detailIndex}`}
            style={{
              opacity:
                (detail.name === "Account number" &&
                  detail.accountNo.length < 1) ||
                (detail.name === "Email ID" && detail.email.length < 1) ||
                (detail.name === "PAN" && detail.panNo.length < 1) ||
                (detail.name === "Credit Card" &&
                  detail.creditCardNo.length < 1) ||
                (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
                (detail.name === "Debit Card" && detail.debitCard.length < 1) ||
                (detail.name === "Mobile No." && detail.mobileNo.length < 1) ||
                (detail.name === "RRN" && detail.rrn.length < 1) ||
                (detail.name === "CRN" && detail.crnNo.length < 1) ||
                detail.type === ""
                  ? 0.25
                  : 1,
            }}
            disabled={
              (detail.name === "Account number" &&
                detail.accountNo.length < 1) ||
              (detail.name === "Email ID" && detail.email.length < 1) ||
              (detail.name === "PAN" && detail.panNo.length < 1) ||
              (detail.name === "Credit Card" &&
                detail.creditCardNo.length < 1) ||
              (detail.name === "Aadhar" && detail.aadhar.length < 1) ||
              (detail.name === "Debit Card" && detail.debitCard.length < 1) ||
              (detail.name === "Mobile No." && detail.mobileNo.length < 1) ||
              (detail.name === "RRN" && detail.rrn.length < 1) ||
              (detail.name === "CRN" && detail.crnNo.length < 1) ||
              detail.type === ""
                ? true
                : false
            }
            onClick={() =>
              addDetail(reportIndex, detailName, param, reportName)
            }
          >
            <AddCircleOutlineRoundedIcon
              className="add-icon"
              fontSize="2.25rem"
            />
          </Button>
        )}
      </Box>
    ));

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
            <Box
              className="preview-data"
              justifyContent="space-evenly"
              display={
                (reportName === "IP Logs" &&
                  detail.subRequest === "IPLastLogin") ||
                (reportName === "IP Logs" && detail.subRequest === "IPLogTxn")
                  ? "none"
                  : "flex"
              }
            >
              <Box
                className="detail-input"
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
              >
                <Typography sx={previewProps.name} component="span">{`${
                  detail.name === "Account number" ? "Acc no." : detail.name
                }  : `}</Typography>
                {/* {detail.name === "Email ID" ? ( */}
                <InputBase
                  readOnly={true}
                  multiline={true}
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
                  className="preview-email"
                />
                {/* ) : (
                  <Typography sx={previewProps.value} component="span">
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
                  </Typography>
                )} */}
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
                <Box className="detail-range">
                  <Box className="preview-range">
                    <Typography sx={previewProps.name} component="span">
                      Date :{" "}
                    </Typography>
                  </Box>

                  <Typography sx={previewProps.value} component="span">
                    {detail.fromDate !== ""
                      ? `${detail.fromDate} - `
                      : `___________ - `}
                  </Typography>

                  <Typography sx={previewProps.value} component="span">
                    {detail.toDate !== "" ? `${detail.toDate}` : `____________`}
                  </Typography>
                </Box>
              )}

              {reportName === "Device details" && (
                <Box className="detail-range">
                  {/* <Box className="preview-range">
                 
                 </Box> */}
                </Box>
              )}

              {((detailName === "RRNdetails" &&
                reportName ===
                  "Beneficiary details for Single IMPS transactions") ||
                (detailName === "RRNdetails" &&
                  reportName ===
                    "Beneficiary details for Single UPI transactions")) && (
                <Box className="detail-range">
                  <Box className="rrn-preview-2">
                    <Typography sx={previewProps.name} component="span">
                      Amount :{" "}
                    </Typography>

                    <Typography sx={previewProps.value} component="span">
                      {detail.amount.length === 0 ? "0" : detail.amount}
                    </Typography>
                  </Box>

                  {/* {detail.fromDate !== "" && ( */}
                  <Box className="rrn-preview-2">
                    <Typography sx={previewProps.name} component="span">
                      Date :{" "}
                    </Typography>

                    <Typography sx={previewProps.value} component="span">
                      {detail.fromDate !== ""
                        ? `${detail.fromDate}`
                        : `___________`}
                    </Typography>
                  </Box>
                  {/* )} */}
                </Box>
              )}

              {reportName === "IP Logs" && (
                <Box className="mobileno-preview">
                  {detail.name === "Mobile No." ? (
                    <>
                      {/* <Typography
                        marginLeft="1rem"
                        sx={previewProps.name}
                        component="span"
                      >
                        Mobile No. :{" "}
                      </Typography>

                      <Typography sx={previewProps.value} component="span">
                        {detail.mobileNo}
                      </Typography> */}
                    </>
                  ) : (
                    <>
                      <Typography
                        marginLeft="1rem"
                        sx={previewProps.name}
                        component="span"
                      >
                        Mobile No. :{" "}
                      </Typography>

                      <Typography sx={previewProps.value} component="span">
                        {detail.mobileNo}
                      </Typography>
                    </>
                  )}
                </Box>
              )}

              {reportName !== "IP Logs" &&
                reportName !== "Statement in PDF/Excel" && (
                  <Box className="mobileno-preview"></Box>
                )}

              {reportName === "Statement in PDF/Excel" && (
                <Box className="type-preview">
                  <Typography
                    sx={previewProps.name}
                    marginLeft="1rem"
                    component="span"
                  >
                    Type :{" "}
                  </Typography>
                  <Typography sx={previewProps.value} component="span">
                    {detail.type === ""
                      ? ""
                      : detail.type === "pdf"
                      ? "PDF"
                      : detail.type === "excel"
                      ? "Excel"
                      : ""}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    ));

  //////////console.log("ticket number length", ticketNumber);

  const [reportDetails, setReportDetails] = useState([]);

  // const [deviceDetails, setDeviceDetails] = useState([]);
  // const [ipLogs, setIpLogs] = useState([]);

  useEffect(() => {
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

      return updatedReportState;
    });
  }, [reportsState]);

  // useEffect(() => {
  //   setReportDetails(prevState => )
  //   const ipLogReport = reportDetails.filter(reportDetail => reportDetail.reportType === "IP Logs")
  //   console.log("IP LOG filter",ipLogReport);

  // });

  // const individualReportHandler = (updatedReportState) => {

  // };

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
            detail.accountNo.length > 1 && detail.type !== ""
        )) ||
      (state.PANdetails.length > 0 &&
        state.PANdetails.every(
          (detail, subIndex) => detail.panNo.length > 1 && detail.type !== ""
        )) ||
      (state.CRNdetails.length > 0 &&
        state.CRNdetails.every(
          (detail, subIndex) => detail.crnNo.length > 1 && detail.type !== ""
        )) ||
      (state.RRNdetails.length > 0 &&
        state.RRNdetails.every(
          (detail, subIndex) => detail.rrn.length > 1 && detail.type !== ""
        )) ||
      (state.aadharDetails.length > 0 &&
        state.aadharDetails.every(
          (detail, subIndex) => detail.aadhar.length > 1 && detail.type !== ""
        )) ||
      (state.mobileNoDetails.length > 0 &&
        state.mobileNoDetails.every(
          (detail, subIndex) => detail.mobileNo.length > 1 && detail.type !== ""
        )) ||
      (state.creditCardDetails.length > 0 &&
        state.creditCardDetails.every(
          (detail, subIndex) =>
            detail.creditCardNo.length > 1 && detail.type !== ""
        )) ||
      (state.debitCardDetails.length > 0 &&
        state.debitCardDetails.every(
          (detail, subIndex) =>
            detail.debitCard.length > 1 && detail.type !== ""
        )) ||
      (state.emailDetails.length > 0 &&
        state.emailDetails.every(
          (detail, subIndex) => detail.email.length > 1 && detail.type !== ""
        ))
  );

  // const deviceDetailsPayload = {
  //   // ticketId: "",
  //   ticketNumber: ticketNumber,
  //   ticketDescription: ticketDescription,
  //   status: "In-progress",
  //   createdDate: currentDate,
  //   createdBy: Creator,
  //   reportDetails: deviceDetails,
  // };

  const createRequestPayload = {
    // ticketId: "",
    ticketNumber: ticketNumber,
    ticketDescription: ticketDescription,
    status: "In-progress",
    createdDate: currentDate,
    // createdBy: Creator,
    createdBy: "User",
    reportDetails: reportDetails,
  };

  const handleSubmit = () => {
    if (isValidReportData === false) {
      displayToast(
        "All Mandatory Fields must be non-empty!",
        3000,
        "aquamarine",
        "black",
        500
      );
    } else {
      ////console.log("Payload", createRequestPayload);
      //Submit API Function

      //Error Block
      // displayToast("Error Submitting Request",3200,"red","white",600);

      // SuccessBlock

      setSubmitted(true);
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

  // ////////console.log("Valid Report Data", isValidReportData);
  console.log("Spring Boot Payload", reportDetails);
  //console.log("Triple Reports State", reportsState);

  //////console.log("Create Request Details array", createRequestPayload);
  //////console.log("Device Details Array", deviceDetails);

  const dynamicReports =
    searchInput.length === 0 ? requiredReportsData : searchedReports;

  ////console.log("Selected Reports", selectedReports, selectedReports.length);

  return (
    <Provider store={store}>
      <Typography component="span" fontWeight={500} fontSize="1.36rem">
        {t("createRequest")}
      </Typography>
      <Box className="page" data-testid="create-request-page">
        <Box className="create-request-screen">
          <Box
            className="ticket-entry-section"
            minHeight={loading === true ? "10.275rem" : "auto"}
          >
            {loading === true ? (
              <Loader />
            ) : (
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
                        ticketNumber.length > 1
                          ? inputControl.validatedTextfield
                          : inputControl.textfield
                      }
                      // helperText={
                      //   ticketNumber.length < 10
                      //     ? warningHelperText(t("only10Characters"), 1)
                      //     : validatedDetail()
                      // }
                      InputLabelProps={
                        ticketNumber.length > 1
                          ? inputControl.validatedInputLabelProps
                          : inputControl.inputLabelProps
                      }
                      // FormHelperTextProps={{
                      //   sx: { color: "rgb(95, 105, 91)" },
                      // }}
                      inputProps={{
                        style: {
                          fontSize: "0.88rem",
                          height: "0.6rem",
                        },
                        // maxLength: 10,
                      }}
                      data-testid="ticket-num-input"
                      placeholder={t("enterTicketNo")}
                      className="ticket-number-input"
                      value={ticketNumber}
                      autoComplete="off"
                      size="medium"
                      // style={{
                      //   margin: "0rem 0rem 0rem 0rem",
                      //   height: "auto",
                      //   fontSize: "0.88rem",
                      // }}
                      label={t("ticketNo")}
                      margin="none"
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
                      // FormHelperTextProps={{
                      //   sx: { color: "rgb(95, 105, 91)" },
                      // }}
                      // helperText={
                      //   ticketNumber.length < 10
                      //     ? ""
                      //     : ticketNumber.length === 10 &&
                      //       ticketDescription.length === 0
                      //     ?
                      //     warningHelperText(t("only1060Characters"), 1)
                      //     : ticketDescription.length < 10
                      //     ? warningHelperText(t("only1060Characters"), 1)
                      //     : validatedDetail()
                      // }
                      required
                      label={t("ticketDesc")}
                      onFocus={() => {
                        setDescriptionFocused(true);
                      }}
                      onBlur={() => setDescriptionFocused(false)}
                      multiline
                      sx={
                        ticketDescription.length > 1
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
                        ticketDescription.length > 1
                          ? inputControl.validatedTextAreaLabelProps
                          : inputControl.textAreaLabelProps
                      }
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
                      // disabled={ticketNumber.length < 1 ? true : false}
                      color="primary"
                      value={ticketDescription}
                      data-testid="ticket-descr-input"
                      onChange={(e) => setTicketDescription(e.target.value)}
                    />
                  </FormControl>
                </Box>

                <FormControl className="reports-box">
                  <Select
                    label="Reports Selection Dropdown"
                    name="reports-selection-dropdown"
                    id="reports-selection-dropdown"
                    data-testid="reports-selection-dropdown"
                    multiple={true}
                    value={selectedReports}
                    displayEmpty
                    // disabled={
                    //   ticketNumber.length < 1 || ticketDescription.length < 1
                    //     ? true
                    //     : false
                    // }
                    onChange={(event) => {
                      if (
                        event.target.value !== undefined ||
                        event.target.value !== ""
                      ) {
                        handleReportSelection(event);
                      }
                    }}
                    // variant="standard"
                    input={<OutlinedInput fullWidth />}
                    IconComponent={(props) => (
                      <KeyboardArrowDownOutlinedIcon
                        className="select-icon"
                        {...props}
                      />
                    )}
                    renderValue={(reports) => {
                      if (reports.length === 0) {
                        return (
                          <Typography
                            component="span"
                            fontSize="95%"
                            color="silver"
                            data-testid="reports-dropdown-input-initial"
                          >
                            {" "}
                            {t("statementsReportRequire")}
                          </Typography>
                        );
                      }
                      return (
                        <Input
                          className="reports-dropdown-input-changed"
                          disableUnderline={true}
                          value={reports
                            .filter((report) => report !== undefined)
                            .join(" , ")}
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
                    MenuProps={{
                      autoFocus: false,
                      ...SelectProps.REPORT_SELECT_PROPS,
                    }}
                    autoWidth={false}
                    className="reports-dropdown-box"
                    placeholder={t("statementsReportRequire")}
                  >
                    {/* <MenuItem> */}
                    <Box
                      className="reports-search"
                      data-testid="reports-search"
                    >
                      <SearchIcon className="request-search-icon" />
                      <FormControl fullWidth variant="outlined">
                        <InputBase
                          disableUnderline
                          type="search"
                          autoFocus
                          fullWidth
                          inputMode="text"
                          data-testid="reports-search-input"
                          value={searchInput}
                          placeholder="Search Report"
                          className="request-search-input"
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                          }}
                        ></InputBase>
                      </FormControl>
                    </Box>
                    {/* </MenuItem> */}

                    {dynamicReports.map((report, index) => (
                      <MenuItem
                        key={report}
                        value={report}
                        data-testid={`reports-selection-dropdown-menu-item-${index}`}
                        className="reports-selection-dropdown-menu-item"
                      >
                        <Checkbox
                          size="medium"
                          className="checkbox"
                          data-testid={`reports-checkbox`}
                          icon={
                            <CheckBoxOutlineBlankIcon className="uncheck-icon" />
                          }
                          checkedIcon={
                            <CheckBoxOutlinedIcon className="check-icon" />
                          }
                          checked={selectedReports.indexOf(report) > -1}
                          color="primary"
                          value={report}
                        />
                        <ListItemText
                          primary={report}
                          data-testid="reports-menu-listext"
                          className="reports-menu-listext"
                          // color="black"
                          inputMode="text"
                          primaryTypographyProps={{ fontSize: "0.825rem" }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {selectedReports.length > 0
                    ? datePickerHelper("Selected")
                    : ticketNumber.length === 0 ||
                      ticketDescription.length === 0
                    ? () => {}
                    : ticketNumber.length > 1 &&
                      ticketDescription.length > 1 &&
                      selectedReports.length === 0
                    ? customFormText(t("selectReports"))
                    : () => {}} */}
                </FormControl>
              </>
            )}
          </Box>

          {selectedReports.length > 0 && (
            <Box
              className="selected-reports-section"
              id="selected-reports-section"
              data-testid="selected-reports-section"
            >
              <Typography component="span" className="selected-section-heading">
                {" "}
                {t("selectedRequest")}
              </Typography>

              <Box>
                {reportsState.length > 0 &&
                  reportsState
                    .filter((request) => request.selectedReport !== undefined)
                    .map((request, reportIndex) => (
                      <Box
                        key={reportIndex}
                        className="selected-reports-content"
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
                          expanded={
                            reportsState[reportIndex]?.viewState === "Minimized"
                              ? false
                              : true
                          }
                        >
                          <AccordionSummary
                            className="selected-report-header"
                            expandIcon={
                              <ExpandCircleDownOutlinedIcon
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
                          >
                            <Typography
                              className="selected-report-heading"
                              component="span"
                            >
                              {request.selectedReport}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails
                            hidden={
                              reportsState[reportIndex]?.viewState ===
                              "Minimized"
                                ? true
                                : false
                            }
                            data-testid={`selected-report-detail-${reportIndex}`}
                            className="accordion-details"
                          >
                            <Box className="selected-report-details">
                              {reportsState[reportIndex] && (
                                <>
                                  <Box
                                    width="100%"
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
                                      // variant="standard"
                                      sx={{
                                        width:
                                          request.selectedReport === "IP Logs"
                                            ? "26.6%"
                                            : "28%",
                                        marginBottom:
                                          reportsState[reportIndex]
                                            .selectedParams.length === 0
                                            ? "1.36rem"
                                            : "0.75rem",
                                      }}
                                    >
                                      <Select
                                        label="Param Selection Dropdown"
                                        name="param-selection-dropdown"
                                        className="param-selection-dropdown"
                                        role="combobox"
                                        id="param-selection-dropdown"
                                        data-testid={`param-dropdown-${reportIndex}`}
                                        multiple={true}
                                        sx={
                                          reportsState[reportIndex]
                                            .selectedParams.length === 0
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
                                        onChange={(event) => {
                                          if (
                                            event.target.value !== undefined ||
                                            event.target.value !== ""
                                          ) {
                                            handleParamSelection(
                                              event,
                                              reportIndex,
                                              request.selectedReport
                                            );
                                          }
                                        }}
                                        // variant="standard"
                                        input={
                                          <OutlinedInput
                                            className="param-display"
                                            role="combobox"
                                            fullWidth={false}
                                          />
                                        }
                                        IconComponent={(props) => (
                                          <KeyboardArrowDownOutlinedIcon
                                            className="select-icon"
                                            {...props}
                                          />
                                        )}
                                        renderValue={(params) => {
                                          if (params.length === 0) {
                                            return (
                                              <Typography
                                                component="span"
                                                className="param-display-placeholder"
                                              >
                                                {t("selectDetails")}
                                              </Typography>
                                            );
                                          }
                                          return (
                                            <Input
                                              className="selected-params-display"
                                              disableUnderline={true}
                                              data-testid={`param-dropdown-input-${reportIndex}`}
                                              value={params
                                                .filter(
                                                  (param) => param !== undefined
                                                )
                                                .join(" , ")}
                                            ></Input>
                                          );
                                        }}
                                        MenuProps={{
                                          disableAutoFocus: true,
                                          ...SelectProps.PARAM_SELECT_PROPS,
                                        }}
                                        inputProps={{
                                          "aria-label": "Select Parameters",
                                        }}
                                        autoWidth={false}
                                        placeholder={t("selectDetails")}
                                      >
                                        {/* <MenuItem> */}
                                        <Box
                                          className="param-search"
                                          data-testid={`param-search-${reportIndex}`}
                                        >
                                          <SearchIcon className="param-search-icon" />
                                          <FormControl
                                            fullWidth
                                            variant="outlined"
                                          >
                                            <InputBase
                                              disableUnderline
                                              autoFocus
                                              type="search"
                                              fullWidth
                                              inputMode="text"
                                              data-testid={`param-search-input-${reportIndex}`}
                                              value={
                                                reportsState[reportIndex]
                                                  .searchQuery
                                              }
                                              placeholder="Search Parameter"
                                              className="param-search-input"
                                              onChange={(e) =>
                                                handleParamSearch(
                                                  e.target.value,
                                                  reportIndex
                                                )
                                              }
                                              onKeyDown={(e) =>
                                                e.stopPropagation()
                                              }
                                            ></InputBase>
                                          </FormControl>
                                        </Box>
                                        {/* </MenuItem> */}

                                        {availableParameters
                                          .filter((param) =>
                                            param
                                              .toLowerCase()
                                              .includes(
                                                reportsState[
                                                  reportIndex
                                                ].searchQuery
                                                  .toLowerCase()
                                                  .trim()
                                              )
                                          )
                                          .map((param, paramIndex) => (
                                            <MenuItem
                                              key={param}
                                              value={param}
                                              data-testid={`param-menuitem`}
                                              className="param-menu-item"
                                              role="option"
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
                                                data-testid={`param-checkbox`}
                                                className="param-checkbox"
                                                icon={
                                                  <CheckBoxOutlineBlankIcon className="uncheck-icon" />
                                                }
                                                checkedIcon={
                                                  <CheckBoxOutlinedIcon className="check-icon" />
                                                }
                                                value={param}
                                              />
                                              <ListItemText
                                                primary={param}
                                                className="param-menu-listext"
                                                data-testid={`param-listitemtext}`}
                                                color="black"
                                                inputMode="text"
                                                primaryTypographyProps={{
                                                  fontSize: "0.85rem",
                                                }}
                                              />
                                            </MenuItem>
                                          ))}
                                      </Select>
                                      {/* {reportsState[reportIndex].selectedParams
                                      .length === 0
                                      ? customFormText(
                                          "",
                                          "rgb(95, 105, 91)",
                                          1
                                        )
                                      : datePickerHelper("")} */}
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
                                      // marginBottom:
                                      //   reportsState[reportIndex].selectedParams
                                      //     .length === 0
                                      //     ? "1.5rem"
                                      //     : "2.25rem",
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
                                        reportsState[reportIndex]
                                          .mobileNoDetails,
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
                      className="submit-text"
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
                          className="preview-main-heading"
                          component="span"
                        >
                          {t("preview")}
                        </Typography>
                        <Button
                          title="Close Preview"
                          className="close-preview-button"
                          onClick={() => setViewPreview(false)}
                        >
                          <CloseOutlinedIcon
                            name="close-preview"
                            className="close-preview-icon"
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
                                <h3 className="preview-title">
                                  {request.selectedReport}
                                </h3>
                              </Box>

                              <Box className="preview-detail-section">
                                <Box
                                  className="preview-report-details"
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
