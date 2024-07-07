import React, { useEffect, useState } from "react";
import { MdOutlineFilterAlt , MdViewCarousel } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IoIosListBox } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MailDraft from "../../components/Modals/MailDraft";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button } from '@mui/base/Button';
import SearchIcon from '@mui/icons-material/Search';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import { FormControl, Input } from "@mui/material";

export default function ViewRequest() {
  const [mailDraftModal, setMailDraftModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const route_to = useNavigate();

  const styles = {
    pageHeader : { 
      fontWeight: "500", 
      fontSize: "x-large" 
    },
    tableContainer : { 
      marginBottom : '4vh' , 
      borderBottomWidth : "0px",
      alignSelf : 'center'
    },
    tableHeader : {
      textAlign : 'center',
      borderRightWidth :'1px',
      borderStyle : "solid",
      padding : '1.6vh 0vh 1.6vh 0vh',
      borderColor : "rgba(225, 225, 225, 1)"
    },
    tableDataRow : {
      borderRightWidth :'1px',
      borderStyle : "solid",
      borderColor : "rgba(225, 225, 225, 1)",
      textAlign:'center'
    },
    requestDataRow : { 
      borderRightWidth :'1px',
      borderStyle : "solid",
      borderColor : "rgba(225, 225, 225, 1)"
    },
    lastTableDataRow : { 
      borderRightWidth :'1px',
      borderStyle : "solid",
      borderColor : "rgba(225, 225, 225, 1)",
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center',
      alignContent : "center",
      justifyItems:'center'
    },
    statusButtonRow : { 
      alignItems : "center",
      borderWidth : '1px',
      borderStyle : "solid",
      borderColor : "rgba(225, 225, 225, 1)",
      justifyContent : "center",
    },
    statusButtons : {
      display:'flex',
      alignSelf : "center",
      width: 'max-content',
      padding: "0.85vh 1vw 0.85vh 1vw",
      height: "auto",
      borderRadius: "30px",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontWeight: "400",
      fontSize: "0.92vw",
    },
    tableBody : { 
      borderBottomWidth : '0px',
      borderRightWidth :'1px',
      borderStyle : "solid",
      borderColor : "rgba(225, 225, 225, 1)"    
    }
  };

  const viewRequestTableHeaders = [
    "Ticket Id",
    "Requests",
    "Status",
    "Created Date",
    "Requester",
    "Action",
  ];

  const requestDetails = [
    {
      ticketId: "1300",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Beneficiary Details of UPI Txns" },
        { value: "IP Logs" },
        { value: "Device Details" },
      ],
      status: "In-progress",
      createdDate: "13-01-2024",
      createdBy: "System",
    },
    {
      ticketId: "1299",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Beneficiary Details of UPI Txns" },
        { value: "IP Logs" },
        { value: "Device Details" },
      ],
      status: "Completed",
      createdDate: "08-12-2023",
      createdBy: "User",
    },
    {
      ticketId: "1298",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Device Details" },
      ],
      status: "Failed",
      createdDate: "21-04-2023",
      createdBy: "Admin",
    },
    {
      ticketId: "1297",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "IP Logs" },
      ],
      status: "In-progress",
      createdDate: "02-03-2023",
      createdBy: "System",
    },
    {
      ticketId: "1296",
      requests: [
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Beneficiary Details of UPI Txns" },
        { value: "IP Logs" },
      ],
      status: "Failed",
      createdDate: "14-02-2023",
      createdBy: "Banker",
    },
    {
      ticketId: "1295",
      requests: [{ value: "IP Logs" }, { value: "Device Details" }],
      status: "In-progress",
      createdDate: "30-01-2023",
      createdBy: "Admin",
    },
  ];

  // console.log('ticketId' , ticketId);
  // console.log('ticket status : ',ticketStatus);

  const ticketDetails = requestDetails.map((request, index) => ({
    ticketid: request.ticketId,
    requests: request.requests,
    status: request.status,
    createdDate: request.createdDate,
    requester: request.createdBy,
  }));

  console.log("TICKET", ticketDetails);

  const handleSearchQuery = (e) => {
    const searched = e.target.value.toLowerCase();
    setSearchInput(searched);
    const queried_data = ticketDetails.filter(
      (ticket) =>
        ticket.requester.toLowerCase().includes(searched) ||
        ticket.createdDate.toLowerCase().includes(searched) ||
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

  const requestData = searchInput.length === 0 ? ticketDetails : searchResult

  return (
    <>
      <Box className="page">

        <Box className="view-request-screen">
          <span style={styles.pageHeader}>
            View Request
          </span>
          <Box className="view-request-container">
            <Box className="view-request-header">
              <Box className="request-searchbar">
                <SearchIcon className="request-search-icon" size="2vw" />
                <FormControl>
                <Input
                  disableUnderline={true}
                  type="search"
                  sx={{ fontSize :  "0.92vw"}}
                  inputMode="text"
                  placeholder="Search by Ticket Id/Requester"
                  className="request-search-input"
                  onChange={(e) => handleSearchQuery(e)}
                ></Input>
                </FormControl>
              </Box>

              <Box className="request-filter-section">
                {/* <MdOutlineFilterAlt
                  className="filter-icon"
                  color="#606060"
                  size="1.45vw"
                /> */}
                 <FilterAltIcon
                  className="filter-icon"
                  sx={{color : "#606060"}}
                  size="1.45vw"
                />
                <span className="filter-heading">Filter</span>
              </Box>
            </Box>


            <Box className="request-ticket-section">
              <Box className="view-request-table">
<TableContainer component={Paper} sx={styles.tableContainer}>
<Table aria-label="view-request-table">
  <TableHead>
    <TableRow sx={{ backgroundColor : "rgb(243, 242, 248)" }}>
      { viewRequestTableHeaders.map(header => (
          <TableCell sx={[ styles.tableHeader , { width : header === 'Ticket Id' ? '9.6vw' : header === 'Requests' ? '21vw' : header === 'Status' ? '11.5vw' : header === 'Created Date' || header === 'Requester' || header === 'Action' ? '12vw' : '0vw'}]}>{header}</TableCell>
      ))}
    </TableRow>
  </TableHead>

  <TableBody sx={styles.tableBody}>
    { requestData.map((detail,i) => (
     <TableRow key={i} sx={{ borderBottomWidth : '0px'}}>
      <TableCell sx={styles.tableDataRow}>{detail.ticketid}</TableCell>
      <TableCell sx={styles.requestDataRow}>
      <Box style={{ alignSelf: "center" }}>
        {detail.requests.map((req, index) => (
          <p style={{ lineHeight: "1.5vh" }}>{`${index + 1}. ${req.value}`}</p>
        ))}
      </Box>
      </TableCell>
      <TableCell align='center' sx={styles.statusButtonRow}>
      <Box sx={{ display:'flex',alignItems : "center",justifyContent : "center"}}>
      <Box
       alignSelf='center'
       sx={[ styles.statusButtons , { 
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
                : ""}]}
        className="status-tab"
      >
        <span>{detail.status}</span>
      </Box>
      </Box>
      </TableCell>
      <TableCell sx={styles.tableDataRow}>{detail.createdDate}</TableCell>
      <TableCell sx={styles.tableDataRow}>{detail.requester}</TableCell>
      <TableCell sx={styles.lastTableDataRow}>
      <Box className="detail-buttons" >
        <Button
        variant='outlined'
          className="view-details-button"
          style={{ alignSelf : "center"}}
          onClick={() =>
            route_to("/viewRequestDetails", {
              state: {
                //  ticketDetails : ticketDetails
              },
            })
          }
        >
          <DescriptionOutlinedIcon sx={{ fontSize : '1.6vw'}}/>
          <span>Details</span>
        </Button>
        <Button
          variant='outlined'

          className="mail-draft-button"
          style={{
            alignSelf : "center",
            backgroundColor:
              detail.status === "In-progress" || detail.status === "Failed"
                ? "rgb(236, 236, 236)"
                : "transparent",
            color:
              detail.status === "In-progress" || detail.status === "Failed"
                ? "rgba(165, 165, 165, 1)"
                : "rgba(96, 96, 96, 1)",
            borderColor: "rgba(161, 161, 161, 1)",
          }}
          onClick={(e) => {
            if(detail.status === 'Completed'){
            setMailDraftModal(true);
            }
          }}
        >
          <AttachEmailOutlinedIcon sx={{ fontSize : '1.6vw' , color : detail.status === 'Completed' ? "rgba(96, 96, 96, 1)" : "rgba(161, 161, 161, 0.6)"}} />
          <p>E-Draft</p>
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
