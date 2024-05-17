import React from "react";
import Home from "./Home";
import About from "./About";
import AboutSignUp from "./AboutSignUp";

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