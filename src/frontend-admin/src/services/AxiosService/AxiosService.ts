import axios, {AxiosInstance} from 'axios'
//import qs from 'qs' ??
//import buildQuery from 'odata-query' ??
import decode from 'jwt-decode'

export interface IUserInfo {
    name: string
    token: string
    refreshToken: string
    isAdmin: boolean
}

//TODO: find out actual baseURL && secret or import from somewhere?
const URL= "";
const secret = ""

export class AxiosService {
    private user: IUserInfo = {
        name: "",
        token: "",
        refreshToken: "",
        isAdmin: false,
    }
    /*private token: string
    private refreshToken: string*/
    private instance: AxiosInstance

    public constructor(token: string, refreshToken: string) {
        //TODO: decode token and get/store info
        let decoded: any
        try {
            decoded = decode(token)
        } catch (err) {
            console.log(err)
        }

        this.user = {
            name: decoded.name,
            token: token,
            refreshToken: refreshToken,
            isAdmin: decoded.isAdmin,
        }

        this.instance = axios.create({
            baseURL: URL,
            headers: { //TODO: verify that these are the correct headers
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }

    //verify username & password
    /*public login = (username: string, password: string) => {
        //authenticate user w/ post request
        this.instance.post("/login", {
            //data
            username,
            password,
        })
        .then(response => {
            if (response.status === 200) {//TODO: find out what success status is
                console.log(response);
                //joe says token might not have name??? might have to do a get request for it?
                //Ideal jwt payload = {
                //    name: string,
                //    isAdmin: boolean,
                //} 

                //TODO: decode token and get info
                let decoded = 

                //TODO: These variable names are probably incorrect
                this.user = {
                    token: response.data.jwt,
                    refreshToken: response.data.refresh,
                    name: decoded.,
                    isAdmin: decoded.,
                }
            } else if (response.status === 401) {//Unauthorized
                //redirect back to login page

            }
        }).catch(err => console.log(err));

        //this will return a user: IUserInfo obj for App to store in a context
        return this.user
    }*/

    //function for <login /> to call to store token when they get response.status === successStatus
    public login = (response : any) => {
        //joe says token might not have name?? might have to do a get request for it?
        //Ideal jwt payload = {
        //    name: string,
        //    isAdmin: boolean,
        //} 

        //TODO: decode token and get info
        let decoded: any
        try {
            decoded = decode(response.data.token)
        } catch (err) {
            console.log(err)
        }

        //TODO: These variable names are probably incorrect
        this.user = {
            token: response.data.token,
            refreshToken: response.data.refreshToken,
            name: decoded.name,
            isAdmin: decoded.isAdmin,
        }

        //caller should save the user obj in context
        return this.user
    }

    //get rid of token?
    public logout = (redirect: string) => {
        this.user = {
            name: "",
            token: "",
            refreshToken: "",
            isAdmin: false,
        }
        //redirect to login page
        
    }

    //wrapper for get requests return the promise
    public get = (url: string) => {
        return this.instance.get(url, { headers:{
            "Authorization" : `Bearer ${this.user.token}`
        }})
        .then(this.checkTokenExpired)
    }

    //wrapper method for post requests return the promise
    public post = (url: string, data: any) => {
        return this.instance.post(url, data, { headers:{
            "Authorization" : `Bearer ${this.user.token}`
        }})
        .then(this.checkTokenExpired)
    }

    //check if token needs refreshing
    public checkTokenExpired = (response: any) => {
        if (response.data.expired) {//TODO: find out real name
            this.refreshToken()
        }
    }

    //refresh access token w/ refresh token
    public refreshToken  = () => {
        this.instance.post('/', {//TODO: get correct url
            token: this.user.token, //TODO: find out where to post tokens to
            refresh: this.user.refreshToken 
        }).then(response => {
            if (response.status === 200/*TODO: find out what success status is*/) {
                //TODO: These variable names are probably incorrect
                this.user = {
                    ...this.user,
                    token: response.data.token,
                    refreshToken: response.data.refreshToken,
                }
            } else if (response.status === 401) {//Unauthorized
                //redirect back to login page

            }
        })
    }
}