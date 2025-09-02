<template>


    <div class="flex flex-col min-h-screen w-full items-center  bg-white  dark:bg-[#18181B] ">

        <!-- Header Filters -->
        <div
            class="flex flex-col flex-wrap justify-between w-full p-3 mt-2 bg-white border border-gray-100 rounded-md lg:flex-row lg:items-center dark:border-zinc-800 dark:bg-black/20 max-w-7xl">
            <p class="font-medium">Filters</p>
            <div class="flex flex-wrap items-end justify-end flex-1 gap-x-2 gap-y-1 ">
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
                    <Button size="small" fluid @click="getServiceSummary" icon="pi pi-refresh" label="Search" severity="" />
                    <!-- <Button size="small" fluid @click="resetFilters" icon="pi pi-refresh" label="Reset" severity="" /> -->
                </div>
            </div>
        </div>


        <div class="flex flex-col w-full max-w-7xl">
            <!-- Cards Error -->
            <div v-if="isFetchError1"
                class="flex w-full my-2 border border-gray-100 rounded-md dark:border-zinc-800 dark:bg-black/20 max-w-7xl">
                <ErrorView message="Failed to retrieve data" @retry="refreshDashboardData()" />
            </div>

            <!-- Cards Loaders -->
            <div v-else-if="loading1" class="flex w-full my-2">
                <CardLoaders />
            </div>

            <!-- Header cards -->
            <div v-else class="flex flex-col w-full mt-2 lg:flex-row gap-x-2">
                <!-- total service -->
                <div
                    class="flex w-full p-3 mt-1 bg-white border border-gray-100 rounded-md lg:items-center lg:w-1/3 dark:border-zinc-800 dark:bg-black/20 gap-x-3">
                    <div class="flex items-center justify-center rounded-full w-14 h-14 bg-primary-500/10">
                        <Icon class="w-12 h-12 text-xl text-primary-500" name="f7:cube-box" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-sm text-primary">Total Services</p>
                        <p class="text-2xl font-bold"> {{ reportStore.dasboardServiceSummary.service_count?.count }}</p>
                    </div>
                </div>
                <!-- total institutions -->
                <div
                    class="flex w-full p-3 mt-1 bg-white border border-gray-100 rounded-md lg:items-center lg:w-1/3 dark:border-zinc-800 dark:bg-black/20 gap-x-3">
                    <div class="flex items-center justify-center rounded-full w-14 h-14 bg-primary-500/10">
                        <Icon class="w-12 h-12 text-xl text-primary-500" name="tdesign:institution" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-sm text-primary">Total Institutions</p>
                        <p class="text-2xl font-bold"> 20</p>
                    </div>
                </div>
                <!-- Total Amount -->
                <div
                    class="flex w-full p-3 mt-1 bg-white border border-gray-100 rounded-md lg:items-center lg:w-1/3 dark:border-zinc-800 dark:bg-black/20 gap-x-3">
                    <div class="flex items-center justify-center rounded-full w-14 h-14 bg-primary-500/10">
                        <Icon class="w-12 h-12 text-xl text-primary-500" name="si:money-line" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-sm text-primary">Total Amount</p>
                        <p class="text-2xl font-bold"> {{ reportStore.dasboardServiceSummary.service_count?.amount }} </p>
                    </div>
                </div>
            </div>
        </div>


        <!-- top services & bar chart -->
        <div class="flex flex-col w-full mt-2 lg:flex-row max-w-7xl gap-x-2">
            <!-- top services -->
            <div
                class="flex flex-col w-full p-4 mt-1 bg-white border border-gray-100 rounded-md lg:w-1/2 dark:border-zinc-800 dark:bg-black/20 gap-x-3 ">
                <div class="flex mb-2">
                    <p>Top 10  Services</p>
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
                class="flex flex-col justify-end w-full p-4 mt-1 bg-white border border-gray-100 rounded-md lg:flex-1/2 dark:border-zinc-800 dark:bg-black/20 gap-x-3 ">
                <!-- error -->
                <ErrorView v-if="isFetchError2" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <VerticalBarChartLoader v-else-if="loading2" />

                <BarChart v-else />
            </div>
        </div>

        <!-- line graphs & pie chart -->
        <div class="flex flex-col w-full mt-2 lg:flex-row max-w-7xl gap-x-2">
            <!-- Line chart -->
            <div
                class="flex flex-col w-full p-4 mt-1 bg-white border border-gray-100 rounded-md lg:flex-1 dark:border-zinc-800 dark:bg-black/20 gap-x-3 ">
                <!-- error -->
                <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
                <!-- loader -->
                <LineChartLoader v-else-if="loading2" />
                <!-- line chart -->
                <LineChart v-else />
            </div>
            <!-- pie Chart -->
            <div
                class="flex flex-col items-center justify-center w-full p-5 mt-1 bg-white border border-gray-100 rounded-md lg:w-1/3 dark:border-zinc-800 dark:bg-black/20 gap-x-3 ">
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
            class="flex flex-col w-full p-4 mt-2 bg-white border border-gray-100 rounded-md max-w-7xl gap-x-2 dark:border-zinc-800 dark:bg-black/20">

            <!-- error -->
            <ErrorView v-if="isFetchError1" message="Failed to retrieve data" @retry="refreshDashboardData()" />
            <!-- loader -->
            <HorizontalBarChartLoader v-else-if="loading2" />
            <!-- Line chart -->
            <HorizontalBarChart v-else/>
        </div>

    </div>

      <Toast />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
import type { DasboardServiceSummary, DashboardFilters, FormatLabelsAndData, ServiceFilterOption } from "~/types";
import moment from "moment";
import { useAuthStore } from '~/store/auth';
import { institutionModule } from "~/repository/modules/institution_module";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { useReportStore } from '~/store/report';


const authStore = useAuthStore()
const loading1 = ref(false)
const loading2 = ref(false)
const isFetchError1 = ref(false)
const isFetchError2 = ref(false)
const toast = useToast();
const reportStore = useReportStore()

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

onMounted( async () => {
    await getServiceSummary()
    // getDashboardData2()
})


definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})




const dashboard_summary = ref<any>(null);


// backend filter payload

const backedFilterPayload = computed(() => {
    const cleanedPayload = removeEmptyPropertiesDeep(dashboardFilters.value)
    return {
        start_date: cleanedPayload.dateRange?.[0] ?? null,
        end_date: cleanedPayload.dateRange?.[1] ?? null,
    }
})



// get services from the institution
async function getServiceSummary() {

  try {
    const res = await institutionModule.getServiceSummary(
      backedFilterPayload.value );
       if (res?.status === true) {
        reportStore.dasboardServiceSummary = res.data as DasboardServiceSummary;
       }else{
        reportStore.dasboardServiceSummary = {} as DasboardServiceSummary;
       }

           toast.add({
      life: 5000,
      severity: "success",
      detail: res?.message ?? "Data loaded successfully",
      summary: '' ,
    });



  } catch (error: any) {
   
    toast.add({
      life: 5000,
      severity: "error",
      detail: error.response?.data?.message ?? error.message,
      summary:
        error.response?.status == 401 ? "Unauthenticated" : "Server error",
    });
  } finally {
    // isServicesLoading.value = false;
  }
}


function formatChartData(items = [], labelKey:string, valueKey:string) {
   
        // alert('has items')
          return {
    labels: items.map(item => item[labelKey]),
    data: items.map(item => Number(item[valueKey]))
  };
  

}

</script>

<style></style>
