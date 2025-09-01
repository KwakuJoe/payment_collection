<template>


    <div class="flex flex-col min-h-screen w-full items-center  bg-white  dark:bg-[#18181B] ">

        <!-- Header Filters -->
        <div
            class="flex lg:flex-row flex-col flex-wrap lg:items-center w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 justify-between max-w-7xl mt-2 rounded-md">
            <p class="font-medium">Filters</p>
            <div class="flex flex-wrap  gap-x-2 gap-y-1 flex-1 items-end justify-end ">
                <!-- Date Range Filter -->
                <div class=" lg:w-[250px] w-full ">

                    <Calendar showIcon iconDisplay="input" size="small" fluid v-model="dashboardFilters.dateRange"
                        selection-mode="range" :manual-input="false" date-format="dd/mm/yy"
                        placeholder="Select date range" class="w-full" />
                </div>

                <!-- branch -->
                <div class="lg:w-[250px] w-full">
                    <Select filter size="small" fluid v-model="dashboardFilters.branch" :options="branchOptions"
                        option-label="label" option-value="value" placeholder="Select branch" class="w-full" />
                </div>

                <div class="lg:w-[100px] w-full">
                    <Button size="small" fluid @click="resetFilters" icon="pi pi-refresh" label="Apply" severity="" />
                </div>
            </div>
        </div>


        <div class="flex flex-col w-full  max-w-7xl">
            <!-- Cards Error -->
            <div v-if="isFetchError1"
                class="flex w-full border border-gray-100 dark:border-zinc-800  dark:bg-black/20 max-w-7xl rounded-md my-2">
                <ErrorView message="Failed to retrieve data" @retry="refreshDashboardData()" />
            </div>

            <!-- Cards Loaders -->
            <div v-else-if="loading1" class="flex w-full my-2">
                <CardLoaders />
            </div>

            <!-- Header cards -->
            <div v-else class="flex lg:flex-row flex-col w-full mt-2 gap-x-2">
                <!-- total service -->
                <div
                    class="flex lg:items-center lg:w-1/3 w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3">
                    <div class="flex justify-center items-center w-14 h-14 bg-primary-500/10 rounded-full">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="f7:cube-box" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Total Services</p>
                        <p class="font-bold text-2xl"> 20</p>
                    </div>
                </div>
                <!-- total institutions -->
                <div
                    class="flex lg:items-center lg:w-1/3 w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3">
                    <div class="flex justify-center items-center w-14 h-14 bg-primary-500/10 rounded-full">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="tdesign:institution" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Total Institutions</p>
                        <p class="font-bold text-2xl"> 20</p>
                    </div>
                </div>
                <!-- Total Amount -->
                <div
                    class="flex lg:items-center lg:w-1/3 w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3">
                    <div class="flex justify-center items-center w-14 h-14 bg-primary-500/10 rounded-full">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="si:money-line" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Total Amount</p>
                        <p class="font-bold text-2xl"> 20,000.00</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- top services & bar chart -->
        <div class="flex lg:flex-row flex-col w-full max-w-7xl mt-2 gap-x-2">
            <!-- top services -->
            <div
                class="flex flex-col  lg:w-1/3 w-full p-4 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3 ">
                <div class="flex mb-2">
                    <p>Top Services</p>
                </div>

                <!-- error -->
                <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <TopServicesLoader v-else-if="loading1" />
                <!-- list of services -->
                <TopServices v-else />

            </div>

            <!-- bar chart -->
            <div
                class="flex flex-col  lg:flex-1 w-full p-4 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3 justify-end ">
                <!-- error -->
                <ErrorView v-if="isFetchError2" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <VerticalBarChartLoader v-else-if="loading2" />

                <BarChart v-else />
            </div>
        </div>

        <!-- line graphs & pie chart -->
        <div class="flex lg:flex-row flex-col  w-full max-w-7xl mt-2 gap-x-2">
            <!-- Line chart -->
            <div
                class="flex flex-col  lg:flex-1 w-full p-4 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3 ">
                <!-- error -->
                <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <LineChartLoader v-else-if="loading2" />
                <!-- line chart -->
                <LineChart v-else />
            </div>
            <!-- pie Chart -->
            <div
                class="flex flex-col justify-center items-center  lg:w-1/3 w-full p-5 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3 ">
                <!-- error -->
                <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <PieChartLoader v-else-if="loading2" />
                <!-- pie chart -->
                <DoughnutChart v-else />

            </div>
        </div>

        <!-- horizontal bar graph -->
        <div
            class="flex flex-col w-full max-w-7xl mt-2 p-4 gap-x-2 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20  rounded-md">

            <!-- error -->
            <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
            <!-- loader -->
            <HorizontalBarChartLoader v-else-if="loading2" />
            <!-- Line chart -->
            <HorizontalBarChart v-else/>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
import type { DashboardFilters, ServiceFilterOption } from "~/types";
import moment from "moment";
import { useAuthStore } from '~/store/auth';
import { institutionModule } from "~/repository/modules/institution_module";


const authStore = useAuthStore()
const loading1 = ref(false)
const loading2 = ref(false)
const isFetchError1 = ref(false)
const isFetchError2 = ref(false)
// Helper functions for date handling
const getInitialDateRange = (): [Date, Date] => {
    const endDate = moment().startOf('day').toDate();
    const startDate = moment().startOf('day').toDate();
    return [startDate, endDate];
};
const dashboardFilters = ref<DashboardFilters>({
    dateRange: getInitialDateRange(),
    branch: `${authStore.user.branch_name}`,
});


const branchOptions = ref<ServiceFilterOption[]>([
    { label: 'Dansoman', value: 'dansoman' },
    { label: 'Ridge', value: 'ridge' },
    { label: 'Kumasi', value: 'kumasi' },
    { label: 'Cape coast', value: 'cape_coast' }
])


// Reset backend filters
const resetFilters = (): void => {
    dashboardFilters.value = {
        dateRange: getInitialDateRange(),
        branch: null,
    };
    // refresh
};

// Function to simulate API call with delay
function simulateApiCall(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                status: true,
                data: []
            });
        }, ms);
    });
}

// Alternative: Function that can simulate success or failure
// function simulateApiCallWithError(ms: number, shouldFail: boolean = false) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (shouldFail) {
//                 reject(new Error('Simulated API error'));
//             } else {
//                 resolve({
//                     status: true,
//                     data: [
//                         { id: 1, name: 'Sample Data 1' },
//                         { id: 2, name: 'Sample Data 2' }
//                     ]
//                 });
//             }
//         }, ms);
//     });
// }

// endpoint 1
async function getDashboardData1() {
    loading1.value = true;
    isFetchError1.value = false;
    try {
        console.log('Starting API call simulation...');

        // Use await with the simulation function
        const res: any = await simulateApiCall(3000);

        console.log('API call completed:', res);

        if (res.status === true) {
            // do something with successful response
            isFetchError1.value = false;
            console.log('Data loaded successfully:', res.data);
        } else {
            // handle unsuccessful response
            isFetchError1.value = true;
        }

    } catch (error: any) {
        console.error('Failed to fetch categories:', error);
        isFetchError1.value = true;
        // toast notification here
    } finally {
        loading1.value = false;
    }
}

async function getDashboardData2() {
    loading2.value = true;
    isFetchError2.value = false;
    try {
        console.log('Starting API call 2 simulation...');

        // You can simulate failure by changing false to true
        const res: any = await simulateApiCall(3000);

        console.log('API call 2 completed:', res);

        if (res.status === true) {
            isFetchError2.value = false;
            console.log('Data 2 loaded successfully:', res.data);
        } else {
            isFetchError2.value = true;
        }

    } catch (error: any) {
        console.error('Failed to fetch data 2:', error);
        isFetchError2.value = true;
        // toast notification here
    } finally {
        loading2.value = false;
    }
}


function refreshDashboardData() {
    getDashboardData1()
    getDashboardData2()
}

onMounted(() => {
    getDashboardData1()
    getDashboardData2()
})


definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})

</script>

<style></style>
