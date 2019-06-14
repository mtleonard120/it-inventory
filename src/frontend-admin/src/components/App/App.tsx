import React, {useState} from 'react'
import {Route, NavLink, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

// Components
import {DashboardPage} from '../pages/DashboardPage/DashboardPage'
import {DepartmentsListPage} from '../pages/DepartmentsListPage/DepartmentsListPage'
import {EmployeesListPage} from '../pages/EmployeesListPage/EmployeesListPage'
import {HardwareListPage} from '../pages/HardwareListPage/HardwareListPage'
import {ProgramsListPage} from '../pages/ProgramsListPage/ProgramsListPage'
import {Login} from '../reusables/Login/Login'
import {HelloUser} from '../HelloUser/HelloUser'

// Styles
import styles from './App.module.css'

//types
export interface ILoginContext {
    refreshToken: string
    accessToken: string
    validTo: string
    givenName: string
    isAdmin: boolean
}

//Login Context
var initialValues: {
    loginContextVariables: ILoginContext
    setLoginContextVariables: any
} = {
    loginContextVariables: {
        refreshToken: '',
        accessToken: '',
        validTo: '',
        givenName: '',
        isAdmin: false,
    },
    setLoginContextVariables: () => {},
}
export const LoginContext = React.createContext(initialValues)

// Primary Component
export const App: React.FC = () => {
    const [loginContextVariables, setLoginContextVariables] = useState({
        refreshToken: '',
        accessToken: '',
        validTo: '',
        givenName: '',
        isAdmin: false,
    })

    var contextValue = {
        loginContextVariables: loginContextVariables,
        setLoginContextVariables: setLoginContextVariables,
    }
    return (
        <LoginContext.Provider value={contextValue}>
            <div className={styles.app}>
                {/*header*/}

                <Router>
                    {loginContextVariables.givenName === '' && <Redirect to='/login' />}
                    {loginContextVariables.givenName !== '' && (
                        <div className={styles.navContainer}>
                            <Redirect to='/dashboard' />
                            <HelloUser name={loginContextVariables.givenName} className={styles.helloMesssage} />
                            <nav className={styles.navBar}>
                                <h1>CQL</h1>
                                <div className={styles.navEllipse} />
                                <div className={styles.navRectangle} />

                                <div className={styles.linkContainer}>
                                    <NavLink
                                        className={styles.navTab}
                                        activeClassName={styles.active}
                                        to='/departments'
                                    >
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
                    )}

                    <Switch>
                        {/* <Route />'s go here */}
                        <Route path='/dashboard' component={DashboardPage} />
                        <Route path='/employees' component={EmployeesListPage} />
                        <Route path='/programs' component={ProgramsListPage} />
                        <Route path='/hardware' component={HardwareListPage} />
                        <Route path='/departments' component={DepartmentsListPage} />
                        <Route path='/login' component={Login} />
                    </Switch>
                </Router>

                <footer className={styles.appFooter} />
            </div>
        </LoginContext.Provider>
    )
}
