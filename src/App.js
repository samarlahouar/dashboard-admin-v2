import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Employer from "./pages/Employer";
import Tache from "./pages/Tache";
import Département from  "./pages/Département";
import projet from "./pages/projet";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Main>
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Employer" component={Employer} />
            <Route exact path="/Tache" component={Tache} />
            <Route exact path="/Département" component={Département} />
            <Route exact path="/projet" component={projet} />
            <Route exact path="/profile" component={Profile} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
