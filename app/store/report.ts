import { defineStore } from 'pinia'

export const useReportStore = defineStore('report', () => {

    const loading = ref<boolean>(false)

    const tableOverviewData = ref({
        service_name: "",
        service_account: "",
        service_total_amount: 0,
        service_count: 0,
    })


    return {
        loading,
        tableOverviewData
    }
})