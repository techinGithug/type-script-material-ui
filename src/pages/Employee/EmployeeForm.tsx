import { Grid } from "@material-ui/core";
import React, { FormEvent, useEffect } from "react";
import { useForm, Form } from "../../components/useForm";
import Controls from "../../components/controls/Controls";
import * as employeeService from "../../services/EmployeeService";

const initialFValues: any = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

interface EmployeeFormProps {
  addOrEdit?: any;
  recordForEdit?: any;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  addOrEdit,
  recordForEdit,
}) => {
  const validate = (fieldValidate = values) => {
    let temp: any = { ...errors };
    if ("fullName" in fieldValidate) {
      temp.fullName = fieldValidate.fullName ? "" : "This field is required.";
    }
    if ("email" in fieldValidate) {
      temp.email = /$^|.+@.+..+/.test(fieldValidate.email)
        ? ""
        : "Email is not valid.";
    }
    if ("mobile" in fieldValidate) {
      temp.mobile =
        fieldValidate.mobile.length > 9 ? "" : "Minimun 10 number required.";
    }
    if ("city" in fieldValidate) {
      temp.city = fieldValidate.city ? "" : "This field is required.";
    }
    if ("departmentId" in fieldValidate) {
      temp.departmentId =
        fieldValidate.departmentId.length !== 0
          ? ""
          : "This field is required.";
    }
    setErrors({
      ...temp,
    });

    if (fieldValidate === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Controls.Input
            name="fullName"
            label="Full name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="mobile"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
            error={errors.city}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            items={genderItems}
            onChange={handleInputChange}
          />
          <Controls.Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollections()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            name="hireDate"
            label="Hire date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.CheckBox
            name="isPermanent"
            color="primary"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button text="Submit" type="submit" color="primary" />
            <Controls.Button
              text="Reset"
              type="reset"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
