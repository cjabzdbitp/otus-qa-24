import axios from "axios";

const API_BASE_URL = "https://petstore.swagger.io/v2";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    timeout: 5000
});