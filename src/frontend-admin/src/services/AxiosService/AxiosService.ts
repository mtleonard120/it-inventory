import axios, { AxiosInstance } from "axios";
//import buildQuery from 'odata-query' ??

export interface IUserInfo {
  name: string;
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
}

//TODO: get url from environment variable
const URL = process.env.REACT_APP_API_URL;

export class AxiosService {
  private user: IUserInfo = {
    name: "",
    accessToken: "",
    refreshToken: "",
    isAdmin: false
  };
  private instance: AxiosInstance;

  public constructor(token: string, refreshToken: string) {
    this.user = {
      ...this.user,
      accessToken: token,
      refreshToken: refreshToken
    };

    this.instance = axios.create({
      baseURL: URL,
      headers: {
        //TODO: verify that these are the correct headers
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  //function for <login /> to call to store token when they get response.status === successStatus
  public login = (response: any) => {
    //TODO: These variable names are probably incorrect
    this.user = {
      accessToken: response.data.token,
      refreshToken: response.data.refreshToken,
      name: response.data.name,
      isAdmin: response.data.isAdmin
    };

    //caller should save the user obj in context
    return this.user;
  };

  //get rid of token?
  public logout = () => {
    this.user = {
      name: "",
      accessToken: "",
      refreshToken: "",
      isAdmin: false
    };
    //redirect to login page
  };

  /**
   * USE GET EXAMPLE:
   * const axios = new AxiosService("", "");
   * let x: {
   *    employeeId: number;
   *    hireDate: any;
   * }[] = [];
   * const [val, setVal] = useState(x);
   * useEffect(() => {
   *    axios.get("/Employees", setVal);
   * }, [setVal]);
   * console.log(val);
   */
  //wrapper for get requests return the promise
  public get: any = (url: string, saveData: Function) => {
    return this.instance
      .get(url, {
        /*headers: {
          Authorization: `Bearer ${this.user.accessToken}`
        }*/
      })
      .then(response => {
        this.checkTokenExpired(response, url);
        saveData(response.data);
      })
      .catch(err => console.log(err));
  };

  //wrapper method for post requests return the promise
  public post = (url: string, data: any) => {
    return this.instance
      .post(url, data, {
        /*headers: {
          Authorization: `Bearer ${this.user.accessToken}`
        }*/
      })
      .then(response => this.checkTokenExpired(response, url, data))
      .catch(err => console.log(err));
  };

  //check if token needs refreshing
  public checkTokenExpired = (response: any, url: string, data?: any) => {
    if (response.data.expired) {
      //TODO: find out real name
      this.refreshToken(url, data);
    }
  };

  //refresh access token w/ refresh token
  public refreshToken = (url: string, data?: any) => {
    this.instance
      .post("/", {
        //TODO: get correct url
        //TODO: find out where to post tokens to
        refresh: this.user.refreshToken
      })
      .then(response => {
        if (response.status === 200 /*TODO: find out what success status is*/) {
          //TODO: These variable names are probably incorrect
          this.user = {
            ...this.user,
            accessToken: response.data.token,
            refreshToken: response.data.refreshToken
          };

          //re-try get/post request
          data ? this.post(url, data) : this.get(url);
        } else if (response.status === 401) {
          //Unauthorized
          //redirect back to login page
        }
      });
  };
}
