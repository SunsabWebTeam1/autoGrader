import React from "react";
import About from "./About";
import AboutSignUp from "./AboutSignUp";
import Home from "./Home";

function LandingPage() {

  return (
    <div className="App">
      <Home />
      <About />
      <AboutSignUp/>
    </div>

  );
}

export default LandingPage;