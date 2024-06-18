import { Typography } from "@mui/material";
import React from "react";
import '../../index.css';

function Home() {
  return (
    <div id="home" className="home">
      <Typography variant="h1" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
        Welcome to the AutoGrader
      </Typography>
    </div>
  );
}

export default Home;
