import React, { useEffect, useState } from "react";
import { MdOutlineFilterAlt, MdViewCarousel } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { IoIosListBox } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MailDraft from "../../components/Modals/MailDraft";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import TableContainer from "@mui/material/TableContainer";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Button } from "@mui/base/Button";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import {
  Checkbox,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FormControl, Input } from "@mui/material";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTranslation } from "react-i18next";

export default function ViewRequest() {
  const { t } = useTranslation();

  const [mailDraftModal, setMailDraftModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const route_to = useNavigate();
  const viewFilterMenu = Boolean(filterAnchor);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowOptions = [5, 10, 25, 40];
  const [checkedStates, setCheckedStates] = useState([
    { "In-progress": false },
    { Completed: false },
    { Failed: false },
  ]);

  const handleViewFilterMenu = (event) => {
    setFilterAnchor(event.currentTarget);
  };
  const handleCloseFilterMenu = () => {
    setFilterAnchor(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusCheck = (event, status) => {
    // setChecked(event.target.checked);
    if (event.target.checked) {
      setSelectedStatus((selected) => [...selected, status]);
    } else {
      setSelectedStatus((selected) => selected.filter((s) => s !== status));
      setSelectedStatus((selected) => selected.filter((s) => s !== status));
    }
  };

  const handleFromDate = (date) => {
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

    setFromDate(formatted_date);
  };

  const handleToDate = (date) => {
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

    setToDate(formatted_date);
    handleCloseFilterMenu();
  };

  const viewRequestTableHeaders = [
    "Ticket Id",
    "Requests",
    "Status",
    "Created Date",
    "Requester",
    "Action",
  ];

  const requestPhases = ["Completed", "In-progress", "Failed"];

  const datePickerControl =  {
    slotProps : {
       popper: {
         sx: {
           ".MuiPaper-root": { borderRadius : "10px" },
           '&.MuiPickersPopper-root': { padding:0},
           ...{'& .MuiPickersDay-root.Mui-selected': { backgroundColor: 'rgba(75, 75, 75, 1)',color : "white" }},
         },
       },
     openPickerIcon : {
      sx : {
        fontSize : "1.36vw"
      }
     },
     field : {
       readOnly : true,
     },
     textField : {
       placeholder : "Date",
       InputLabelProps : {
         sx : {
           fontSize : "1vw",
           opacity : "0.6"
         }
       },
       size:'small',
       "aria-readonly":true,
       sx:{
         "& .MuiInputBase-input": {
          height:'1.25rem',
          fontSize:"0.85vw",
           marginLeft : '-7%',
         },
       }
      }
     },
     sx : { 
       backgroundColor : 'transparent'
     }
   }

  const requestDetails = [
    {
      ticketId: "1300",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "In-progress",
      createdDate: "31-05-2024",
      requester: "System",
    },
    {
      ticketId: "1299",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "Completed",
      createdDate: "08-04-2024",
      requester: "User",
    },
    {
      ticketId: "1298",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Device Details",
      ],
      status: "Failed",
      createdDate: "08-03-2024",
      requester: "Admin",
    },
    {
      ticketId: "1297",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "IP Logs",
      ],
      status: "In-progress",
      createdDate: "12-01-2024",
      requester: "System",
    },
    {
      ticketId: "1296",
      requests: [
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
      ],
      status: "Failed",
      createdDate: "14-02-2023",
      requester: "Banker",
    },
    {
      ticketId: "1295",
      requests: ["IP Logs", "Device Details"],
      status: "In-progress",
      createdDate: "30-01-2023",
      requester: "Admin",
    },

    {
      ticketId: "1294",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "In-progress",
      createdDate: "12-01-2024",
      requester: "System",
    },
    {
      ticketId: "1293",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "Completed",
      createdDate: "04-12-2023",
      requester: "User",
    },
    {
      ticketId: "1292",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Device Details",
      ],
      status: "Failed",
      createdDate: "21-04-2023",
      requester: "Admin",
    },
    {
      ticketId: "1291",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "IP Logs",
      ],
      status: "In-progress",
      createdDate: "02-03-2023",
      requester: "System",
    },
    {
      ticketId: "1290",
      requests: [
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
      ],
      status: "Failed",
      createdDate: "14-02-2023",
      requester: "Banker",
    },
    {
      ticketId: "1289",
      requests: ["IP Logs", "Device Details"],
      status: "In-progress",
      createdDate: "30-01-2023",
      requester: "Admin",
    },

    {
      ticketId: "1288",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "In-progress",
      createdDate: "10-01-2024",
      requester: "System",
    },
    {
      ticketId: "1287",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
        "Device Details",
      ],
      status: "Completed",
      createdDate: "08-12-2023",
      requester: "User",
    },
    {
      ticketId: "1286",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "Device Details",
      ],
      status: "Failed",
      createdDate: "21-04-2023",
      requester: "Admin",
    },
    {
      ticketId: "1285",
      requests: [
        "Statement in PDF/Excel",
        "Beneficiary Details of IMPS Txns",
        "IP Logs",
      ],
      status: "In-progress",
      createdDate: "02-03-2023",
      requester: "System",
    },
    {
      ticketId: "1284",
      requests: [
        "Beneficiary Details of IMPS Txns",
        "Beneficiary Details of UPI Txns",
        "IP Logs",
      ],
      status: "Failed",
      createdDate: "14-02-2023",
      requester: "Banker",
    },
    {
      ticketId: "1283",
      requests: ["IP Logs", "Device Details"],
      status: "In-progress",
      createdDate: "30-01-2023",
      requester: "Admin",
    },
  ];

  // console.log('ticketId' , ticketId);
  // console.log('ticket status : ',ticketStatus);

  const ticketDetails = requestDetails.map((request, index) => ({
    ticketid: request.ticketId,
    requests: request.requests,
    status: request.status,
    createdDate: request.createdDate,
    requester: request.requester,
  }));

  console.log("TICKET", ticketDetails);

  const handleSearchQuery = (e) => {
    const searched = e.target.value.toLowerCase();
    setSearchInput(searched);
    const queried_data = ticketDetails.filter(
      (ticket) =>
        ticket.requester.toLowerCase().includes(searched) ||
        ticket.ticketid.toLowerCase().includes(searched)
    );
    setSearchResult(queried_data);
    setSearchMode(true);
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearchMode(false);
    }
  }, [searchInput]);

  const queried_data = searchInput.length === 0 ? ticketDetails : searchResult;
  const includedStatus = selectedStatus.map((status) => status.toLowerCase());

  const statusFilteredData = ticketDetails.filter((ticket) =>
    selectedStatus.some((status) =>
      ticket.status.toLowerCase().includes(status.toLowerCase())
    )
  );

  console.log("includedStatus", includedStatus);

  useEffect(() => {
    if (selectedStatus.length > 0) {
      setFilteredResult(statusFilteredData);
    }
  }, [selectedStatus, statusFilteredData]);

  const dateRangeFilteredData = queried_data.filter((ticket) => {
    const createdDate = dayjs(ticket.createdDate, "DD-MM-YYYY");
    const from = fromDate !== "" ? dayjs(fromDate, "DD-MM-YYYY") : null;
    const to = toDate !== "" ? dayjs(toDate, "DD-MM-YYYY") : null;

    if (from && to) {
      return (
        dayjs(createdDate, "DD-MM-YYYY").isAfter(
          dayjs(from, "DD-MM-YYYY"),
          "day"
        ) && dayjs(createdDate, "DD-MM-YYYY").isBefore(dayjs(to, "DD-MM-YYYY"))
      );
    }
    return true;
  });

  const dateAndStatusRangeFilteredData = statusFilteredData.filter((ticket) => {
    const createdDate = dayjs(ticket.createdDate, "DD-MM-YYYY");
    const from = fromDate !== "" ? dayjs(fromDate, "DD-MM-YYYY") : null;
    const to = toDate !== "" ? dayjs(toDate, "DD-MM-YYYY") : null;

    if (from && to) {
      return (
        dayjs(createdDate, "DD-MM-YYYY").isAfter(
          dayjs(from, "DD-MM-YYYY"),
          "day"
        ) && dayjs(createdDate, "DD-MM-YYYY").isBefore(dayjs(to, "DD-MM-YYYY"))
      );
    }

    return true;
  });

  const searched = searchInput.length > 0;
  const not_searched = searchInput.length === 0;

  const status_filtered = selectedStatus.length > 0;
  const not_status_filtered = selectedStatus.length === 0;

  const date_ranged = fromDate !== "" && toDate !== "";
  const not_date_ranged = fromDate === "" && toDate === "";

  // const requestData = searchInput.length > 0 ? searchResult : selectedStatus !== '' ? dateRangeFilteredData : fromDate !== '' && toDate !== '' ? dateRangeFilteredData : ticketDetails;

  const clearStatusFilter = () => {
    if (status_filtered) {
      setSelectedStatus([]);
    }
  };

  const clearDateRangeFilter = () => {
    if (date_ranged) {
      setFromDate("");
      setToDate("");
    }
  };

  const requestData =
    status_filtered && not_date_ranged
      ? statusFilteredData
      : status_filtered && date_ranged
        ? dateAndStatusRangeFilteredData
        : not_status_filtered && date_ranged
          ? dateRangeFilteredData
          : not_status_filtered && not_date_ranged && searched
            ? searchResult
            : ticketDetails;

  console.log("Checked", checked);
  console.log("Selected status", selectedStatus);
  console.log("Filtered Result", filteredResult);

  const topRowIndex = page * rowsPerPage;
  const nthRowIndex = page * rowsPerPage + rowsPerPage;
  const rowCount = requestData.length;

  const displayPaginationLabel = (from, to, count) => {
    return (
      <Typography sx={{ fontSize : "0.95vw",marginTop : "0.1rem"}}>{`${from} - ${to} of ${count}`}</Typography>
    );
  };

  return (
    <>
      <Box className="table-page">
        <Box className="view-request-screen">
          <Typography variant='h5' fontWeight={500} fontSize='1.499vw' className="view-ticket-header">
            {" "}
            {t("viewRequest")}
          </Typography>
          <Box className="view-request-container">
            <Box className="view-request-header">
              <Box className="request-searchbar">
                <SearchIcon className="request-search-icon" size="2vw" />
                <FormControl sx={{ width: "100%" }}>
                  <Input
                    disableUnderline={true}
                    type="search"
                    sx={{ fontSize: "0.92vw" }}
                    inputMode="text"
                    placeholder={t("searchByTicketRequester")}
                    className="request-search-input"
                    onChange={(e) => handleSearchQuery(e)}
                  ></Input>
                </FormControl>
              </Box>

              <Button
                className="request-filter-section"
                id="filter-menu-container"
                onClick={handleViewFilterMenu}
                aria-controls={viewFilterMenu ? "filter-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={viewFilterMenu ? "true" : undefined}
              >
                {/* <MdOutlineFilterAlt
                  className="filter-icon"
                  color="#606060"
                  size="1.45vw"
                /> */}

                {/* <FilterAltOutlinedIcon */}
                <FilterAltOutlinedIcon
                  className="filter-icon"
                  sx={{ color: "#606060", fontSize: "1.5vw" }}
                />
                <Typography
                  className="filter-heading"
                  sx={{ fontWeight: 500, fontSize: "1.04vw" }}
                >
                  {" "}
                  {t("filter")}
                </Typography>
              </Button>

              <Menu
                id="filter-menu"
                anchorEl={filterAnchor}
                open={viewFilterMenu}
                sx={{ marginLeft: "-1.65%" }}
                slotProps={{
                  paper: {
                    style: {
                      height: "fit-content",
                      width: "21.25%",
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  horizontal: "left",
                }}
                MenuListProps={{
                  style: {
                    border: "1.5px solid rgba(232, 232, 232, 1)",
                    borderRadius: "4px",
                    margin: 0,
                    padding: 0,
                  },
                  "aria-labelledby": "filter-menu-container",
                }}
                onClose={handleCloseFilterMenu}
              >
                <MenuList sx={{ height: "100%" }}>
                  <Box className="filter-menu-header">
                    <Typography
                      sx={{ color: "rgba(96, 96, 96, 1)", fontWeight: 500 }}
                    >
                      {" "}
                      {t("filter")}
                    </Typography>
                  </Box>

                  <MenuList>
                    {requestPhases.map((status, index) => (
                      <MenuItem
                        key={index}
                        value={status}
                        style={{ display:'flex',height:'1.95rem',alignItems:'left',borderRadius : '0px', backgroundColor : "transparent",fontSize : "2px"}}
                      >
                        <Checkbox
                          checked={selectedStatus.includes(status)}
                          onChange={(event) => handleStatusCheck(event, status)}
                          style={{
                            marginLeft: "-1vw",
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <CheckBoxOutlineBlank sx={{ fontSize: "1.6vw" }} />
                          }
                          checkedIcon={
                            selectedStatus.includes(status) ? (
                              <CheckBoxOutlinedIcon
                                className="check-icon"
                                sx={{ fontSize: "1.6vw", color: "red" }}
                              />
                            ) : (
                              <CheckBoxOutlineBlank
                                sx={{
                                  fontSize: "1.6vw",
                                  color: "rgba(115, 115, 115, 1)",
                                }}
                              />
                            )
                          }
                        />
                        <ListItemText
                          primary={status}
                          color="black"
                          inputMode="text"
                          primaryTypographyProps={{ fontSize: "0.95vw" }}
                          style={{ padding : "0.15rem 0rem 0rem 0rem"}}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>

                  <Box
                   sx={{ padding : "0.36rem 0vw 0rem 0.65rem",
                      borderWidth: "1px 0px 0px 0px",
                      borderStyle: "solid",
                      borderColor: "rgba(232, 232, 232, 1)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(96, 96, 96, 1)",
                        fontWeight: 500,
                        fontSize: "1vw",
                      }}
                    >
                      Created Date
                    </Typography>

                    <Box sx={{ display : "flex",flexDirection : "row",padding : "0.65rem 0rem 0.1rem 0rem",gap : "2.5%"}}>
                      <Box sx={{ width: "40%" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            format="DD-MM-YYYY"
                            label="From"
                            value={
                              fromDate === ""
                                ? null
                                : dayjs(fromDate, "DD-MM-YYYY")
                            }
                            // defaultValue=''
                            maxDate={dayjs(
                              dayjs().format("DD-MM-YYYY"),
                              "DD-MM-YYYY"
                            )}
                            defaultValue={null}
                            slotProps={datePickerControl.slotProps}
                            sx={datePickerControl.sx}
                            onChange={(date) => handleFromDate(date)}
                          />
                        </LocalizationProvider>
                      </Box>

                      <Box sx={{ display : "flex",marginTop : '0.15rem',alignItems : "center"}}>
                        <RemoveIcon
                          sx={{
                            fontSize: "200%",
                            color: "rgba(161, 161, 161, 1)",
                          }}
                        />
                      </Box>

                      <Box sx={{ width: "40%" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            format="DD-MM-YYYY"
                            label="To"
                            value={
                              toDate === "" ? null : dayjs(toDate, "DD-MM-YYYY")
                            }
                            // defaultValue=''
                            maxDate={dayjs(
                              dayjs().format("DD-MM-YYYY"),
                              "DD-MM-YYYY"
                            )}
                            defaultValue={null}
                            slotProps={datePickerControl.slotProps}
                            sx={datePickerControl.sx}
                            onChange={(date) => handleToDate(date)}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Box>

                    {(status_filtered || date_ranged) && (
                      <Box sx={{display : "flex",padding : "0.75rem 0.75rem 0.1rem 0rem",alignItems : "center",justifyContent : "flex-end"}}>
                        <Button
                          onClick={() => {
                            clearStatusFilter();
                            clearDateRangeFilter();
                            handleCloseFilterMenu();
                          }}
                          className="clear-button"
                          style={{ backgroundColor : "rgba(237, 28, 36, 1)",borderRadius : "4px",border : 'none',width : "30%",height : '1.75rem',fontWeight : 600 , color : "white",fontSize : "0.92vw"}}
                        >
                          Clear
                        </Button>
                      </Box>
                    )}
                  </Box>
                </MenuList>
              </Menu>
            </Box>

            <Box className="request-ticket-section" alignSelf="center">
              <Box className="view-table">
                <TableContainer
                  component={Paper}
                  className="view-table-container"
                  sx={{ boxShadow: "none" }}
                >
                  <Table stickyHeader={true} aria-label="view-request-table">
                    <TableHead>
                      <TableRow>
                        {viewRequestTableHeaders.map((header, index) => (
                          <TableCell
                            align="center"
                            key={index}
                            className="view-table-header"
                            sx={{
                              border: "1px solid rgba(225, 225, 225, 1)",
                              backgroundColor: "rgba(245, 248, 250, 1)",
                              fontSize: "1vw",
                              borderLeftWidth:
                                header === "Ticket Id" ? "1px" : "0px",
                              width:
                                header === "Ticket Id"
                                  ? "12%"
                                  : header === "Requests"
                                    ? "27%"
                                    : header === "Status"
                                      ? "15%"
                                      : header === "Created Date" ||
                                          header === "Requester"
                                        ? "16%"
                                        : header === "Action"
                                          ? "17%"
                                          : "0vw",
                            }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody className="view-table-body">
                      {requestData
                        .slice(topRowIndex, nthRowIndex)
                        .map((detail, i) => (
                          <TableRow key={i} className="table-body-row">
                            <TableCell
                              key={i}
                              className="view-table-data-row"
                              sx={{ borderLeftWidth: "1px", fontSize: "1vw" }}
                              align="center"
                            >
                              {detail.ticketid}
                            </TableCell>
                            <TableCell className="view-table-data-row">
                              <Box sx={{ alignSelf: "center" }}>
                                {detail.requests.map((req, index) => (
                                  <Typography
                                    key={index}
                                    sx={{ fontSize : '1vw',lineHeight: "1.85rem"}}
                                  >{`${index + 1}. ${req}`}</Typography>
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="view-table-data-row"
                            >
                              <Box
                                align="center"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Box
                                  alignSelf="center"
                                  className="view-table-status-buttons"
                                  sx={{
                                    backgroundColor:
                                      detail.status === "In-progress"
                                        ? "rgba(255, 238, 207, 1)"
                                        : detail.status === "Completed"
                                          ? "rgba(205, 252, 229, 1)"
                                          : detail.status === "Failed"
                                            ? "rgba(255, 220, 222, 1)"
                                            : "",
                                    color:
                                      detail.status === "In-progress"
                                        ? "rgba(232, 125, 0, 1)"
                                        : detail.status === "Completed"
                                          ? "rgba(21, 122, 73, 1)"
                                          : detail.status === "Failed"
                                            ? "rgba(210, 26, 26, 1)"
                                            : "",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1vw" }}
                                  >
                                    {detail.status}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="view-table-data-row"
                              sx={{ fontSize: "1vw" }}
                            >
                              {detail.createdDate}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="view-table-data-row"
                              sx={{ fontSize: "1vw" }}
                            >
                              {detail.requester}
                            </TableCell>
                            <TableCell className="view-table-data-row">
                              <Box className="detail-buttons">
                                <Button
                                  variant="outlined"
                                  className="view-details-button"
                                  color="darkblue"
                                  style={{ alignSelf: "center" }}
                                  onClick={() =>
                                    route_to("/viewRequestDetails", {
                                      state: {
                                        //  ticketDetails : ticketDetails
                                      },
                                    })
                                  }
                                >
                                  <DescriptionOutlinedIcon
                                    sx={{ fontSize: "1.75vw" }}
                                  />
                                  <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    sx={{ fontSize: "1vw" }}
                                    color="rgb(0, 97, 201)"
                                  >
                                    {" "}
                                    {t("details")}
                                  </Typography>
                                </Button>
                                <Button
                                  variant="outlined"
                                  className="mail-draft-button"
                                  style={{
                                    alignSelf: "center",
                                    backgroundColor:
                                      detail.status === "In-progress" ||
                                      detail.status === "Failed"
                                        ? "rgb(236, 236, 236)"
                                        : "transparent",
                                    color:
                                      detail.status === "In-progress" ||
                                      detail.status === "Failed"
                                        ? "rgba(165, 165, 165, 1)"
                                        : "rgba(96, 96, 96, 1)",
                                    borderColor: "rgba(161, 161, 161, 1)",
                                  }}
                                  onClick={(e) => {
                                    if (detail.status === "Completed") {
                                      setMailDraftModal(true);
                                    }
                                  }}
                                >
                                  <AttachEmailOutlinedIcon
                                    sx={{
                                      fontSize: "1.6vw",
                                      color:
                                        detail.status === "Completed"
                                          ? "rgba(96, 96, 96, 1)"
                                          : "rgba(161, 161, 161, 0.6)",
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    sx={{ fontSize: "1vw" }}
                                  >
                                    {" "}
                                    {t("eDraft")}
                                  </Typography>
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            <Box className="table-pagination">
              <TablePagination
                // labelDisplayedRows={() =>
                //   displayPaginationLabel(topRowIndex + 1, nthRowIndex, rowCount)
                // }
                rowsPerPageOptions={rowOptions}
                component="div"
                sx={{
                  display:"flex",
                  alignItems : 'center',
                  justifyContent:'flex-end',
                  width : '100%',
                  height : "0rem",
                  margin : "0rem 0rem 2rem 0rem",
                  overflow : "visible",
                    '& .MuiSvgIcon-root': {
                      color: 'rgba(0, 0, 0, 0.56)',
                      fontSize : "1.5vw"
                    },
                    '& .MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root' : {
                      opacity: 0.25
                    }
                }}
                count={rowCount}
                slotProps={{
                  select: {
                    renderValue: (value) => (
                      <Typography sx={{ fontSize: "0.95vw" }}>
                        {value}
                      </Typography>
                    ),
                    IconComponent: (props) => (
                      <KeyboardArrowDownOutlinedIcon
                        className="reports-type-dropdownicon"
                        sx={{ fontSize : '1.2vw', color:"rgba(115, 115, 115, 1)",marginTop : "0.002rem"}}
                        {...props}
                      />
                    ),
                    variant: "standard",
                    input: (
                      <OutlinedInput
                        fullWidth={true}
                        sx={{
                          border : "none",height : '1.2rem',fontSize : "0.2vw", 
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&:hover > .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                      />
                    ),
                    // IconComponent : props => (
                    //   <KeyboardArrowDownOutlinedIcon
                    //     className="reports-type-dropdownicon"
                    //     sx={{ fontSize : '1.48vw', color:"rgba(115, 115, 115, 1)"}}
                    //     {...props}
                    //   />
                    // ),
                    sx: {
                      width: "auto",
                      padding: "10px",
                      marginTop : "0.2rem",
                      marginLeft: "-3.5%",
                    },
                    MenuProps: {
                      sx: {
                        // marginTop : "-8vh"
                        fontSize: "0.2vw",
                      },
                      MenuListProps: {
                        sx: {},
                      },
                    },
                  },
                }}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={
                  <Box sx={{ display : "flex",flexDirection : "row", marginTop : "1.1rem",width : "100%",textAlign : 'center',alignItems : "center",justifyContent : "center"}}>
                    <Typography
                      sx={{
                        alignSelf: "center",
                        fontSize: "1vw",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {t("rowsPerPage")} :{" "}
                    </Typography>
                  </Box>
                }
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <MailDraft
        setMailDraftModal={setMailDraftModal}
        mailDraftModal={mailDraftModal}
      />
    </>
  );
}
