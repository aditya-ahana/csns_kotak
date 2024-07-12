import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckSquare } from "react-icons/fa";
import { TextField,InputAdornment, createTheme, Input, ThemeProvider, AccordionSummary, MenuList } from '@mui/material';
import Fade from '@mui/material/Fade';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
// import { useDispatch, useSelector } from 'react-redux';
// import { setCreatedDate } from '../../Redux/reduxStore';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import dayjs, { Dayjs } from "dayjs";
import { Accordion } from "react-bootstrap";


// document.documentElement.style.setProperty('--rmsc-h', '48px');

export default function CreateRequest() {
  const route_to = useNavigate();
  // const dispatch = useDispatch();

  const [ticketNumber, setTicketNumber] = useState(0);
  const [ticketDescription, setTicketDescription] = useState("");
  const [ descriptionFocused , setDescriptionFocused ] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [viewPreview, setViewPreview] = useState(false);
  const [availableParameters, setAvailableParameters] = useState(["Account number", "CRN","RRN","PAN","Aadhar" ,"Mobile No.","Debit Card" ,"Credit Card" ,"Email ID"]);

  // const new_date = new Date();
  // new_date.setDate(new_date.getDate()).toLocaleString("en-Us");

  const currentDate = dayjs(dayjs().format('DD-MM-YYYY'),'DD-MM-YYYY');

  const inputControl = {
    textfield : {
    '& .MuiOutlinedInput-root': {
     '& fieldset': {
    border: '1.5px solid rgba(161, 161, 161, 0.6)', 
    },
    '&:hover fieldset': {
     border : "1.5px solid rgba(161, 161, 161, 1)"
   },
   '&.Mui-focused fieldset': {
    border: '2px solid rgb(131, 131, 210)',
   },
  }
 },
 inputProps : {  
  style : {
    fontSize : "1vw",
    height : '1.3vh',
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
      minHeight : "1.775vw",
      maxHeight : "auto",
      // backgroundColor : "blue"
    }
   },
  textAreaLabelProps : {
    // shrink : true,
    size:'small',
    sx : {
      fontSize : "1vw",
      paddingTop : '0.25vh',
      alignSelf : "center",
      display : 'flex',
      alignItems:'center',
      height : 'auto'
    }
  }
};

  // const currentDay = new Date(new_date)
  //   .toLocaleDateString("en-Us", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   })
  //   .split("/")
  //   .map((part, index, array) => (index < 2 ? array[1 - index] : part))
  //   .join("-");

  //   console.log('currentDay',currentDay);

  useEffect(() => {
    setReportsState((prevReportsState) => {
      const updatedReportState = selectedReports.map((report) => {
        const existingReport = prevReportsState.find(
          (existing) => existing.selectedReport === report
        );

        if(report === 'Beneficiary details for Single IMPS transactions' || report === 'Beneficiary details for Single UPI transactions'){

          return( 
            existingReport || {
            selectedReport: report,
            selectedParams: ["RRN"],
            accountNumberDetails: [],
            PANdetails: [],
            CRNdetails: [],
            RRNdetails: [{ name: "RRN", value: "", date: "Date", name2: "Amount", amount: "", type: "Excel" }],
            aadharDetails: [],
            emailDetails: [],
            creditCardDetails: [],
            debitCardDetails: [],
            mobileNoDetails: [],
            viewState : 'Expanded'
          })
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
            viewState : 'Expanded'
          }
        );
      }      
      });
      return updatedReportState;
    });
  }, [selectedReports]);

  // console.log('Selected REPORTS : ',selectedReports);

  const [reportsState, setReportsState] = useState([]);

  const requiredReportsData = ["Statement in PDF/Excel", "Beneficiary details for Single IMPS transactions", "Beneficiary details for Bulk IMPS transactions" ,"Beneficiary details for Single UPI transactions" , "Beneficiary details for Bulk UPI transactions" ,'IP Logs', "Device details" ];

  const [selectedParams, setSelectedParams] = useState(
    Array.from({ length: selectedReports.length }, () => [])
  );

  // console.log('selected reports : ',selectedReports);

  const availableReportTypes = [ "PDF","Excel" ];

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

  // console.log('Final Selected',selectedParams);


  const handleMinimizedView = (reportIndex) => {
    setReportsState(prevState => {
      const newState = [...prevState];
      newState[reportIndex].viewState = 'Minimized';
      return newState;
    })
  };

  const handleExpandedView = (reportIndex) => {
    setReportsState(prevState => {
      const newState = [...prevState];
      newState[reportIndex].viewState = 'Expanded';
      return newState;
    })
  };

  const handleReportSelection = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedReports(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    if (selectedReports.length > 1) {
      document.querySelector('#selected-reports-section').scrollIntoView();
    }
  }, [selectedReports.length]);

  const handleParamSelection = (event, reportIndex, reportName) => {
    setReportsState((prevState) => {
      const {
        target: { value },
      } = event;

      const newState = [...prevState];
      const report = newState[reportIndex];

      if (!report) {
        console.error("Report is undefined for index:", reportIndex);
        console.log("loop4");
        return prevState;
      }

      report.selectedParams = (typeof value === 'string' ? value.split(',') : value)

      console.log("Part", value);

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

      console.log("PARAMS?", report.selectedParams);

      if (
        value.some((param) => param === "Account number") &&
        report.accountNumberDetails.length === 0
      ) {
        if(reportName === "Device details"){
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            type: "Excel",
          });
        } else if (reportName === 'IP Logs') {
          report.accountNumberDetails.push({
            name: "Account number",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (reportName === 'Statement in PDF/Excel') {
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
      };

      if (
        value.some((param) => param === "PAN") &&
        report.PANdetails.length === 0
      ) {
        if(reportName === 'Statement in PDF/Excel'){
          report.PANdetails.push({
            name: "PAN",
            value: "",
            from: "From",
            to: "To",
            type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
          });
        } else if (reportName === 'IP Logs') {
          report.PANdetails.push({
            name: "PAN",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
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
          report.CRNdetails.push({ name: "CRN", value: "", from: "From",
            to: "To", type: "Type" });
        }
        else if (reportName === 'IP Logs') {
          report.CRNdetails.push({ name: "CRN", value: "",from: "From",to: "To",name2: "Mobile No.",mobileno: "", type: "Excel" });
        } 
        
        else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
          report.CRNdetails.push({
            name: "CRN",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });      
        }
               
        else {
          report.CRNdetails.push({ name: "CRN", value: "", type: "Excel" });
        }
      }

      if (value.some((param) => param === "RRN") &&
        report.RRNdetails.length === 0) {
          if (reportName === "Statement in PDF/Excel" || reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
            report.RRNdetails.push({ name: "RRN", value: "", from: "From",
              to: "To", type: "Type" });
          } else if (reportName === 'IP Logs') {
            report.RRNdetails.push({
              name: "RRN",
              value: "",
              name2: "Mobile No.",
              mobileno: "",
              from: "From",
              to: "To",
              type: "Excel",
            });
          }        
          else {
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
          report.aadharDetails.push({ name: "Aadhar", value: "", from: "From",
            to: "To", type: "Type" });
        } else if (reportName === 'IP Logs') {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } 
        
        else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
          report.aadharDetails.push({
            name: "Aadhar",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });      
        }
        
        else {
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
          report.emailDetails.push({ name: "Email ID", value: "", from: "From",
            to: "To", type: "Type" });
        } else if (reportName === 'IP Logs') {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } 

        else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
          report.emailDetails.push({
            name: "Email ID",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });      
        }
             
        else {
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
          report.creditCardDetails.push({ name: "Credit Card", value: "", from: "From",
            to: "To", type: "Type" });
        } else if (reportName === 'IP Logs') {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        } 

        else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
          report.creditCardDetails.push({
            name: "Credit Card",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });      
        }
        
        else {
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
          report.debitCardDetails.push({ name: "Debit Card", value: "", from: "From",
            to: "To", type: "Type" });
        } else if (reportName === 'IP Logs') {
          report.debitCardDetails.push({
            name: "Debit Card",
            value: "",
            name2: "Mobile No.",
            mobileno: "",
            from: "From",
            to: "To",
            type: "Excel",
          });
        }  
        
        else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
          report.debitCardDetails.push({
            name: "PAN",
            value: "",
            from: "From",
            to: "To",
            type: "Excel",
          });      
        }

        else {
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
        if(reportName === "Statement in PDF/Excel" || reportName === 'IP Logs'){
        report.mobileNoDetails.push({
          name: "Mobile No.",
          from : "From",
          to : 'To',
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      } 

      else if (reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") {
        report.mobileNoDetails.push({
          name: "Mobile No.",
          value: "",
          from: "From",
          to: "To",
          type: "Excel",
        });      
      }
      
      else {
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


        document.querySelector('#selected-reports-section').scrollIntoView();

      // console.log('New State',newState);
      return newState;
    });
  };

  const deleteDetail = (reportIndex, detailIndex, details) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][details].splice(detailIndex, 1);
      document.querySelector('#selected-reports-section').scrollIntoView();
      return newState;
    });
  };

  const addDetail = (reportIndex, detailName, name, reportName) => {
    console.log("for detail", reportIndex, detailName);
    setReportsState((prevState) => {
      const newState = [...prevState];

      if (reportName === "Statement in PDF/Excel" || reportName === 'Beneficiary details for Bulk IMPS transactions' || reportName === 'Beneficiary details for UPI IMPS transactions'){
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
      }
      
      else if (reportName === 'IP Logs'){
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "CRNdetails" || detailName === "mobileNoDetails" || detailName === "accountNumberDetails" || detailName === "PANdetails" || detailName === "mobileNoDetails" ||
          detailName === "emailDetails" || detailName === "creditCardDetails" ||
          detailName === "debitCardDetails" || detailName === "aadharDetails" ?  { name: name, value: "",from: "From",to: "To",name2: "Mobile No.",mobileno: "", type: "Excel" } : {} 
        ];
      } 
      
      else if (reportName === "Beneficiary details for Bulk IMPS transactions") {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
        detailName === 'RRNdetails' ? 
        { name: name, value: "", from: "From", to: "To", type: "Excel" } : {} 
      ];
      } 
      
      else if (reportName === "Beneficiary details for Bulk UPI transactions") {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
        detailName === 'RRNdetails' ? 
        { name: name, value: "", from: "From", to: "To", type: "Excel" } : {} 
        ];
      }

      else if (reportName === 'Device details') {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "accountNumberDetails" ? 
          { name: name, value: "", from: "From", to: "To", type: "Excel" } : {} 
        ];
      }

      else {
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
      document.querySelector('#selected-reports-section').scrollIntoView();
      return newState;
    });
  };

  const handleInputValue = (value, reportIndex, detailIndex, detailName,reportName) => {
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

//     console.log('from',date1);
//     console.log('to',date2);

//     if(secondDate.isBefore(firstDate)){
//       return 'Wrong Date'
//     } else if(secondDate.isAfter(firstDate)){
//       return 'Right Date'
//     } else {
//       return 'Bad Date'
//     }
// };

const disableInvalidDates = (day, to) => {
  return dayjs(day).isAfter(dayjs(to, 'DD-MM-YYYY'), 'day');
};

console.log('ULTIMATE',reportsState);

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

    console.log(formatted_date);
    // console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        console.error("Report is undefined for index:", reportIndex);
        console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        console.error("Detail is undefined for detail index:", detailIndex);
        console.log("time3");
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

    // console.log(formatted_date);
    // console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      if (!newState[reportIndex]) {
        console.error("Report is undefined for index:", reportIndex);
        console.log("time1");
        return prevState;
      }
      if (!newState[reportIndex][detail]) {
        console.log("time2");
        newState[reportIndex][detail] = [];
      }
      if (!newState[reportIndex][detail][detailIndex]) {
        console.error("Detail is undefined for detail index:", detailIndex);
        console.log("time3");
        return prevState;
      }

      newState[reportIndex][detail][detailIndex].to = formatted_date;
      return newState;
    });
  };

  const handleDate = (date, reportIndex, detailIndex, detailName) => {
    console.log("RRN date", date);
    console.log("RRN reportIndex", reportIndex);
    console.log("RRN detailIndex", detailIndex);
    console.log("RRN Detail", detailName);
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

    // console.log(formatted_date);
    // console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      newState[reportIndex][detailName][detailIndex].date = formatted_date;

      console.log("time4", date);
      return newState;
    });
  };

  const SelectProps = {
    REPORT_SELECT_PROPS : {
      PaperProps: {
        style: {
          maxHeight: '40.5vh',
          marginTop : "-1vh",
          width : "fit-content",
          resize : 'horizontal',
          boxShadow : "1px 2px 12px 0px rgba(0, 0, 0, 0.1)"
          // backgroundColor : "red"
        }
      }
    },
    PARAM_SELECT_PROPS : {
      PaperProps: {
        style: {
          maxHeight: '19.25vh',
          marginTop : "-0.49vh",
          overflow : "auto",
           width : "fit-content",
          // backgroundColor : "red"
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
          marginTop : "-1vh",
          boxShadow : "1px 2px 12px 0px rgba(0, 0, 0, 0.1)"
          // backgroundColor : "red"
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
        {/* {console.log(detailsArray, reportIndex, detailName, param, reportName)} */}
        <FormControl variant='outlined' margin='none' sx={{ width : reportName === 'IP Logs' ? '25%' : "34%"}}>
             {/* <InputLabel color='success' htmlFor='selected-param-box' style={{marginTop : '-0.4vh',fontSize : "1vw"}}>{detail.name}</InputLabel> */}
              <TextField       
                sx={inputControl.textfield} 
                InputLabelProps={inputControl.inputLabelProps}
                required
                inputProps={inputControl.inputProps}
                className="selected-param-box"
                value={
                  detail.name === "Credit Card" ||
                  detail.name === "Aadhar" ||
                  detail.name === "Debit Card" ||
                  detail.name === "RRN"
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
                            ? 14
                            : detail.name === "RRN"
                              ? 12
                              : detail.name === "CRN"
                                ? 10
                                : 0
                    );
                  
                }}
                autoComplete="off"
                style={{ margin : '0vh 0vw 0vh 0vw', height : '5.5vh',fontSize : '1vw'}}
                label={detail.name}
                margin='none'
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
                inputMode='numeric'
                InputAdornment={detail.name === "Mobile No." ? '+91' : ''}
                 color='primary'
               />
              </FormControl>

        {((detailName === "accountNumberDetails" && reportName !== "Device details") ||
          (detailName === "CRNdetails" && reportName === "IP Logs") || (reportName === "IP Logs") || (reportName === "Statement in PDF/Excel" || reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") ||
          (detailName === "RRNdetails" && reportName === "Beneficiary details for Bulk IMPS transactions") ||
          (detailName === "RRNdetails" && reportName === "Beneficiary details for Bulk UPI transactions")) && (
          <Box sx={{ display:"flex",flexDirection : "row",gap : '4.8%'}}>
      
      <Box sx={{ width : "auto"}}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        format="DD-MM-YYYY"
        shouldDisableDate={(day) => disableInvalidDates(day,detail.to, detail.to)}
        label='From'
        value={detail.from === 'From' ? null : dayjs(detail.from,'DD-MM-YYYY')}
        maxDate={currentDate}
        defaultValue={dayjs.Dayjs}     
        slotProps={{
          popper: {
            sx: {
              ".MuiPaper-root": { height : '45vh',borderRadius : "10px",padding:0 },
              '&.MuiPickersPopper-root': { padding:0},
              ...{'& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'gray',color : "white" }},
            },
          },
        field : {
          readOnly : true,
        },
        textField : {
          color:'success',
          size:'small',
          "aria-readonly":true,
          sx:{
            "& .MuiInputBase-input": {
             height:'3.25vh',
             width : 'auto',
             fontSize:"0.95vw"
            },
          }
        }
        }}
        sx={{height : "5.5vh",backgroundColor : 'transparent'}}
        onChange={(date) => handleFromDate(date, reportIndex, detailIndex, detailName,detail.to)}
      />
    </LocalizationProvider>
    </Box>

    <Box sx={{ width : "auto"}}>    
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        format="DD-MM-YYYY"
        label='To'
        value={detail.to === 'To' ? null : dayjs(detail.to,'DD-MM-YYYY')}
        defaultValue={dayjs.Dayjs}   
        maxDate={currentDate}  
        shouldDisableDate={(day) => dayjs(day).isBefore(dayjs(detail.from, 'DD-MM-YYYY'), 'day')}
        slotProps={{      
          popper: {
            sx: {
              ".MuiPaper-root": { height : '45vh',borderRadius : "10px",padding:0 },
              '&.MuiPickersPopper-root': { padding:0},
              ...{'& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'gray',color : "white" }},
            },
          },
        field : {
          readOnly : true,
        },
        textField : {
          color:'success',
          size:'small',
          "aria-readonly":true,
          sx:{
            "& .MuiInputBase-input": {
             height:'3.25vh',
             width:'auto',
             fontSize:"0.95vw"
            },
          }
        }
        }}
        sx={{ height : "5.5vh",backgroundColor : 'transparent'}}
        onChange={(date) => handleToDate(date, reportIndex, detailIndex, detailName,detail.from)}
      />
    </LocalizationProvider>
    </Box>
            
          </Box>
        )}

{ reportName === "IP Logs" && detailName !== 'mobileNoDetails' && (
            <FormControl variant='outlined' margin='none' sx={{ width : "23%", marginLeft : "2%"}}>
              <TextField
              sx={inputControl.textfield} 
              InputLabelProps={inputControl.inputLabelProps}
              inputProps={inputControl.inputProps}
                placeholder={`Enter ${detail.name2}`}       
                 className="number-box"
                value={detail.mobileno}              
                autoComplete="off"
                style={{ height : '5.5vh',fontSize : '1vw' }}
                label={detail.name2}
                margin='none'
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
                type='tel'
                inputMode='tel'
                InputAdornment={'+91'}
                color='primary'
               />
              </FormControl>
            )}

        { (detailName === "RRNdetails" && (reportName === "Beneficiary details for Single IMPS transactions" || reportName === "Beneficiary details for Single UPI transactions")) && (
          <Box className='rrn-fields'>

        <FormControl variant='outlined' margin='none' sx={{ width : '57%'}}>
              <TextField
              sx={inputControl.textfield} 
              InputLabelProps={inputControl.inputLabelProps}
              inputProps={inputControl.inputProps}
                placeholder={`Enter ${detail.name2}`}       
                className="selected-param-box-3"
                value={detail.amount}              
                autoComplete="off"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
                style={{ margin : '0vh 0vw 0vh 0vw', height : '5.5vh',fontSize : '1vw',width : '100%'}}
                label={detail.name2}
                margin='none'
                onChange={(e) =>
                  handleAmountValue(
                    e.target.value,
                    reportIndex, 
                    detailIndex,
                    detailName
                  )
                }
                type='number'
                inputMode='numeric'
                color='primary'
               />
              </FormControl>

<Box sx={{ width : "40%"}}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        format="DD-MM-YYYY"
        label='Date'
        value={detail.date === 'Date' ? null : dayjs(detail.date,'DD-MM-YYYY')}
        defaultValue={dayjs.Dayjs}    
        maxDate={currentDate} 
        slotProps={{
          popper: {
            sx: {
              ".MuiPaper-root": { height : '45vh',borderRadius : "10px",padding:0 },
              '&.MuiPickersPopper-root': { padding:0},
              ...{'& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'rgba(75, 75, 75, 1)',color : "white" }},
            },
          },
        field : {
          readOnly : true
        },
        textField : {
          size:'small',
          "aria-readonly":true,
          sx:{
            "& .MuiInputBase-input": {
             height:'3.25vh',
             fontSize:"0.95vw"
            },
          }
        }
        }}
        sx={{ height : "5.5vh",backgroundColor : 'transparent'}}
        onChange={(date) => handleDate(date, reportIndex, detailIndex, detailName)}
      />
    </LocalizationProvider>
  </Box>
          </Box>
        )}

        {reportName === "Statement in PDF/Excel" && (
<FormControl variant="standard" sx={{ width : '14%',marginLeft : '2%'}}>
<Select
          id="report-type-dropdown"
          value={detail.type}
          displayEmpty
          onChange={(e) =>
            handleReportType(
              e.target.value,
              reportIndex,
              detailIndex,
              detailName
            )
          }
          variant='standard'
          input={<OutlinedInput fullWidth={true} />}
          IconComponent={props => (
          <KeyboardArrowDownOutlinedIcon
            className="reports-type-dropdownicon"
            sx={{ fontSize : '1.48vw', color:"rgba(115, 115, 115, 1)"}}
            {...props}
          />
        )}
            renderValue={type => type}
          MenuProps={SelectProps.TYPE_SELECT_PROPS}
          inputProps={{ 'aria-label': 'Without label' }}
          autoWidth={false}
          sx={{ padding : '0vh 0vw 0vh 0vw'}}
          style={{ display:'flex',alignItems:'center',height : '5.5vh',fontSize : "1vw",marginTop : "0vh"}}
          placeholder="Type"
        >
          {availableReportTypes.map((type) => (
            <MenuItem key={type} value={type} style={{ display:'flex', border : "0px solid #cdcdcd", width : '6vw', margin:'0vh 0vw 0vh 0vw',height:'4vh',alignItems:'left',borderRadius : '4px', backgroundColor : "transparent"}}>
              <ListItemText primary={type} style={{ padding : "0vh 0vw 0vh 0vw"}} color="black" inputMode='text' primaryTypographyProps={{ fontSize : '0.95vw'}}  />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        )}

        {detailIndex === reportsState[reportIndex][detailName].length - 1 ||
        reportsState[reportIndex][detailName].length === 1 ? (
          <Button
            className="add-remove-button"
            style={{ marginLeft : reportName === "IP Logs" && detailName === "mobileNoDetails" ? '2%' : "0%"}}
            disabled={
              detail.value === "" ||
              detail.value === 0 ||
              // detail.amount === 0 ||
              // detail.amount === 0 ||
              // detail.from === "From" ||
              // detail.from === "Invalid !" ||
              // detail.to === "Invalid !" ||
              // detail.to === "To" ||
              detail.type === "Type"
                ? true
                : false
            }
            onClick={() =>
              addDetail(reportIndex, detailName, param, reportName)
            }
          >
            <AddIcon sx={{ color : 'red', alignSelf : "center",justifySelf : "center",fontSize:'1.45vw'}} />
          </Button>
        ) : (
          <Button
            className="add-remove-button"
            style={{ marginLeft : reportName === "IP Logs" && detailName === "mobileNoDetails" ? '2%' : "0%"}}
            onClick={() => deleteDetail(reportIndex, detailIndex, detailName)}
          >
            <RemoveIcon sx={{ color : 'red', alignSelf : "center",justifySelf : "center",fontSize:'1.45vw'}} />
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
          <Box className="detail-input">
            <span className="preview-text">{`${detail.name}  : ` }</span>
            <span className="preview-text">{detail.value}</span>
          </Box>

          {((detailName === "accountNumberDetails" && reportName !== "Device details") ||
          (detailName === "CRNdetails" && reportName === "IP Logs") || (reportName === "IP Logs") || (reportName === "Statement in PDF/Excel" || reportName === "Beneficiary details for Bulk IMPS transactions" || reportName === "Beneficiary details for Bulk UPI transactions") ||
          (detailName === "RRNdetails" && reportName === "Beneficiary details for Bulk IMPS transactions") ||
          (detailName === "RRNdetails" && reportName === "Beneficiary details for Bulk UPI transactions")) && (
            <Box className="detail-range">
              <span className="preview-text">Date : </span>
              <span className="preview-text">{`${detail.from} - `}</span>
              <span className="preview-text">{detail.to}</span>
            </Box>
          )}

          { (detailName === "RRNdetails" && (reportName === "Beneficiary details for Single IMPS transactions" || reportName === "Beneficiary details for Single UPI transactions")) && (
            <Box className="detail-range">
              <span className="preview-text">Amount : </span>
              <span>{detail.amount}</span>
              <span style={{ marginLeft: "3vw" }}>Date : </span>
              <span className="preview-text">{detail.date}</span>
            </Box>
          )}

      { reportName === "IP Logs" && detailName !== 'mobileNoDetails' && (
             <Box>
              <span style={{ marginLeft: "3vw" }}>Mobile No. : </span>
              <span className="preview-text">{detail.mobileno}</span>
             </Box>
      )}

        </Box>
      </Box>
    ));

  console.log("ticket number length", ticketNumber);

  const handleSubmit = () => {
    route_to('/ViewUpdate');
    // dispatch(setCreatedDate(currentDate));
  };

  const responsePayload = {
     ticketNumber : ticketNumber,
     ticketDescription : ticketDescription,
     requestData : reportsState,
     createdDate : currentDate
  };

  return (
    <Box className="page">
      <Box className="create-request-screen">
        <span style={{ fontWeight: '420', fontSize: "x-large" }}>
          Create Request
        </span>

        <Box className="ticket-entry-section">
          <Box className="ticket-type-section">

          <FormControl variant='outlined' margin='none' className="ticket-number-container">
              <TextField
                sx={inputControl.textfield} 
                InputLabelProps={inputControl.inputLabelProps}
                inputProps={inputControl.inputProps}
                placeholder="Enter ticket number"         
                className="ticket-number-input"
                value={ticketNumber === 0 ? "" : ticketNumber}
                autoComplete="off"
                size='medium'           
                style={{ margin : '0vh 0vw 0vh 0vw', height : 'auto',fontSize : '1vw'}}
                label='Ticket Number'
                margin='dense'
                onChange={(e) => setTicketNumber(e.target.value)}
                type='number'
                required
                inputMode='numeric'
                fullWidth={true}
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                color='primary'
               />
              </FormControl>

     
<FormControl variant='outlined' margin='none' className="ticket-description-container">
<TextField
                placeholder={descriptionFocused === true ? "Enter description" : ''}
                variant='outlined'
                required
                label='Ticket Description'
                onFocus={() => setDescriptionFocused(true)}
                onBlur={() => setDescriptionFocused(false)}
                minRows={1}
                multiline={true}
                sx={inputControl.textfield}
                className="ticket-description-input"
                autoComplete="off"
                size='small'
                fullWidth={true}
                inputProps={inputControl.textAreaProps}
                InputLabelProps={inputControl.textAreaLabelProps}
                style={{ margin : '0vh 0vw 0vh 0vw',backgroundColor : 'white',height : 'auto'}}
                margin='normal'
                type='text'
                inputMode='text'
                disabled={ticketNumber === 0 || ticketNumber.length === 0 ? true : false}
                color='primary'
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
               />
      
               </FormControl>
          </Box>

 <FormControl variant="standard" sx={{ width : '82.75%', textOverflow : "clip" }}>
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
          variant='standard'
          input={<OutlinedInput fullWidth={true}/>}
          IconComponent={props => (
          <KeyboardArrowDownOutlinedIcon
            className="reports-type-dropdownicon"
            sx={{ fontSize : '1.48vw', color:"rgba(115, 115, 115, 1)"}}
            {...props}
          />
        )}
            renderValue={(reports) => {
              if (reports.length === 0) {
                return <span style={{ opacity : 0.45 }}>Select statements/reports you require</span>;
              } 
              return <Input contentEditable='false' sx={{ width : "99%" , fontSize : '95%',textOverflow : 'ellipsis',overflow : 'hidden'}} disableUnderline={true} value={reports.join(' , ')}></Input>;       
            }}
          MenuProps={SelectProps.REPORT_SELECT_PROPS}
          inputProps={{ 'aria-label': 'Without label' }}
          autoWidth={false}
          style={{ display:'flex',alignItems:'center',height : '5.6vh',fontSize : "1vw",marginTop : '0vh'}}
          placeholder="Select statements/reports you require"
        >
          {requiredReportsData.map((report) => (
            <MenuItem key={report} value={report} style={{ display:'flex', border : "1px solid #cdcdcd", width : '96.25%', margin:'2vh 1vw 1.5vh 1.4vw',height:'5.5vh',alignItems:'left',borderRadius : '4px', backgroundColor : "transparent",fontSize : "2px"}}>
              <Checkbox size='medium' icon={<CheckBoxOutlineBlankIcon sx={{ fontSize : "1.6vw"}} />} checkedIcon={<CheckBoxOutlinedIcon className="check-icon" sx={{ fontSize : "1.6vw" , color : 'red'}} />} sx={{ containIntrinsicSize : "2px"}} checked={selectedReports.indexOf(report) > -1} color='success' style={{ marginLeft : '-1vw',backgroundColor : "transparent",fontSize : "2px"}} />
              <ListItemText primary={report} style={{ padding : "0.3vh 0vw 0vh 0vw"}} color="black" inputMode='text' primaryTypographyProps={{ fontSize : '0.95vw'}}  />
            </MenuItem>
          ))}
        </Select>
        </FormControl>

        </Box>

        {selectedReports.length > 0 && (
          <Box className="selected-reports-section" id="selected-reports-section">
            <h2 className="selected-reports-heading">Selected Requests</h2>

            <Accordion slots={{ transition: Fade }} slotProps={{ transition: { timeout: 1200 } }}>
              {selectedReports.length > 0 &&
                selectedReports.map((request, reportIndex) => (
                  <Accordion slots={{ transition: Fade }}
                  slotProps={{ transition: { timeout: 1200 } }}
                  key={reportIndex}>
                    
                    <Box className="selected-report-view">
                      <Box className="selected-report-header" style={{ borderBottomWidth : reportsState[reportIndex]?.viewState === 'Minimized' ? '0px' : '1.5px'}}>
                        <span className="selected-report-heading">
                          {request}
                        </span>
 
                       { reportsState[reportIndex]?.viewState === 'Expanded' ? ( 
                       <ExpandCircleDownOutlinedIcon sx={{ color : "rgba(95, 99, 104, 0.75)", fontSize : "2vw",transform : 'rotate(180deg)'}} onClick={() => handleMinimizedView(reportIndex)} className="view-icon" />
                      ) : (                
                        <ExpandCircleDownOutlinedIcon sx={{ color : "rgba(95, 99, 104, 0.75)", fontSize : "2vw"}} onClick={() => handleExpandedView(reportIndex)} className="view-icon" />
                      )}

                      </Box>

                      <Box className="selected-report-details" hidden={reportsState[reportIndex]?.viewState === 'Minimized' ? true : false}>
                        {reportsState[reportIndex] && (
                          <>
                           <Box hidden={request === 'Beneficiary details for Single IMPS transactions' || request === 'Beneficiary details for Single UPI transactions' ? true : false} sx={{ width : "100%"}}>

<FormControl variant="standard" sx={{ width : "34%"}}>
<Select
          labelId="param-selection-dropdown"
          id="param-selection-dropdown"
          multiple={true}
          value={reportsState[reportIndex].selectedParams || []}
          displayEmpty
          onChange={(event) => handleParamSelection(event, reportIndex, request)}
          variant='standard'
          input={<OutlinedInput fullWidth={false} sx={{alignItems : 'center', justifyContent : 'space-around',justifyItems:'left'}} />}
          sx={{
            '& .reports-type-dropdownicon': {
              paddingRight: '2vw' 
            }
          }}
          IconComponent={props => (
          <KeyboardArrowDownOutlinedIcon
            className="reports-type-dropdownicon"
            sx={{ fontSize : "1.56vw", color:"rgba(115, 115, 115, 1)"}}
            {...props}
          />
        )}
            renderValue={(params) => {
              if (params.length === 0) {
                return <span style={{ opacity : 0.45 }}>Select Detail</span>;
              } 
              return <Input contentEditable='false' sx={{ width : "99%" , fontSize : '95%',textOverflow : 'ellipsis',overflow : 'hidden'}} disableUnderline={true} value={params.join(' , ')}></Input>;         
            }}
          MenuProps={SelectProps.PARAM_SELECT_PROPS}
          inputProps={{ 'aria-label': 'Without label' }}
          autoWidth={false}
          style={{ display:'flex',alignItems:'center',height : '5.6vh',fontSize : "1vw",marginTop : "0vh"}}
          placeholder="Select Detail"
        >
         
          {availableParameters.map(param => (
            <MenuItem key={param} value={param} style={{ display:'flex',borderStyle:'solid',borderColor : 'rgba(232, 232, 232, 1)',borderBottomWidth : "1.75px", margin:'0vh 0vw 0vh 0vw',height:'4.8vh',alignItems:'left',borderRadius : '0px', backgroundColor : "transparent",fontSize : "2px"}}>
              <Checkbox checked={reportsState[reportIndex].selectedParams.indexOf(param) > -1} color='success' style={{ marginLeft : '-1vw',backgroundColor : "transparent"}} icon={<CheckBoxOutlineBlankIcon sx={{ fontSize : "1.6vw"}} />} checkedIcon={<CheckBoxOutlinedIcon className="check-icon" sx={{ fontSize : "1.6vw" , color : 'red'}} />} />
              <ListItemText primary={param} style={{ padding : "0.3vh 0vw 0vh 0vw"}} color="black" inputMode='text' primaryTypographyProps={{ fontSize : '0.95vw'}}  />
            </MenuItem>
          ))}
         
        </Select>
        </FormControl>
                        </Box>

                  <Box className="details-subsection" style={{ marginTop : request === 'Beneficiary details for Single IMPS transactions' || request === 'Beneficiary details for Single UPI transactions' ? '-1vh' : '3vh' }}>
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Account number"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].accountNumberDetails,
                                reportIndex,
                                "accountNumberDetails",
                                "Account number",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "PAN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].PANdetails,
                                reportIndex,
                                "PANdetails",
                                "PAN",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "CRN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].CRNdetails,
                                reportIndex,
                                "CRNdetails",
                                "CRN",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "RRN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].RRNdetails,
                                reportIndex,
                                "RRNdetails",
                                "RRN",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Aadhar"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].aadharDetails,
                                reportIndex,
                                "aadharDetails",
                                "Aadhar",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Email ID"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].emailDetails,
                                reportIndex,
                                "emailDetails",
                                "Email ID",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Credit Card"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].creditCardDetails,
                                reportIndex,
                                "creditCardDetails",
                                "Credit Card",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Debit Card"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].debitCardDetails,
                                reportIndex,
                                "debitCardDetails",
                                "Debit Card",
                                request
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param === "Mobile No."
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].mobileNoDetails,
                                reportIndex,
                                "mobileNoDetails",
                                "Mobile No.",
                                request
                              )}
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Accordion>
                ))}

              {/* <Box className="selected-report-view"></Box> */}

              <Box className="action-buttons">
                <Button className="submit-button" title="Submit" onClick={handleSubmit}>Submit</Button>
                {/* <button className="submit-button">Submit</button> */}
                <Button
                  className="preview-button"
                  onClick={() => setViewPreview(true)}
                >
                  Preview
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
                      <h2 className="preview-heading">Preview</h2>
                      <CloseOutlinedIcon
                        name="close-preview"
                        className="close-preview-button"
                        sx={{ fontSize : "2.5vw", color : "gray" }}
                        onClick={() => setViewPreview(false)}
                      />
                    </Box>

                    <Box className="preview-scroll">
                      {selectedReports.length > 0 &&
                        selectedReports.map((request, reportIndex) => (
                          <Box className="preview-report" key={reportIndex}>
                            <Box className="preview-report-header">
                              <FaRegCheckSquare
                                className="check-icon"
                                size="1.4vw"
                              />
                              <h3 className="preview-title">{request}</h3>
                            </Box>

                         
                            <Box className="preview-report-details">
                              {reportsState[reportIndex] && (
                                <>
                                  {showPreview(
                                    reportsState[reportIndex]
                                      .accountNumberDetails,
                                    reportIndex,
                                    "accountNumberDetails",
                                    "Account number",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].PANdetails,
                                    reportIndex,
                                    "PANdetails",
                                    "PAN",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].CRNdetails,
                                    reportIndex,
                                    "CRNdetails",
                                    "CRN",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].RRNdetails,
                                    reportIndex,
                                    "RRNdetails",
                                    "RRN",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].aadharDetails,
                                    reportIndex,
                                    "aadharDetails",
                                    "Aadhar",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].emailDetails,
                                    reportIndex,
                                    "emailDetails",
                                    "Email ID",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].creditCardDetails,
                                    reportIndex,
                                    "creditCardDetails",
                                    "Credit Card",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].debitCardDetails,
                                    reportIndex,
                                    "debitCardDetails",
                                    "Debit Card",
                                    request
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].mobileNoDetails,
                                    reportIndex,
                                    "mobileNoDetails",
                                    "Mobile No.",
                                    request
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
            </Accordion>
          </Box>
        )}
      </Box>
    </Box>
  );
}
