import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

const BASE_API_URL = "https://api.spoonacular.com";

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      validateStatus: (status) => {
        return status >= 200 && status < 300;
      },
    });
    this.initInterceptors();
  }

  private initInterceptors = () => {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.params = config.params || {};
      config.params["apiKey"] = process.env.REACT_APP_API_KEY;
      return config;
    });

    /* response */
    this.instance.interceptors.response.use(
      (value: AxiosResponse) => {
        return value;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          return Promise.reject(response.data);
        }
        return Promise.reject(error);
      }
    );
  };

  public get = (url: string, config?: AxiosRequestConfig) => {
    return this.instance.get(url, config);
  };

  public post = (url: string, data: any, config?: AxiosRequestConfig) => {
    return this.instance.post(url, data, config);
  };
}

export default new Api();
