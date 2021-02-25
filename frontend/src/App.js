import "./App.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import TopicsSection from "./layout/TopicsSection";
import Navbar from "./layout/Navbar";

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

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Navbar />
                <TopicsSection />
            </div>
        </MuiThemeProvider>
    );
}

export default App;
