import { Router, Switch, Route } from "react-router-dom";
// import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AddCrud } from "./components/AddCrud";

const history = createBrowserHistory();

function App() {
  return (
    // <Provider>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/add" component={AddCrud}></Route>
      </Switch>
    </Router>
    // </Provider>
  );
}

export default App;
