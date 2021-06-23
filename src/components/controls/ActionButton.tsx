import React from "react";
import { Button, makeStyles } from "@material-ui/core";
// import { ClassNameMap } from "@material-ui/styles";
import clsx from "clsx";

interface ActionButtonProps {
  color?: string | undefined;
  children?: object;
  onClick?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
    "&.primary": {
      backgroundColor: theme.palette.primary.light,
      "& .MuiButton-label": {
        color: theme.palette.primary.main,
      },
    },
    "&.secondary": {
      backgroundColor: theme.palette.secondary.light,
      "& .MuiButton-label": {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

// const actionButtonStyles = (
//   color: string | undefined,
//   classes: ClassNameMap
// ) => {
//   if (color === "primary") {
//     return classes.primary;
//   } else if (color === "secondary") {
//     return classes.secondary;
//   }
// };

const ActionButton: React.FC<ActionButtonProps> = ({
  color,
  children,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button className={clsx(classes.root, color)} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ActionButton;
