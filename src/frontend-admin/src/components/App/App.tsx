import React from 'react';
import { Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'; 


// Styles
import styles from './App.module.css';

// Primary Component
export const App: React.FC = () => {
  return (
    /*<div className={styles.app}>
      <header className={styles.appHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  </div>*/
    <div className={styles.app}>
      {/*header*/}

      <Router>
      
        <div className={styles.navContainer}>
          <div className={styles.space} />
          
          <nav>
          
            <h1>CQL</h1>
            
            <div className={styles.linkContainer}>
              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/dashboard">
                <label>Dashboard</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/employees">
                  <label>Employees</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/programs">
                <label>Programs</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/hardware">
                <label>Hardware</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                id={styles.lastTab}
                to="/departments">
                <label>Departments</label>
              </NavLink>
            </div>
          </nav>
        </div>
        <Switch>
          {/* <Route />'s go here */}
          
        </Switch>
      
    </Router>
    <footer>

    </footer>
  </div>
  );
}
