import React from 'react'
import {Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'

// Components
import {DashboardPage} from '../pages/DashboardPage/DashboardPage'
import {DepartmentsListPage} from '../pages/DepartmentsListPage/DepartmentsListPage'
import {EmployeesListPage} from '../pages/EmployeesListPage/EmployeesListPage'
import {HardwareListPage} from '../pages/HardwareListPage/HardwareListPage'
import {ProgramsListPage} from '../pages/ProgramsListPage/ProgramsListPage'
import {HelloUser} from '../HelloUser/HelloUser'

// Styles
import styles from './App.module.css'

// Primary Component
export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            {/*header*/}

            <Router>
                <div className={styles.navContainer}>
                    <HelloUser name={'dan'} className={styles.helloMesssage} />
                    {/* TODO Update with real name from context when available*/}
                    <nav className={styles.navBar}>
                        <h1>CQL</h1>
                        <div className={styles.navEllipse} />
                        <div className={styles.navRectangle} />

                        <div className={styles.linkContainer}>
                            <NavLink className={styles.navTab} activeClassName={styles.active} to='/departments'>
                                <div className={styles.navTabRectangle} />
                                <label>Departments</label>
                            </NavLink>

                            <NavLink className={styles.navTab} activeClassName={styles.active} to='/hardware'>
                                <div className={styles.navTabRectangle} />
                                <label>Hardware</label>
                            </NavLink>

                            <NavLink className={styles.navTab} activeClassName={styles.active} to='/programs'>
                                <div className={styles.navTabRectangle} />
                                <label>Programs</label>
                            </NavLink>

                            <NavLink className={styles.navTab} activeClassName={styles.active} to='/employees'>
                                <div className={styles.navTabRectangle} />
                                <label>Employees</label>
                            </NavLink>

                            <NavLink className={styles.navTab} activeClassName={styles.active} to='/dashboard'>
                                <div className={styles.navTabRectangle} />
                                <label>Dashboard</label>
                            </NavLink>
                        </div>
                    </nav>
                </div>

                <Switch>
                    {/* <Route />'s go here */}
                    <Route path='/dashboard' component={DashboardPage} />
                    <Route path='/employees' component={EmployeesListPage} />
                    <Route path='/programs' component={ProgramsListPage} />
                    <Route path='/hardware' component={HardwareListPage} />
                    <Route path='/departments' component={DepartmentsListPage} />
                </Switch>
            </Router>
            <footer className={styles.appFooter} />
        </div>
    )
}
