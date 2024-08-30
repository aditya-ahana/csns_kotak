import React, { Fragment, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward, IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiRepeat2Line } from "react-icons/ri";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { requestDetails } from "../../components/data/requestsData";
import Loader from "../../components/Loader";

export default function ViewRequestDetails() {
  const { t } = useTranslation();
  const [ loading , setLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },360)
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

  const requestActions = ticketDetails.map((detail, index) => ({
    ...detail,
  }));

  // console.log("Request with Action", requestActions);

  //   {detail.status_text === "Failed" && (
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

  return (
    <Box className="page" data-testid="view-details-page">

      <Box className="view-request-details-screen">
        <Typography component="span" fontWeight={500} fontSize="1.36rem">
          {t("viewRequestDetails")}
        </Typography>
     
        <Box className="view-details-container">
        { loading === true ? (
        <Loader />
      ) : (    
          <TableContainer
            component={Paper}
            className="view-table-container"
            sx={{ boxShadow: "none", maxHeight: "33rem" }}
          >
            <Table className="details-table" stickyHeader={true}>
              <TableHead>
                <TableRow>
                  {viewRequestTableHeaders.map((header, index) => (
                    <TableCell
                      component="td"
                      key={index}
                      align="center"
                      sx={{
                        border: "1px solid rgba(225, 225, 225, 1)",
                        backgroundColor: "rgb(243, 242, 248)",
                        fontSize: "0.88rem",
                        width:
                          header === "Ticket Id"
                            ? "7.5%"
                            : header === "Reports"
                              ? "20%"
                              : header === "Status"
                                ? "10%"
                                : header === "Created Date" ||
                                    header === "Action"
                                  ? "10%"
                                  : "0%",
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
                      <TableCell
                        align="center"
                        className="view-table-data-row"
                        sx={{ borderLeftWidth: "1px", fontSize: "0.88rem" }}
                      >
                        {row.ticketId}
                      </TableCell>
                      <TableCell
                        className="view-table-data-row"
                        sx={{ fontSize: "0.88rem" }}
                      >
                        {row.request}
                      </TableCell>
                      <TableCell
                        className="view-table-data-row"
                        align="center"
                        sx={{ fontSize: "0.88rem" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                      <TableCell
                        align="center"
                        className="view-table-data-row"
                        sx={{ fontSize: "0.88rem" }}
                      >
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
                            <Typography className="retry-text">Retry</Typography>
                          </Button>
                        ) : ( */}
                          <Button
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
                          </Button>
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
                                  // key={index}
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
                                      {/* <Typography className="retry-text">Retry</Typography> */}
                                    </Button>
                                  ) : // <Button className="retry-button">
                                  //   <TbReload
                                  //     size="1.4vw"
                                  //     color="rgba(237, 28, 36, 1)"
                                  //   />
                                  //   <Typography className="retry-text">Retry</Typography>
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
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
                  )}
        </Box>
      </Box>
    </Box>
  );
}
