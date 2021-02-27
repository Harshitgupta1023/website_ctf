import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import TopicsSection from "../layout/TopicsSection";
import Navbar from "../layout/Navbar";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      dark: "#2e5cb8",
      light: "#80b3ff",
      // main: "#a808bd",
      main: "#fff",
    },
    background: {
      default: "#80b3ff",
      paper: "#2e5cb8",
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
