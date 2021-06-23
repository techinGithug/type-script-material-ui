import React from "react";
import { TextField } from "@material-ui/core";
import { IFormInterface as InputProps } from "../Interfaces/IFormInterface";

const Input: React.FC<InputProps> = ({
  name,
  label,
  error = null,
  value,
  onChange,
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
