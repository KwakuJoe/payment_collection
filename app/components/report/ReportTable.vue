<template>
    <div class=" min-h-screen w-full">
        <div class=" mx-auto">

            <!-- Backend Filters -->
            <div class=" rounded-lg mb-6  border border-gray-100 dark:border-zinc-800 bg-white dark:bg-black/20 p-3 ">
                <div class="flex lg:flex-row flex-col items-center gap-x-10 gap-y-2">

                    <div class="flex items-center  lg:w-fit w-full">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white ">Filters</h3>
                    </div>

                    <div class="flex lg:flex-row flex-col lg:flex-1 w-full items-center  justify-end gap-x-5 gap-y-2">
                        <!-- Date Range Filter -->
                        <div class="lg:flex-1 w-full">

                            <Calendar fluid v-model="backendFilters.dateRange" selection-mode="range"
                                :manual-input="false" date-format="dd/mm/yy" placeholder="Select date range"
                                class="w-full" />
                        </div>

                        <!-- Service Filter -->
                        <div class="lg:flex-1 w-full">
                            <Select fluid v-model="backendFilters.service" :options="serviceOptions"
                                option-label="label" option-value="value" placeholder="Select service" class="w-full" />
                        </div>

                        <!-- Filter Actions -->
                        <div class="flex lg:flex-1 w-full gap-x-2">
                            <Button fluid @click="applyFilters" :loading="loading" icon="pi pi-search"
                                label="Apply Filters" class="" />
                            <Button fluid @click="resetFilters" :disabled="loading" icon="pi pi-refresh" label="Reset"
                                severity="secondary" outlined />
                        </div>
                    </div>

                </div>
            </div>

            <!-- DataTable -->
            <div class=" w-full overflow-x-auto ">
                <DataTable ref="dt" :value="tableData" :loading="loading" paginator :rows="10"
                    :rows-per-page-options="[5, 10, 20, 50]" v-model:filters="filters" filter-display="menu"
                    :global-filter-fields="['id', 'service', 'bankReference', 'channelRef', 'branch', 'branchUserName']"
                    sortable resizable-columns column-resize-mode="fit" size="large"  striped-rows
                    class="p-datable-sm">
                    <!-- Header with search and export -->
                    <template #header>
                        <div class="flex justify-between items-center gap-x-10">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction Reports</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ tableData.length }} records found
                                </p>
                            </div>
                            <div class="flex">

                            </div>
                            <div class="flex flex-1 gap-2 justify-end">
                                <!-- Frontend Search -->
                                <div class="flex  w-[300px]">
                                    <InputText fluid v-model="filters['global'].value"
                                        placeholder="Search by ID, Service, Reference..." class="w-full" />
                                </div>


                                <!-- Export Button -->
                                <Button icon="pi pi-external-link" label="Export CSV" @click="exportCSV"
                                    severity="secondary" outlined />
                            </div>
                        </div>
                    </template>

                    <Column header="Actions" :exportable="false" style="min-width:100px">
                        <template #body="slotProps">
                        <p>Action</p>
                            <!-- <Menu ref="menu" :model="getMenuItems(slotProps.data)" :popup="true">
                                <template #trigger="{ toggle, id }">
                                    <Button icon="pi pi-ellipsis-v" severity="secondary" text rounded
                                        @click="toggle($event)" :aria-controls="id" aria-haspopup="true" />
                                </template>
                            </Menu> -->
                        </template>
                    </Column>

                    <!-- Dynamic Columns -->
                    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
                        :sortable="col.sortable" :exportable="col.exportable" class="min-w-[150px]">
                        <template #body="slotProps">
                            <span v-if="col.field === 'amountPaid'"
                                class="font-semibold text-green-600 dark:text-green-400">
                                {{ slotProps.data[col.field] }}
                            </span>
                            <span v-else-if="col.field === 'id'"
                                class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {{ slotProps.data[col.field] }}
                            </span>
                            <span v-else>
                                {{ slotProps.data[col.field] }}
                            </span>
                        </template>
                    </Column>



                    <!-- Empty state -->
                    <template #empty>
                        <div class="text-center py-8">
                            <i class="pi pi-search text-4xl text-gray-400 dark:text-gray-600 mb-4"></i>
                            <p class="text-gray-500 dark:text-gray-400">No records found</p>
                            <p class="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters or search
                                terms</p>
                        </div>
                    </template>

                    <!-- Loading state -->
                    <template #loading>
                        <div class="flex items-center justify-center py-8">
                            <ProgressSpinner style="width: 50px; height: 50px" stroke-width="8" />
                            <span class="ml-3 text-gray-600 dark:text-gray-400">Loading report data...</span>
                        </div>
                    </template>
                </DataTable>
            </div>

            <!-- Table Info -->
            <!-- <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p><strong>Note:</strong> Date Range and Service filters send requests to backend. Search box filters
                    current table
                    data.</p>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api';
// Reactive data
const loading = ref(false)
const tableData = ref([])
const columns = ref([])
const dt = ref()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Backend filters
const backendFilters = ref({
    dateRange: null,
    service: null
})

// Service options (this would come from backend)
const serviceOptions = ref([
    { label: 'Mobile Banking', value: 'mobile_banking' },
    { label: 'Internet Banking', value: 'internet_banking' },
    { label: 'USSD Banking', value: 'ussd_banking' },
    { label: 'POS Transaction', value: 'pos_transaction' }
])

// Sample data initialization
const initializeTable = () => {
    // Dynamic columns - these would come from backend response
    columns.value = [
        { field: 'id', header: 'ID', sortable: true, exportable: true },
        { field: 'bankReference', header: 'Bank Reference', sortable: true, exportable: true },
        { field: 'amountPaid', header: 'Amount Paid', sortable: true, exportable: true },
        { field: 'channelRef', header: 'Channel Ref', sortable: true, exportable: true },
        { field: 'branch', header: 'Branch', sortable: true, exportable: true },
        { field: 'branchUserName', header: 'Branch User Name', sortable: true, exportable: true },
        { field: 'narration', header: 'Narration', sortable: true, exportable: true },
        { field: 'sourceAccount', header: 'Source Account', sortable: true, exportable: true },
        { field: 'service', header: 'Service', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true },
    ]

    // Sample table data
    tableData.value = [
        {
            id: 'TXN001',
            bankReference: 'BNK2024001234',
            amountPaid: '₦25,000.00',
            channelRef: 'CH2024001',
            branch: 'Victoria Island',
            branchUserName: 'John Adebayo',
            narration: 'Transfer to savings account',
            sourceAccount: '0123456789',
            service: 'Mobile Banking',
            transactionDate: '2024-01-15'
        },
        {
            id: 'TXN002',
            bankReference: 'BNK2024001235',
            amountPaid: '₦150,500.00',
            channelRef: 'CH2024002',
            branch: 'Ikeja',
            branchUserName: 'Sarah Okafor',
            narration: 'Bill payment - PHCN',
            sourceAccount: '0987654321',
            service: 'Internet Banking',
            transactionDate: '2024-01-16'
        },
        {
            id: 'TXN003',
            bankReference: 'BNK2024001236',
            amountPaid: '₦5,000.00',
            channelRef: 'CH2024003',
            branch: 'Surulere',
            branchUserName: 'Michael Chukwu',
            narration: 'Airtime purchase',
            sourceAccount: '1122334455',
            service: 'USSD Banking',
            transactionDate: '2024-01-17'
        }
    ]
}

// Fetch data from backend
const fetchReportData = async () => {
    loading.value = true

    try {
        // Simulate API call with backend filters
        await new Promise(resolve => setTimeout(resolve, 1500))

        // In real implementation, replace with your API call:
        // const { data } = await $fetch('/api/reports', {
        //   method: 'POST',
        //   body: {
        //     dateRange: backendFilters.value.dateRange,
        //     service: backendFilters.value.service
        //   },
        //   headers: {
        //     'ngrok-skip-browser-warning': 'true'
        //   }
        // })
        // columns.value = data.columns
        // tableData.value = data.records

        // For demo, just reinitialize with sample data
        initializeTable()

    } catch (error) {
        console.error('Error fetching report data:', error)
        // Handle error - maybe show toast notification
    } finally {
        loading.value = false
    }
}

// Apply backend filters
const applyFilters = () => {
    fetchReportData()
}

// Reset backend filters
const resetFilters = () => {
    backendFilters.value = {
        dateRange: null,
        service: null
    }
    fetchReportData()
}

// Export CSV
const exportCSV = () => {
    dt.value.exportCSV()
}

// Initialize on mount
onMounted(() => {
    initializeTable()
})
</script>