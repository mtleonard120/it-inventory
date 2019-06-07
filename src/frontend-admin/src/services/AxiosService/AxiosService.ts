import axios, {AxiosInstance} from 'axios'
//import qs from 'qs' ??
//import buildQuery from 'odata-query' ??

export interface IUserInfo {
    name: string
    token: string
    refreshToken: string
    isAdmin: boolean
}

const URL= "";

export class AxiosService {
    private user: IUserInfo
    /*private token: string
    private refreshToken: string*/
    private instance: AxiosInstance

    public constructor(token: string, refreshToken: string) {
       /* this.token = token
        this.refreshToken = refreshToken*/

        //need to also extract name and user group from the token??
        this.user = {
            ...this.user,
            token: token,
            refreshToken: refreshToken
        }

        this.instance = axios.create({
            baseURL: URL,
            headers: {'Content-Type': 'application/json'},
        })
    }

    //verify username & password
    public login = (username: string, password: string) => {
        //authenticate user w/ post request
        this.instance.post("/login", {
            //data
            username: username,
            password: password,
        })
        .then(response => {
            if (response.status === 200/*TODO: find out what success status is*/) {
                console.log(response);
                //save the token and user info
                //TODO: These variable names are probably incorrect
                this.user = {
                    token: response.data.jwt,
                    refreshToken: response.data.refresh,
                    name: response.data.name,
                    isAdmin: response.data.isAdmin,
                }
            } else if (response.status === 401) {//Unauthorized
                //redirect back to login page

            }
        }).catch(err => console.log(err));

        //this will return a user: IUserInfo obj for App to store in a context
        return this.user
    }

    //get rid of token?
    public logout = () => {
        /*this.token = ""
        this.refreshToken = ""*/

        this.user = {
            name: "",
            token: "",
            refreshToken: "",
            isAdmin: false,
        }

        //redirect to login page

    }

    //check if there is a valid token, return boolean
    loggedIn = (token: string) => {
        return this.user.token === token
    }
    
    //if the session has expired then redirect
    checkSessionExpired = (response: any) => {
        if  (response && response.data && response.data.sessionExpired) {
            window.location = response.data.redirectUrl
        }
    } //should we automatically refresh the token? 

    //given a url, call axios.get to query the DB for info, return the promise?
    public get = (url: string) => {
        return this.instance.get(URL+url, { headers:{
            "Authorization" : `Bearer ${this.user.token}`
        }})
        .then(this.checkSessionExpired)
    }


    public post = () => {

    }
    
    public archive = () => {
        
    }

    public delete = () => {
        
    }
}