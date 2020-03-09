import React from "react";
// import { ipcRenderer } from "electron";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Users from "./containers/Users";
// import UserDetail from "./containers/UserDetail";
import Home from "./containers/Home";
import ErrorBoundary from "./ErrorBoundary";
import ErrorStackParser from "error-stack-parser";
window.onerror = (messageOrEvent, source, lineno, colno, error) => {
  console.log("error====>", JSON.stringify(error));
  fetch("http://localhost:3001/bugs", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      error: ErrorStackParser.parse(error)
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
};
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/post">
              <Users />
            </Route>
            {/* <Route path="/post/:id">
             <UserDetail />
          </Route> */}
          </Switch>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
