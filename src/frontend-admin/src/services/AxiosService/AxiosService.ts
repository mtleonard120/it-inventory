import axios, {AxiosInstance} from 'axios'
import qs from 'qs'

export class AxiosService {
    private token: string
    private tokenName: string
    private instance: AxiosInstance

    public constructor(token: string, tokenName: string) {
        this.token = token
        this.tokenName = tokenName

        this.instance = axios.create()
    }

    //verify username & password
    public login = () => {
        
    }

    //get rid of token?
    public logout = () => {

    }

    //check if there is a valid token
    loggedIn = () => {
        
    }
    
    //checks expirary time on token
    isTokenExpired = (token) => {
    
    }


    public post = () => {

    }

    public get = () => {
        
    }

    public archive = () => {
        
    }

    public delete = () => {
        
    }
}