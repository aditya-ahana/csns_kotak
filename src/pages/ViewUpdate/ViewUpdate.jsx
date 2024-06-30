import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
// import Elements from "../../Elements/Elements";
import Modal from "react-modal";
import { TablePagination, TableSimple } from "react-pagination-table";
import { RiFilter2Line } from "react-icons/ri";
// import Sidenavsample from "../../../static/sidenavsample";
import { useNavigate } from "react-router-dom";
import MailDraft from "../../components/Modals/MailDraft";

export default function ViewRequest() {
  const [mailDraftModal, setMailDraftModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const route_to = useNavigate();

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
    requests: (
      <div style={{ alignSelf: "center" }}>
        {request.requests.map((req, index) => (
          <p style={{ lineHeight: "1.5vh" }}>{`${index + 1}. ${req.value}`}</p>
        ))}
      </div>
    ),
    status: (
      <div
        style={{
          width: "auto",
          padding: "8px 15px 8px 15px",
          backgroundColor:
            request.status === "In-progress"
              ? "rgba(255, 238, 207, 1)"
              : request.status === "Completed"
                ? "rgba(205, 252, 229, 1)"
                : request.status === "Failed"
                  ? "rgba(255, 220, 222, 1)"
                  : "",
          height: "auto",
          borderRadius: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color:
            request.status === "In-progress"
              ? "rgba(232, 125, 0, 1)"
              : request.status === "Completed"
                ? "rgba(21, 122, 73, 1)"
                : request.status === "Failed"
                  ? "rgba(210, 26, 26, 1)"
                  : "",
          fontWeight: "400",
          fontSize: "14px",
        }}
        className="status-tab"
      >
        <p style={{}}>{request.status}</p>
      </div>
    ),
    createdDate: request.createdDate,
    requester: request.createdBy,
    void: (
      <div className="detail-buttons">
        <button
          className="view-details-button"
          onClick={() =>
            route_to("/viewRequestDetails", {
              state: {
                //  ticketDetails : ticketDetails
              },
            })
          }
        >
          View Details
        </button>
        <button
          className="mail-draft-button"
          style={{
            backgroundColor:
              request.status === "In-progress" || request.status === "Failed"
                ? "rgb(236, 236, 236)"
                : "transparent",
            color:
              request.status === "In-progress" || request.status === "Failed"
                ? "rgba(165, 165, 165, 1)"
                : "rgba(96, 96, 96, 1)",
            borderColor: "rgba(161, 161, 161, 1)",
          }}
          onClick={(e) => {
            if(request.status === 'Completed'){
            setMailDraftModal(true);
            }
          }}
        >
          Mail Draft
        </button>
      </div>
    ),
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

  return (
    <>
      <div className="page">
        {/* <Elements />   

      <div>
      <Sidenavsample />
      </div> */}

        <div className="view-request-screen">
          <div className="route-header">
            {/* <h3 className="prev-screen">Home</h3>
        <IoIosArrowForward className="router-icon" size='1.2vw' />
        <h3 className="current-screen">View Request</h3> */}
          </div>

          {/* <h1 className="vr-heading">View request</h1> */}

          <span style={{ fontWeight: "420", fontSize: "x-large" }}>
            View Request
          </span>
          <div className="view-request-container">
            <div className="view-request-header">
              <div className="request-searchbar">
                <IoMdSearch className="request-search-icon" size="2.4vw" />
                <input
                  type="search"
                  inputMode="text"
                  placeholder="Search by Ticket Id/Requester"
                  className="request-search-input"
                  onChange={(e) => handleSearchQuery(e)}
                ></input>
              </div>

              <div className="request-filter-section">
                <MdOutlineFilterAlt
                  className="filter-icon"
                  color="#606060"
                  size="30px"
                />
                <p className="filter-heading">Filter</p>
              </div>
            </div>

            <div className="request-ticket-section">
              <div className="view-request-table">
                <TableSimple
                  data={searchMode === true ? searchResult : ticketDetails}
                  columns="ticketid.requests.status.createdDate.requester.void"
                  headers={viewRequestTableHeaders}
                  className="ticket-table"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MailDraft
        setMailDraftModal={setMailDraftModal}
        mailDraftModal={mailDraftModal}
      />

    </>
  );
}
