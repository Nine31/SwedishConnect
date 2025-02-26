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
    details: (id: string) => requests.get<Vijest>(`/vijesti/${id}`),
    create: (vijest: Vijest) => axios.post<void>('/vijesti', vijest),
    update: (vijest: Vijest) => axios.put<void>(`/vijesti/${vijest.slug}`, vijest),
    delete: (id: string) => axios.delete<void>(`/vijesti/${id}`)
}

const agent = {
    Vijesti
}

export default agent;