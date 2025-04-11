import axios, { AxiosError, AxiosResponse } from "axios";
import { Vijest } from "../models/vijest";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { toast } from "react-toastify";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

// axios.interceptors.response.use(async response => {
//     try {
//         await sleep(1000);
//         return response;
//     } catch (error) {
//         console.log(error);
//         return await Promise.reject(error);
//     }
// })

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/prijava', user),
    register: (user: UserFormValues) => requests.post<User>('/account/registracija', user)
}

const agent = {
    Vijesti,
    Account
}

export default agent;