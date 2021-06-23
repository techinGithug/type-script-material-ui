import React from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { IFormInterface } from "../Interfaces/IFormInterface";

interface InputSearchProps extends IFormInterface {
  styles?: any;
}

const InputSearch: React.FC<InputSearchProps> = ({
  value,
  label,
  onChange,
  styles,
}) => {
  return (
    <FormControl fullWidth variant="outlined" size="small" className={styles}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
        labelWidth={135}
      />
    </FormControl>
  );
};

export default InputSearch;
