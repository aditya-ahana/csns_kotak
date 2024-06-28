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

export default function ViewRequest() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const route_to = useNavigate();

  const current_date = new Date();
  const modified_date = current_date.toISOString().split("T")[0];
  const viewRequestTableHeaders = [
    "Ticket Id",
    "Requests",
    "Status",
    "Created Date",
    "Created by",
    "Action",
  ];

  const requestDetails = [
    {
      ticketId: "1248",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Beneficiary Details of UPI Txns" },
        { value: "IP Logs" },
        { value: "Device Details" },
      ],
      status: "In-progress",
      createdDateTime: modified_date,
      createdBy: "System",
    },
    {
      ticketId: "1300",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Beneficiary Details of UPI Txns" },
        { value: "IP Logs" },
        { value: "Device Details" },
      ],
      status: "Completed",
      createdDateTime: modified_date,
      createdBy: "User",
    },
    {
      ticketId: "1413",
      requests: [
        { value: "Statement in PDF/Excel" },
        { value: "Beneficiary Details of IMPS Txns" },
        { value: "Device Details" },
      ],
      status: "Failed",
      createdDateTime: modified_date,
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
    createddatetime: request.createdDateTime,
    createdby: request.createdBy,
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
        ticket.createdby.toLowerCase().includes(searched) ||
        ticket.createddatetime.toLowerCase().includes(searched) ||
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

        <span style={{ fontWeight: "bold", fontSize: "x-large" }}>
          View request
        </span>
        <div className="view-request-container">
          <div className="view-request-header">
            <div className="request-searchbar">
              <IoMdSearch className="request-search-icon" size="2.4vw" />
              <input
                type="text"
                placeholder="Search by Ticket Id/Created by"
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
                data={
                  searchMode === true && searchInput.length >= 3
                    ? searchResult
                    : ticketDetails
                }
                columns="ticketid.requests.status.createddatetime.createdby.void"
                headers={viewRequestTableHeaders}
                className="ticket-table"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
