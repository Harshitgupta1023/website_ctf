import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      dark: "#7a24bf",
      light: "#a52ed9",
      // main: "#a808bd",
      main: "#fff",
    },
    background: {
      default: "#252525",
      paper: "#7a24bf",
    },
  },
});

function Home() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="home">
        <Navbar />
        <TopicsSection />
      </div>
    </MuiThemeProvider>
  );
}

export default Home;
