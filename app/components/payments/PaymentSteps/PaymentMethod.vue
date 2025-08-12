<template>
    <div
        class="flex flex-col w-full p-10 bg-white border border-gray-100 gap-y-5 dark:bg-black/20 dark:border-zinc-800">
        <p class="text-xl font-bold">Make Payment</p>

        <!-- select payment methods -->
        <div class="flex flex-col items-start w-full p-5 border border-gray-100 gap-y-2 dark:border-zinc-800 ">
            <p class="text-sm font-semibold">Select Field</p>
                      <Select fluid filter v-model="selectedPaymentMethod" :options="paymentMethodsOptions" option-label="label" option-value="id" placeholder="Select a payment method"
            class="w-full md:w-56" />
        </div>

        <!-- depositor info -->
        <div class="flex flex-col w-full p-5 border border-gray-100 gap-y-5 dark:border-zinc-800">
            <form @submit.prevent="onSubmit()">
                <div class="flex w-full lg:flex-row fex-col gap-x-5">

                    <div class="flex flex-col w-full lg:w-1/2">
                        <div class="flex flex-col items-start w-full gap-y-2">
                            <p class="text-sm font-semibold">Depositor name</p>
                            <InputText fluid v-model="depositor_name" placeholder="Eg. John Doe" v-bind="depositor_nameAttrs"
                                :class="{ 'border-red-600 border-2': !!(errors.depositor_name || formErrors?.depositor_name) }" />
                        </div>
                        <p v-if="!!(errors.depositor_name || formErrors?.depositor_name)"
                            class="mt-2 text-sm font-semibold text-red-600">{{
                                formErrors?.depositor_name?.[0] ??
                                errors.depositor_name }}</p>

                    </div>

                    <div class="flex flex-col w-full lg:w-1/2">
                        <div class="flex flex-col items-start w-full gap-y-2">
                            <p class="text-sm font-semibold">Phone number</p>
                            <InputText fluid v-model="depositor_phone" placeholder="Eg: 01234343202" v-bind="depositor_phoneAttrs"
                                :class="{ 'border-red-600 border-2': !!(errors.depositor_phone || formErrors?.depositor_phone) }" />
                        </div>
                        <p v-if="!!(errors.depositor_phone || formErrors?.depositor_phone)"
                            class="mt-2 text-sm font-semibold text-red-600">{{
                                formErrors?.depositor_phone?.[0] ??
                                errors.depositor_phone }}</p>

                    </div>
                </div>

            </form>
        </div>

        <!-- cash -->
        <CashPaymentMethod v-if="selectedPaymentMethod === 'cash'" />

        <BankPaymentMethod v-if="selectedPaymentMethod === 'bank'" />

        
    </div>
</template>

<script setup lang="ts">

import * as yup from "yup";
import { useForm } from "vee-validate";
import BankPaymentMethod from "../PyamentMethods/BankPaymentMethod.vue";
import { usePaymentStepsStore } from "~/store/payment";

const paymentStore = usePaymentStepsStore();
const { currentStep } = storeToRefs(paymentStore)
// data

const paymentMethodsOptions = reactive([
    {
        id: 'cash',
        label: 'Cash',
    },
    {
        id: 'bank',
        label: 'Bank',
    }
])

const selectedPaymentMethod = ref(paymentMethodsOptions[0]!.id)
const formErrors = ref<Record<string, string[]> | null>(null);
const paymentMethods = ref('')

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        depositor_name: yup.string().required('Depositor name required'),
        depositor_phone: yup.string().required('Depositor phone number is required'),
    }),
});

const [depositor_name, depositor_nameAttrs] = defineField("depositor_name");
const [depositor_phone, depositor_phoneAttrs] = defineField("depositor_phone");

const onSubmit = handleSubmit(async (values) => {
    console.log(values)
});


watch(selectedPaymentMethod, (newVal, oldVa) => {
    paymentMethods.value = selectedPaymentMethod.value;
}, {
    immediate: true
})

const nextStepper = (async ( ) => {
    console.log('Going home')


    // Verification API response is success
    // call verification API here
    paymentStore.currentStep++;
});

const backStepper = (async () => {
 paymentStore.currentStep--;
   
});
</script>