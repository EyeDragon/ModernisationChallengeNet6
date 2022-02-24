import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { cloneData, convertToParamExpress } from "@utils/function-data";

export class BaseService {

    private axiosClient: AxiosInstance = null;

    public constructor(route: string) {
        let baseURL: string = `http://localhost:2383/data/${route}`;
        this.axiosClient = Axios.create({ baseURL });
    }

    protected async GET<T>(options: IOptions): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosClient.request<T>({
                method: "GET",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async POST<T>(options: IOptions): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosClient.request<T>({
                method: "POST",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async DELETE<T>(options: IOptions): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosClient.request<T>({
                method: "DELETE",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async PUT<T>(options: IOptions): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosClient.request<T>({
                method: "PUT",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    private commonHeaders() {
        return {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        };
    }
}

interface IParams {
    [key: string]: any;
}

interface IOptions {
    url: string;
    params?: IParams;
    query?: IParams;
    body?: any;
}