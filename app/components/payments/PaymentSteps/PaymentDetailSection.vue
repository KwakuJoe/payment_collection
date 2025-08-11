<template>
    <div 
        class="flex flex-col w-full p-10 bg-white border border-gray-100 rounded-md gap-y-5 dark:bg-black/20 dark:border-zinc-800">


     <div class="flex flex-col w-full gap-y-5">
        <p class="text-xl font-bold">Payment Details</p>


        <FormFieldSection :prepareFormFields="prepareFormFields" :service="service" :verification_form_fields="verification_form_fields"
            :submission_form_fields="submission_form_fields" :form_fields="verification_form_fields" />



        
            <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
        <div class="flex w-full gap-x-5">
            <Button size="lg" severity="secondary" class="w-full lg:w-1/2" @click="goHome()">CANCEL</Button>
            <Button size="lg" class="w-full lg:w-1/2" @click="nextStepper()">VERIFY</Button>

        </div>

        </div>
    </div>
        

</template>
<script setup lang="ts">
import type { FileObject, FormField, FormFieldForPosting, Service } from "~/types";
import { usePaymentStepsStore } from '~/store/payment'
import { goHome } from '~/utils/index'
import FormFieldSection from "./FormFieldSection.vue";
// props
const props = defineProps<{
        prepareFormFields: FormFieldForPosting[];
    service: Service | null;
    verification_form_fields: FormField[]; 
    submission_form_fields: FormField[];
    
}>();

// data

const formErrors = ref<Record<string, string[]> | null>(null);
const paymentStore = usePaymentStepsStore();
const { currentStep } = storeToRefs(paymentStore)


const nextStepper = (async ( ) => {
    console.log('Going home')


    // Verification API response is success
    // call verification API here
    paymentStore.currentStep++;
});

</script>
<style></style>