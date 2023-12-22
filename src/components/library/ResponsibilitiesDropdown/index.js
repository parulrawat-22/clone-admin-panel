import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ResponsibilitiesDropdown({
  options,
  responsibilities,
  setResponsibilities,
  error,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setResponsibilities(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const selectedOptions = responsibilities?.map((item) => {
    return item.name;
  });

  console.log("responsibilities", responsibilities);

  return (
    <>
      <div className="input_parent_div ">
        <label className="label_style" style={{ display: "block" }}>
          Select Responsibilities
        </label>
        <div className="input_wrapper select_checkbox_parent_wrapper">
          <FormControl className="select_checkbox_wrapper">
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-simple-select-helper"
              multiple
              value={responsibilities}
              onChange={handleChange}
              renderValue={(selected) =>
                selected.map((item) => item.name + ", ")
              }
              MenuProps={MenuProps}
              className="select_checkbox"
            >
              {options?.map((option) => (
                <MenuItem key={option?.name} value={option}>
                  <Checkbox
                    checked={selectedOptions?.indexOf(option.name) > -1}
                  />
                  <ListItemText primary={option?.name?.replace("List", "")} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <p className="input_error" style={{ display: error ? "flex" : "none" }}>
          *{error}
        </p>
      </div>
    </>
  );
}
