import React from "react";
import { IFormInterface } from "../Interfaces/IFormInterface";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";

interface RadioGroupProps extends IFormInterface {
  items: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  value,
  items,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item: any) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
