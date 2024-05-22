import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#212322" }}>
      <Toolbar>
        <img
          alt="Logo"
          style={{ height: "50px", marginRight: "auto" }}
        />
        <Typography variant="h6" sx={{ marginLeft: "20px" }}>
          <Link to="/landingpage" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
        </Typography>
        <Typography variant="h6" sx={{ marginLeft: "20px" }}>
          <Link to="/loginpage" style={{ textDecoration: "none", color: "inherit" }}>Log In</Link>
        </Typography>
        <Typography variant="h6" sx={{ marginLeft: "20px" }}>
          <Link to="/addfile" style={{ textDecoration: "none", color: "inherit" }}>Add File</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;