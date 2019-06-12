import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../Content/Images/CQL-Logo-Reversed.png"

export const Login: React.FunctionComponent = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failMssg, setFailMssg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create a POST request to be sent.
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    };

    // Authenticate the user by sending the POST request.\
    // Respones is outputted.
    fetch("https://localhost:44358/users/authenticate", requestOptions).then(
      response => {
        if (response.ok) {
          console.log(""); //redirect to the dashboard
        } else {
          setFailMssg("Incorrect username or password");
        }
      }
    );
  };

  return (
    <div className={styles.body}>
      <div className={styles.center}>
        <img className={styles.logo} src={logo} />
      </div>
      <div className={styles.center}>
        <input
          className={styles.inputboxUsername}
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.center}>
        <input
          className={styles.inputboxPassword}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.center}>
        <input
          className={styles.submit}
          type="submit"
          value="Login"
          onClick={handleSubmit}
        />
      </div>
      <text className={styles.failMssg}>{failMssg}</text>
    </div>
  );
};