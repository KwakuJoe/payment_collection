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
                <Tab value="3" v-if="transaction.is_core_banking">CORE BANKING DETAILS</Tab>
                <Tab value="4" v-if="transaction.currency_denomination">CASH DENOMINATION</Tab>
                <Tab value="5" v-if="transaction.is_core_banking">TRANSMISSION</Tab>
           
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
                <ReportCashDenominationData   :record="currency_denomination" @on-close="emits('on-close')"/> 
                </TabPanel>

                <TabPanel value="5">
                    <ReportTransmissionData :record="reportDetailResource?.data ?? null" @on-close="emits('on-close')"/> 
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
<script setup lang="ts">
import { institutionModule } from '~/repository/modules/institution_module';
import type { DenominationData, ResourceFetchResponse, RootTransaction } from '~/types';
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
const receipt = ref({})
const form_data = ref({})
const transaction = ref( {} as RootTransaction)
const currency_denomination = ref([])

const core_banking = ref({
    status: false,
    message: '',
    reference: '',
    request: null,
    response: null,

})

const transmission = ref({
    status: false,
    message: '',
    reference: '',
    request: null,
    response: null

})



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
            transaction.value = res.data as RootTransaction;

            // transaction.value = res.data
            // form_data.value = res.data.form_data
            // receipt.value = res.data.form_data
            currency_denomination.value =JSON.parse(  res?.data.currency_denomination || "[]")
            
            // core_banking.value.status = res.data.core_banking_status
            // core_banking.value.message = res.data.core_banking_message
            // core_banking.value.reference = res.data.core_banking_reference
            // core_banking.value.request = res.data.core_banking_request
            // core_banking.value.response = res.data.core_banking_response
           
            // transmission.value.status = res.data.transmission_status
            // transmission.value.message = res.data.transmission_message
            // transmission.value.reference = res.data.transmission_reference
            // transmission.value.request = res.data.transmission_request
            // transmission.value.response = res.data.transmission_response

            
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