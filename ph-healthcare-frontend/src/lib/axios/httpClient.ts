import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
}

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return instance;
};

export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

const httpGet = async (endPoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().get(endPoint, options);
        return response.data;
    } catch (error) {
        console.log(`GET request to ${endPoint} failed:`, error);
        throw error;
    }
};

const httpPost = async (
    endPoint: string,
    data: unknown,
    options?: ApiRequestOptions,
) => {
    try {
        const response = await axiosInstance().post(endPoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`POST request to ${endPoint} failed:`, error);
        throw error;
    }
};

const httpPut = async (
    endPoint: string,
    data: unknown,
    options?: ApiRequestOptions,
) => {
    try {
        const response = await axiosInstance().put(endPoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`PUT request to ${endPoint} failed:`, error);
        throw error;
    }
};

const httpPatch = async (
    endPoint: string,
    data: unknown,
    options?: ApiRequestOptions,
) => {
    try {
        const response = await axiosInstance().patch(endPoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`PATCH request to ${endPoint} failed:`, error);
        throw error;
    }
};

const httpDelete = async (endPoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().delete(endPoint, options);
        return response.data;
    } catch (error) {
        console.log(`DELETE request to ${endPoint} failed:`, error);
        throw error;
    }
};

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete,
};
