<template>
    <div
        class="flex flex-col w-full p-10 bg-white border border-gray-100 rounded-md gap-y-5 dark:bg-black/20 dark:border-zinc-800">


        <div class="flex flex-col w-full gap-y-5">

            <!-- details -->
            <div class="flex flex-col w-full gap-y-5 ">
                <p class="text-xl font-bold">Verified </p>

                <div
                    class="flex flex-col w-full p-4 border border-gray-100 rounded-md dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                    <div class="flex items-center justify-between ">
                        <p class="text-sm">Phone Number</p>
                        <p class="text-sm font-bold">0553410199</p>
                    </div>

                    <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>

                    <div class="flex items-center justify-between ">
                        <p class="text-sm">Meter Number</p>
                        <p class="text-sm font-bold">7374662636</p>
                    </div>

                    <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>

                    <div class="flex items-center justify-between ">
                        <p class="text-sm">Customer Name</p>
                        <p class="text-sm font-bold">0553410199</p>
                    </div>

                    <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>

                    <div class="flex items-center justify-between ">
                        <p class="text-sm">Balance</p>
                        <p class="text-sm font-bold">4.500</p>
                    </div>
                </div>
            </div>

            <FormFieldSection :prepareFormFields="prepareFormFields" :service="service"
                :verification_form_fields="verification_form_fields" :submission_form_fields="submission_form_fields"
                :form_fields="submission_form_fields" />

            <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
            <div class="flex w-full gap-x-5">
                <Button size="lg" severity="secondary" class="w-full lg:w-1/2" @click="backStepper()">
                    {{ props.verification_form_fields.length > 0 ? 'BACK' : 'CANCEL' }}
                </Button>
                <Button size="lg" class="w-full lg:w-1/2" @click="nextStepper()">CONTINUE</Button>

            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { usePaymentStepsStore } from '~/store/payment'
import type { FormField, FormFieldForPosting, Service } from "~/types";

const formErrors = ref<Record<string, string[]> | null>(null);
const paymentStore = usePaymentStepsStore();
const { currentStep } = storeToRefs(paymentStore)


const props = defineProps<{
    prepareFormFields: FormFieldForPosting[];
    service: Service | null;
    verification_form_fields: FormField[];
    submission_form_fields: FormField[];
    form_fields: FormField[];
}>();



const nextStepper = (async () => {
    console.log('Going home')
    paymentStore.currentStep++;
});

const backStepper = (async () => {
    console.log('Going home')

    if (paymentStore.currentStep > 1 && (props.verification_form_fields.length > 0)) {
        paymentStore.currentStep--;
    } else {
        goHome();
    }

});

</script>