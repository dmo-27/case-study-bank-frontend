import axios from "axios";

const API = axios.create({
    baseURL: "http://prathamesh:8001/user", // json server tried

    // withCredentials: true,
});

export const login = (email, password) => API.post(`/login`, { email, password });

