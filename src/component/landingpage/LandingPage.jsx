import { Fade } from "@mui/material";
import React from "react";
import About from "./About";
import AboutSignUp from "./AboutSignUp";
import Home from "./Home";
function LandingPage() {

  return (
    <Fade in={true} timeout={1000}>
      <div className="App">
        <Home />
        <About />
        <AboutSignUp/>
      </div>
    </Fade>
  );
}

export default LandingPage;