import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, createTheme, Input, ThemeProvider, AccordionSummary, MenuList, AccordionDetails } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Select from '@mui/material/Select';
import { Button } from '@mui/base/Button';
import { Modal } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox , { checkboxClasses } from '@mui/material/Checkbox';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Box, { boxClasses } from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import dayjs, { Dayjs } from "dayjs";
import Accordion from '@mui/material/Accordion';
import InputAdornment from '@mui/material/InputAdornment';
import { setRequestPayloads } from '../../Redux/csnsReducers';
import Fade from '@mui/material/Fade';

import { useTranslation } from "react-i18next";

// document.documentElement.style.setProperty('--rmsc-h', '48px');

export default function CreateRequest() {
  const { t } = useTranslation();

  const route_to = useNavigate();
  const dispatch = useDispatch();

  const [ticketNumber, setTicketNumber] = useState(0);
  const [ticketDescription, setTicketDescription] = useState("");
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [availableParameters, setAvailableParameters] = useState([
    "Account number",
    "CRN",
    "RRN",
    "PAN",
    "Aadhar",
    "Mobile No.",
    "Debit Card",
    "Credit Card",
    "Email ID",
  ]);

  // const new_date = new Date();
  // new_date.setDate(new_date.getDate()).toLocaleString("en-Us");

  const currentDate = dayjs(dayjs().format("DD-MM-YYYY"), "DD-MM-YYYY");
  const reduxDate = dayjs(new Date()).format("DD-MM-YYYY");
  console.log("Current Date", currentDate);

  const inputControl = {
    textfield : {
    '& .MuiOutlinedInput-root': {
     '& fieldset': {
    border: '1.25px solid rgba(76, 76, 76, 1)', 
    backgroundColor : 'transparent'
    },
    '&:hover fieldset': {
     border : "1.25px solid rgba(161, 161, 161, 1)",
     backgroundColor : 'transparent'
   },
   '&.Mui-focused fieldset': {
    border: '1.65px solid rgb(131, 131, 210)',
    backgroundColor : 'transparent'
   },
  }
 },
 inputProps : {  
  style : {
    fontSize : "1vw",
    height : '0.6rem',
    // backgroundColor : "blue"
  }
 },
 inputLabelProps : {
    // shrink : true,
    size:'small',
    sx : {
      fontSize : "1vw",
      alignSelf : "center",
      display : 'flex',
      alignItems:'center',
      height : "58%",
    }
  },
  textAreaProps : {  
    style : {
      fontSize : "1vw",
      minHeight : "1.65rem",
    }
   },
  textAreaLabelProps : {
    // shrink : true,
    size:'small',
    sx : {
      fontSize : "1vw",
      paddingTop : '0.15rem',
      alignSelf : "center",
      display : 'flex',
      alignItems:'center',
      height : 'auto'
    }
  }
};

const datePickerControl = {

  slotProps : {
    popper: {
      sx: {
        ".MuiPaper-root": { borderRadius : "10px",padding:0 },
        '&.MuiPickersPopper-root': { padding : 0 },
        ...{'& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'gray',color : "white" }},
      },
    },
  field : {
    readOnly : true,
  },
  openPickerIcon : {
    sx : {
      fontSize : "1.75vw"
    }
   },
  textField : {
    InputLabelProps:{
        sx : {
          fontSize : "1.1vw"
        }
    },
    color:'primary',
    size:'small',
    "aria-readonly":true,
    sx:{
      "& .MuiInputBase-input": {
       height:'1.575rem',
       width : 'auto',
       fontSize:"0.95vw"
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
       border: '1.25px solid rgba(76, 76, 76, 1)', 
       },
       '&:hover fieldset': {
        border : "1.25px solid rgba(161, 161, 161, 1)"
      },
      '&.Mui-focused fieldset': {
       border: '1.65px solid rgb(131, 131, 210)',
      },
     } 
    }
   }
  },

  sx : {
     backgroundColor : 'transparent'
    }
  }

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
                  value: "",
                  date: "Date",
                  name2: "Amount",
                  amount: "",
                  type: "Excel",
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

  // //console.log('Selected REPORTS : ',selectedReports);
  // //console.log('Selected REPORTS : ',selectedReports);

  const [reportsState, setReportsState] = useState([]);

  const requiredReportsData = [
    "Statement in PDF/Excel",
    "Beneficiary details for Single IMPS transactions",
    "Beneficiary details for Bulk IMPS transactions",
    "Beneficiary details for Single UPI transactions",
    "Beneficiary details for Bulk UPI transactions",
    "IP Logs",
    "Device details",
  ];
  // //console.log('selected reports : ',selectedReports);

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

  // //console.log('Final Selected',selectedParams);

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
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("loop4");
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("loop4");
        return prevState;
      }

      report.selectedParams =
        typeof value === "string" ? value.split(",") : value;

      //console.log("Part", value);
      //console.log("Part", value);

      // if(reportName === 'IP Logs' && params.some(param => param === 'Mobile No.')){
      //   params = [...params,{value : '6',label : 'Mobile No.'},{ value : '2',label : 'CRN' }]
      //   report.selectedParams = params;
      // };

      // if (
      //   reportName === "IP Logs" &&
      //   params.some((param) => param === "Mobile No.")
      // ) {
      //   const isCRNPresent = params.some((param) => param === "CRN");
      //   const isMobileNoPresent = params.some(
      //     (param) => param === "Mobile No."
      //   );

      //   if (!isCRNPresent || !isMobileNoPresent) {
      //     const newParams = [...params];

      //     if (!isMobileNoPresent) {
      //       newParams.push({ value: "6", label: "Mobile No." });
      //     }

      //     if (!isCRNPresent) {
      //       newParams.push({ value: "2", label: "CRN" });
      //     }

      //     report.selectedParams = newParams;
      //   }
      // }

      //console.log("PARAMS?", report.selectedParams);
      //console.log("PARAMS?", report.selectedParams);

      if (
        value.some((param) => param === "Account number") &&
        report.accountNumberDetails.length === 0
      ) {
        if (reportName === "Device details") {
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            type: "Excel",
          });
        } else if (reportName === "IP Logs") {
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (reportName === "Statement in PDF/Excel") {
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else {
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "PAN") &&
        report.PANdetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.PANdetails.push({
            name: "PAN",
            value: "",
            from: "From",
            to: "To",
            type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
          });
        } else if (reportName === "IP Logs") {
          report.PANdetails.push({
            name: "PAN",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.PANdetails.push({
            name: "PAN",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.PANdetails.push({
            name: "PAN",
            value: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "CRN") &&
        report.CRNdetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.CRNdetails.push({
            name: "CRN",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.CRNdetails.push({
            name: "CRN",
            value: "",
            from: "From",
            to: "To",
            name2: "Mobile No.",
            mobileno: "",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.CRNdetails.push({
            name: "CRN",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.CRNdetails.push({ name: "CRN", value: "", type: "Excel" });
        }
      }

      if (
        value.some((param) => param === "RRN") &&
        report.RRNdetails.length === 0
      ) {
        if (
          reportName === "Statement in PDF/Excel" ||
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.RRNdetails.push({
            name: "RRN",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.RRNdetails.push({
            name: "RRN",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.RRNdetails.push({
            name: "RRN",
            value: "",
            date: "Date",
            name2: "Amount",
            amount: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "Aadhar") &&
        report.aadharDetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "Email ID") &&
        report.emailDetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "Credit Card") &&
        report.creditCardDetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "Debit Card") &&
        report.debitCardDetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.debitCardDetails.push({
            name: "Debit Card",
            value: "",
            from: "From",
            to: "To",
            type: "Type",
          });
        } else if (reportName === "IP Logs") {
          report.debitCardDetails.push({
            name: "Debit Card",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.debitCardDetails.push({
            name: "PAN",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.debitCardDetails.push({
            name: "Debit Card",
            value: "",
            type: "Excel",
          });
        }
      }

      if (
        value.some((param) => param === "Mobile No.") &&
        report.mobileNoDetails.length === 0
      ) {
        if (
          reportName === "Statement in PDF/Excel" ||
          reportName === "IP Logs"
        ) {
          report.mobileNoDetails.push({
            name: "Mobile No.",
            from: "From",
            to: "To",
            value: "",
            type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
          });
        } else if (
          reportName === "Beneficiary details for Bulk IMPS transactions" ||
          reportName === "Beneficiary details for Bulk UPI transactions"
        ) {
          report.mobileNoDetails.push({
            name: "Mobile No.",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else {
          report.mobileNoDetails.push({
            name: "Mobile No.",
            value: "",
            type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
          });
        }
      }

      // if (
      //   reportName === "IP Logs" &&
      //   value.some(
      //     (param) =>
      //       param === "Mobile No." &&
      //       report.mobileNoDetails.length === 0 &&
      //       report.CRNdetails.length === 0
      //   )
      // ) {
      //   // report.CRNdetails.push({
      //   //   name: "CRN",
      //   //   value: "",
      //   //   from: "From",
      //   //   to: "To",
      //   //   type: "Excel",
      //   // });
      //   report.mobileNoDetails.push({
      //     name: "Mobile No.",
      //     value: "",
      //     type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
      //   });
      // }

      // document.querySelector('#selected-reports-section').scrollIntoView();

      // //console.log('New State',newState);
      return newState;
    });
  };

  const deleteDetail = (reportIndex, detailIndex, details) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][details].splice(detailIndex, 1);
      document.querySelector("#selected-reports-section").scrollIntoView();
      return newState;
    });
  };

  const addDetail = (reportIndex, detailName, name, reportName) => {
    //console.log("for detail", reportIndex, detailName);
    //console.log("for detail", reportIndex, detailName);
    setReportsState((prevState) => {
      const newState = [...prevState];

      if (
        reportName === "Statement in PDF/Excel" ||
        reportName === "Beneficiary details for Bulk IMPS transactions" ||
        reportName === "Beneficiary details for UPI IMPS transactions"
      ) {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "accountNumberDetails" ||
          detailName === "PANdetails" ||
          detailName === "RRNdetails" ||
          detailName === "CRNdetails" ||
          detailName === "creditCardDetails" ||
          detailName === "debitCardDetails" ||
          detailName === "mobileNoDetails" ||
          detailName === "emailDetails" ||
          detailName === "aadharDetails"
            ? { name: name, value: "", from: "From", to: "To", type: "Type" }
            : {},
        ];
      } else if (reportName === "IP Logs") {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "CRNdetails" ||
          detailName === "mobileNoDetails" ||
          detailName === "accountNumberDetails" ||
          detailName === "PANdetails" ||
          detailName === "mobileNoDetails" ||
          detailName === "emailDetails" ||
          detailName === "creditCardDetails" ||
          detailName === "debitCardDetails" ||
          detailName === "aadharDetails"
            ? {
                name: name,
                value: "",
                from: "From",
                to: "To",
                name2: "Mobile No.",
                mobileno: "",
                type: "Excel",
              }
            : {},
        ];
      } else if (
        reportName === "Beneficiary details for Bulk IMPS transactions"
      ) {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "RRNdetails"
            ? { name: name, value: "", from: "From", to: "To", type: "Excel" }
            : {},
        ];
      } else if (
        reportName === "Beneficiary details for Bulk UPI transactions"
      ) {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "RRNdetails"
            ? { name: name, value: "", from: "From", to: "To", type: "Excel" }
            : {},
        ];
      } else if (reportName === "Device details") {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "accountNumberDetails"
            ? { name: name, value: "", from: "From", to: "To", type: "Excel" }
            : {},
        ];
      } else {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "RRNdetails"
            ? {
                name: "RRN",
                value: "",
                date: "Date",
                name2: "Amount",
                amount: "",
                type: "Excel",
              }
            : detailName === "accountNumberDetails"
              ? { name: name, value: "", from: "From", to: "To", type: "Excel" }
              : detailName === "PANdetails" ||
                  detailName === "mobileNoDetails" ||
                  detailName === "CRNdetails" ||
                  detailName === "emailDetails" ||
                  detailName === "creditCardDetails" ||
                  detailName === "debitCardDetails" ||
                  detailName === "aadharDetails"
                ? { name: name, value: "", type: "Excel" }
                : {},
        ];
      }
      document.querySelector("#selected-reports-section").scrollIntoView();
      return newState;
    });
  };

  const handleInputValue = (
    value,
    reportIndex,
    detailIndex,
    detailName,
    reportName
  ) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detailName][detailIndex].value =
        detailName === "creditCardDetails" ||
        detailName === "aadharDetails" ||
        detailName === "debitCardDetails" ||
        detailName === "RRNdetails"
          ? parseInt(value, 10)
          : value;
      return newState;
    });
  };

  const handleMobileNoValue = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].mobileno = value;
      return newState;
    });
  };

  const handleAmountValue = (value, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].amount = parseInt(value, 10);
      return newState;
    });
  };

  const handleReportType = (values, reportIndex, detailIndex, detail) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][detail][detailIndex].type = values;
      return newState;
    });
  };

  //   const dateValidation = (date1, date2) => {
  //     // Parse the dates using dayjs
  //     const firstDate = dayjs(date1, 'DD-MM-YYYY');
  //     const secondDate = dayjs(date2, 'DD-MM-YYYY');

  //     //console.log('from',date1);
  //     //console.log('to',date2);

  //     if(secondDate.isBefore(firstDate)){
  //       return 'Wrong Date'
  //     } else if(secondDate.isAfter(firstDate)){
  //       return 'Right Date'
  //     } else {
  //       return 'Bad Date'
  //     }
  // };

  const disableInvalidDates = (day, to) => {
    return dayjs(day).isAfter(dayjs(to, "DD-MM-YYYY"), "day");
  };

  //console.log('ULTIMATE',reportsState);

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

    //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);
    //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //console.log("time2");
        //console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //console.log("time3");
        return prevState;
      }

      newState[reportIndex][detail][detailIndex].from = formatted_date;
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

    // //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);
    // //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("time1");
        //console.error("Report is undefined for index:", reportIndex);
        //console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        //console.log("time2");
        //console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        //console.error("Detail is undefined for detail index:", detailIndex);
        //console.log("time3");
        //console.error("Detail is undefined for detail index:", detailIndex);
        //console.log("time3");
        return prevState;
      }

      newState[reportIndex][detail][detailIndex].to = formatted_date;
      return newState;
    });
  };

  const handleDate = (date, reportIndex, detailIndex, detailName) => {
    //console.log("RRN date", date);
    //console.log("RRN reportIndex", reportIndex);
    //console.log("RRN detailIndex", detailIndex);
    //console.log("RRN Detail", detailName);
    //console.log("RRN date", date);
    //console.log("RRN reportIndex", reportIndex);
    //console.log("RRN detailIndex", detailIndex);
    //console.log("RRN Detail", detailName);
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

    // //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);
    // //console.log(formatted_date);
    // //console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      newState[reportIndex][detailName][detailIndex].date = formatted_date;

      //console.log("time4", date);
      //console.log("time4", date);
      return newState;
    });
  };

  const isValidReportData = reportsState.some((state,index) => state.accountNumberDetails).length >= 1 
  || reportsState.some((state,index) => state.PANdetails).length >= 1
  || reportsState.some((state,index) => state.CRNdetails).length >= 1
  || reportsState.some((state,index) => state.RRNdetails).length >= 1
  || reportsState.some((state,index) => state.aadharDetails).length >= 1
  || reportsState.some((state,index) => state.mobileNoDetails).length >= 1
  || reportsState.some((state,index) => state.creditCardDetails).length >= 1
  || reportsState.some((state,index) => state.debitCardDetails).length >= 1
  || reportsState.some((state,index) => state.emailDetails).length >= 1
  
  console.log('Valid Report Data',isValidReportData);

  const SelectProps = {
    REPORT_SELECT_PROPS : {
      PaperProps: {
        style: {
          maxHeight: '19.6rem',
          marginTop : "-0.5rem",
          boxShadow : "1px 2px 12px 0px rgba(0, 0, 0, 0.1)"
        }
      }
    },
    PARAM_SELECT_PROPS : {
      PaperProps: {
        style: {
          maxHeight: '9.36rem',
          marginTop : "-0.15rem",
        },
      },
      MenuListProps : {
        sx : {
          border : '1.5px solid rgba(161, 161, 161, 1)',
          margin : 0,
          borderTopLeftRadius:'0px',
          borderTopRightRadius:'0px',
          borderBottomLeftRadius:'4px',
          borderBottomRightRadius:'4px',
          padding : 0
        }
      }
    },  
    TYPE_SELECT_PROPS : {
      PaperProps: {
        style: {
          marginTop : "-0.5rem",
          boxShadow : "1px 2px 12px 0px rgba(0, 0, 0, 0.1)"
        },
      },
    }
  }

  const displayRequestedReports = (
    detailsArray,
    reportIndex,
    detailName,
    param,
    reportName
  ) =>
    detailsArray.map((detail, detailIndex) => (
      <Box className="selected-param-details" key={detailIndex}>
        {/* {//console.log(detailsArray, reportIndex, detailName, param, reportName)} */}
        <FormControl
          variant="outlined"
          margin="none"
          sx={{ width: reportName === "IP Logs" ? "25%" : "34%" }}
        >
          <TextField
            sx={inputControl.textfield}
            InputLabelProps={inputControl.inputLabelProps}
            InputProps={{
              startAdornment: detail.name === "Mobile No." && (
                <InputAdornment
                  variant="standard"
                  component="text"
                  position="start"
                >
                  <Typography sx={{ fontSize: "1vw" }}>+91</Typography>
                </InputAdornment>
              ),
            }}
            required
            inputProps={inputControl.inputProps}
            className="selected-param-box"
            value={
              (detail.name === "Credit Card" ||
                detail.name === "Aadhar" ||
                detail.name === "Debit Card" ||
                detail.name === "RRN") &&
              (detail.value === 0 || detail.value.length === 0)
                ? ""
                : (detail.name === "Credit Card" ||
                      detail.name === "Aadhar" ||
                      detail.name === "Debit Card" ||
                      detail.name === "RRN") &&
                    (detail.value !== 0 || detail.value.length !== 0)
                  ? parseInt(detail.value, 10)
                  : detail.value
            }
            id="paramvalue"
            placeholder={`Enter ${detail.name}`}
            onInput={(e) => {
              e.target.value = e.target.value.slice(
                0,
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
                                  : 0
              );
            }}
            autoComplete="off"
            style={{
              margin: "0vh 0vw 0vh 0vw",
              height: "5.5vh",
              fontSize: "1vw",
            }}
            label={detail.name}
            margin="none"
            onChange={(e) =>
              handleInputValue(
                e.target.value,
                reportIndex,
                detailIndex,
                detailName,
                reportName
              )
            }
            type={
              detail.name === "Account number"
                ? "text"
                : detail.name === "CRN"
                  ? "text"
                  : detail.name === "Email ID"
                    ? "email"
                    : detail.name === "PAN"
                      ? "text"
                      : detail.name === "Mobile No."
                        ? "tel"
                        : detail.name === "Credit Card"
                          ? "number"
                          : detail.name === "Aadhar"
                            ? "number"
                            : detail.name === "Debit Card"
                              ? "number"
                              : detail.name === "RRN"
                                ? "number"
                                : "text"
            }
            inputMode="numeric"
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
          <Box sx={{ display: "flex", flexDirection: "row", gap: "4.8%" }}>
            <Box sx={{ width: "auto" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  shouldDisableDate={(day) =>
                    disableInvalidDates(day, detail.to, detail.to)
                  }
                  label={t("from")}
                  disabled={
                    detail.value === "" || detail.value.length === 0
                      ? true
                      : false
                  }
                  value={
                    detail.from === "From"
                      ? null
                      : dayjs(detail.from, "DD-MM-YYYY")
                  }
                  maxDate={currentDate}
                  defaultValue={dayjs.Dayjs}
                  slotProps={datePickerControl.slotProps}
                  sx={datePickerControl.sx}
                  onChange={(date) =>
                    handleFromDate(
                      date,
                      reportIndex,
                      detailIndex,
                      detailName,
                      detail.to
                    )
                  }
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ width: "auto" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  label={t("to")}
                  disabled={detail.from === "From" ? true : false}
                  value={
                    detail.to === "To" ? null : dayjs(detail.to, "DD-MM-YYYY")
                  }
                  defaultValue={dayjs.Dayjs}
                  maxDate={currentDate}
                  shouldDisableDate={(day) =>
                    dayjs(day).isBefore(dayjs(detail.from, "DD-MM-YYYY"), "day")
                  }
                  slotProps={datePickerControl.slotProps}
                  sx={datePickerControl.sx}
                  onChange={(date) =>
                    handleToDate(
                      date,
                      reportIndex,
                      detailIndex,
                      detailName,
                      detail.from
                    )
                  }
                />
              </LocalizationProvider>
            </Box>
          </Box>
        )}

        {reportName === "IP Logs" && detailName !== "mobileNoDetails" && (
          <FormControl
            variant="outlined"
            margin="none"
            sx={{ width: "23%", marginLeft: "2%" }}
          >
            <TextField
              sx={inputControl.textfield}
              InputLabelProps={inputControl.inputLabelProps}
              inputProps={inputControl.inputProps}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ opacity: detail.to === "To" ? 0.45 : 1 }}
                  >
                    <Typography sx={{ fontSize: "1vw" }}>+91</Typography>
                  </InputAdornment>
                ),
              }}
              placeholder={`Enter ${detail.name2}`}
              className="number-box"
              value={detail.mobileno}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              autoComplete="off"
              style={{ height: "5.5vh", fontSize: "1vw" }}
              label={detail.name2}
              disabled={detail.to === "To" ? true : false}
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
              //     detail.mobileno === ''
              //       ? "rgba(128, 128, 128, 0.36)"
              //       : "rgba(128, 128, 128, 0.74)",
              //   borderWidth: "1px"}}
              type="tel"
              inputMode="tel"
              Input
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
                  sx={inputControl.textfield}
                  InputLabelProps={inputControl.inputLabelProps}
                  inputProps={inputControl.inputProps}
                  placeholder={`Enter ${detail.name2}`}
                  disabled={
                    detail.value === "" || detail.value.length === 0
                      ? true
                      : false
                  }
                  className="selected-param-box-3"
                  value={
                    detail.amount === 0 || detail.amount.length === 0
                      ? ""
                      : parseInt(detail.amount, 10)
                  }
                  autoComplete="off"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
                  style={{
                    margin: "0vh 0vw 0vh 0vw",
                    height: "5.5vh",
                    fontSize: "1vw",
                    width: "100%",
                  }}
                  label={detail.name2}
                  margin="none"
                  onChange={(e) =>
                    handleAmountValue(
                      e.target.value,
                      reportIndex,
                      detailIndex,
                      detailName
                    )
                  }
                  type="number"
                  inputMode="numeric"
                  color="primary"
                />
              </FormControl>

              <Box sx={{ width: "40%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD-MM-YYYY"
                    label={t("date")}
                    disabled={
                      detail.value === "" || detail.value.length === 0
                        ? true
                        : false
                    }
                    value={
                      detail.date === "Date"
                        ? null
                        : dayjs(detail.date, "DD-MM-YYYY")
                    }
                    defaultValue={dayjs.Dayjs}
                    maxDate={currentDate}
                    slotProps={datePickerControl.slotProps}
                    sx={datePickerControl.sx}
                    onChange={(date) =>
                      handleDate(date, reportIndex, detailIndex, detailName)
                    }
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          )}

        {reportName === "Statement in PDF/Excel" && (
          <FormControl
            variant="standard"
            sx={{ width: "14%", marginLeft: "2%" }}
          >
            <Select
              id="report-type-dropdown"
              value={detail.type}
              displayEmpty
              disabled={
                detail.value === "" || detail.value.length === 0 ? true : false
              }
              onChange={(e) =>
                handleReportType(
                  e.target.value,
                  reportIndex,
                  detailIndex,
                  detailName
                )
              }
              variant="standard"
              input={<OutlinedInput fullWidth={true} />}
              IconComponent={(props) => (
                <KeyboardArrowDownOutlinedIcon
                  className="reports-type-dropdownicon"
                  sx={{ fontSize: "1.48vw", color: "rgba(115, 115, 115, 1)" }}
                  {...props}
                />
              )}
              renderValue={(type) => type !== 'PDF' && type !== 'Excel' ? `${type} *` : type}
              MenuProps={SelectProps.TYPE_SELECT_PROPS}
              inputProps={{ "aria-label": "Without label" }}
              autoWidth={false}
              sx={{}}
          style={{ display:'flex',alignItems:'center',height : '2.65rem',fontSize : "1vw",color : detail.type === 'Type' ? 'rgba(0, 0, 0, 0.49)' : 'black'}}
              placeholder={t("type")}
            >
              {availableReportTypes.map((type) => (
                 <MenuItem key={type} value={type} style={{ display:'flex', border : "0px solid #cdcdcd", width : '6vw',height:'1.8rem',alignItems:'left',borderRadius : '4px', backgroundColor : "transparent"}}>

                  <ListItemText
                    primary={type}
                    style={{ padding: "0rem" }}
                    color="black"
                    inputMode="text"
                    primaryTypographyProps={{ fontSize: "0.95vw" }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {detailIndex === reportsState[reportIndex][detailName].length - 1 ||
        reportsState[reportIndex][detailName].length === 1 ? (
          <Button
            className="add-remove-button"
            style={{
              marginLeft:
                reportName === "IP Logs" && detailName === "mobileNoDetails"
                  ? "2%"
                  : "0%",
              opacity:
                detail.value === "" ||
                detail.value === 0 ||
                detail.type === "Type"
                  ? 0.5
                  : 1,
            }}
            disabled={
              detail.value === "" ||
              detail.value === 0 ||
              detail.type === "Type"
                ? true
                : false
            }
            onClick={() =>
              addDetail(reportIndex, detailName, param, reportName)
            }
          >
            <AddCircleOutlineRoundedIcon sx={{ color : 'red', alignSelf : "center",justifySelf : "center",fontSize:'2.65vw' }} />
          </Button>
        ) : (
          <Button
            className="add-remove-button"
            style={{
              marginLeft:
                reportName === "IP Logs" && detailName === "mobileNoDetails"
                  ? "2%"
                  : "0%",
            }}
            onClick={() => deleteDetail(reportIndex, detailIndex, detailName)}
          >
            <RemoveCircleOutlineRoundedIcon sx={{ color : 'red', alignSelf : "center",justifySelf : "center",fontSize:'2.65vw'}} />
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
        {/* { updateDetailed() } */}
        <Box className="preview-data">
          <Box
            className="detail-input"
            display={
              detail.value === "" ||
              detail.value === 0 ||
              detail.value.length === 0
                ? "none"
                : "block"
            }
          >
            <span className="preview-text">{`${detail.name}  : `}</span>
            <span className="preview-text">{detail.value}</span>
          </Box>

          {((detailName === "accountNumberDetails" &&
            reportName !== "Device details") ||
            (detailName === "CRNdetails" && reportName === "IP Logs") ||
            reportName === "IP Logs" ||
            reportName === "Statement in PDF/Excel" ||
            reportName === "Beneficiary details for Bulk IMPS transactions" ||
            reportName === "Beneficiary details for Bulk UPI transactions" ||
            (detailName === "RRNdetails" &&
              reportName ===
                "Beneficiary details for Bulk IMPS transactions") ||
            (detailName === "RRNdetails" &&
              reportName ===
                "Beneficiary details for Bulk UPI transactions")) && (
            <Box
              className="detail-range"
              display={detail.from !== "From" || detail.to !== "To"}
            >
              {detail.from !== "From" && (
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.25vw" }}
                >
                  <span className="preview-text">Date : </span>
                  <span className="preview-text">{`${detail.from} - `}</span>
                </Box>
              )}
              {detail.to !== "To" && (
                <span className="preview-text">{detail.to}</span>
              )}
            </Box>
          )}

          {((detailName === "RRNdetails" &&
            reportName ===
              "Beneficiary details for Single IMPS transactions") ||
            (detailName === "RRNdetails" &&
              reportName ===
                "Beneficiary details for Single UPI transactions")) && (
            <Box className="detail-range">
              {detail.amount !== 0 && detail.amount.length !== 0 && (
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.25vw" }}
                >
                  <span className="preview-text">Amount : </span>
                  <span className="preview-text">{detail.amount}</span>
                </Box>
              )}

              {detail.date !== "Date" && (
                <Box
                  sx={{ display: "flex", flexDirection: "row", gap: "0.25vw" }}
                >
                  <span style={{ marginLeft: "3vw" }} className="preview-text">
                    Date :{" "}
                  </span>
                  <span className="preview-text">{detail.date}</span>
                </Box>
              )}
            </Box>
          )}

          {reportName === "IP Logs" && detailName !== "mobileNoDetails" && (
            <Box
              display={
                detail.mobileno === "" || detail.mobileno.length === 0
                  ? "none"
                  : "block"
              }
            >
              <span style={{ marginLeft: "3vw" }} className="preview-text">
                Mobile No. :{" "}
              </span>
              <span className="preview-text">{detail.mobileno}</span>
            </Box>
          )}
        </Box>
      </Box>
    ));

  //console.log("ticket number length", ticketNumber);

  const responsePayload = {
    ticketNumber: ticketNumber,
    ticketDescription: ticketDescription,
    requestData: reportsState,
    createdDate: reduxDate,
  };

  const handleSubmit = () => {
    dispatch(setRequestPayloads(responsePayload));
    console.log("currentDate redux", currentDate);
    route_to("/ViewUpdate");
  };

  return (
    <Box className="page">
      <Box className="create-request-screen">
        <span style={{ fontWeight: "420", fontSize: "1.499vw" }}>
          {t("createRequest")}
        </span>

        <Box className="ticket-entry-section">
          <Box className="ticket-type-section">
            <FormControl
              variant="outlined"
              margin="none"
              className="ticket-number-container"
            >
              <TextField
                sx={inputControl.textfield}
                InputLabelProps={inputControl.inputLabelProps}
                inputProps={inputControl.inputProps}
                placeholder={t("enterTicketNo")}
                className="ticket-number-input"
                value={ticketNumber === 0 ? "" : ticketNumber}
                autoComplete="off"
                size="medium"
                style={{
                  margin: "0vh 0vw 0vh 0vw",
                  height: "auto",
                  fontSize: "1vw",
                }}
                label={t("ticketNo")}
                margin="dense"
                onChange={(e) => setTicketNumber(e.target.value)}
                type="number"
                required
                inputMode="numeric"
                fullWidth={true}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
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
                required
                label={t("ticketDesc")}
                onFocus={() => {
                  //console.log('desc length',ticketDescription.length);
                  //console.log('desc rows',Math.ceil(ticketDescription.length / 59));
                  setDescriptionFocused(true);
                }}
                onBlur={() => setDescriptionFocused(false)}
                multiline
                // multiline
                sx={inputControl.textfield}
                className="ticket-description-input"
                autoComplete="off"
                rows={Math.ceil(ticketDescription.length / 59)}
                size="small"
                fullWidth
                inputProps={inputControl.textAreaProps}
                InputLabelProps={inputControl.textAreaLabelProps}
                style={{
                  margin: "0vh 0vw 0vh 0vw",
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
                // onInput={(e) => e.target.value = e.target.value.slice(0, 59) }
                inputMode="text"
                disabled={
                  ticketNumber === 0 || ticketNumber.length === 0 ? true : false
                }
                color="primary"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              />
            </FormControl>
          </Box>

          <FormControl variant="standard" sx={{ width: "82.75%" }}>
            <Select
              labelId="reports-selection-dropdown-label"
              id="reports-selection-dropdown"
              multiple={true}
              value={selectedReports}
              displayEmpty
              disabled={
                ticketNumber === 0 || ticketDescription === "" ? true : false
              }
              onChange={handleReportSelection}
              variant="standard"
              input={<OutlinedInput fullWidth={true} />}
              IconComponent={(props) => (
                <KeyboardArrowDownOutlinedIcon
                  className="reports-type-dropdownicon"
                  sx={{ fontSize: "1.48vw", color: "rgba(115, 115, 115, 1)" }}
                  {...props}
                />
              )}
              renderValue={(reports) => {
                if (reports.length === 0) {
                  return (
                    <span style={{ opacity: 0.45 }}>
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
                      overflow: "hidden",
                    }}
                    disableUnderline={true}
                    value={reports.join(" , ")}
                  ></Input>
                );
              }}
              MenuProps={SelectProps.REPORT_SELECT_PROPS}
              inputProps={{ "aria-label": "Without label" }}
              autoWidth={false}
              style={{ display:'flex',alignItems:'center',height : '2.85rem',fontSize : "1vw"}}
              placeholder={t("statementsReportRequire")}
            >
              {requiredReportsData.map((report) => (
                 <MenuItem key={report} value={report} style={{ display:'flex', border : "1px solid #cdcdcd", width : '96.25%', margin:'1rem 0rem 1rem 1.4vw',height:'2.65rem',alignItems:'left',borderRadius : '4px', backgroundColor : "transparent",fontSize : "2px"}}>
                  <Checkbox
                    size="medium"
                    icon={
                      <CheckBoxOutlineBlankIcon sx={{ fontSize: "1.6vw" }} />
                    }
                    checkedIcon={
                      <CheckBoxOutlinedIcon
                        className="check-icon"
                        sx={{ fontSize: "1.6vw", color: "red" }}
                      />
                    }
                    sx={{ containIntrinsicSize: "2px" }}
                    checked={selectedReports.indexOf(report) > -1}
                    color="primary"
                    style={{
                      marginLeft: "-1vw",
                      backgroundColor: "transparent",
                      fontSize: "2px",
                    }}
                  />
                  <ListItemText primary={report} style={{ padding : "0.05rem 0rem 0rem 0rem"}} color="black" inputMode='text' primaryTypographyProps={{ fontSize : '0.95vw'}}  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedReports.length > 0 && (
          <Box
            className="selected-reports-section"
            id="selected-reports-section"
          >
            <h2 className="selected-reports-heading">
              {" "}
              {t("selectedRequest")}
            </h2>

            <Box>
              {reportsState.length > 0 &&
                reportsState.map((request, reportIndex) => (
                  <Box key={reportIndex} sx={{ marginTop : '0.25rem',marginBottom : "1.65rem" }}>
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
                       sx={{ minHeight : "2.5rem",maxHeight : "2.75rem"}}
                        expandIcon={
                          <ExpandCircleDownOutlinedIcon
                            sx={{
                              color: "rgba(95, 99, 104, 0.87)",
                              fontSize: "1.85vw",
                            }}
                            className="view-icon"
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
                        sx={{
                          padding : 0,
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
                                  sx={{ width: "34%" }}
                                >
                                  <Select
                                    labelId="param-selection-dropdown"
                                    id="param-selection-dropdown"
                                    multiple={true}
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
                                        fullWidth={false}
                                      />
                                    }
                                    sx={{
                                      "& .reports-type-dropdownicon": {
                                        paddingRight: "1.75rem",
                                      },
                                    }}
                                    IconComponent={(props) => (
                                      <KeyboardArrowDownOutlinedIcon
                                        className="reports-type-dropdownicon"
                                        sx={{
                                          fontSize: "1.56vw",
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
                                            overflow: "hidden",
                                          }}
                                          disableUnderline={true}
                                          value={params.join(" , ")}
                                        ></Input>
                                      );
                                    }}
                                    MenuProps={SelectProps.PARAM_SELECT_PROPS}
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    autoWidth={false}
                                    style={{ display:'flex',alignItems:'center',height : '2.69rem',fontSize : "1vw"}}
                                    placeholder={t("selectDetails")}
                                  >
                                    {availableParameters.map((param) => (
                                      <MenuItem
                                        key={param}
                                        value={param}
                                        style={{ display:'flex',borderStyle:'solid',borderColor : 'rgba(232, 232, 232, 1)',borderBottomWidth : "1.75px",height:'2.36rem',alignItems:'left',borderRadius : '0px', backgroundColor : "transparent",fontSize : "2px"}}
                                      >
                                        <Checkbox
                                          checked={
                                            reportsState[
                                              reportIndex
                                            ].selectedParams.indexOf(param) > -1
                                          }
                                          color="primary"
                                          style={{
                                            marginLeft: "-1vw",
                                            backgroundColor: "transparent",
                                          }}
                                          icon={
                                            <CheckBoxOutlineBlankIcon
                                              sx={{ fontSize: "1.6vw" }}
                                            />
                                          }
                                          checkedIcon={
                                            <CheckBoxOutlinedIcon
                                              className="check-icon"
                                              sx={{
                                                fontSize: "1.6vw",
                                                color: "red",
                                              }}
                                            />
                                          }
                                        />
                                        <ListItemText
                                          primary={param}
                                          style={{ padding : "0.15rem 0rem 0rem 0rem"}} 
                                          color="black"
                                          inputMode="text"
                                          primaryTypographyProps={{
                                            fontSize: "0.95vw",
                                          }}
                                        />
                                      </MenuItem>
                                    ))}
                                  </Select>
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
                                      ?'-1.25rem' : '1.5rem',
                                }}
                              >
                                {reportsState[reportIndex].selectedParams.some(
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
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "PAN"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].PANdetails,
                                    reportIndex,
                                    "PANdetails",
                                    "PAN",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "CRN"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].CRNdetails,
                                    reportIndex,
                                    "CRNdetails",
                                    "CRN",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "RRN"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].RRNdetails,
                                    reportIndex,
                                    "RRNdetails",
                                    "RRN",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "Aadhar"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].aadharDetails,
                                    reportIndex,
                                    "aadharDetails",
                                    "Aadhar",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "Email ID"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].emailDetails,
                                    reportIndex,
                                    "emailDetails",
                                    "Email ID",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "Credit Card"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].creditCardDetails,
                                    reportIndex,
                                    "creditCardDetails",
                                    "Credit Card",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
                                  (param) => param === "Debit Card"
                                ) &&
                                  displayRequestedReports(
                                    reportsState[reportIndex].debitCardDetails,
                                    reportIndex,
                                    "debitCardDetails",
                                    "Debit Card",
                                    request.selectedReport
                                  )}
                                {reportsState[reportIndex].selectedParams.some(
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
                  title="Submit"
                 
                  onClick={handleSubmit}
                >
                  {" "}
                  {t("submit")}
                </Button>
                <Button
                  className="preview-button"
                  disabled={isValidReportData === true ? false : true}
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
                  contentLabel="Preview Modal"
                >
                  <Box className="preview-box">
                    <Box className="preview-header">
                      <h2 className="preview-heading">{t("preview")} </h2>
                      <Button
                        style={{ background: "none", border: "none" }}
                        onClick={() => setViewPreview(false)}
                      >
                        <CloseOutlinedIcon
                          name="close-preview"
                          className="close-preview-button"
                          sx={{
                            fontSize: "1.85vw",
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
                              <CheckBoxOutlinedIcon
                                className="check-icon"
                                size="1.4vw"
                              />
                              <h3 className="preview-title">
                                {request.selectedReport}
                              </h3>
                            </Box>

                            <Box
                              className="preview-report-details"
                              
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
                                    reportsState[reportIndex].creditCardDetails,
                                    reportIndex,
                                    "creditCardDetails",
                                    "Credit Card",
                                    request.selectedReport
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].debitCardDetails,
                                    reportIndex,
                                    "debitCardDetails",
                                    "Debit Card",
                                    request.selectedReport
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].mobileNoDetails,
                                    reportIndex,
                                    "mobileNoDetails",
                                    "Mobile No.",
                                    request.selectedReport
                                  )}
                                </>
                              )}
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
  );
}
