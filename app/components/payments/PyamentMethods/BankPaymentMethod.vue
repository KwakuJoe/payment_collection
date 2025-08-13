<template>
    <div class="flex flex-col w-full p-5 border border-gray-100 gap-y-5 dark:border-zinc-800">
        <div class="flex flex-col items-end lg:flex-row gap-x-5 gap-y-2">
            <div class="flex flex-col w-full lg:w-1/2 ">
                <div class="flex flex-col items-start w-full gap-y-2">
                    <p class="text-sm font-semibold">Bank account</p>
                    <!-- <Input v-model="bank_account" placeholder="Eg 0344332332356..." v-bind="bank_accountAttrs"
                        :class="{ 'border-red-600 border-2': !!(errors.bank_account || formErrors?.bank_account) }" /> -->
                </div>
                <p v-if="!!(errors.bank_account || formErrors?.bank_account)"
                    class="mt-2 text-sm font-semibold text-red-600">{{
                        formErrors?.bank_account?.[0] ??
                        errors.bank_account }}</p>
            </div>
            <!-- verify button -->
            <div class="flex items-center w-full lg:w-1/2">
                <!-- <Button size="lg" @click="" variant="outline_primary" class="w-full h-12 ">Verify Account Number</Button> -->
            </div>
        </div>

        <!-- account  cards -->
        <div
            class="flex flex-wrap items-center w-full p-5 border rounded-md gap-x-5 gap-y-5 bg-green-500/5 border-green-500/15">
            <div class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-green-500/10">
                <Icon name="akar-icons:bank" class="text-2xl text-green-500" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-green-500">036636263666636362626</p>
                <p class="text-sm font-semibold ">John Kamris Doe</p>
            </div>
            <div class="flex items-center justify-center p-2 rounded-full gap-x-2 bg-green-500/10">
                <Icon name="material-symbols:check-circle-outline" class="text-xl text-green-500" />
                <p class="text-sm font-semibold text-green-500">Sufficient Amount Present</p>
            </div>
        </div>

        <div class="flex flex-wrap items-center w-full p-5 border rounded-md gap-x-5 gap-y-5 bg-red-500/5 border-red-500/15">
            <div class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
                <Icon name="akar-icons:bank" class="text-2xl text-red-500" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-red-500">036636263666636362626</p>
                <p class="text-sm font-semibold ">John Kamris Doe</p>
            </div>
            <div class="flex items-center justify-center p-2 rounded-full gap-x-2 bg-red-500/10">
                <Icon name="material-symbols:check-circle-outline" class="text-xl text-red-500" />
                <p class="text-sm font-semibold text-red-500">Insufficient Amount </p>
            </div>
        </div>



        <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
        <!-- amount -->
        <div class="flex flex-col justify-end max-w-full gap-x-5 gap-y-2 lg:flex-row">
            <Button severity="secondary" class="w-full lg:w-1/2" size="lg" @click="paymentStore.previousStep()">
                GO BACK
            </Button>
            <Button size="lg" class="w-full lg:w-1/2"  @click="onSubmit()">
                COMPLETE PAYMENT
            </Button>
        </div>


    </div>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { usePaymentStepsStore } from '~/store/payment'

// data
const formErrors = ref<Record<string, string[]> | null>(null);
const paymentStore = usePaymentStepsStore();

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        bank_account: yup.string().required('Bank account is required'),
        bank_name: yup.string().required('Bank name is required'),
    }),
});

const [bank_account, bank_accountAttrs] = defineField("bank_account");

const onSubmit = handleSubmit(async (values) => {
    // console.log(values)
    // Process the bank payment
    paymentStore.currentStep = 4; // Move to the next step after processing
    
    // console.log('Bank payment processed:', values);
});
</script>
<style></style>