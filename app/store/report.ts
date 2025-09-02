import { defineStore } from 'pinia'
import type { DasboardServiceSummary } from '~/types';

export const useReportStore = defineStore('report', () => {

    const loading = ref<boolean>(false)

    const tableOverviewData = ref({
        service_name: "",
        service_account: "",
        service_total_amount: 0,
        service_count: 0,
    })

    const dasboardServiceSummary = ref({} as DasboardServiceSummary);

    return {
        loading,
        tableOverviewData,
        dasboardServiceSummary
    }
})