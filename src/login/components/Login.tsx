import React, {
  FormEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import update from "immutability-helper";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/login.actions";
import { hasLoginError } from "../selectors/login.selectors";

/* interface Props {
  onLogin: (username: string, password: string) => void;
  error: string;
} */

function Login() {
  const dispatch = useDispatch();
  const error = useSelector(hasLoginError);

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    username.current!.focus();
  });

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = "Bitte Benutzernamen und Passwort angeben";
    if (username.current!.value && username.current!.value) {
      error = "";
      dispatch(
        loginAction({
          username: username.current!.value,
          password: password.current!.value,
        })
      );
    }
    setLocalError((prevState) => update(prevState, { $set: error }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit} className="login">
      {(error || localError !== "") && (
        <div className="error">
          {error && "Es ist ein Fehler aufgetreten"}
          {localError}
        </div>
      )}
      <div>
        <label htmlFor="">Benutzername:</label>
        <input type="text" id="username" ref={username} />
      </div>
      <div>
        <label htmlFor="">Passwort:</label>
        <input type="password" id="password" ref={password} />
      </div>
      <button type="submit">anmelden</button>
    </form>
  );
}

export default Login;
