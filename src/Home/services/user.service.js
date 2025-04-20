import axios from "axios";
import { API_URL } from "../../constants/constants.js";

export const registrarUsuario = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
}

export const loginUsuario = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}