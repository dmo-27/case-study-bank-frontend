import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/", // json server tried

    // withCredentials: true,
});

// export const registerCollege = (collegeData) => API.post("/college/register", collegeData);

export const registerUser = (userData) => API.post("/customer", userData);

export const loginUser = (email, password) => API.get(`/customer?email=${email}&password=${password}`);

