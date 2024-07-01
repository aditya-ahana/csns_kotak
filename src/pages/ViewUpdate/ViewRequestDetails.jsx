import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
// import Elements from "../../Elements/Elements";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import Modal from "react-modal";
import { TablePagination, TableSimple } from "react-pagination-table";
import { RiFilter2Line } from "react-icons/ri";
// import Sidenavsample from "../../../static/sidenavsample";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Button
export default function ViewRequestDetails() {
  const [viewDetailsAction, setViewDetailsAction] = useState();

  const location = useLocation();
  //  const { ticketDetails } = location.state;
  const current_date = new Date();
  const viewRequestTableHeaders = [
    "Ticket Id",
    "Requests",
    "Status",
    "Created Date",
    "Action",
  ];
  const route_to = useNavigate();

  const requestDetails = [
    {
      ticketId: "1300",
      requests: [{ value: "Statement in PDF/Excel" }],
      status: "In-progress",
      createdDateTime: "28-06-2024",
      createdBy: "User",
      subData: [
        {
          accNo: "123456789",
        },
        {
          accNo: "98765432",
        },
        {
          accNo: "34568656",
        },
        {
          accNo: "745656",
        },
        {
          accNo: "2343",
        },
        {
          accNo: "976565",
        },
      ],
    },
    {
      ticketId: "1300",
      requests: [{ value: "Beneficiary Details of IMPS Txns" }],
      status: "Completed",
      createdDateTime: "28-06-2024",
      createdBy: "User",
      subData: [
        {
          accNo: "456565",
        },
        {
          accNo: "2423576",
        },
        {
          accNo: "9757642",
        },
        {
          accNo: "434",
        },
        {
          accNo: "8767",
        },
        {
          accNo: "745656",
        },
        {
          accNo: "2343",
        },
      ],
    },
    {
      ticketId: "1300",
      requests: [{ value: "Beneficiary Details of UPI Txns" }],
      status: "Failed",
      createdDateTime: "28-06-2024",
      createdBy: "User",
      subData: [
        {
          accNo: "9754",
        },
        {
          accNo: "4545",
        },
        {
          accNo: "98475",
        },
        {
          accNo: "434",
        },
        {
          accNo: "9757642",
        },
        {
          accNo: "434",
        },
        {
          accNo: "8767",
        },
        {
          accNo: "745656",
        },
      ],
    },
    {
      ticketId: "1300",
      requests: [{ value: "IP Logs" }],
      status: "In-progress",
      createdDateTime: "28-06-2024",
      createdBy: "User",
      subData: [
        {
          accNo: "93487",
        },
        {
          accNo: "7642",
        },
        {
          accNo: "98343",
        },
        {
          accNo: "2335",
        },
        {
          accNo: "8923",
        },
        {
          accNo: "56342",
        },
        {
          accNo: "24562",
        },
        {
          accNo: "745656",
        },
      ],
    },
    {
      ticketId: "1300",
      requests: [{ value: "Device Details" }],
      status: "In-progress",
      createdDateTime: "28-06-2024",
      createdBy: "User",
      subData: [
        {
          accNo: "93487",
        },

        {
          accNo: "456",
        },
        {
          accNo: "2345",
        },

        {
          accNo: "2345634",
        },
        {
          accNo: "45634",
        },
      ],
    },
  ];

  const ticketDetails = requestDetails.map((request, index) => ({
    ticketid: request.ticketId,
    requests: (
      <div style={{ alignSelf: "center" }}>
        {request.requests.map((req, index) => (
          <p style={{ lineHeight: "1.5vh" }}>{`${req.value}`}</p>
        ))}
      </div>
    ),
    status_text: request.status,
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
    createdDate: request.createdDateTime,
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

  const requestActions = ticketDetails.map((detail, index) => ({
    ...detail,
    //  action : (
    // <div>
    //   <div>
    //   { detail.status === 'Failed' && (
    //     <button style={{ backgroundColor : "black"}}>
    //        Failed
    //     </button>
    //   )}
    //   </div>

    //   <div>
    // { detail.status === 'Completed' && (
    //     <div></div>
    // )}
    //   </div>
    // </div>
    //  )
    action: (
      <div>
        {detail.status_text === "Failed" ? (
          <button className="retry-button">
            <TbReload size="1.4vw" color="rgba(237, 28, 36, 1)" />
            <p className="retry-text">Retry</p>
          </button>
        ) : (
          <button className="expand-button">
            <IoMdArrowDropdown
              size="1.95vw"
              color="rgba(95, 99, 104, 1)"
              className="expand-icon"
            />
          </button>
        )}
      </div>
    ),
  }));

  console.log("Request with Action", requestActions);

  return (
    <div className="page">
      {/* <Elements />

     <div>
      <Sidenavsample />
      </div> */}

      <div className="view-request-details-screen">
        <div className="route-header">
          {/* <h3 className="prev-screen">Home</h3>
<IoIosArrowForward className="router-icon" size='1.2vw' />
<h3 className="current-screen">View details</h3> */}
        </div>

        <h1 className="vr-heading">View Details</h1>

        <div className="view-details-container">
          <table className="details-table">
            <thead>
              <tr>
                {viewRequestTableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requestDetails.map((row, index) => (
                <>
                  <tr key={index}>
                    <td>{row.ticketId}</td>
                    <td>
                      <div style={{ alignSelf: "center" }}>
                        {row.requests.map((req, reqIndex) => (
                          <p key={reqIndex} style={{ lineHeight: "1.5vh" }}>
                            {req.value}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          width: "auto",
                          padding: "8px 15px",
                          backgroundColor:
                            row.status === "In-progress"
                              ? "rgba(255, 238, 207, 1)"
                              : row.status === "Completed"
                                ? "rgba(205, 252, 229, 1)"
                                : row.status === "Failed"
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
                            row.status === "In-progress"
                              ? "rgba(232, 125, 0, 1)"
                              : row.status === "Completed"
                                ? "rgba(21, 122, 73, 1)"
                                : row.status === "Failed"
                                  ? "rgba(210, 26, 26, 1)"
                                  : "",
                          fontWeight: "400",
                          fontSize: "14px",
                        }}
                        className="status-tab"
                      >
                        <p>{row.status}</p>
                      </div>
                    </td>
                    <td>{row.createdDateTime}</td>
                    <td>
                      <button
                        className="expand-button"
                        onClick={(e) => {
                          if (viewDetailsAction === index) {
                            setViewDetailsAction();
                          } else {
                            setViewDetailsAction(index);
                          }
                        }}
                      >
                        <IoMdArrowDropdown
                          size="1.95vw"
                          color="rgba(95, 99, 104, 1)"
                          className="expand-icon"
                        />
                      </button>
                    </td>
                  </tr>

                  {viewDetailsAction === index ? (
                    <div
                      className="d-flex flex-column align-items-center p-3"
                      style={{
                        background: "#f5f8fa",
                        maxWidth: "73vw",
                      }}
                    >
                      {row.subData?.map((subDetails) => (
                        <>
                          <div
                            className="d-flex flex-row p-1"
                            style={{ width: "100%" }}
                          >
                            <span
                              style={{
                                width: "9.25vw",
                              }}
                            ></span>
                            <span
                              className="ps-3"
                              style={{
                                width: "21vw",
                                fontWeight: "400",
                                color: "rgba(96, 96, 96, 1)",
                                alignSelf: "center",
                              }}
                            >
                              Acc No:- {subDetails.accNo}
                            </span>
                            <span
                              style={{
                                width: "14vw",
                                display: "flex",
                                // alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "13%",
                                  width: "auto",
                                  padding: "8px 15px",
                                  backgroundColor:
                                    row.status === "In-progress"
                                      ? "rgba(255, 238, 207, 1)"
                                      : row.status === "Completed"
                                        ? "rgba(205, 252, 229, 1)"
                                        : row.status === "Failed"
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
                                    row.status === "In-progress"
                                      ? "rgba(232, 125, 0, 1)"
                                      : row.status === "Completed"
                                        ? "rgba(21, 122, 73, 1)"
                                        : row.status === "Failed"
                                          ? "rgba(210, 26, 26, 1)"
                                          : "",
                                  fontWeight: "400",
                                  fontSize: "14px",
                                }}
                                className="status-tab"
                              >
                                <p>{row.status}</p>
                              </span>
                            </span>
                            <span
                              style={{
                                width: "18vw",
                                display: "flex",
                                justifyContent: "center",
                                alignSelf: "center",
                              }}
                            >
                              {row.createdDateTime}
                            </span>
                            <span
                              style={{
                                width: "13vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {/* <Button
                                style={{
                                  backgroundColor: "rgba(0, 56, 116, 1)",
                                  marginLeft: "4.25vw",
                                  fontWeight: 420,
                                }}
                              >
                                Download
                              </Button> */}

                              <div>
                                {row.status === "Failed" ? (
                                  <Button
                                    className="retry-button border-0"
                                    variant="danger"
                                    style={{
                                      // backgroundColor: "rgba(0, 56, 116, 1)",
                                      // marginLeft: "4.25vw",
                                      fontWeight: 420,
                                    }}
                                  >
                                    <p className="retry-text">Retry</p>
                                  </Button>
                                ) : // <button className="retry-button">
                                //   <TbReload
                                //     size="1.4vw"
                                //     color="rgba(237, 28, 36, 1)"
                                //   />
                                //   <p className="retry-text">Retry</p>
                                // </button>
                                row.status === "In-progress" ? (
                                  ""
                                ) : (
                                  <Button
                                    className="completed-button border-0"
                                    variant="primary"
                                    style={{
                                      // backgroundColor: "rgba(0, 56, 116, 1)",
                                      // marginLeft: "4.25vw",
                                      fontWeight: 420,
                                    }}
                                  >
                                    Download
                                  </Button>
                                )}
                              </div>
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
