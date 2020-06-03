import React from "react";
import "./App.css";
import Admin from "./admin/components/Admin/Admin";
import { Route, Switch, Redirect } from "react-router-dom";
import Game from "./game/Game";
import Login from "./login/components/Login";
import Nav from "./Nav";
import NotFound from "./NotFound";
import { Provider } from "react-redux";
import { isLoggedIn } from "./login/selectors/login.selectors";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/configureStore.dev";
import de from "./i18n/messages/DE-de.json";
import en from "./i18n/messages/EN-en.json";
import { IntlProvider } from "react-intl-redux";
import { getLocale } from "./i18n/selectors/i18n.selectors";

const localeMap = {
  de: "DE-de",
  "de-de": "DE-de",
  en: "EN-us",
  "en-us": "EN-us",
};
let browserLang = navigator.language.toLowerCase() as keyof typeof localeMap;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const locale = localeMap[browserLang] as keyof typeof messages;
const messages = { "DE-de": de, "EN-us": en };

let configureStore: Function;

if (process.env.NODE_ENV === "development") {
  configureStore = require("./store/configureStore.dev").configureStore;
} else {
  configureStore = require("./store/configureStore.prod").configureStore;
}

const store = configureStore();

browserLang = Object.keys(localeMap).includes(browserLang)
  ? browserLang
  : "de-de";

export default function App() {
  /* const [loggedIn, setLoggedIn] = useState(true);
  const handleLogin = useCallback(
    (username, password) =>
      setLoggedIn(username === "user" && password === "password"),
    []
  );*/

  // const handleLogout = useCallback(() => setLoggedIn(false), []);
  /*  const [locale, setLocale] = useState<keyof typeof messages>(
    localeMap[browserLang] as keyof typeof messages
  ); */
  return (
    <Provider store={store}>
      <IntlProvider locale={getLocale(store.getState())}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                if (isLoggedIn(store.getState())) {
                  return <Redirect to="/game" />;
                }
                return <Login />;
              }}
            />
            <Route path="/admin">
              {() => {
                if (isLoggedIn(store.getState())) {
                  return (
                    <>
                      <Nav />
                      <Admin />
                    </>
                  );
                }
                return <Redirect to="/" />;
              }}
            </Route>
            <Route
              path="/game"
              render={() => {
                if (isLoggedIn(store.getState())) {
                  return (
                    <>
                      <Nav />
                      <Game title="Supertrumpf" />
                    </>
                  );
                }
                return <Redirect to="/" />;
              }}
            />
            <Route path="/" component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </IntlProvider>
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
