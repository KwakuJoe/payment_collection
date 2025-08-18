import type { ResourceFetchResponse } from "~/types";
import axiosInstance from "../axios_instance";
import axios, { AxiosError } from "axios";

class AuthModule {

    private config = useRuntimeConfig();

    private LOGIN_RESOURCE = this.config.public.loginResource;
    private LOGIN_WITH_TOKEN_RESOURCE = this.config.public.loginWithTokenResource;



    async login(payload: Record<string, any>): Promise<ResourceFetchResponse<any> | undefined> {
        // Convert params object to query string
        const url = `${this.LOGIN_RESOURCE}`;


        try {
            const res = await axiosInstance.post<ResourceFetchResponse<any>>(
                url, payload);
            return res.data;
        } catch (error: unknown) {
            console.log(error);
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', url);
                return;
            } else if (error instanceof AxiosError) {
                console.error('Error fetching transaction overview:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }

            throw error; // Re-throw the error for further handling
        }
    }

    async loginWithToken(token: string): Promise<ResourceFetchResponse<any> | undefined> {
        // Convert params object to query string
        const url = `${this.LOGIN_WITH_TOKEN_RESOURCE}/${token}`;


        try {
            const res = await axiosInstance.post<ResourceFetchResponse<any>>(
                url);
            return res.data;
        } catch (error: unknown) {
            console.log(error);
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', url);
                return;
            } else if (error instanceof AxiosError) {
                console.error('Error fetching transaction overview:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }

            throw error; // Re-throw the error for further handling
        }
    }
}

export const authModule = new AuthModule();