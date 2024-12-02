import { OutlinedInput, Select } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import React from "react";

export default function CustomSelect(props) {
  return (
    <Select
      id={props.id}
      value={props.value}
      label={props.label}
      multiple={props.multiple}
      name={props.name}
      data-testid={props.testid}
      displayEmpty
      onChange={(e) => {
        props.onChange(e);
      }}
      sx={props.sx}
      disabled={props.disabled}
      input={<OutlinedInput fullWidth={true} />}
      IconComponent={(props) => (
        <KeyboardArrowDownOutlinedIcon
          className="select-icon"
          {...props}
        />
      )}
      renderValue={props.renderValue}
      MenuProps={props.MenuProps}
      inputProps={props.inputProps}
      autoWidth={props.autoWidth}
      variant="outlined"
      style={props.style}
      className={props.className}
      placeholder={props.placeholder}
    >
      {props.children}
    </Select>
  );
}
