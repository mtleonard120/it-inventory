import React, {useState, useContext} from 'react'
import axios from 'axios'

//useContext
import {LoginContext} from '../../App/App'
import {Redirect} from 'react-router-dom'

//styling
import styles from './Login.module.css'
import logo from '../../../Content/Images/CQL-Logo-Reversed.png'

export const Login: React.FunctionComponent = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [failMssg, setFailMssg] = useState('')

    const currentLoginContext = useContext(LoginContext)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        //process.env.REACT_APP_API_URL + '/login'
        axios
            .post(process.env.REACT_APP_API_URL + '/login', {
                username: username,
                password: password,
            })
            .then(function(response: any) {
                //oddly, axios can only handle sending an array of objects so
                //response.data looks like [{...data...}]
                //succesful login, so set context to response data and route to dash
                currentLoginContext.setLoginContextVariables(response.data[0])
                return <Redirect to='/dashboard' />
            })
            .catch(error => {
                //catching errors
                if (error.response) {
                    //The request was made and the server responded with a status code
                    setFailMssg('Incorrect username or password')
                } else if (error.request) {
                    //The request was made but no response was received
                    console.log('Request was made but no response was received')
                } else {
                    //Something happened in setting up the request that triggered an Error
                    console.log('Something happened in setting up the request that triggered an Error')
                }
                //route here just for the demo since we can't get any
                //credentials to return an ok response
                // history.push('/dashboard')
            })
    }

    return (
        <div className={styles.body}>
            <div className={styles.center}>
                <img className={styles.logo} src={logo} />
            </div>
            <div className={styles.center}>
                <input
                    className={styles.inputboxUsername}
                    type='text'
                    placeholder='Username'
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.center}>
                <input
                    className={styles.inputboxPassword}
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.center}>
                <input className={styles.submit} type='submit' value='Login' onClick={handleSubmit} />
            </div>
            <text className={styles.failMssg}>{failMssg}</text>
        </div>
    )
}
