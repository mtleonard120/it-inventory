import React from 'react';
import { Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'; 

// Styles
import styles from './App.module.css';

// Primary Component
export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      {/*header*/}

      <Router>
        <div className={styles.navContainer}>
          <nav className={styles.navBar}>
          
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
    <footer className={styles.appFooter}>

    </footer>
  </div>
  );
}
