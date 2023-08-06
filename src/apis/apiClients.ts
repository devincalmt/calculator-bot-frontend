import axios, { AxiosInstance } from "axios";

export class ApiClient {
    baseURL: string
    httpClient: AxiosInstance
    constructor(
        baseURL: string
    ) {
        this.baseURL = baseURL
        this.httpClient = axios.create({ baseURL })
    }

    post({
        endpoint,
        data
    }: {
        endpoint: string,
        data?: any
    }) {
        return this.httpClient.post(endpoint, data)
    }
}