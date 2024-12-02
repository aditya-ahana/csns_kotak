import React, { useEffect, useState } from "react";
import { MdOutlineFilterAlt, MdViewCarousel } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { IoIosListBox } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MailDraft from "../../components/Modals/MailDraft";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Skeleton,
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
  TextField,
  Select,
  TablePagination,
} from "@mui/material";
import { Button } from "@mui/base/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddIcon from "@mui/icons-material/Add";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import dayjs, { Dayjs } from "dayjs";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FormControl, Input } from "@mui/material";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import Lottie from "lottie-react";
import zeroDataAnimation from "../../Dynamic/ktk_no_data.json";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";
import MaterialToast from "../../components/Snackbar";
import SearchIcon from "@mui/icons-material/Search";
import CustomModal from "../../components/Exports/CustomModal";
import CustomSelect from "../../components/Exports/CustomSelect";

export default function UserManagement() {
  const { t } = useTranslation();
  const {
    currentDate,
    userDataHeaders,
    userMgtData,
    userRoles,
    userStatusOptions,
    viewRequestHeaders,
  } = useSelector((state) => state.csns);

  const [loading, setLoading] = useState(true);
  const [userMailID, setUserMailID] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [userData, setUserData] = useState(userMgtData);
  const [retrieving, setRetrieving] = useState(true);
  const baseTime = 265;
  const [retrieveTime, setRetrieveTime] = useState(100);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [editUser, setEditUser] = useState(false);

  const [editedMailID, setEditedMailID] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const rowOptions = [4, 10, 25, 40];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const primaryTextProps = {
    fontSize: "0.825rem",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 220);
  });

  useEffect(() => {
    setTimeout(() => {
      setRetrieving(false);
    }, baseTime + retrieveTime);
  });

  const searched = searchInput.length > 0;

  function handleUserMail(event) {
    setUserMailID(event.target.value);
  }

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function handleUserRole(event) {
    setUserRole(event.target.value);
  }

  function handleEditRole(event) {
    setEditedRole(event.target.value);
  }

  function handleEditStatus(event) {
    setEditedStatus(event.target.value);
  }

  useEffect(() => {
    if (searched == true) {
      const searchedData = userMgtData.filter(
        (data) =>
          data.usermail.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.role.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.status.toLowerCase().includes(searchInput.toLowerCase())
      );
      setUserData(searchedData);
    } else {
      setUserData(userMgtData);
    }
  }, [searchInput]);

  function handleEditModal(data) {
    setEditedMailID(data.usermail);
    setEditedRole(data.role);
    setEditedStatus(data.status);
    setEditUser(true);
  }

  function handleCloseEdit() {
    setEditUser(false);
    setEditedMailID("");
    setEditedStatus("");
    setEditedRole("");
  }

  const inputControl = {
    textfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.45px solid rgb(103, 125, 106)",
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.5px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.65px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    disabledTextfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.45px solid rgb(103, 125, 106)",
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.45px solid rgb(103, 125, 106)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.45px solid rgb(103, 125, 106)",
          backgroundColor: "transparent",
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    validatedTextfield: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "1.85px solid green",
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.5px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.65px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    inputProps: {
      style: {
        fontSize: "0.88rem",
        height: "0.48rem",
      },
      // maxLength: 10,
    },
    inputLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        alignSelf: "center",
        display: "flex",
        color: "rgb(95, 105, 91)",
        alignItems: "center",
        marginTop: "0.125rem",
      },
    },
    validatedInputLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        alignSelf: "center",
        color: "green",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        marginTop: "0.125rem",
      },
    },
    textAreaProps: {
      style: {
        fontSize: "0.88rem",
        minHeight: "1.6rem",
      },
      // maxLength : 69
    },
    textAreaLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        paddingTop: "0.15rem",
        alignSelf: "center",
        display: "flex",
        color: "rgb(95, 105, 91)",
        alignItems: "center",
        height: "auto",
      },
    },
    validatedTextAreaLabelProps: {
      // shrink : true,
      size: "small",
      sx: {
        fontSize: "0.88rem",
        paddingTop: "0.15rem",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        height: "auto",
        fontWeight: 500,
        color: "green",
      },
    },
  };

  const SelectProps = {
    containerProps: {
      ".MuiOutlinedInput-notchedOutline": {
        border: "1.4px solid rgb(103, 125, 106)",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgba(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          // ? "0.25px solid grey"
          // :
          "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill:
          // ticketNumber.length === 0 || ticketDescription.length === 0
          //   ? "silver"
          // :
          "rgba(95, 99, 104, 1)",
      },
    },
    validatedContainerProps: {
      ".MuiOutlinedInput-notchedOutline": {
        border: "1.85px solid green",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1.65px solid rgb(131, 131, 210)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "1.5px solid rgb(131, 131, 210)",
      },
      ".MuiSvgIcon-root ": {
        fill: "rgba(95, 99, 104, 1) !important",
      },
    },
    USER_ROLE_PROPS: {
      PaperProps: {
        style: {
          maxHeight: "21.75rem",
          // marginTop: "-0.5rem",
          boxShadow: "1px 2px 12px 0px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const topRowIndex = page * rowsPerPage;
  const nthRowIndex = page * rowsPerPage + rowsPerPage;
  const rowCount = userData.length;

  async function handleAddUser(params) {
    try {
    } catch (error) {}
  }

  async function handleSaveUserEdit(params) {
    try {
    } catch (error) {}
  }

  return (
    <Provider store={store}>
      {/* <Typography component="span" fontWeight={500} fontSize="1.36rem">
        User Management
      </Typography> */}
      <Box className="page" data-testid="user-mgmt-page">
        <Box className="user-role-screen">
          <Box className="user-top-section" minHeight="5rem">
            {loading == true ? (
              <Loader />
            ) : (
              <Box className="user-mgt-fields">
                <FormControl
                  variant="outlined"
                  margin="none"
                  className="user-top-field"
                >
                  <TextField
                    type="email"
                    inputMode="email"
                    color="primary"
                    // autoFocus
                    sx={
                      userMailID.length > 0
                        ? inputControl.validatedTextfield
                        : inputControl.textfield
                    }
                    testid="user-mail-field"
                    InputLabelProps={
                      userMailID.length === 0
                        ? inputControl.inputLabelProps
                        : inputControl.validatedInputLabelProps
                    }
                    required
                    inputProps={{
                      style: {
                        fontSize: "0.88rem",
                        height: "0.48rem",
                      },
                      //   maxLength:
                      //     validLengths(detail)
                    }}
                    className="user-mail-input"
                    value={userMailID}
                    id="email-value"
                    placeholder={"Enter user mail ID"}
                    autoComplete="off"
                    // style={{
                    //   margin: "0rem 0rem 0rem 0rem",
                    //   fontSize: "0.88rem",
                    // }}
                    label={"User Mail ID"}
                    // FormHelperTextProps={{ sx: { color: "rgb(95, 105, 91)" } }}
                    margin="none"
                    onChange={(e) => handleUserMail(e)}
                  />
                </FormControl>

                <FormControl
                  variant="outlined"
                  margin="none"
                  className="user-top-field"
                >
                  <CustomSelect
                    label="User Roles"
                    name="User Role Dropdown"
                    id="user-role-dropdown"
                    testid="user-role-dropdown"
                    multiple={false}
                    value={userRole}
                    displayEmpty
                    disabled={false}
                    onChange={handleUserRole}
                    // variant="standard"
                    renderValue={(role) => {
                      if (userRole === "") {
                        return (
                          <Typography
                            component="span"
                            fontSize="95%"
                            color="rgb(149, 149, 149)"
                            data-testid="user-role-input-initial"
                          >
                            {/* {" "} */}
                            {"Select User Role *"}
                          </Typography>
                        );
                      }
                      return (
                        <Input
                          className="user-role-input-changed"
                          disableUnderline={true}
                          value={userRole}
                          data-testid="user-role-input-changed"
                        ></Input>
                      );
                    }}
                    inputProps={{}}
                    sx={
                      userRole.trim() === ""
                        ? SelectProps.containerProps
                        : SelectProps.validatedContainerProps
                    }
                    MenuProps={{
                      autoFocus: false,
                      ...SelectProps.USER_ROLE_PROPS,
                    }}
                    autoWidth={false}
                    className="user-role-box"
                    placeholder={"Select User Role"}
                  >
                    {userRoles.map((role, index) => (
                      <MenuItem
                        key={role}
                        value={role}
                        data-testid={`user-role-item`}
                        className={
                          role === userRole
                            ? "user-role-sel-item"
                            : "user-role-item"
                        }
                      >
                        <ListItemText
                          primary={role}
                          data-testid="user-role-listext"
                          className="user-role-listext"
                          // color="black"
                          inputMode="text"
                          primaryTypographyProps={primaryTextProps}
                        />
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </FormControl>

                <Button className="add-user-btn">
                  <AddIcon className="add-user-icon" />
                  <Typography className="add-user-text">Add User</Typography>
                </Button>
              </Box>
            )}
          </Box>

          <Box className="users-container">
            {loading == true ? (
              <Loader />
            ) : (
              <>
                <Box className="search-header">
                  <Box
                    className="searchbox"
                    // sx={{ opacity: retrieving === true ? 0.25 : 1 }}
                  >
                    <SearchIcon className="search-icon" />
                    <FormControl fullWidth>
                      <Input
                        disableUnderline
                        data-testid="searchbar"
                        type="search"
                        disabled={retrieving}
                        inputMode="search"
                        value={searchInput}
                        placeholder={"Search by role/mail"}
                        className="search-input"
                        onChange={(e) => handleSearchInput(e)}
                      ></Input>
                    </FormControl>
                  </Box>

                  <Button
                    // disabled={retrieving}
                    disabled
                    className="filter-section"
                    id="filter-menu-container"
                    data-testid="filter-menu-button"
                    // onClick={handleViewFilterMenu}
                    // style={{ opacity: retrieving === true ? 0.15 : 1 }}
                    // aria-controls={viewFilterMenu ? "filter-menu" : undefined}
                    aria-haspopup="true"
                    // aria-expanded={viewFilterMenu ? "true" : undefined}
                  >
                    <FilterAltOutlinedIcon className="filter-icon" />
                    <Typography component="span" className="filter-heading">
                      {" "}
                      {t("filter")}
                    </Typography>
                  </Button>
                </Box>

                {userData && userData.length === 0 ? (
                  <Box data-testid="lottie-data" className="no-data-lottie">
                    <Lottie
                      animationData={zeroDataAnimation}
                      autoplay
                      loop
                      className="no-data-anim"
                    />
                    <Typography className="no-data-found">
                      NO DATA FOUND
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <TableContainer
                      component={Paper}
                      className="user-data-table"
                    >
                      <Table
                        stickyHeader={true}
                        aria-label="view-request-table"
                      >
                        <TableHead>
                          <TableRow>
                            {userDataHeaders.map((header, index) => (
                              <TableCell
                                align="center"
                                key={index}
                                className="view-table-header"
                                width={
                                  header === "Sl No"
                                    ? "8%"
                                    : header === "User Email ID"
                                    ? "22%"
                                    : header === "Status"
                                    ? "15%"
                                    : header === "Role" || header === "Status"
                                    ? "15.5%"
                                    : header === "Action"
                                    ? "18%"
                                    : "0%"
                                }
                                sx={{
                                  borderLeftWidth:
                                    header === "Sl No" ? "1px" : "0px",
                                  borderTopLeftRadius:
                                    header === "Sl No" ? "4px" : "0px",
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
                          {userData
                            .slice(topRowIndex, nthRowIndex)
                            .map((data, index) => (
                              <TableRow key={index} className="table-body-row">
                                <TableCell
                                  key={index}
                                  className="vr-ticketid"
                                  sx={{
                                    borderBottomLeftRadius:
                                      nthRowIndex === index + 1 ? "4px" : "0px",
                                  }}
                                  align="center"
                                >
                                  <Box align="center">
                                    {retrieving === true ? (
                                      <Skeleton
                                        className="user-slno-skel"
                                        animation="pulse"
                                        variant="text"
                                      />
                                    ) : (
                                      <Typography fontSize="0.88rem">
                                        {data.slNo}
                                      </Typography>
                                    )}
                                  </Box>
                                </TableCell>

                                <TableCell className="vr-reports">
                                  <Box alignSelf="center">
                                    <Box align="center">
                                      {retrieving === true ? (
                                        <Skeleton
                                          className="user-email-skel"
                                          animation="pulse"
                                          variant="text"
                                          width="100%"
                                        />
                                      ) : (
                                        <Typography fontSize="0.88rem">
                                          {data.usermail}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                </TableCell>

                                <TableCell
                                  align="center"
                                  className="view-table-data-row"
                                >
                                  <Box align="center">
                                    {retrieving === true ? (
                                      <Skeleton
                                        className="user-role-skel"
                                        animation="pulse"
                                        variant="text"
                                      />
                                    ) : (
                                      <Typography fontSize="0.88rem">
                                        {data.role}
                                      </Typography>
                                    )}
                                  </Box>
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
                                            data.status === "Active"
                                              ? "rgba(205, 252, 229, 1)"
                                              : data.status === "Inactive"
                                              ? "rgba(255, 220, 222, 1)"
                                              : "",
                                          color:
                                            data.status === "Active"
                                              ? "rgba(21, 122, 73, 1)"
                                              : data.status === "Inactive"
                                              ? "rgba(210, 26, 26, 1)"
                                              : "",
                                        }}
                                      >
                                        <Typography
                                          component="span"
                                          fontSize="0.88rem"
                                          fontWeight={600}
                                        >
                                          {data.status}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                </TableCell>

                                <TableCell
                                  className="view-table-data-row"
                                  sx={{
                                    borderBottomRightRadius:
                                      nthRowIndex === index + 1 ? "4px" : "0px",
                                  }}
                                >
                                  <Box className="detail-buttons">
                                    {retrieving === true ? (
                                      <Skeleton
                                        className="vr-action-skel"
                                        animation="pulse"
                                        variant="rounded"
                                      />
                                    ) : (
                                      <Button
                                        variant="outlined"
                                        // title="view-details-button"
                                        className="user-edit-btn"
                                        data-testid={`user-edit-btn-${index}`}
                                        onClick={() => handleEditModal(data)}
                                      >
                                        <Typography
                                          component="span"
                                          fontWeight={500}
                                          fontSize="0.96rem"
                                          color="rgba(63, 136, 215, 1)"
                                        >
                                          {/* {" "} */}
                                          {"Edit"}
                                        </Typography>
                                      </Button>
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <CustomModal
                      // key={index}
                      open={editUser}
                      onClose={handleCloseEdit}
                      testid="edit-user-modal"
                      contentLabel="Edit User Interface"
                      keepMounted={true}
                    >
                      <Box className="user-edit-dialog">
                        <Box className="edit-modal-header">
                          <Typography
                            color="black"
                            fontSize="1.5rem"
                            fontWeight={500}
                          >
                            Edit
                          </Typography>
                          <Button
                            title="Close Edit"
                            className="close-edit-button"
                            onClick={handleCloseEdit}
                          >
                            <CloseOutlinedIcon
                              name="close-edit"
                              className="close-edit-icon"
                            />
                          </Button>
                        </Box>

                        <Box className="user-edit-section">
                          <FormControl
                            variant="outlined"
                            margin="none"
                            className="user-edit-field"
                          >
                            <TextField
                              type="email"
                              inputMode="email"
                              color="primary"
                              fullWidth
                              InputProps={{ readOnly: true }}
                              sx={inputControl.disabledTextfield}
                              data-testid="selected-mail-field"
                              inputProps={{
                                style: {
                                  fontSize: "0.88rem",
                                  height: "0.48rem",
                                },
                              }}
                              className="selected-mail-input"
                              value={editedMailID}
                            />
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            margin="none"
                            className="user-edit-field"
                          >
                            <CustomSelect
                              label="Edit Roles"
                              name="Edit Role Dropdown"
                              id="edit-role-dropdown"
                              testid="edit-role-dropdown"
                              multiple={false}
                              value={editedRole}
                              displayEmpty
                              disabled={false}
                              onChange={handleEditRole}
                              // variant="standard"
                              renderValue={(role) => {
                                if (editedRole === "") {
                                  return (
                                    <Typography
                                      component="span"
                                      fontSize="95%"
                                      color="grey"
                                      data-testid="edit-role-input-initial"
                                    >
                                      {/* {" "} */}
                                      {"Select Role"}
                                    </Typography>
                                  );
                                }
                                return (
                                  <Input
                                    className="edit-role-input-changed"
                                    disableUnderline={true}
                                    value={editedRole}
                                    data-testid="edit-role-input-changed"
                                  ></Input>
                                );
                              }}
                              inputProps={{}}
                              sx={
                                // editedRole.trim() === ""
                                //   ?
                                SelectProps.containerProps
                                // : SelectProps.validatedContainerProps
                              }
                              MenuProps={{
                                autoFocus: false,
                                ...SelectProps.USER_ROLE_PROPS,
                              }}
                              autoWidth={false}
                              className="edit-role-box"
                              placeholder={"Edit User Role"}
                            >
                              {userRoles.map((role, index) => (
                                <MenuItem
                                  key={role}
                                  value={role}
                                  data-testid={`user-role-item`}
                                  className={
                                    role === userRole
                                      ? "user-role-sel-item"
                                      : "user-role-item"
                                  }
                                >
                                  <ListItemText
                                    primary={role}
                                    data-testid="user-role-listext"
                                    className="user-role-listext"
                                    // color="black"
                                    inputMode="text"
                                    primaryTypographyProps={primaryTextProps}
                                  />
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            margin="none"
                            className="user-edit-field"
                          >
                            <CustomSelect
                              label="User Status"
                              name="User Status Dropdown"
                              id="user-status-dropdown"
                              testid="user-status-dropdown"
                              multiple={false}
                              value={editedStatus}
                              displayEmpty
                              disabled={false}
                              onChange={handleEditStatus}
                              // variant="standard"
                              renderValue={(status) => {
                                return (
                                  <Input
                                    className="edit-status-input-changed"
                                    disableUnderline={true}
                                    value={editedStatus}
                                    data-testid="edit-status-input-changed"
                                  ></Input>
                                );
                              }}
                              inputProps={{}}
                              sx={
                                // editedRole.trim() === ""
                                //   ?
                                SelectProps.containerProps
                                // : SelectProps.validatedContainerProps
                              }
                              MenuProps={{
                                autoFocus: false,
                                ...SelectProps.USER_ROLE_PROPS,
                              }}
                              autoWidth={false}
                              className="edit-status-box"
                              placeholder={"Edit User Status"}
                            >
                              {userStatusOptions.map((status, index) => (
                                <MenuItem
                                  key={status}
                                  value={status}
                                  data-testid={`user-status-item`}
                                  className={
                                    status === editedStatus
                                      ? "user-status-sel-item"
                                      : "user-status-item"
                                  }
                                >
                                  <ListItemText
                                    primary={status}
                                    data-testid="user-status-listext"
                                    className="user-status-listext"
                                    // color="black"
                                    inputMode="text"
                                    primaryTypographyProps={primaryTextProps}
                                  />
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </FormControl>

                          <Button className="save-user-btn">
                            <Typography className="save-user-text">
                              Save
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                    </CustomModal>
                  </>
                )}
              </>
            )}

            {loading == false && userData.length > 0 && (
              <Box className="table-pagination" alignSelf="flex-end">
                <TablePagination
                  rowsPerPageOptions={rowOptions}
                  data-testid="view-request-pagination"
                  className="vr-pagination"
                  component="div"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "rgba(0, 0, 0, 0.56)",
                      fontSize: "1.25rem",
                    },
                    "& .MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root": {
                      opacity: 0.25,
                    },
                  }}
                  count={rowCount}
                  slotProps={{
                    select: {
                      renderValue: (value) => (
                        <Typography
                          fontSize="0.85rem"
                          component="span"
                          data-testid="rows-display"
                        >
                          {value}
                        </Typography>
                      ),
                      IconComponent: (props) => (
                        <KeyboardArrowDownOutlinedIcon
                          className="select-icon"
                          // sx={{
                          //   color: "rgba(115, 115, 115, 1)",
                          //   marginTop: "0.002rem",
                          // }}
                          {...props}
                        />
                      ),
                      variant: "outlined",
                      SelectDisplayProps: {
                        "data-testid": "paginate-select",
                      },
                      input: (
                        <OutlinedInput
                          fullWidth={true}
                          value={rowCount}
                          data-testid="paginate-select-input"
                          className="paginate-select-input"
                          sx={{
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
                      sx: {
                        width: "auto",
                        padding: "0.6rem",
                        marginTop: "0.2rem",
                        marginLeft: "-3.5%",
                      },
                      MenuProps: {
                        sx: {
                          fontSize: "0.2rem",
                        },
                        MenuListProps: {
                          sx: {},
                        },
                      },
                    },
                  }}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage={
                    <Box className="rows-per-page" component="span">
                      <Typography
                        component="span"
                        fontSize="0.88rem"
                        alignSelf="center"
                        color="rgba(0, 0, 0, 0.6)"
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
            )}
          </Box>
        </Box>
      </Box>
    </Provider>
  );
}
