import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
// import Elements from "../../Elements/Elements";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiFilter2Line } from "react-icons/ri";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Sidenavsample from "../../../static/sidenavsample";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiRepeat2Line } from "react-icons/ri";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export default function ViewRequestDetails() {
  const { t } = useTranslation();

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
      request: "Statement in PDF/Excel",
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
      request: "Beneficiary Details of IMPS Txns",
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
      request: "Beneficiary Details of UPI Txns",
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
      request: "IP Logs",
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
      request: "Device Details",
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
    {
      ticketId: "1300",
      request: "Statement in PDF/Excel",
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
      request: "Beneficiary Details of IMPS Txns",
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
      request: "Beneficiary Details of UPI Txns",
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
      request: "IP Logs",
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
      request: "Device Details",
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
    {
      ticketId: "1300",
      request: "Statement in PDF/Excel",
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
      request: "Beneficiary Details of IMPS Txns",
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
      request: "Beneficiary Details of UPI Txns",
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
      request: "IP Logs",
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
      request: "Device Details",
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
    request: request.request,
    status: request.status,
    createdDate: request.createdDateTime,
    createdby: request.createdBy,
  }));

  const requestActions = ticketDetails.map((detail, index) => ({
    ...detail,
  }));

  console.log("Request with Action", requestActions);

  //   {detail.status_text === "Failed" && (
  //   <Button className="retry-button">
  //   <TbReload size="1.4vw" color="rgba(237, 28, 36, 1)" />
  //   <p className="retry-text">Retry</p>
  // </Button>
  // )}

  return (
    <Box className="page">
      <Box className="view-request-details-screen">
        <span className="view-ticket-header">{t("viewDetails")}</span>

        <Box className="view-details-container">
          <TableContainer
            component={Paper}
            className="view-table-container"
            sx={{ boxShadow: "none", maxHeight: "70vh" }}
          >
            <Table className="details-table" stickyHeader={true}>
              <TableHead>
                <TableRow>
                  {viewRequestTableHeaders.map((header) => (
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(225, 225, 225, 1)",
                        backgroundColor: "rgb(243, 242, 248)",
                        width:
                          header === "Ticket Id"
                            ? "5vw"
                            : header === "Requests"
                              ? "15vw"
                              : header === "Status"
                                ? "9vw"
                                : header === "Created Date" ||
                                    header === "Action"
                                  ? "9vw"
                                  : "0vw",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="view-table-body">
                {requestDetails.map((row, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        className="view-table-data-row"
                        sx={{ borderLeftWidth: "1px" }}
                      >
                        {row.ticketId}
                      </TableCell>
                      <TableCell className="view-table-data-row">
                        {row.request}
                      </TableCell>
                      <TableCell className="view-table-data-row" align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            maxHeight: "2vh",
                          }}
                        >
                          <Box
                            alignSelf={"center"}
                            sx={{
                              backgroundColor:
                                row.status === "In-progress"
                                  ? "rgba(255, 238, 207, 1)"
                                  : row.status === "Completed"
                                    ? "rgba(205, 252, 229, 1)"
                                    : row.status === "Failed"
                                      ? "rgba(255, 220, 222, 1)"
                                      : "",
                              color:
                                row.status === "In-progress"
                                  ? "rgba(232, 125, 0, 1)"
                                  : row.status === "Completed"
                                    ? "rgba(21, 122, 73, 1)"
                                    : row.status === "Failed"
                                      ? "rgba(210, 26, 26, 1)"
                                      : "",
                            }}
                            className="view-table-status-buttons"
                          >
                            <span>{row.status}</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center" className="view-table-data-row">
                        {row.createdDateTime}
                      </TableCell>
                      <TableCell align="center" className="view-table-data-row">
                        <Box>
                          {/* {row.status === "Failed" ? (
                          <Button className="retry-button">
                            <TbReload
                              size="1.4vw"
                              color="rgba(237, 28, 36, 1)"
                            />
                            <p className="retry-text">Retry</p>
                          </Button>
                        ) : ( */}
                          <Button
                            className="expand-button"
                            onClick={(e) => {
                              if (viewDetailsAction === index) {
                                setViewDetailsAction();
                              } else {
                                setViewDetailsAction(index);
                              }
                            }}
                          >
                            <ExpandCircleDownOutlinedIcon
                              size="1.95vw"
                              sx={{
                                color: "rgba(95, 99, 104, 0.8)",
                                fontSize: "2.2vw",
                                transform:
                                  viewDetailsAction === index
                                    ? "rotate(180deg)"
                                    : "",
                              }}
                              color="rgba(95, 99, 104, 1)"
                              className="expand-icon"
                            />
                          </Button>
                          {/* )} */}
                        </Box>
                      </TableCell>
                    </TableRow>

                    {viewDetailsAction === index ? (
                      <>
                        {row.subData?.map((subDetails) => (
                          <>
                            <TableRow
                              className="expanded-view"
                              key={index}
                              style={{
                                backgroundColor: "rgb(243 243 243 / 79%)",
                                height: "7vh",
                              }}
                            >
                              <TableCell
                                // height="6vh"
                                className="border-0 p-0"
                              >
                                {/* {row.ticketId} */}
                              </TableCell>
                              <TableCell className="border-0 p-0">
                                <Box
                                  // style={{ alignSelf: "center" }}
                                  className="d-flex align-items-center justify-content-center"
                                >
                                  <span
                                    key={index}
                                    // style={{ lineHeight: "1.5vh" }}
                                  >
                                    Acc No:- {subDetails.accNo}
                                  </span>
                                </Box>
                              </TableCell>
                              <TableCell className="border-0 p-0">
                                <Box className="d-flex align-items-center justify-content-center">
                                  <Box
                                    // alignSelf={"center"}
                                    className="view-table-status-buttons"
                                    sx={{
                                      backgroundColor:
                                        row.status === "In-progress"
                                          ? "rgba(255, 238, 207, 1)"
                                          : row.status === "Completed"
                                            ? "rgba(205, 252, 229, 1)"
                                            : row.status === "Failed"
                                              ? "rgba(255, 220, 222, 1)"
                                              : "",
                                      color:
                                        row.status === "In-progress"
                                          ? "rgba(232, 125, 0, 1)"
                                          : row.status === "Completed"
                                            ? "rgba(21, 122, 73, 1)"
                                            : row.status === "Failed"
                                              ? "rgba(210, 26, 26, 1)"
                                              : "",
                                    }}
                                  >
                                    <span>{row.status}</span>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell className="border-0 p-0">
                                <Box className="d-flex align-items-center justify-content-center">
                                  {row.createdDateTime}
                                </Box>
                              </TableCell>
                              <TableCell className="border-0 p-0">
                                <Box className="d-flex align-items-center justify-content-center">
                                  {row.status === "Failed" ? (
                                    <Button
                                      // className="retry-button"
                                      variant="outlined"
                                      color="error"
                                      // style={{
                                      //   // backgroundColor: "rgba(0, 56, 116, 1)",
                                      //   // marginLeft: "4.25vw",
                                      //   fontWeight: 420,
                                      // }}
                                    >
                                      <RiRepeat2Line
                                        style={{ fontSize: "x-large" }}
                                      />
                                      {/* Retry */}
                                      {/* <p className="retry-text">Retry</p> */}
                                    </Button>
                                  ) : // <Button className="retry-button">
                                  //   <TbReload
                                  //     size="1.4vw"
                                  //     color="rgba(237, 28, 36, 1)"
                                  //   />
                                  //   <p className="retry-text">Retry</p>
                                  // </Button>
                                  row.status === "In-progress" ? (
                                    ""
                                  ) : (
                                    <Button
                                      className="completed-button"
                                      variant="outlined"
                                      color="success"
                                      // style={{
                                      //   // backgroundColor: "rgba(0, 56, 116, 1)",
                                      //   // marginLeft: "4.25vw",
                                      //   fontWeight: 420,
                                      // }}
                                    >
                                      <MdOutlineFileDownload
                                        style={{ fontSize: "x-large" }}
                                      />
                                      {/* Download */}
                                    </Button>
                                  )}
                                </Box>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}

                    {/* {viewDetailsAction === index ? (
                    <Box
                      className="d-flex flex-column align-items-center"
                      style={{ background: "#f5f8fa", maxWidth: "73vw" }}
                    >
                      {row.subData?.map((subDetails) => (
                        <>
                          <Box
                            className="d-flex flex-row p-3"
                            style={{ width: "100%" }}
                          >
                            <span
                              style={{
                                width: "10vw",
                              }}
                            ></span>
                            <span
                              style={{
                                width: "21vw",
                                fontWeight: "400",
                                color: "rgba(96, 96, 96, 1)",
                              }}
                            >
                              Acc No:- {subDetails.accNo}
                            </span>
                            <span
                              style={{
                                width: "14.5vw",
                              }}
                            ></span>
                            <span
                              style={{
                                width: "14.5vw",
                              }}
                            ></span>
                            <span
                              style={{
                                width: "14.5vw",
                              }}
                            >
                              <Button
                                style={{
                                  backgroundColor: "rgba(0, 56, 116, 1)",
                                  marginLeft: "4.25vw",
                                  fontWeight: 420,
                                }}
                              >
                                Download
                              </Button>
                            </span>
                          </Box>
                        </>
                      ))}
                    </Box>
                  ) : (
                    ""
                  )} */}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
