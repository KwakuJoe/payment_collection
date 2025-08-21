<template>

    <!-- error -->
    <ErrorView v-if="isGetReportError" message="There was error trying to fetch report detail"
        @retry="getReportDetail()" />

    <!-- loader -->
    <Loading v-else-if="loading" message="Fetch report detail data ..." />

    <div v-else class="w-full">
        <Tabs value="0" scrollable>
            <TabList>
                <Tab value="0">RECEIPT</Tab>
                <Tab value="1">TRANSACTION</Tab>
                <Tab value="2">FORM DATA</Tab>
                <Tab value="3">CORE BANKING DETAILS</Tab>
                <Tab value="4">CASH DENOMINATION</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <ReportReceipt  :record="reportDetailResource?.data ?? null" @on-close="emits('on-close')" />
                </TabPanel>
                <TabPanel value="1">
                    <ViewReportDetail :record="reportDetailResource?.data ?? null" @on-close="emits('on-close')" />
                </TabPanel>
                <TabPanel value="2">
                    <ReportFormData :record="reportDetailResource?.data ?? null" @on-close="emits('on-close')"/>
                </TabPanel>
                <TabPanel value="3">
                <ReportCoreBankingData :record="reportDetailResource?.data ?? null" @on-close="emits('on-close')"/> 
                </TabPanel>
                <TabPanel value="4">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                        provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                        facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
<script setup lang="ts">
import { institutionModule } from '~/repository/modules/institution_module';
import type { ResourceFetchResponse } from '~/types';
import { useToast } from "primevue/usetoast";



const props = defineProps<{
    record: Record<string, any> | null,
}>()

const emits = defineEmits(['on-success', 'on-close'])

const toast = useToast()
const reportDetailResource = ref<ResourceFetchResponse<Record<string, any>>>()

const payload = computed(() => {
    return {
        transaction_id: props.record?.id
    }
})

// data
const loading = ref(false)
const isGetReportError = ref(false)



async function getReportDetail() {
    loading.value = true;
    isGetReportError.value = false;



    try {
        const res = await institutionModule.getReportDetail(
            payload.value,
        );

        if (res?.status === true) {
            loading.value = false;
            isGetReportError.value = false;
            reportDetailResource.value = res;
        } else {
            loading.value = false;
        toast.add({
            severity: "error",
            detail: 'Failed to fetch resources..',
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


onMounted(() => {
    getReportDetail()
})

</script>
<style></style>