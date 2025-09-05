<template>
    <div class="w-full ">


        <div class="mx-auto ">

            <!-- Backend Filters -->
            <div class="p-3 mb-6 border border-gray-100 rounded-lg dark:border-zinc-800">
                <div class="flex flex-col items-center lg:flex-row gap-x-10 gap-y-2">

                    <!-- <div class="flex items-center w-full lg:w-fit">
                        <h3 class="text-base font-semibold text-gray-900 dark:text-white ">Filters</h3>
                    </div> -->

                    <div class="flex flex-col items-center justify-end w-full lg:flex-row lg:flex-1 gap-x-5 gap-y-2">


                        <!-- Service Filter -->
                        <div class="w-full lg:flex-1">
                            <Select filter size="small" :disabled="isServicesLoading" fluid
                                v-model="backendFilters.service" :options="serviceOptions" option-label="label"
                                option-value="value"
                                :placeholder="isServicesLoading ? 'Fetching service ...' : 'Select service'"
                                class="w-full" />
                        </div>
                        <!-- Date Range Filter -->
                        <div class="w-full lg:flex-1">

                            <Calendar showIcon iconDisplay="input"  size="small" fluid v-model="backendFilters.dateRange" selection-mode="range"
                                :manual-input="false" date-format="dd/mm/yy" placeholder="Select date range"
                                class="w-full" />
                        </div>

                        <!-- branch -->
                        <!-- <div class="w-full lg:flex-1">
                            <Select filter size="small" fluid v-model="backendFilters.branch" :options="branchOptions"
                                option-label="label" option-value="value" placeholder="Select branch" class="w-full" />
                        </div>

                        <div class="w-full lg:flex-1">
                            <Select filter size="small" fluid v-model="backendFilters.teller" :options="tellerOptions"
                                option-label="label" option-value="value" placeholder="Select teller" class="w-full" />
                        </div> -->


                        <!-- Filter Actions -->
                        <div class="flex w-full lg:flex-1 gap-x-2">
                            <Button size="small" fluid @click="applyFilters" :loading="loading" icon="pi pi-search"
                                label="Apply" class="" />
                            <Button size="small" fluid @click="resetFilters" :disabled="loading" icon="pi pi-refresh"
                                label="Reset" severity="secondary" outlined />
                        </div>
                    </div>

                </div>
            </div>

            <!-- error view -->
            <div v-if="isGetReportError" class="flex flex-col w-full">
                <ErrorView title="Error fetching report" message="There was an error fetching report, please try again"
                    @retry="getReports()" />
            </div>



            <!-- Empty state -->
            <div v-else-if="reportResource?.data.transactions.length < 1" class="flex flex-col w-full">
                <EmptyState title="No Reports found"
                    message="There was an error fetching report, Try adjusting filter (Eg. date ranger, service ..)"
                    @retry="getReports()" />
            </div>

            <!-- loading -->

            <div v-else-if="loading" class="flex flex-col w-full">
                <Loading message="Fetching reports" @retry="getReports()" />
            </div>


            <!-- DataTable -->
            <div v-else class="w-full overflow-x-auto ">
                <DataTable ref="dt" :value="tableData" paginator :rows="10" :rows-per-page-options="[5, 10, 20, 50]"
                    v-model:filters="filters" filter-display="menu"
                    :global-filter-fields="['id', 'service', 'bankReference', 'channelRef', 'branch', 'branchUserName']"
                    sortable resizable-columns column-resize-mode="fit" size="small" striped-rows class="p-datable-sm">
                    <!-- Header with search and export -->
                    <template #header>
                        <div class="flex items-center justify-between gap-x-10 ">
                            <div>
                                <h2 class="text-base font-semibold text-gray-900 dark:text-white">Transaction Reports
                                </h2>
                                <!-- <p class="text-sm text-gray-500 dark:text-gray-400">{{ tableData.length }} records found
                                </p> -->
                            </div>
                            <div class="flex">

                            </div>
                            <div class="flex justify-end flex-1 gap-2">
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

                    <Column header="-" :exportable="false" style="min-width:100px">
                        <template #body="slotProps">
                            <!-- Action Button -->
                            <button
                                class="flex items-center justify-center w-8 h-8 p-2 border border-gray-200 border-solid rounded-lg dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900"
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
                            <!-- <span v-else-if="col.field === 'id'"
                                class="px-2 py-1 font-mono text-sm bg-gray-100 rounded dark:bg-gray-700">
                                {{ slotProps.data[col.field] }} 
                            </span> -->

                            <span v-else-if="col.field === 'status'" class="">
                                <Tag style="height: 20px; font-size: 12px;" :severity="slotProps.data[col.field] === true ?
                                    'success' : 'danger'" value="Success">{{ slotProps.data[col.field] === true ?
                                        'success' : 'Failed' }}</Tag>
                            </span>

                            <span v-else-if="col.field === 'is_core_banking'" class="">
                                <Tag style="height: 20px; font-size: 12px;" :severity="slotProps.data[col.field] === true ?
                                    'success' : 'danger'" value="Success">{{ slotProps.data[col.field] === true ?
                                        'Yes' : 'No' }}</Tag>
                            </span>

                            <span v-else-if="col.field === 'core_banking_status'" class="">
                                <Tag style="height: 20px; font-size: 12px;" :severity="slotProps.data[col.field] == 'SUCCESS' ?
                                    'success' : 'danger'" value="Success">{{ slotProps.data[col.field] == 'SUCCESS' ?
                                        'success' : 'Failed' }}</Tag>
                            </span>
                            <span v-else>
                                {{ slotProps.data[col.field] }}
                            </span>
                        </template>
                    </Column>



                    <!-- Empty state -->
                    <template #empty>
                        <div class="py-8 text-center">
                            <i class="mb-4 text-4xl text-gray-400 pi pi-search dark:text-gray-600"></i>
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
    <Dialog v-model:visible="isReportDetailDialogOpen" block-scroll maximizable modal header="Report details"
        position="center" :style="{ width: '80rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <ReportDetail v-if="selectedRecord" :record="selectedRecord" @on-close="isReportDetailDialogOpen = false"
            @on-success="handleSuccess" />
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { computed } from 'vue'
import moment from 'moment';
import type { TableColumn, TableFilters, BackendFilters, ServiceFilterOption, ResourceListResponse, Service, ResourceFetchResponse } from "~/types";
import { removeEmptyPropertiesDeep } from '~/utils'
import { useToast } from "primevue/usetoast";
import { institutionModule } from '~/repository/modules/institution_module';
import { useReportStore } from '~/store/report';
import { useAuthStore } from '~/store/auth';


// Reactive data with type annotations
const loading = ref<boolean>(false)
const tableData = ref<Record<string, any>[]>([])
const columns = ref<TableColumn[]>([])
const isReportDetailDialogOpen = ref(false)
const selectedRecord = ref<Record<string, any> | null>(null)
const dt = ref<any>() // Type 'any' for PrimeVue DataTable ref
const isServicesLoading = ref(false)
const servicesResource = ref<ResourceListResponse<Service> | undefined>()
const reportResource = ref<ResourceFetchResponse<Record<string, any>> | undefined>()
const isGetReportError = ref(false)
const reportStore = useReportStore()
const toast = useToast();
const authStore = useAuthStore()

// const columnHeader = ref<>([])
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
    const startDate = moment().startOf('day').toDate();
    return [startDate, endDate];
};

// Backend filters
const backendFilters = ref<BackendFilters>({
    dateRange: getInitialDateRange(),
    service: null,
    branch: `${authStore.user.branch_name}`,
    teller: `${authStore.user.username}`,
});


// backend filter payload

const backedFilterPayload = computed(() => {
    const cleanedPayload = removeEmptyPropertiesDeep(backendFilters.value)
    return {
        start_date: cleanedPayload.dateRange?.[0] ?? null,
        end_date: cleanedPayload.dateRange?.[1] ?? null,
        service: cleanedPayload.service,
        teller: cleanedPayload.teller,
        branch: cleanedPayload.branch,
    }
})


// Service options
const serviceOptions = computed(() => {
    return servicesResource.value?.data.map((service: Service) => ({
        label: service.name,
        value: service.id
    }))
})

const branchOptions = ref<ServiceFilterOption[]>([
    { label: 'Dansoman', value: 'dansoman' },
    { label: 'Ridge', value: 'ridge' },
    { label: 'Kumasi', value: 'kumasi' },
    { label: 'Cape coast', value: 'cape_coast' }
])

const tellerOptions = ref<ServiceFilterOption[]>([
    { label: 'Ann Marie', value: 'dansoman' },
    { label: 'Kwame Bolt', value: 'ridge' },
    { label: 'James Asar', value: 'kumasi' },
    { label: 'Levi North', value: 'cape_coast' }
])

// Sample data initialization
const initializeTable = (): void => {
    // Dynamic columns
    columns.value = []

    // Sample table data
    tableData.value = []
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

async function getReports() {
    loading.value = true;
    reportStore.loading = true;
    isGetReportError.value = false;


    reportStore.tableOverviewData.service_name = ' - ';
    reportStore.tableOverviewData.service_account = '-';
    reportStore.tableOverviewData.service_total_amount = 0
    reportStore.tableOverviewData.service_count = 0


    try {
        backedFilterPayload.value.branch = authStore.user.branch_name
        backedFilterPayload.value.teller = authStore.user.username
        const res = await institutionModule.getReports(
            backedFilterPayload.value,
        );

        if (res?.status === true) {

            if (res?.data.transactions.length > 0) {
                console.log(res?.data.transactions[0])
                columns.value = generateColumns(res?.data.transactions)
                tableData.value = res?.data.transactions;

                // assign overview data
                reportStore.tableOverviewData.service_name = res?.data.service_name
                reportStore.tableOverviewData.service_account = res?.data.service_account
                reportStore.tableOverviewData.service_total_amount = res?.data.service_total_amount
                reportStore.tableOverviewData.service_count = res?.data.service_count
            } else {
                console.log('Transaction is empty')
            }

            reportResource.value = res;
            // const firstArray = res?.data['transactions'][0];
            loading.value = false;
            reportStore.loading = false;

            isGetReportError.value = false;
        } else {
            loading.value = false;
            reportStore.loading = false;

            toast.add({
                severity: "error",
                detail: 'Failed to fetch report data',
                summary: "Sever error",
            });
        }



    } catch (error: any) {
        isGetReportError.value = true;
        console.error('Failed to fetch services:', error);

        toast.add({
            severity: "error",
            detail: error.response?.data?.message ?? error.message,
            summary:
                error.response?.status == 401 ? "Unauthenticated" : "Sever error",
        });
    } finally {
        loading.value = false;
    }
}


async function getServices(requestSource?: string) {
    isServicesLoading.value = true;

    try {
        const res = await institutionModule.getServices(
            { abortKey: 'get-all-services', enableAbort: false },
        );

        if (res?.status === true) {
            servicesResource.value = res;

            // generateColumn


        } else {

            toast.add({
                severity: "error",
                detail: 'Failed to fetch services',
                summary: "Sever error",
            });
        }

        isServicesLoading.value = false;

    } catch (error: any) {
        console.error('Failed to fetch services:', error);

        toast.add({
            severity: "error",
            detail: error.response?.data?.message ?? error.message,
            summary:
                error.response?.status == 401 ? "Unauthenticated" : "Sever error",
        });
    } finally {
        isServicesLoading.value = false;
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
    getReports();
};

// Reset backend filters
const resetFilters = (): void => {
    backendFilters.value = {
        dateRange: getInitialDateRange(),
        service: null,
        branch: null,
        teller: null
    };
    fetchReportData();
};



function generateColumns(transactions: any[]) {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const firstTransaction = transactions[0];
    const excludeColumns = ['id']; // Add any other columns you want to hide

    return Object.keys(firstTransaction)
        .filter(key => !excludeColumns.includes(key)) // Filter out excluded columns
        .map((key) => {
            let header = key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/_/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            header = header.charAt(0).toUpperCase() + header.slice(1);

            return {
                field: key,
                header: header,
                sortable: true,
                exportable: true,
            };
        });
}


// handle success
function handleSuccess() {
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
    getServices()
    getReports()
})
</script>