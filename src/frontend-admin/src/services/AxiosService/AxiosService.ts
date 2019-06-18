import axios, {AxiosInstance} from 'axios'
import {ILoginContext} from '../../components/App/App'

export interface IUserInfo {
    name: string
    accessToken: string
    refreshToken: string
    isAdmin: boolean
}

const URL = process.env.REACT_APP_API_URL

export class AxiosService {
    private user: ILoginContext = {
        refreshToken: '',
        accessToken: '',
        validTo: '',
        givenName: '',
        isAdmin: false,
    }
    private instance: AxiosInstance

    public constructor(token: string, refreshToken: string) {
        this.user = {
            ...this.user,
            accessToken: token,
            refreshToken: refreshToken,
        }

        this.instance = axios.create({
            baseURL: URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    }

    //wrapper for get requests return the promise
    public get: any = (url: string) => {
        return this.instance
            .get(
                url /*, {
                    headers: {
                    Authorization: `Bearer ${this.user.accessToken}`
                    }
                }*/
            )
            .then(response => {
                this.checkTokenExpired(url)
                return response.data
            })
            .catch(err => console.log(err))
    }

    //wrapper method for post requests return the promise
    public post = (url: string, data: any) => {
        return this.instance
            .post(url, data, {
                /*headers: {
                    Authorization: `Bearer ${this.user.accessToken}`
                }*/
            })
            .then(response => this.checkTokenExpired(url, data))
            .catch(err => console.log(err))
    }

    //check if token needs refreshing
    public checkTokenExpired = (url: string, data?: any) => {
        const now = Date.parse(new Date().toISOString())
        const expires = Date.parse(this.user.validTo)
        if (expires - now <= 0) {
            this.refreshToken(url, data)
        }
    }

    //get new access token w/ refresh token
    public refreshToken = (url: string, data?: any) => {
        this.instance
            .post('/login/accessToken', {
                refreshToken: this.user.refreshToken,
            })
            .then(response => {
                if (response.status === 200) {
                    this.user = {
                        ...this.user,
                        accessToken: response.data.accessToken,
                        validTo: response.data.validTo,
                    }
                    data ? this.post(url, data) : this.get(url) //re-try get/post request
                } else if (response.status === 401) {
                    //Unauthorized
                    //redirect back to login page
                }
            })
    }
}
