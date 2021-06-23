import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "320px",
    height: "100%",
    backgroundColor: "#253053",
  },
});

const SideMenu: React.FC = () => {
  const classes = useStyle();
  return <div className={classes.sideMenu}></div>;
};

export default SideMenu;