import react, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../static/logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //   const handleMouseDownPassword = (
  //     event: React.MouseEvent<HTMLButtonElement>
  //   ) => {
  //     event.preventDefault();
  //   };

  return (
    <>
      <div className="parent" style={{ backgroundColor: "rgb(235 235 235)" }}>
        <div className="main" style={{ height: "100vh" }}>
          <div
            className="logoHeader d-flex align-items-center justify-content-start"
            style={{ height: "10vh" }}
          >
            <div className="p-4">
              <img src={logo} alt="Kotak Logo" style={{ width: "15vh" }} />
            </div>
          </div>

          <div className="center" style={{ height: "80vh" }}>
            <div
              className="p-4 bg-white rounded"
              style={{ width: "75vh", boxShadow: "0px 0px 13px -6px gray" }}
            >
              <div className="d-flex flex-column justify-content-start">
                <h3 className="logoRedColor" style={{ fontWeight: "600" }}>
                  Sign In
                </h3>
                <div className="inputs-fields">
                  {/* <TextField
                  label="Username"
                  placeholder="abc@example.com"
                  style={{ width: "100%" }}
                  // id="outlined-size-normal"
                  // defaultValue="Normal"
                />
                <TextField
                  label="Password"
                  placeholder="Enter your password"
                  // id="outlined-size-normal"
                  // defaultValue="Normal"
                /> */}

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
                      <input type="checkbox" name="" id="" />
                      <span> Remember me</span>
                    </div>
                    {/* <span>Forgot Password?</span> */}
                  </div>
                </div>
              </div>
              <div className="p-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
