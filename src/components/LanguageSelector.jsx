import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", desc: "English" },
  { code: "hi", desc: "हिंदी" },
];
export default function LanguageSelector(props) {
  const { i18n } = useTranslation();

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ minWidth: 111 }}>
      <FormControl fullWidth size="small">
        <Select
          defaultValue={i18n.language}
          data-testid={props.datatestid}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          {languages.map((lang, langIndex) => (
            <MenuItem data-testid={`language-dropdown-menuitem-${langIndex}`} value={lang.code}>{lang.desc}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
