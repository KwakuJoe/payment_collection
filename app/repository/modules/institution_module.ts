

import abortControllerManager from '~/repository/abort_controller'
import axiosInstance from '~/repository/axios_instance';
import type { Category, Institution, ResourceFetchResponse, ResourceListResponse, Service, SubmitFieldsPayload, VerifyBankTransferPaymentAccountPayload, VerifyFieldsPayload } from '~/types';
import axios, { AxiosError } from "axios";

class InstitutionModule {

    private config = useRuntimeConfig();

    private INSTITUTIONS_RESOURCE = this.config.public.institutionsResource;
    private INSTITUTION_SERVICE_RESOURCE = this.config.public.institutionServicesResource;
    private CATEGORY_RESOURCE = this.config.public.categoriesResource;
    private SERVICE_RESOURCE = this.config.public.servicesResource;
    private VERIFY_FORM_FIELDS_RESOURCE = this.config.public.verifyFormFieldsResource;
    private SUBMIT_FORM_FIELDS_RESOURCE = this.config.public.submitFormFieldsResource;
    private VERIFY_PAYMENT_ACCOUNT_NUMBER = this.config.public.verifyPaymentAccountNumberResource;
    private REPORT_RESOURCE = this.config.public.reportResource;

    private abortManager = abortControllerManager;

    async getInstitutions(params: Record<string, any>, options: { abortKey?: string; enableAbort?: boolean } = {}, requestSource?: string): Promise<ResourceListResponse<Institution> | undefined> {
        // Convert params object to query string
        const url = `${this.INSTITUTIONS_RESOURCE}`;
        const { abortKey = 'getInstitutions', enableAbort = true } = options;

        let controller: AbortController | undefined;
        if (enableAbort) {
            if (requestSource === 'mount') {
                console.log('no abort needed')
            } else {
                controller = this.abortManager.createController(abortKey);
            }
        }

        try {
            const res = await axiosInstance.get<ResourceListResponse<Institution>>(
                url,
                {
                    signal: controller?.signal,
                    params
                });
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
        } finally {
            if (enableAbort && abortKey) {
                this.abortManager.cleanup(abortKey);
            }
        }
    }

    async getCategories(params: Record<string, any>, options: { abortKey?: string; enableAbort?: boolean } = {}, requestSource?: string): Promise<ResourceListResponse<Category> | undefined> {
        // Convert params object to query string
        const url = `${this.CATEGORY_RESOURCE}`;
        const { abortKey = 'getCategories', enableAbort = true } = options;

        let controller: AbortController | undefined;
        if (enableAbort) {
            if (requestSource === 'mount') {
                console.log('no abort needed')
            } else {
                controller = this.abortManager.createController(abortKey);
            }
        }

        try {
            const res = await axiosInstance.get<ResourceListResponse<Category>>(
                url,
                {
                    signal: controller?.signal,
                    params
                });
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
        } finally {
            if (enableAbort && abortKey) {
                this.abortManager.cleanup(abortKey);
            }
        }
    }

    async getServices(params: Record<string, any>, options: { abortKey?: string; enableAbort?: boolean } = {}, requestSource?: string): Promise<ResourceListResponse<Service> | undefined> {
        // Convert params object to query string
        const url = `${this.SERVICE_RESOURCE}`;
        const { abortKey = 'getServices', enableAbort = true } = options;

        let controller: AbortController | undefined;
        if (enableAbort) {
            if (requestSource === 'mount') {
                console.log('no abort needed')
            } else {
                controller = this.abortManager.createController(abortKey);
            }
        }

        try {
            const res = await axiosInstance.get<ResourceListResponse<Service>>(
                url,
                {
                    signal: controller?.signal,
                    params
                });
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
        } finally {
            if (enableAbort && abortKey) {
                this.abortManager.cleanup(abortKey);
            }
        }
    }

    async getServiceById(service_id: string, options: { abortKey?: string; enableAbort?: boolean } = {}, requestSource?: string): Promise<ResourceListResponse<Service>> {
        // Convert params object to query string
        const url = `${this.SERVICE_RESOURCE}/${service_id}`;
        const { abortKey = 'getServiceById', enableAbort = true } = options;

        let controller: AbortController | undefined;
        if (enableAbort) {
            if (requestSource === 'mount') {
                console.log('no abort needed')
            } else {
                controller = this.abortManager.createController(abortKey);
            }
        }

        try {
            const res = await axiosInstance.get<ResourceListResponse<Service>>(
                url,
                {
                    signal: controller?.signal,
                });
            console.log('Kwabena', res.data)
            return res.data;
        } catch (error: unknown) {
            console.log(error);
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', url);
                // return;
            } else if (error instanceof AxiosError) {
                console.error('Error fetching transaction overview:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }

            throw error; // Re-throw the error for further handling
        } finally {
            if (enableAbort && abortKey) {
                this.abortManager.cleanup(abortKey);
            }
        }
    }

    async getServicesByInstitution(institutions_id: string, options: { abortKey?: string; enableAbort?: boolean } = {}, requestSource?: string): Promise<ResourceListResponse<Service>> {
        // Convert params object to query string
        const url = `${this.INSTITUTION_SERVICE_RESOURCE}/${institutions_id}`;
        const { abortKey = 'getServices', enableAbort = true } = options;

        let controller: AbortController | undefined;
        if (enableAbort) {
            if (requestSource === 'mount') {
                console.log('no abort needed')
            } else {
                controller = this.abortManager.createController(abortKey);
            }
        }

        try {
            const res = await axiosInstance.get<ResourceListResponse<Service>>(
                url,
                {
                    signal: controller?.signal,
                });
            return res.data;
        } catch (error: unknown) {
            console.log(error);
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', url);
                // return;
            } else if (error instanceof AxiosError) {
                console.error('Error fetching transaction overview:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }

            throw error; // Re-throw the error for further handling
        } finally {
            if (enableAbort && abortKey) {
                this.abortManager.cleanup(abortKey);
            }
        }
    }

    async postFieldForVerification(payload: VerifyFieldsPayload): Promise<ResourceFetchResponse<any> | undefined> {
        // Convert params object to query string
        const url = `${this.VERIFY_FORM_FIELDS_RESOURCE}`;


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

    async postFieldForSubmission(payload: SubmitFieldsPayload): Promise<ResourceFetchResponse<any> | undefined> {
        // Convert params object to query string
        const url = `${this.SUBMIT_FORM_FIELDS_RESOURCE}`;


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

    async VerifyBankTransferPaymentAccount(payload: VerifyBankTransferPaymentAccountPayload): Promise<ResourceFetchResponse<any> | undefined> {
        // Convert params object to query string
        const url = `${this.VERIFY_PAYMENT_ACCOUNT_NUMBER}`;


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

    async getReports(payload: Record<string, any>): Promise<ResourceFetchResponse<Record<string, any>> | undefined> {
        // Convert params object to query string
        const url = `${this.REPORT_RESOURCE}`;


        try {
            const res = await axiosInstance.post<ResourceFetchResponse<Record<string, any>> | undefined>(
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

    async getReportDetail(payload: Record<string, any>): Promise<ResourceFetchResponse<Record<string, any>> | undefined> {
        // Convert params object to query string
        const url = `${this.REPORT_RESOURCE}-detail`;


        try {
            const res = await axiosInstance.post<ResourceFetchResponse<Record<string, any>> | undefined>(
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



    // Public methods for request management
    cancelRequest(key: string): void {
        this.abortManager.cancelRequest(key);
    }

    cancelAllRequests(): void {
        this.abortManager.cancelAllRequests();
    }
}

export const institutionModule = new InstitutionModule();
