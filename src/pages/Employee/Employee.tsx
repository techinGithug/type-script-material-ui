import React, { ChangeEvent, useState } from "react";

import Controls from "../../components/controls/Controls";
import ComfirmDialog from "../../components/ComfirmDialog";
import EmployeeForm from "./EmployeeForm";
import Notification from "../../components/Notification";
import PageHeader from "../../components/PageHeader";
import Popup from "../../components/Popup";
import { useTable } from "../../components/useTable";

import AddIcon from "@material-ui/icons/Add";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

import * as EmployeeService from "../../services/EmployeeService";

import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

// import {Close as CloseIcon, EditOutlined as EditOutlinedIcon} from "@material-ui/icons";

const useStyels = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(2),
    margin: theme.spacing(4),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells: any = () => [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disbleSorting: true },
  { id: "actions", label: "Actions", disbleSorting: true },
];

let ConfirmDialog = {
  isOpen: false,
  title: "",
  subTitle: "",
};

const Employee: React.FC = () => {
  const [confirmDialog, setConfirmDialog] = useState<any>(ConfirmDialog);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items: any) => {
      return items;
    },
  });
  const [notify, setNotify] = useState<any>({
    isOpen: false,
    message: "",
    type: "",
  });
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState<any>(
    EmployeeService.getAllEmployees()
  );

  const classes = useStyels();

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaginationSorting,
  } = useTable(records, headCells(), filterFn);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let target = event.target;
    setFilterFn({
      fn: (items: any) => {
        if (target.value === "") {
          return items;
        } else {
          let res = items.filter((x: any) =>
            x.fullName.toLowerCase().includes(target.value)
          );
          return res;
        }
      },
    });
  };

  const addOrEdit = (employee: any, resetForm: any) => {
    if (employee.id === 0) {
      EmployeeService.insertEmployees(employee);
    } else {
      EmployeeService.updateEmployees(employee);
    }
    resetForm();
    setOpenPopup(false);
    setRecordForEdit(null);
    setRecords(EmployeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item: any) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    EmployeeService.deleteEmployee(id);
    setRecords(EmployeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      {/* <PageHeader
        title="New employee"
        subTitle="Form design with validation"
        icon={<PeopleAltOutlinedIcon fontSize="large" />}
      /> */}
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm addOrEdit={addOrEdit} /> */}
        <Toolbar>
          <Controls.InputSearch
            label="Search Employees"
            onChange={handleChange}
            styles={classes.searchInput}
          />
          <Controls.Button
            text="Add New"
            type="button"
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaginationSorting().map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => openInPopup(item)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation!",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ComfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Employee;
