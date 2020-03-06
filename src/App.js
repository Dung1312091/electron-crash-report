import React from "react";
// import { ipcRenderer } from "electron";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Users from "./containers/Users";
// import UserDetail from "./containers/UserDetail";
import Home from "./containers/Home";
import ErrorBoundary from "./ErrorBoundary";
function App() {
  React.useEffect(() => {
    window.addEventListener("error", function(e) {
      console.log("========>", e.error.stack);
      // You can send data to your server
      // sendError(data);
    });
  }, []);
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
