import axios from "axios";
import { API_URL } from "../../constants/constants.js";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categorias`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const getBrandsByCategory = async (id_categoria) => {
    try {
        const response = await axios.get(`${API_URL}/marcas/byCategoria/${id_categoria}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const createCategory = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/categorias`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const createBrand = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/marcas`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const createProduct = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/productos`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const deleteProduct = async (id_producto, token) => {
    try {
        const response = await axios.delete(`${API_URL}/productos/${id_producto}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const deleteCategory = async (id_categoria, token) => {
    try {
        const response = await axios.delete(`${API_URL}/categorias/${id_categoria}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const deleteBrand = async (id_marca, token) => {
    try {
        const response = await axios.delete(`${API_URL}/marcas/${id_marca}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const reactivateProduct = async (id_producto, token) => {
    try {
        const response = await axios.put(`${API_URL}/productos/reactivate/${id_producto}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const reactivateCategory = async (id_categoria, token) => {
    try {
        const response = await axios.put(`${API_URL}/categorias/reactivate/${id_categoria}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const reactivateBrand = async (id_marca, token) => {
    try {
        const response = await axios.put(`${API_URL}/marcas/reactivate/${id_marca}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}