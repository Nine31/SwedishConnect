import axios, { AxiosResponse } from "axios";
import { Vijest } from "../models/vijest";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Vijesti = {
    list: () => requests.get<Vijest[]>('/vijesti'),
    details: (slug: string) => requests.get<Vijest[]>(`/vijesti/${slug}`),
    create: (vijest: Vijest) => axios.post<Vijest>('/vijesti', vijest),
    update: (vijest: Vijest) => axios.put<void>(`/vijesti/${vijest.slug}`, vijest),
    delete: (slug: string) => axios.delete<void>(`/vijesti/${slug}`)
}

const agent = {
    Vijesti
}

export default agent;