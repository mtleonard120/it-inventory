import React,{useState} from 'react';
import {Login} from '../reusables/Login/Login';

// Styles
import styles from "./App.module.css";

//types
export interface ILoginContext{
  refreshToken:string,
  accessToken:string,
  validTo:string,
  givenName:string,
  isAdmin:boolean,
} 

//Login Context
var initialValues: {
  loginContextVariables:ILoginContext,
  setLoginContextVariables: any
  } = {
    loginContextVariables:{
      refreshToken:'', 
      accessToken:'', 
      validTo:'', 
      givenName:'', 
      isAdmin:false},
      setLoginContextVariables: () => {}
  }
export const LoginContext = React.createContext(initialValues);

// Primary Component
export const App: React.FC = () => {
  const[loginContextVariables, setLoginContextVariables] = useState({
    refreshToken:'',
    accessToken:'',
    validTo:'',
    givenName:'',
    isAdmin:false   
  })

  var contextValue = {
    loginContextVariables:loginContextVariables,
    setLoginContextVariables:setLoginContextVariables,
  }
  return (
    <LoginContext.Provider value={contextValue}>
      <div className={styles.app}>
        <Login />
      </div>
    </LoginContext.Provider>
  );
};


