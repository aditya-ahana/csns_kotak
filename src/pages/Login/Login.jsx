import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Button } from "antd";
import { Checkbox } from "antd";

import logo from "../../static/logo.png";

export default function Login() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function signInHandle(e) {
    nav("/dashboard");
  }

  return (
    <>
      <div className="parent" style={{ backgroundColor: "rgb(235 235 235)" }}>
        <div className="main" style={{ height: "100vh" }}>
          <div
            className="logoHeader d-flex align-items-center justify-content-start"
            style={{ height: "10vh" }}
          >
            <div className="p-4">
              <img src={logo} alt="Kotak Logo" style={{ width: "18vh" }} />
            </div>
          </div>

          <div className="center" style={{ height: "81vh" }}>
            <div
              className="p-4 bg-white rounded boxHover"
              style={{ width: "66vh", boxShadow: "0px 0px 13px -6px gray" }}
            >
              <div className="d-flex flex-column justify-content-start">
                <h3 className="logoRedColor" style={{ fontWeight: "600" }}>
                  Sign In
                </h3>
                <div className="inputs-fields">
                  <div className="p-2"></div>

                  {/* username */}
                  <FormControl style={{ width: "100%" }} variant="outlined">
                    <InputLabel>Username</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type="text"
                      placeholder="abc@example.com"
                      label="Username"
                    />
                  </FormControl>

                  <div className="p-2"></div>

                  {/* password */}
                  <FormControl style={{ width: "100%" }} variant="outlined">
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
                  </FormControl>

                  <div className="p-2"></div>

                  <div className="d-flex justify-content-start">
                    <div>
                      {/* <input type="checkbox" name="" id="" />
                      <span> Remember me</span> */}

                      <Checkbox>Remember Me</Checkbox>
                    </div>
                    {/* <span>Forgot Password?</span> */}
                  </div>
                  <div className="p-2"></div>
                  {/* login button */}
                  <Button
                    type="primary"
                    danger
                    className="rounded"
                    onClick={(e) => {
                      signInHandle();
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
