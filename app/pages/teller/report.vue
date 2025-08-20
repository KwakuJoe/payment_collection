<template>
    <div class=" flex  h-screen w-full justify-center min-h-screen p-5 bg-gray-50 dark:bg-[#18181B]">

        <div class="flex flex-col items-start w-full gap-x-2 gap-y-2 max-w-7xl">

            <!-- cards -->

            <div class="flex w-full gap-x-2">
                <!-- currency -->
                <div
                    class="flex items-start lg:w-[25%] p-5 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-black/20 gap-x-5">
                    <div class="flex justify-center items-center w-12 h-12 bg-primary-500/10 rounded-sm">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="f7:cube-box" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Service</p>
                        <p class="font-bold text-base"> {{ loading ? 'Loading ...' : tableOverviewData.service_name }}</p>
                    </div>
                </div>

                <!-- account number -->
                <div
                    class="flex items-start lg:w-[25%] p-5 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-black/20 gap-x-5">
                    <div class="flex justify-center items-center w-12 h-12 bg-primary-500/10 rounded-sm">
                        <Icon class="w-12 h-12 text-xl  text-primary-500"
                            name="material-symbols-light:account-balance-outline-rounded" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Account Number</p>
                        <p class="font-bold text-base">{{ loading ? 'Loading ...' : tableOverviewData.service_account }}</p>
                    </div>
                </div>

                <!-- total amount -->
                <div
                    class="flex items-start lg:w-[25%] p-5 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-black/20 gap-x-5">
                    <div class="flex justify-center items-center w-12 h-12 bg-primary-500/10 rounded-sm">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="teenyicons:money-stack-outline" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Total</p>
                        <p class="font-bold text-base">{{ loading ? 'Loading ...' : formatCurrency(tableOverviewData.service_total_amount) }}</p>
                    </div>
                </div>

                <!-- total records -->
                <div
                    class="flex items-start lg:w-[25%] p-5 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-black/20 gap-x-5">
                    <div class="flex justify-center items-center w-12 h-12 bg-primary-500/10 rounded-sm">
                        <Icon class="w-12 h-12 text-xl  text-primary-500" name="tabler:files" />

                    </div>
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary text-sm">Record</p>
                        <p class="font-bold text-base">{{ loading ? 'Loading ...' : tableOverviewData.service_count }}</p>
                    </div>
                </div>

            </div>

            <!-- table -->
            <div
                class="flex items-start w-full p-5 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-transparent gap-x-5">

                <ReportTable/>
            </div>


        </div>

    </div>
    

      <!-- toast initialization -->
  <Toast />
</template>
<script setup lang="ts">
import Toast from 'primevue/toast';
import { useReportStore } from '~/store/report';


//data
const reportStore = useReportStore()
const {loading, tableOverviewData} = storeToRefs(reportStore)

definePageMeta({
    layout: 'admin',
    middleware: 'auth'
})



</script>
<style lang="">

</style>