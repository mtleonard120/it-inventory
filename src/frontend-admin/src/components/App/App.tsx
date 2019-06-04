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
            <div className={styles.navEllipse} />
            <div className={styles.navRectangle} />
            <div className={styles.linkContainer}>
              <NavLink className={styles.navTab} 
                activeClassName={styles.active}
                to="/departments">
                <div className={styles.navTabRectangle} />
                <label>Departments</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/hardware">
                <div className={styles.navTabRectangle} />
                <label>Hardware</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/programs">
                <div className={styles.navTabRectangle} />
                <label>Programs</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/employees">
                  <div className={styles.navTabRectangle} />
                  <label>Employees</label>
              </NavLink>

              <NavLink className={styles.navTab} 
                activeClassName={styles.active} 
                to="/dashboard">
                <div className={styles.navTabRectangle} />
                <label>Dashboard</label>
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
