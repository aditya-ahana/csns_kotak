import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
// import Elements from "../../Elements/Elements";
import { useNavigate } from "react-router-dom";
import { FaRegCheckSquare } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import Modal from "react-modal";
// import Sidenavsample from "../../../static/sidenavsample";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DatePicker from "react-datepicker";

const CustomReportListRenderer = ({ checked, option, onClick, disabled }) => {
  return (
    <div style={{ gap: 0 }}>
      <div className="dropdown-items-container">
        <div>
          <label className="container">
            <input
              autoComplete="off"
              type="checkbox"
              onChange={onClick}
              checked={checked}
              tabIndex={-1}
              disabled={disabled}
            />
            <span class="checkmark" />
          </label>
        </div>

        <div className="dropdown-labels">
          <span>{option.label}</span>
        </div>
      </div>
    </div>
  );
};

const customParamRenderer = ({ checked, option, onClick, disabled }) => {
  return (
    <div style={{ gap: 0 }}>
      <div className="param-items-container">
        <div style={{ borderTopWidth: "0px" }}>
          <label className="param-container">
            <input
              autoComplete="off"
              type="checkbox"
              onChange={onClick}
              checked={checked}
              tabIndex={-1}
              disabled={disabled}
            />
            <span class="checkmark" />
          </label>
        </div>

        <div className="param-dropdown-labels">
          <span>{option.label}</span>
        </div>
      </div>
    </div>
  );
};

// document.documentElement.style.setProperty('--rmsc-h', '48px');

export default function CreateRequest() {
  const route_to = useNavigate();
  const [ticketNumber, setTicketNumber] = useState(0);
  const [ticketDescription, setTicketDescription] = useState("");
  const [detailed, setDetailed] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);

  const handleReportSelection = (reports) => {
    setSelectedReports(reports);
    autoScrollUp(100);
  };

  useEffect(() => {
    if (selectedReports.length > 1) {
      autoScrollDown(200);
      autoScrollUp(null, 160);
    }
  }, [selectedReports.length]);

  // useEffect(() => {
  //   const initialReports = selectedReports.map((report) => ({
  //     selectedReport : report.label,
  //     selectedParams: [],
  //     accountNumberDetails: [],
  //     PANdetails : [],
  //     CRNdetails : [],
  //     RRNdetails : [],
  //     aadharDetails : [],
  //     emailDetails : [],
  //     creditCardDetails : [],
  //     debitCardDetails : [],
  //     mobileNoDetails : []
  //   }));
  //   setReportsState(initialReports);
  // }, [ selectedReports ])

  useEffect(() => {
    setReportsState((prevReportsState) => {
      const updatedReportState = selectedReports.map((report) => {
        const existingReport = prevReportsState.find(
          (existing) => existing.selectedReport === report.label
        );

        return (
          existingReport || {
            selectedReport: report.label,
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
          }
        );
      });

      return updatedReportState;
    });
  }, [selectedReports]);

  // console.log('Selected REPORTS : ',selectedReports);

  const [reportsState, setReportsState] = useState([]);

  // useEffect(() => {
  //   console.log("Initial reportsState:", reportsState);
  // });

  const [createdDate, setCreatedDate] = useState("");
  const [viewFromDateCalendar, setViewFromDateCalendar] = useState(false);
  const [viewToDateCalendar, setViewToDateCalendar] = useState(false);
  const [viewDateCalendar, setViewDateCalendar] = useState(false);

  const [viewPreview, setViewPreview] = useState(false);
  const [viewReportsDropdown, setViewReportsDropdown] = useState(false);
  const [statementDetailCount, setStatementDetailCount] = useState(1);
  const [availableParameters, setAvailableParameters] = useState([
    { value: "1", label: "Account number" },
    { value: "2", label: "CRN" },
    { value: "3", label: "RRN" },
    { value: "4", label: "PAN" },
    { value: "5", label: "Aadhar" },
    { value: "6", label: "Mobile No." },
    { value: "7", label: "Debit Card" },
    { value: "8", label: "Credit Card" },
    { value: "9", label: "Email ID" },
  ]);

  // const StatementInPDForExcel = [{ report_type : 'Statement in PDF/Excel' , report_details : accountNumberDetails }];

  // const allDetails = [...accountNumberDetails,...PANdetails,...CRNdetails,...RRNdetails];

  const finalSelectedReports = selectedReports.map((request) => request.label);

  const requiredReportsData = [
    { value: "1.", label: "Statement in PDF/Excel" },
    { value: "2.", label: "Beneficiary details for IMPS transactions" },
    { value: "3.", label: "Beneficiary details for UPI transactions" },
    { value: "4.", label: "IP Logs" },
    { value: "5.", label: "Device details" },
  ];

  const [selectedParams, setSelectedParams] = useState(
    Array.from({ length: selectedReports.length }, () => [])
  );

  const requiredReports = requiredReportsData.map((request, index) => ({
    value: request.value,
    label: request.label,
  }));

  // console.log('selected reports : ',selectedReports);

  const finalSelectedParams = selectedParams.map((param) => param.label);

  const availableReportTypes = [
    { value: "1", label: "PDF" },
    { value: "2", label: "Excel" },
  ];

  //   const autoScrollDown = (reportIndex,details) => {
  //     // console.log('details',reportIndex,details);
  //     var height = 0;
  //     var scrollStep = 200;
  //         if (height <= document.body.scrollHeight) {
  //             window.scrollBy(0, scrollStep);
  //         }
  //         height += scrollStep;
  // };

  const autoScrollDown = (scrollingSpace) => {
    let scrollEvent;
    let bottomMargin = 0;
    scrollEvent = setInterval(function () {
      if (bottomMargin <= document.body.scrollHeight) {
        window.scrollBy(bottomMargin, scrollingSpace);
      } else {
        clearInterval(scrollEvent);
      }
      bottomMargin += scrollingSpace;
    }, 0);
  };

  const autoScrollUp = (detailIndex, scrollingSpace2) => {
    let height = document.body.scrollHeight;
    let scrollingSpace1 = 48;
    if (detailIndex > 3 && height > 0) {
      window.scrollBy(0, -scrollingSpace1);
      height -= scrollingSpace1;
    }
    if (detailIndex < 4) {
      window.scrollBy(0, -scrollingSpace2);
      height -= scrollingSpace2;
    }
  };

  const displaySelectedReports = selectedReports
    .map((request) => request.label)
    .join(", ");

  // console.log('Final Selected',selectedParams);

  const handleParamSelection = (params, reportIndex, reportName) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      const report = newState[reportIndex];

      if (!report) {
        console.error("Report is undefined for index:", reportIndex);
        console.log("loop4");
        return prevState;
      }

      report.selectedParams = params;
      console.log("Part", params);

      // if(reportName === 'IP Logs' && params.some(param => param.label === 'Mobile No.')){
      //   params = [...params,{value : '6',label : 'Mobile No.'},{ value : '2',label : 'CRN' }]
      //   report.selectedParams = params;
      // };

      if (
        reportName === "IP Logs" &&
        params.some((param) => param.label === "Mobile No.")
      ) {
        const isCRNPresent = params.some((param) => param.label === "CRN");
        const isMobileNoPresent = params.some(
          (param) => param.label === "Mobile No."
        );

        if (!isCRNPresent || !isMobileNoPresent) {
          const newParams = [...params];

          if (!isMobileNoPresent) {
            newParams.push({ value: "6", label: "Mobile No." });
          }

          if (!isCRNPresent) {
            newParams.push({ value: "2", label: "CRN" });
          }

          report.selectedParams = newParams;
        }
      }

      console.log("PARAMS?", report.selectedParams);

      if (
        params.some((param) => param.label === "Account number") &&
        report.accountNumberDetails.length === 0
      ) {
        report.accountNumberDetails.push({
          name: "Account number",
          value: "",
          from: "From",
          to: "To",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }

      if (
        params.some((param) => param.label === "PAN") &&
        report.PANdetails.length === 0
      ) {
        report.PANdetails.push({
          name: "PAN",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }

      if (
        params.some((param) => param.label === "CRN") &&
        report.CRNdetails.length === 0
      ) {
        if (reportName === "Statement in PDF/Excel") {
          report.CRNdetails.push({ name: "CRN", value: "", type: "Type" });
        }
        if (
          reportName !== "Statement in PDF/Excel" &&
          reportName !== "IP Logs"
        ) {
          report.CRNdetails.push({ name: "CRN", value: "", type: "Excel" });
        }
      }

      if (
        params.some((param) => param.label === "RRN") &&
        report.RRNdetails.length === 0
      ) {
        report.RRNdetails.push({
          name: "RRN",
          value: "",
          date: "Date",
          name2: "Amount",
          amount: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }
      if (
        params.some((param) => param.label === "Aadhar") &&
        report.aadharDetails.length === 0
      ) {
        report.aadharDetails.push({
          name: "Aadhar",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }
      if (
        params.some((param) => param.label === "Email ID") &&
        report.emailDetails.length === 0
      ) {
        report.emailDetails.push({
          name: "Email ID",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }
      if (
        params.some((param) => param.label === "Credit Card") &&
        report.creditCardDetails.length === 0
      ) {
        report.creditCardDetails.push({
          name: "Credit Card",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }
      if (
        params.some((param) => param.label === "Debit Card") &&
        report.debitCardDetails.length === 0
      ) {
        report.debitCardDetails.push({
          name: "Debit Card",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }
      if (
        params.some((param) => param.label === "Mobile No.") &&
        report.mobileNoDetails.length === 0 &&
        reportName !== "IP Logs"
      ) {
        report.mobileNoDetails.push({
          name: "Mobile No.",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }

      if (
        reportName === "IP Logs" &&
        params.some(
          (param) =>
            param.label === "Mobile No." &&
            report.mobileNoDetails.length === 0 &&
            report.CRNdetails.length === 0
        )
      ) {
        report.CRNdetails.push({
          name: "CRN",
          value: "",
          from: "From",
          to: "To",
          type: "Excel",
        });
        report.mobileNoDetails.push({
          name: "Mobile No.",
          value: "",
          type: reportName === "Statement in PDF/Excel" ? "Type" : "Excel",
        });
      }

      if (selectedReports.length < 2) {
        autoScrollDown(200);
      }
      // console.log('New State',newState);
      return newState;
    });
  };

  const deleteDetail = (reportIndex, detailIndex, details) => {
    setReportsState((prevState) => {
      const newState = [...prevState];
      newState[reportIndex][details].splice(detailIndex, 1);
      autoScrollUp(detailIndex, 140);
      return newState;
    });
  };

  const addDetail = (reportIndex, detailName, name, reportName) => {
    console.log("for detail", reportIndex, detailName);
    setReportsState((prevState) => {
      const newState = [...prevState];

      if (reportName === "Statement in PDF/Excel") {
        newState[reportIndex][detailName] = [
          ...newState[reportIndex][detailName],
          detailName === "RRNdetails"
            ? {
                name: "RRN",
                value: "",
                date: "Date",
                name2: "Amount",
                amount: "",
                type: "Type",
              }
            : detailName === "accountNumberDetails" ||
                (detailName === "CRNdetails" && reportName === "IP Logs")
              ? { name: name, value: "", from: "From", to: "To", type: "Type" }
              : detailName === "PANdetails" ||
                  detailName === "mobileNoDetails" ||
                  detailName === "CRNdetails" ||
                  detailName === "emailDetails"
                ? { name: name, value: "", type: "Type" }
                : detailName === "creditCardDetails" ||
                    detailName === "debitCardDetails" ||
                    detailName === "aadharDetails"
                  ? { name: name, value: "", type: "Type" }
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
            : detailName === "accountNumberDetails" ||
                (detailName === "CRNdetails" && reportName === "IP Logs")
              ? { name: name, value: "", from: "From", to: "To", type: "Excel" }
              : detailName === "PANdetails" ||
                  detailName === "mobileNoDetails" ||
                  detailName === "CRNdetails" ||
                  detailName === "emailDetails"
                ? { name: name, value: "", type: "Excel" }
                : detailName === "creditCardDetails" ||
                    detailName === "debitCardDetails" ||
                    detailName === "aadharDetails"
                  ? { name: name, value: "", type: "Excel" }
                  : {},
        ];
      }

      if (selectedReports.length < 2) {
        autoScrollDown(100);
      }
      return newState;
    });
  };

  const handleInputValue = (value, reportIndex, detailIndex, detailName) => {
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
      .join("/");

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

      if (
        formatted_date > to ||
        (formatted_date > to &&
          new Date(formatted_date).getMonth() > new Date(to).getMonth() &&
          new Date(formatted_date).getFullYear() > new Date(to).getFullYear())
      ) {
        newState[reportIndex][detail][detailIndex].from = "Invalid !";
      } else {
        newState[reportIndex][detail][detailIndex].from = formatted_date;
      }

      console.log("time4", date);
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
      .join("/");

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

      if (
        formatted_date < from ||
        (formatted_date < from &&
          new Date(formatted_date).getMonth() < new Date(from).getMonth() &&
          new Date(formatted_date).getFullYear() < new Date(from).getFullYear())
      ) {
        newState[reportIndex][detail][detailIndex].to = "Invalid !";
      } else {
        newState[reportIndex][detail][detailIndex].to = formatted_date;
      }

      console.log("time4", date);
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
      .join("/");

    // console.log(formatted_date);
    // console.log('Detail Index',detailIndex);

    setReportsState((prevState) => {
      const newState = [...prevState];

      newState[reportIndex][detailName][detailIndex].date = formatted_date;

      console.log("time4", date);
      return newState;
    });
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected || state.isClicked
          ? "#F5F8FA"
          : provided.backgroundColor,
      color: state.isSelected ? "black" : provided.color,
    }),
    control: (provided) => ({
      ...provided,
      height: "5.25vh",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0px",
    }),
    Container: {
      marginTop: "1vh",
      borderWidth: "1.5px",
      borderStyle: "solid",
      borderColor: "rgba(76, 76, 76, 1)",
      height: "5.62vh",
      borderRadius: "6px",
      minWidth: "6.5vw",
      maxWidth: "6.5vw",
      marginLeft: "-0.5vw",
    },
    previewFont: {
      fontFamily: "Roboto",
      fontWeight: 400,
    },
    reportDates: {},
  };

  const updateDetailed = () => {
    setDetailed(true);
  };
  console.log("ULTIMATE REPORTS ARRAY : ", reportsState);

  const displayRequestedReports = (
    detailsArray,
    reportIndex,
    detailName,
    param,
    reportName
  ) =>
    detailsArray.map((detail, detailIndex) => (
      <div className="selected-param-details" key={detailIndex}>
        {console.log(detailsArray, reportIndex, detailName, param, reportName)}
        <div className="input-1">
          <h6 className="ticket-number-heading">{detail.name}</h6>
          <input
            autoComplete="off"
            className="selected-param-box"
            style={{
              borderStyle: "solid",
              borderColor:
                detail.value === 0 || detail.value.length === 0
                  ? "rgba(128, 128, 128, 0.48)"
                  : "rgba(76, 76, 76, 1)",
              borderWidth: "1.5px",
            }}
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
            maxLength={
              detail.name === "Account number"
                ? 10 || 16
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
            }
            onInput={(e) => {
              if (
                detail.name === "Credit Card" ||
                detail.name === "Aadhar" ||
                detail.name === "Debit Card" ||
                detail.name === "RRN"
              ) {
                e.target.value = e.target.value.slice(
                  0,
                  detail.name === "Credit Card"
                    ? 16
                    : detail.name === "Aadhar"
                      ? 12
                      : detail.name === "Debit Card"
                        ? 16
                        : detail.name === "RRN"
                          ? 12
                          : "text"
                );
              }
            }}
            id="paramvalue"
            placeholder={detail.name}
            // value={detail.value === '' ? null : detail.value}

            value={
              detail.name === "Credit Card" ||
              detail.name === "Aadhar" ||
              detail.name === "Debit Card" ||
              detail.name === "RRN"
                ? parseInt(detail.value, 10)
                : detail.value
            }
            onChange={(e) =>
              handleInputValue(
                e.target.value,
                reportIndex,
                detailIndex,
                detailName
              )
            }
          ></input>
        </div>

        {(detailName === "accountNumberDetails" ||
          (detailName === "CRNdetails" && reportName === "IP Logs")) && (
          <div className="report-dates">
            <DatePicker
              selected={new Date()}
              popperProps={{
                positionFixed: true,
              }}
              popperContainer={({ children }) => <div>{children}</div>}
              wrapperClassName={
                detail.from === "From"
                  ? "no-date"
                  : detail.from === "Invalid !"
                    ? "date-invalid"
                    : "date-exists"
              }
              onChange={(date) =>
                handleFromDate(
                  date,
                  reportIndex,
                  detailIndex,
                  detailName,
                  detail.to
                )
              }
              className="calendar"
              disabled={detail.value === "" ? true : false}
              maxDate={new Date()}
              customInput={
                <div
                  className="date-box"
                  style={{
                    borderColor:
                      detail.from === "To" || detail.to === "Invalid !"
                        ? "rgba(115, 115, 115, 1)"
                        : "black",
                  }}
                >
                  <p
                    className="date-text"
                    style={{
                      color: detail.from === "From" ? "#A5A5A5" : "black",
                    }}
                  >
                    {detail.from}
                  </p>
                  <FaRegCalendarAlt
                    className="calendar-icon"
                    size="1.4vw"
                    color={
                      detail.from === "From"
                        ? "rgba(115, 115, 115, 1)"
                        : detail.from === "Invalid !"
                          ? "red"
                          : "transparent"
                    }
                  />
                </div>
              }
              dateFormat="DD/MM/YYYY"
              value={detail.from}
              onCalendarOpen={() => setViewFromDateCalendar(true)}
              onCalendarClose={() => setViewFromDateCalendar(false)}
            />
            <DatePicker
              selected={new Date()}
              onChange={(date) =>
                handleToDate(
                  date,
                  reportIndex,
                  detailIndex,
                  detailName,
                  detail.from
                )
              }
              className="calendar"
              wrapperClassName={
                detail.to === "To"
                  ? "no-date"
                  : detail.to === "Invalid !"
                    ? "date-invalid"
                    : "date-exists"
              }
              maxDate={new Date()}
              popperProps={{
                positionFixed: true,
              }}
              popperContainer={({ children }) => <div>{children}</div>}
              disabled={detail.from === "From" ? true : false}
              customInput={
                <div
                  className="date-box"
                  style={{
                    borderColor:
                      detail.to === "To" || detail.to === "Invalid !"
                        ? "rgba(115, 115, 115, 1)"
                        : "transparent",
                  }}
                >
                  <p
                    className="date-text"
                    style={{
                      color:
                        detail.to === "To"
                          ? "#A5A5A5"
                          : detail.to === "Invalid !"
                            ? "red"
                            : "black",
                    }}
                  >
                    {detail.to}
                  </p>
                  <FaRegCalendarAlt
                    className="calendar-icon"
                    size="1.4vw"
                    color={
                      detail.to === "To"
                        ? "rgba(115, 115, 115, 1)"
                        : detail.to === "Invalid !"
                          ? "red"
                          : "transparent"
                    }
                  />
                </div>
              }
              dateFormat="DD/MM/YYYY"
              value={detail.to}
              onCalendarOpen={() => setViewToDateCalendar(true)}
              onCalendarClose={() => setViewToDateCalendar(false)}
            />
          </div>
        )}

        {detailName === "RRNdetails" && (
          <div className="report-dates">
            <input
              autoComplete="off"
              className={
                reportName === "Statement in PDF/Excel"
                  ? "selected-param-box-2"
                  : "selected-param-box-3"
              }
              type="number"
              style={{
                borderStyle: "solid",
                borderColor:
                  detail.amount === 0 || detail.amount.length === 0
                    ? "rgba(128, 128, 128, 0.48)"
                    : "rgba(76, 76, 76, 1)",
                borderWidth: "1.5px",
              }}
              inputMode="numeric"
              width={reportName === "Statement in PDF/Excel" ? "11vw" : "18vw"}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
              maxLength={6}
              disabled={
                detail.value === 0 || detail.value.length === 0 ? true : false
              }
              id="amountvalue"
              placeholder={detail.name2}
              value={detail.amount === 0 ? null : parseInt(detail.amount, 10)}
              onChange={(e) =>
                handleAmountValue(
                  e.target.value,
                  reportIndex,
                  detailIndex,
                  detailName
                )
              }
            ></input>

            <DatePicker
              selected={new Date()}
              onChange={(date) =>
                handleDate(date, reportIndex, detailIndex, detailName)
              }
              className="calendar"
              disabled={detail.amount === 0 ? true : false}
              maxDate={new Date()}
              wrapperClassName={
                detail.date === "Date" ? "no-date" : "date-exists"
              }
              popperProps={{
                positionFixed: true,
              }}
              popperContainer={({ children }) => <div>{children}</div>}
              customInput={
                <div className="date-box">
                  <p
                    className="date-text"
                    style={{
                      color: detail.date === "Date" ? "#A5A5A5" : "black",
                    }}
                  >
                    {detail.date}
                  </p>
                  <FaRegCalendarAlt
                    className="calendar-icon"
                    size="1.4vw"
                    color={
                      detail.date === "Date" || detail.from === "Invalid !"
                        ? "rgba(115, 115, 115, 1)"
                        : "transparent"
                    }
                  />
                </div>
              }
              dateFormat="DD/MM/YYYY"
              onCalendarOpen={() => setViewToDateCalendar(true)}
              onCalendarClose={() => setViewToDateCalendar(false)}
              value={detail.date}
            />
          </div>
        )}

        {reportName === "Statement in PDF/Excel" && (
          <div className="type-container" style={customStyles.Container}>
            <Select
              options={availableReportTypes}
              onChange={(value) =>
                handleReportType(
                  value.label,
                  reportIndex,
                  detailIndex,
                  detailName
                )
              }
              placeholder={detail.type}
              isMulti={false}
              isSearchable={false}
              isDisabled={
                detail.value === "" ||
                detail.value === 0 ||
                detail.amount === "" ||
                detail.from === "From" ||
                detail.from === "Invalid !" ||
                detail.to === "To" ||
                detail.to === "Invalid !" ||
                detail.date === "Date"
                  ? true
                  : false
              }
              styles={customStyles}
              components={{
                DropdownIndicator: () => (
                  <div style={{ paddingRight: "0.6vw" }}>
                    <IoIosArrowDown
                      className="reports-type-dropdownicon"
                      size="1.2vw"
                      color="rgba(115, 115, 115, 1)"
                    />
                  </div>
                ),
                Input: () => (
                  <div className="type-dropdown">
                    <p className="report-type-text">{detail.type}</p>
                    <IoIosArrowDown
                      className="reports-type-dropdownicon"
                      size="1.4vw"
                      color="black"
                    />
                  </div>
                ),
                IndicatorSeparator: () => <></>,
              }}
            />
          </div>
        )}

        {detailIndex === reportsState[reportIndex][detailName].length - 1 ||
        reportsState[reportIndex][detailName].length === 1 ? (
          <button
            className="add-remove-button"
            disabled={
              detail.value === "" ||
              detail.value === 0 ||
              detail.amount === 0 ||
              detail.amount === 0 ||
              detail.from === "From" ||
              detail.from === "Invalid !" ||
              detail.to === "Invalid !" ||
              detail.to === "To" ||
              detail.type === "Type"
                ? true
                : false
            }
            onClick={() =>
              addDetail(reportIndex, detailName, param, reportName)
            }
          >
            <MdOutlineAdd className="add-icon" size="2.5vw" />
          </button>
        ) : (
          <button
            className="add-remove-button"
            onClick={() => deleteDetail(reportIndex, detailIndex, detailName)}
          >
            <GrSubtract className="remove-icon" size="2.5vw" />
          </button>
        )}
      </div>
    ));

  // const showPreview = (detailsArray,reportIndex,detailName,detail,reportName) => (detailsArray.map((detail, detailIndex) => (
  //     <div>
  //       {/* { updateDetailed() } */}

  //         {( detailName === 'accountNumberDetails' || (detailName === 'CRNdetails' && reportName === 'IP Logs')) && (
  //           <div className="preview-data">

  //           <div className="detail-input">
  //            <p>{detail.name}</p>
  //            <p>:</p>
  //            <p>{detail.value}</p>
  //           </div>

  //            <div className="detail-range">
  //             <p>Date</p>
  //             <p>:</p>
  //             <p>{detail.from}</p>
  //             <p>-</p>
  //             <p>{detail.to}</p>
  //            </div>
  //          </div>
  //           )}

  //           { detailName === 'RRNdetails' && (
  //              <div className="preview-data">

  //              <div className="detail-input">
  //               <p>{detail.name}</p>
  //               <p>:</p>
  //               <p>{detail.value}</p>
  //              </div>

  //              <div className="detail-input">
  //               <p>{detail.name2}</p>
  //               <p>:</p>
  //               <p>{detail.amount}</p>
  //              </div>

  //               <div className="detail-range">
  //                <p>Date</p>
  //                <p>:</p>
  //                <p>{detail.date}</p>
  //               </div>
  //             </div>
  //           )}

  //           { detailName === 'PANdetails' || detailName === 'mobileNoDetails' || detailName === 'emailDetails' || detailName === 'creditCardDetails' || detailName === 'debitCardDetails' || detailName === 'aadharDetails' || detailName === 'CRNdetails'}

  //   </div>
  // ))
  // );

  const showPreview = (
    detailsArray,
    reportIndex,
    detailName,
    detail,
    reportName
  ) =>
    detailsArray.map((detail, detailIndex) => (
      <div>
        {/* { updateDetailed() } */}
        <div className="preview-data">
          <div className="detail-input">
            <p className="preview-text">{detail.name}</p>
            <p>:</p>
            <p>{detail.value}</p>
          </div>

          {(detailName === "accountNumberDetails" ||
            (detailName === "CRNdetails" && reportName === "IP Logs")) && (
            <div className="detail-range">
              <p>Date</p>
              <p>:</p>
              <p>{detail.from}</p>
              <p>-</p>
              <p>{detail.to}</p>
            </div>
          )}

          {detailName === "RRNdetails" && (
            <div className="detail-range">
              <p>Amount</p>
              <p>:</p>
              <p>{detail.amount}</p>
              <p style={{ marginLeft: "3vw" }}>Date</p>
              <p>:</p>
              <p>{detail.date}</p>
            </div>
          )}
        </div>
      </div>
    ));

  console.log("ticket number length", ticketNumber.length);

  const arrowRenderer = () => {
    return (
      <IoIosArrowDown
        className="reports-type-dropdownicon"
        size="1.2vw"
        color="rgba(115, 115, 115, 1)"
      />
    );
  };

  return (
    <div className="page">
      {/* <Elements />

      <div>
        <Sidenavsample />
      </div> */}

      <div className="create-request-screen">
        {/* <div className="route-header">
        <h3 className="prev-screen">Home</h3>
        <IoIosArrowForward className="router-icon" size='1.2vw' />
        <h3 className="current-screen">Create Request</h3>
      </div> */}

        {/* <h1 className="cr-heading">Create Request</h1> */}
        <span style={{ fontWeight: "bold", fontSize: "x-large" }}>
          Create Request
        </span>

        <div className="ticket-entry-section">
          <div className="ticket-type-section">
            <div className="ticket-container">
              <h6 className="ticket-number-heading">Ticket number</h6>
              <input
                autoComplete="off"
                className={
                  ticketNumber === 0 || ticketNumber.length === 0
                    ? "ticket-number-input"
                    : "ticket-number-input-after"
                }
                type="number"
                id="ticketnum"
                inputMode="numeric"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                maxLength={10}
                name="Ticket Number"
                value={ticketNumber === 0 ? "" : ticketNumber}
                placeholder="Enter ticket number"
                onChange={(e) => setTicketNumber(e.target.value)}
              ></input>
            </div>
            <div className="ticket-container">
              <h6 className="ticket-description-heading">Ticket Description</h6>
              <input
                autoComplete="off"
                className={
                  ticketDescription.length === 0
                    ? "ticket-description-input"
                    : "ticket-description-input-after"
                }
                type="text"
                inputMode="text"
                id="ticketdesc"
                value={ticketDescription}
                placeholder="Enter description"
                onChange={(e) => setTicketDescription(e.target.value)}
              ></input>
            </div>
          </div>

          <MultiSelect
            options={requiredReports}
            value={selectedReports}
            disableSearch={true}
            disabled={
              ticketNumber === 0 || ticketDescription === "" ? true : false
            }
            hasSelectAll={false}
            overrideStrings={{
              selectSomeItems: "Select statements/reports you require",
              allItemsAreSelected: displaySelectedReports,
              // clearSearch:  "",
              // clearSelected:  "",
              // noOptions: "",
              // search: "",
              // selectAll: "",
              // selectAllFiltered: "",
              // create: ""
            }}
            ItemRenderer={CustomReportListRenderer}
            // valueRenderer={customValue}
            ArrowRenderer={arrowRenderer}
            className={
              selectedReports.length === 0
                ? "reports-dropdown"
                : "reports-dropdown-after"
            }
            ClearSelectedIcon={null}
            onChange={(reports) => handleReportSelection(reports)}
            labelledBy="Select"
          />
        </div>

        {selectedReports.length > 0 && (
          <div className="selected-reports-section">
            <h2 className="selected-reports-heading">Selected request</h2>

            <div>
              {selectedReports.length > 0 &&
                selectedReports.map((request, reportIndex) => (
                  <div key={reportIndex}>
                    <div className="selected-report-view">
                      <div className="selected-report-header">
                        <p className="selected-report-heading">
                          {request.label}
                        </p>
                      </div>
                      <div className="selected-report-details">
                        {reportsState[reportIndex] && (
                          <>
                            <MultiSelect
                              options={availableParameters}
                              value={
                                reportsState[reportIndex]?.selectedParams || []
                              }
                              disableSearch={true}
                              hasSelectAll={false}
                              overrideStrings={{
                                selectSomeItems: "Select Input",
                                allItemsAreSelected: reportsState[
                                  reportIndex
                                ]?.selectedParams
                                  ?.map((param) => param.label)
                                  .join(" , "),
                              }}
                              ArrowRenderer={arrowRenderer}
                              ItemRenderer={customParamRenderer}
                              className={
                                reportsState[reportIndex]?.selectedParams
                                  .length === 0
                                  ? "params-dropdown"
                                  : "params-dropdown-after"
                              }
                              ClearSelectedIcon={null}
                              onChange={(params) =>
                                handleParamSelection(
                                  params,
                                  reportIndex,
                                  request.label
                                )
                              }
                              labelledBy="Select"
                            />

                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Account number"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].accountNumberDetails,
                                reportIndex,
                                "accountNumberDetails",
                                "Account number",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "PAN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].PANdetails,
                                reportIndex,
                                "PANdetails",
                                "PAN",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "CRN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].CRNdetails,
                                reportIndex,
                                "CRNdetails",
                                "CRN",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "RRN"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].RRNdetails,
                                reportIndex,
                                "RRNdetails",
                                "RRN",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Aadhar"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].aadharDetails,
                                reportIndex,
                                "aadharDetails",
                                "Aadhar",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Email ID"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].emailDetails,
                                reportIndex,
                                "emailDetails",
                                "Email ID",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Credit Card"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].creditCardDetails,
                                reportIndex,
                                "creditCardDetails",
                                "Credit Card",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Debit Card"
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].debitCardDetails,
                                reportIndex,
                                "debitCardDetails",
                                "Debit Card",
                                request.label
                              )}
                            {reportsState[reportIndex].selectedParams.some(
                              (param) => param.label === "Mobile No."
                            ) &&
                              displayRequestedReports(
                                reportsState[reportIndex].mobileNoDetails,
                                reportIndex,
                                "mobileNoDetails",
                                "Mobile No.",
                                request.label
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {/* <div className="selected-report-view"></div> */}

              <div className="action-buttons">
                <button className="submit-button">Submit</button>
                <button
                  className="preview-button"
                  onClick={() => setViewPreview(true)}
                >
                  Preview
                </button>
              </div>

              <div>
                <Modal
                  isOpen={viewPreview === true}
                  onRequestClose={() => setViewPreview(false)}
                  className="preview-modal"
                  contentLabel="Preview Modal"
                >
                  <div className="preview-box">
                    <div className="preview-header">
                      <h2 className="preview-heading">Preview</h2>
                      <IoMdClose
                        name="close-preview"
                        size="2.5vw"
                        onClick={() => setViewPreview(false)}
                        color="gray"
                      />
                    </div>

                    <div className="preview-scroll">
                      {selectedReports.length > 0 &&
                        selectedReports.map((request, reportIndex) => (
                          <div className="preview-report" key={reportIndex}>
                            <div className="preview-report-header">
                              <FaRegCheckSquare
                                className="check-icon"
                                size="1.4vw"
                              />
                              <h3 className="preview-title">{request.label}</h3>
                            </div>

                            <div className="preview-report-details">
                              {reportsState[reportIndex] && (
                                <>
                                  {showPreview(
                                    reportsState[reportIndex]
                                      .accountNumberDetails,
                                    reportIndex,
                                    "accountNumberDetails",
                                    "Account number",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].PANdetails,
                                    reportIndex,
                                    "PANdetails",
                                    "PAN",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].CRNdetails,
                                    reportIndex,
                                    "CRNdetails",
                                    "CRN",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].RRNdetails,
                                    reportIndex,
                                    "RRNdetails",
                                    "RRN",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].aadharDetails,
                                    reportIndex,
                                    "aadharDetails",
                                    "Aadhar",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].emailDetails,
                                    reportIndex,
                                    "emailDetails",
                                    "Email ID",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].creditCardDetails,
                                    reportIndex,
                                    "creditCardDetails",
                                    "Credit Card",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].debitCardDetails,
                                    reportIndex,
                                    "debitCardDetails",
                                    "Debit Card",
                                    request.label
                                  )}
                                  {showPreview(
                                    reportsState[reportIndex].mobileNoDetails,
                                    reportIndex,
                                    "mobileNoDetails",
                                    "Mobile No.",
                                    request.label
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
