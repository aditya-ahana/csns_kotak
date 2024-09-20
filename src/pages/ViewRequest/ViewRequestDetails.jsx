import React, { Fragment, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

// import { MdOutlineFileDownload } from "react-icons/md";

import {
  Skeleton,
  Button,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiRepeat2Line } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

import { useTranslation } from "react-i18next";

import Loader from "../../components/Loader";
// import  from "@mui/material/IconButton";

// import sandBox from "../../static/sandBox.gif";
import sandBox from "../../static/sandClock.gif";
import { Provider, useSelector } from "react-redux";
import store from "../../Redux/reduxStore";

// import  from "@mui/material/Tooltip";

export default function ViewRequestDetails() {
  const requestDetails = useSelector((state) => state.csns.requestDetails);
  const requestList = useSelector((state) => state.csns.requestList);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [retrieving, setRetrieving] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  });

  useEffect(() => {
    setTimeout(() => {
      setRetrieving(false);
    }, 600);
  });

  const [viewRequestDetailsAction, setViewRequestDetailsAction] = useState();

  const location = useLocation();
  //  const { ticketDetails } = location.state;
  const current_date = new Date();
  const viewRequestTableHeaders = [
    "Ticket Id",
    "Reports",
    "Status",
    "Created Date",
    "Action",
  ];
  const route_to = useNavigate();

  const ticketDetails = requestDetails.map((request, index) => ({
    ticketid: request.ticketId,
    request: request.request,
    status: request.status,
    createdDate: request.createdDateTime,
    createdby: request.createdBy,
  }));

  // console.log("Request with Action", requestActions);

  //   {row.status_text === "Failed" && (
  //   <Button className="retry-button">
  //   <TbReload size="1.4vw" color="rgba(237, 28, 36, 1)" />
  //   <Typography className="retry-text">Retry</Typography>
  // </Button>
  // )}

  const handleSelectedIndex = (event, index) => {
    if (viewRequestDetailsAction === index) {
      setViewRequestDetailsAction();
    } else {
      setViewRequestDetailsAction(index);
    }
  };

  const excelDetails = requestList.map((request, index) => ({
    ticketid: request.ticketId,
    requests: request.requests[0],
    status: request.status,
    createdDate: request.createdDate,
    requester: request.requester,
  }));

  const excelDetailHeaders = [
    "TICKET ID",
    "REQUESTS",
    "STATUS",
    "CREATED DATE",
    "REQUESTER",
  ];

  async function handleExcelDownload(filename) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(ticketDetails);
    const worksheetColumns = [];

    const maxColumnLength = 10;

    excelDetailHeaders.map((headerText) => {
      worksheetColumns.push({ wch: headerText.length + maxColumnLength });
    });
    worksheet["!cols"] = worksheetColumns;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet-1");
    XLSX.utils.sheet_add_aoa(worksheet, [excelDetailHeaders], {
      origin: "A1",
    });
    XLSX.utils.sheet_add_aoa(worksheet, [excelDetails], { origin: "A2" });

    XLSX.writeFile(workbook, `TicketDetails_${filename}.xlsx`, {
      compression: true,
    });
  }

  return (
    <Provider store={store}>
      <Box className="page" data-testid="view-details-page">
        <Box className="view-request-details-screen">
          <Typography component="span" className="page-heading">
            {t("viewRequestDetails")}
          </Typography>

          <Box className="view-details-container">
            {loading === true ? (
              <Loader />
            ) : (
              <>
                <Box
                  className="d-flex justify-content-end"
                  width="-webkit-fill-available"
                >
                  <Button
                    variant="outlined"
                    startIcon={<MdOutlineFileDownload />}
                    className="download-all"
                  >
                    {t("downloadAll")}
                  </Button>
                  <div className="p-1"></div>
                  <Button variant="contained" color="error" className="fw-bold">
                    {t("closeTicket")}
                  </Button>
                </Box>
                <div className="p-1"></div>
                <TableContainer
                  component={Paper}
                  className="view-table-container"
                >
                  <Table className="details-table" stickyHeader={true}>
                    <TableHead>
                      <TableRow>
                        {viewRequestTableHeaders.map((header, index) => (
                          <TableCell
                            component="td"
                            key={index}
                            className="view-table-header"
                            align="center"
                            width={
                              header === "Ticket Id"
                                ? "7.5%"
                                : header === "Reports"
                                ? "20%"
                                : header === "Status"
                                ? "10%"
                                : header === "Created Date" ||
                                  header === "Action"
                                ? "10%"
                                : "0%"
                            }
                            sx={{
                              borderLeftWidth:
                                header === "Ticket Id" ? "1px" : "0px",
                              borderTopLeftRadius:
                                header === "Ticket Id" ? "4px" : "0px",
                              borderTopRightRadius:
                                header === "Action" ? "4px" : "0px",
                            }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody className="view-table-body">
                      {requestDetails.map((row, index) => (
                        <Fragment key={index}>
                          <TableRow>
                            <TableCell align="center" className="vr-ticketid">
                              {retrieving ? (
                                <Skeleton
                                  variant="text"
                                  className="vr-ticketid-skel"
                                />
                              ) : (
                                <Typography fontSize="0.88rem">
                                  {row.ticketId}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell className="view-table-data-row">
                              {retrieving ? (
                                <Skeleton
                                  variant="text"
                                  className="vr-reports-skel"
                                />
                              ) : (
                                <Typography fontSize="0.88rem">
                                  {row.request}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="center" className="vr-status">
                              <Box align="center">
                                {retrieving === true ? (
                                  <Skeleton
                                    className="vr-status-skel"
                                    animation="pulse"
                                    variant="rounded"
                                  />
                                ) : (
                                  <Box
                                    alignSelf="center"
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
                                    <Typography
                                      component="span"
                                      fontSize="0.88rem"
                                      fontWeight={600}
                                    >
                                      {row.status}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="view-table-data-row"
                            >
                              <Box align="center">
                                {retrieving === true ? (
                                  <Skeleton
                                    className="vr-date-skel"
                                    animation="pulse"
                                    variant="text"
                                  />
                                ) : (
                                  <Typography fontSize="0.88rem">
                                    {row.createdDateTime}
                                  </Typography>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              className="view-table-data-row"
                            >
                              <Box className="d-flex align-item-center justify-content-center">
                                {/* {row.status === "Failed" ? (
                          <Button className="retry-button">
                            <TbReload
                              size="1.4vw"
                              color="rgba(237, 28, 36, 1)"
                            />
                            <Typography className="retry-text">Retry</Typography>
                          </Button>
                        ) : ( */}

                                {retrieving ? (
                                  <IconButton className="expand-button">
                                    <Skeleton
                                      variant="circular"
                                      width={32}
                                      height={32}
                                      sx={{
                                        backgroundColor: "rgb(227, 226, 233)",
                                        alignSelf: "center",
                                      }}
                                    />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    className="expand-button"
                                    onClick={(event) =>
                                      handleSelectedIndex(event, index)
                                    }
                                    data-testid={`accordion-displayer-${index}`}
                                  >
                                    <ExpandCircleDownOutlinedIcon
                                      sx={{
                                        transform:
                                          viewRequestDetailsAction === index
                                            ? "rotate(180deg)"
                                            : "",
                                      }}
                                      className="expand-icon"
                                      data-testid={`accordion-hider-${index}`}
                                    />
                                  </IconButton>
                                )}

                                {/* <Button
                                className="expand-button"
                                onClick={(event) =>
                                  handleSelectedIndex(event, index)
                                }
                                data-testid={`accordion-displayer-${index}`}
                              >
                                <ExpandCircleDownOutlinedIcon
                                  sx={{
                                    color: "rgba(95, 99, 104, 0.87)",
                                    fontSize: "2rem",
                                    transform:
                                      viewRequestDetailsAction === index
                                        ? "rotate(180deg)"
                                        : "",
                                  }}
                                  color="rgba(95, 99, 104, 1)"
                                  className="expand-icon"
                                  data-testid={`accordion-hider-${index}`}
                                />
                              </Button> */}
                                {/* )} */}
                              </Box>
                            </TableCell>
                          </TableRow>

                          {viewRequestDetailsAction === index ? (
                            <Fragment key={index}>
                              {row.subData?.map((subDetails, subIndex) => (
                                <Fragment key={subIndex}>
                                  <TableRow
                                    className="expanded-view"
                                    data-testid={`sub-data-display-${subIndex}`}
                                    key={subIndex}
                                  >
                                    <TableCell
                                      // height="6vh"
                                      className="border-0 p-0"
                                    >
                                      {/* {row.ticketId} */}
                                    </TableCell>
                                    <TableCell className="border-0">
                                      <Box
                                        // style={{ alignSelf: "center" }}
                                        className="d-flex align-items-center justify-content-start"
                                      >
                                        <Typography
                                          component="span"
                                          fontSize="0.85rem"
                                          // key={index}
                                          // style={{ lineHeight: "1.5vh" }}
                                        >
                                          Acc No:- {subDetails.accNo}
                                        </Typography>
                                      </Box>
                                    </TableCell>
                                    <TableCell className="border-0 p-0">
                                      <Box className="d-flex align-items-center justify-content-center">
                                        <Box
                                          // alignSelf={"center"}
                                          className="view-table-status-buttons fw-bold"
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
                                          <Typography
                                            component="span"
                                            fontSize="0.88rem"
                                            fontWeight={600}
                                          >
                                            {row.status}
                                          </Typography>
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
                                          <Tooltip title="Retry">
                                            <IconButton color="error">
                                              <TbRefresh
                                                style={{ fontSize: "x-large" }}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                        ) : // <Button
                                        //   // className="retry-button"
                                        //   variant="outlined"
                                        //   color="error"
                                        //   // style={{
                                        //   //   // backgroundColor: "rgba(0, 56, 116, 1)",
                                        //   //   // marginLeft: "4.25vw",
                                        //   //   fontWeight: 420,
                                        //   // }}
                                        // >
                                        //   <RiRepeat2Line
                                        //     style={{ fontSize: "x-large" }}
                                        //   />
                                        //   {/* Retry */}
                                        //   {/* <Typography className="retry-text">Retry</Typography> */}
                                        // </Button>
                                        // <Button className="retry-button">
                                        //   <TbReload
                                        //     size="1.4vw"
                                        //     color="rgba(237, 28, 36, 1)"
                                        //   />
                                        //   <Typography className="retry-text">Retry</Typography>
                                        // </Button>
                                        row.status === "In-progress" ? (
                                          <Tooltip title="Loading">
                                            <img
                                              src={sandBox}
                                              alt="Sand Box"
                                              className="sand-box"
                                            />
                                          </Tooltip>
                                        ) : (
                                          <Tooltip title="Download">
                                            <IconButton color="success">
                                              <MdOutlineFileDownload fontSize="x-large" />
                                            </IconButton>
                                          </Tooltip>

                                          // <Button
                                          //   className="completed-button"
                                          //   variant="outlined"
                                          //   color="success"
                                          //   // style={{
                                          //   //   // backgroundColor: "rgba(0, 56, 116, 1)",
                                          //   //   // marginLeft: "4.25vw",
                                          //   //   fontWeight: 420,
                                          //   // }}
                                          // >
                                          //   <MdOutlineFileDownload
                                          //     style={{ fontSize: "x-large" }}
                                          //   />
                                          // </Button>
                                        )}
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                </Fragment>
                              ))}
                            </Fragment>
                          ) : (
                            <></>
                          )}

                          {/* {viewRequestDetailsAction === index ? (
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
                            <Typography component="span"
                              sx={{
                                width: "10vw",
                              }}
                            ></Typography>
                            <Typography component="span"
                              sx={{
                                width: "21vw",
                                fontWeight: "400",
                                color: "rgba(96, 96, 96, 1)",
                              }}
                            >
                              Acc No:- {subDetails.accNo}
                            </Typography>
                            <Typography component="span"
                              sx={{
                                width: "14.5vw",
                              }}
                            ></Typography>
                            <Typography component="span"
                              sx={{
                                width: "14.5vw",
                              }}
                            ></Typography>
                            <Typography component="span"
                              sx={{
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
                            </Typography>
                          </Box>
                        </>
                      ))}
                    </Box>
                  ) : (
                    ""
                  )} */}
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Provider>
  );
}
