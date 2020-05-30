import React, { useCallback, useState } from "react";
import "./App.css";
import Admin from "./admin/components/Admin/Admin";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Game from "./game/Game";
import Login from "./login/Login";
import Nav from "./Nav";
import NotFound from "./NotFound";
import { Provider } from "react-redux";

let configureStore: Function;
if (process.env.NODE_ENV === "development") {
  configureStore = require("./store/configureStore.dev").configureStore;
} else {
  configureStore = require("./store/configureStore.prod").configureStore;
}

const store = configureStore();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const handleLogin = useCallback(
    (username, password) =>
      setLoggedIn(username === "user" && password === "password"),
    []
  );

  const handleLogout = useCallback(() => setLoggedIn(false), []);

  return (
    <Provider store={store}>
      <Router>
        {loggedIn && <Nav onLogout={handleLogout} />}
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              if (loggedIn) {
                return <Redirect to="/game" />;
              }
              return <Login onLogin={handleLogin} error={""} />;
            }}
          />
          <Route path="/admin">
            {() => {
              if (loggedIn) {
                return <Admin />;
              }
              return <Redirect to="/" />;
            }}
          </Route>
          <Route
            path="/game"
            render={() => {
              if (loggedIn) {
                return <Game title="Supertrumpf" />;
              }
              return <Redirect to="/" />;
            }}
          />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
  /* (
    <Form
      onSubmit={(animal) => {
        const data = new FormData();
        data.append("name", animal.name);
        data.append("image", animal.image);
        data.append("size", animal.size.toString());
        data.append("weight", animal.weight.toString());
        data.append("age", animal.age.toString());
        data.append("offspring", animal.offspring.toString());
        data.append("speed", animal.speed.toString());
        axios.post("http://localhost:3001/card", data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
      }}
    />
  ); */
}
/* import update from "immutability-helper";
import "./App.css";
import Game from "./game/Game";
//import DealCards from "./withCards";
import DarkMode from "./game/DarkMode";
import axios from "axios";
import Login from "./login/Login";

interface State {
  darkMode: boolean;
  loggedIn: boolean;
  error: string;
}

class App extends React.Component<{}, State> {
  state = {
    darkMode: false,
    loggedIn: false,
    error: "",
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  hanleLogin = async (username: string, password: string) => {
    const result = await axios.post("http://localhost:3001/login", {
      username,
      password,
    });
    let loggedIn = false;
    let error = "Anmeldung fehlgeschlagen";

    if (result.data === true) {
      loggedIn = true;
      error = "";
    }
    this.setState((prevState) =>
      update(prevState, {
        loggedIn: { $set: loggedIn },
        error: { $set: error },
      })
    );
  };

  render() {
    return (
      <DarkMode.Provider value={this.state.darkMode}>
        {this.state.loggedIn && (
          <>
            <button onClick={this.toggleDarkMode}> Toggle Dark Mode </button>
            <Game title="Supertrumpf" />
          </>
        )}
        {!this.state.loggedIn && (
          <Login onLogin={this.hanleLogin} error={this.state.error} />
        )}
      </DarkMode.Provider>
    );
  }
}
 */
