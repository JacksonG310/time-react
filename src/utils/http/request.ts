import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

type MethodType = "get" | "post" | "put" | "delete";

interface AxiosConfig {
    method: MethodType;
    url: string;
    baseURL?: string;
    body?: object;
    query?: object;
    headers?: object;
}

export const request = async <T>(config: AxiosConfig): Promise<T> => {
    const { method, url, baseURL, body, query, headers } = config;

    try {
        const res = await axios.request<T>({
            method,
            url: withQuery(url, query),
            baseURL: baseURL ? baseURL : BASE_URL,
            data: body,
            headers
        })
        if ((res.data as any).code === 200) {
            return (res.data as any).data;
        } else {
            throw new Error("request error");
        }
    } catch (error) {
        throw error;
    }

}

const withQuery = (url: string, query: any) => {
    const keys = Object.keys(query);
    const str = keys.map(k => `${k}=${encodeURIComponent(typeof query[k] === "object" ? JSON.stringify(query[k]) : query[k])}`).join('&');
    return `${url}${keys.length !== 0 ? "?" : ""}${str}`;
}