<template>
    <div class="  w-full">
        <div class=" mx-auto">

            <!-- Backend Filters -->
            <div class=" rounded-lg mb-6  border border-gray-100 dark:border-zinc-800  p-3 ">
                <div class="flex lg:flex-row flex-col items-center gap-x-10 gap-y-2">

                    <div class="flex items-center  lg:w-fit w-full">
                        <h3 class="text-base font-semibold text-gray-900 dark:text-white ">Filters</h3>
                    </div>

                    <div class="flex lg:flex-row flex-col lg:flex-1 w-full items-center  justify-end gap-x-5 gap-y-2">
                        <!-- Date Range Filter -->
                        <div class="lg:flex-1 w-full">

                            <Calendar size="small" fluid v-model="backendFilters.dateRange" selection-mode="range"
                                :manual-input="false" date-format="dd/mm/yy" placeholder="Select date range"
                                class="w-full" />
                        </div>

                        <!-- Service Filter -->
                        <div class="lg:flex-1 w-full">
                            <Select size="small" fluid v-model="backendFilters.service" :options="serviceOptions"
                                option-label="label" option-value="value" placeholder="Select service" class="w-full" />
                        </div>

                        <!-- Filter Actions -->
                        <div class="flex lg:flex-1 w-full gap-x-2">
                            <Button size="small" fluid @click="applyFilters" :loading="loading" icon="pi pi-search"
                                label="Apply Filters" class="" />
                            <Button size="small" fluid @click="resetFilters" :disabled="loading" icon="pi pi-refresh" label="Reset"
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
                    sortable resizable-columns column-resize-mode="fit" size="large" striped-rows class="p-datable-sm">
                    <!-- Header with search and export -->
                    <template #header>
                        <div class="flex justify-between items-center gap-x-10 ">
                            <div>
                                <h2 class="text-base font-semibold text-gray-900 dark:text-white">Transaction Reports
                                </h2>
                                <!-- <p class="text-sm text-gray-500 dark:text-gray-400">{{ tableData.length }} records found
                                </p> -->
                            </div>
                            <div class="flex">

                            </div>
                            <div class="flex flex-1 gap-2 justify-end">
                                <!-- Frontend Search -->
                                <div class="flex  w-[300px]">
                                    <InputText size="small" fluid v-model="globalFilterValue"
                                        placeholder="Search by ID, Service, Reference..." class="w-full" />
                                </div>


                                <!-- Export Button -->
                                <Button size="small" icon="pi pi-external-link" label="Export CSV" @click="exportCSV"
                                    severity="secondary" outlined />
                            </div>
                        </div>
                    </template>

                    <Column header="Actions" :exportable="false" style="min-width:100px">
                        <template #body="slotProps">
                            <!-- Action Button -->
                            <button
                                class="flex justify-center items-center h-10 w-10 p-3 rounded-lg border border-gray-200 border-solid dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900"
                                @click="onOpenLabDetails(slotProps.data)">
                                <Icon name="material-symbols:more-horiz" />
                            </button>
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


    <!-- report detail dialog -->
        <Dialog v-model:visible="isReportDetailDialogOpen" block-scroll maximizable modal header="Report details" position="center"
        :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <ReportDetail v-if="selectedRecord" :record="selectedRecord" @on-close="isReportDetailDialogOpen = false"
            @on-success="handleSuccess" />
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { computed } from 'vue'
import moment from 'moment';
import type { TableColumn, TableFilters, BackendFilters, ServiceFilterOption } from "~/types";
import { removeEmptyPropertiesDeep } from '~/utils'
// Reactive data with type annotations
const loading = ref<boolean>(false)
const tableData = ref<Record<string, any>[]>([])
const columns = ref<TableColumn[]>([])
const isReportDetailDialogOpen = ref(false)
const selectedRecord = ref<Record<string, any> | null>(null)
const dt = ref<any>() // Type 'any' for PrimeVue DataTable ref

const filters = ref<TableFilters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Computed property for InputText v-model binding
const globalFilterValue = computed({
    get: () => (filters.value.global?.value as string) ?? '',
    set: (val: string) => {
        if (filters.value.global) {
            filters.value.global.value = val
        }
    }
})

// Helper functions for date handling
const getInitialDateRange = (): [Date, Date] => {
    const endDate = moment().endOf('day').toDate();
    const startDate = moment().subtract(30, 'days').startOf('day').toDate();
    return [startDate, endDate];
};

// Backend filters
const backendFilters = ref<BackendFilters>({
    dateRange: getInitialDateRange(),
    service: null
});


// backend filter payload

const backedFilterPayload = computed(() => {

    const cleanedPayload = removeEmptyPropertiesDeep(backendFilters.value)
    return {
        start_date: cleanedPayload.dateRange?.[0] ?? null,
        end_date: cleanedPayload.dateRange?.[1] ?? null,
        service: cleanedPayload.service
    }
})


// Service options
const serviceOptions = ref<ServiceFilterOption[]>([
    { label: 'Mobile Banking', value: 'mobile_banking' },
    { label: 'Internet Banking', value: 'internet_banking' },
    { label: 'USSD Banking', value: 'ussd_banking' },
    { label: 'POS Transaction', value: 'pos_transaction' }
])

// Sample data initialization
const initializeTable = (): void => {
    // Dynamic columns
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
        { field: 'transactionDate', header: 'Transaction Date', sortable: true, exportable: true }
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
        // ... other sample data
    ]
}

// Fetch data from backend
const fetchReportData = async (): Promise<void> => {
    loading.value = true

    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        initializeTable()
    } catch (error) {
        console.error('Error fetching report data:', error)
    } finally {
        loading.value = false
    }
}

// date range validation
const isValidDateRange = (dateRange: [Date | null, Date | null] | null): boolean => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) return false;
    return moment(dateRange[1]).isSameOrAfter(dateRange[0]);
};

// Apply backend filters
const applyFilters = (): void => {
    if (!isValidDateRange(backendFilters.value.dateRange)) {
        // Show error message or handle invalid date range
        return;
    }
    fetchReportData();
};

// Reset backend filters
const resetFilters = (): void => {
    backendFilters.value = {
        dateRange: getInitialDateRange(),
        service: null
    };
    fetchReportData();
};


// handle success
function handleSuccess(){
    isReportDetailDialogOpen.value = false,
    fetchReportData()
}

// Export CSV
const exportCSV = (): void => {
    dt.value?.exportCSV()
}

// Handle row details
const onOpenLabDetails = (data: Record<string, any>): void => {
    console.log('Opening details for:', data)
    isReportDetailDialogOpen.value = true;
    selectedRecord.value = data;
    // Implement your row details logic here
}

// Initialize on mount
onMounted(() => {
    initializeTable()
})
</script>