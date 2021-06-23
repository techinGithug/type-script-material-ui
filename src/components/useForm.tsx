import React, { useState, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core";

export const useForm = (
  initialFValues: any,
  validateOnChange = false,
  validate: any
) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = (): void => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

export const Form = (props: any) => {
  const { children, ...other } = props;
  const classes = useStyles();
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
};
