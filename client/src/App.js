import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

import { sectionData } from "../src/data/constants";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />

            {sectionData.map((data) => {
              return (
                <Route
                  exact
                  key={data.id}
                  path={data.link}
                  component={data.pagename}
                />
              );
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
