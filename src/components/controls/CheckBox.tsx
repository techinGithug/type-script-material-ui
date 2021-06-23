import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import { IFormInterface } from "../Interfaces/IFormInterface";

interface CheckBoxProps extends IFormInterface {
  color: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  color,
  value,
  label,
  onChange,
}) => {
  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color={color}
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
};

export default CheckBox;
