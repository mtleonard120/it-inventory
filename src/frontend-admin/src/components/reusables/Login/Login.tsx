import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../Content/Images/CQL-Logo-Reversed.png"
import axios from 'axios';

export const Login: React.FunctionComponent = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failMssg, setFailMssg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios.post('idk where yet', {
      username: username,
      password: password
    })
    .then(function (response:any) {
      console.log(response.data)
    })
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