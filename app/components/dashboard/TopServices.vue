<template>

    <div>


    <div v-if="reportStore.dasboardServiceSummary.top_10_services?.length > 0" v-for="(service, index) in  reportStore.dasboardServiceSummary.top_10_services"
        class="flex w-full p-3 mt-1 bg-white border border-gray-100 rounded-md lg:items-center dark:border-zinc-800 dark:bg-black/20 gap-x-3 hover:bg-primary-50/30 hover:cursor-pointer">

        <div class="flex flex-col flex-1">
            <div class="flex items-center gap-x-1">
                <!-- <Icon class="text-xl text-primary-500" name="f7:cube-box" /> -->
                <p class="text-sm font-semibold "> {{ service.service }}</p>
            </div>
            <p class="text-sm text-primary">{{ service.institution }}</p>
        </div>

        <!-- amount -->
        <div class="flex justify-end flex-1">
            <p class="font-semibold "> {{ service.total_amount }}</p>
        </div>
    </div>

    <TopServicesLoader v-else />

    </div>
</template>
<script setup lang="ts">
import { useReportStore } from '~/store/report';
import type { DasboardServiceSummary } from '~/types';
const reportStore = useReportStore()

const top_10_services = ref([] as DasboardServiceSummary['top_10_services']);
onMounted(() => {
    top_10_services.value = reportStore.dasboardServiceSummary.top_10_services
})



</script>
<style></style>