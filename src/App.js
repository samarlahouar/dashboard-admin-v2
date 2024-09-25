import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Employer from "./pages/Employer/Employer";
import Tache from "./pages/Tache/Tache";
import Département from  "./pages/Departement/Département";
import projet from "./pages/projet/projet";
import Dashboard from "./pages/Dashboard"
import Conger from "./pages/Conger/Conger";
import Evenement from "./pages/Evenement/Evenement";
import Reclamation from "./pages/Reclamation/Reclamation";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import archiveemployer from "./pages/Employer/archiveemployer";
import Reunion from "./pages/Reunion/Reunion";
import Archive from "./pages/Reclamation/Archive";
import Demandedecompte from './pages/Demandedecompte/Demandedecompte';
import CongerAR from './pages/Conger/CongerAR';
import DemandeAR from './pages/Demandedecompte/DemandeAR';
import Dossiers from './pages/Dossiers';
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* La page de connexion */}
          <Route path="/SignIn" exact component={SignIn} />

          {/* Quand l'utilisateur ouvre l'application, il sera redirigé vers /SignIn */}
          <Redirect exact from="/" to="/SignIn" />

          {/* Les autres pages de ton application */}
          <Main>
            
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Employer" component={Employer} />
            <Route exact path="/archiveemployer" component={archiveemployer} />
            <Route exact path="/Tache" component={Tache} />
            <Route exact path="/Département" component={Département} />
            <Route exact path="/projet" component={projet} />
            <Route exact path="/Conger" component={Conger} />
            <Route exact path="/Reunion" component={Reunion} />
            <Route exact path="/Evenement" component={Evenement} />
            <Route exact path="/Reclamation" component={Reclamation} />
            <Route exact path="/Archive" component={Archive} />
            <Route exact path="/Demandedecompte" component={Demandedecompte} />
            <Route exact path="/CongerAR" component={CongerAR} />
            <Route exact path="/DemandeAR" component={DemandeAR} />
            <Route exact path="/Dossiers" component={Dossiers} />
            <Route exact path="/profile" component={Profile} />
          </Main>

          {/* Redirection des routes inconnues vers le tableau de bord */}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
