import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

// import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "antd";
// import { Checkbox } from "antd";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import logo from "../../static/logo.png";

export default function Login() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function signInHandle(e) {
    nav("/Dashboard");
  }

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className="parent"
        // style={{ backgroundColor: "rgba(245, 248, 250, 1)" }}
      >
        <div className="main" style={{ height: "100vh" }}>
          <div
            className="logoHeader d-flex align-items-center justify-content-start"
            style={{ height: "15vh" }}
          >
            <div className="p-5">
              <img src={logo} alt="Kotak Logo" style={{ width: "21vh" }} />
            </div>
          </div>

          <div className="center" style={{ height: "72vh" }}>
            <div
              className="p-4 bg-white rounded"
              style={{ width: "70vh", boxShadow: "0px 0px 13px -6px gray" }}
            >
              <div className="d-flex flex-column justify-content-start">
                <h3 className="logoRedColor" style={{ fontWeight: "600" }}>
                  Sign In
                </h3>
                <div className="inputs-fields">
                  <div className="p-2"></div>

                  {/* username */}

                  <FormControl
                    style={{ width: "100%", height: "3.25rem" }}
                    variant="outlined"
                    className="height3rem"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Username
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end"></InputAdornment>
                      }
                      label="Username"
                      placeholder="Eg: abc@example.com"
                    />
                  </FormControl>

                  {/* <FormControl style={{ width: "100%" }} variant="outlined">
                    <InputLabel>Username</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="text"
                      placeholder="abc@example.com"
                      label="Username"
                    />
                  </FormControl> */}

                  <div className="p-2"></div>

                  {/* password */}

                  <FormControl
                    style={{ width: "100%", height: "3.25rem" }}
                    variant="outlined"
                    // className="height3rem"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      placeholder="Enter your password"
                    />
                  </FormControl>

                  {/* <FormControl style={{ width: "100%" }} variant="outlined">
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            //   onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl> */}

                  <div className="p-1"></div>

                  <div className="d-flex justify-content-start">
                    <div>
                      {/* <input type="checkbox" name="" id="" />
                      <span> Remember me</span> */}

                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember Me"
                      />

                      {/* <Checkbox>Remember Me</Checkbox> */}
                    </div>
                    {/* <span>Forgot Password?</span> */}
                  </div>
                  <div className="p-2"></div>
                  {/* login button */}
                  <Button
                    type="primary"
                    // danger
                    className=" logoColorBtn rounded height3rem"
                    onClick={(e) => {
                      signInHandle();
                    }}
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      fontSize: "large",
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
