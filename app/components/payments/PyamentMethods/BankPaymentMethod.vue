<template>
    <div class="flex flex-col w-full gap-y-5  border border-gray-100 dark:border-zinc-800  p-5">
        <div class="flex lg:flex-row flex-col items-end gap-x-5 gap-y-2">
            <div class="flex flex-col lg:w-1/2 w-full ">
                <div class="flex flex-col w-full items-start gap-y-2">
                    <p class="text-sm font-semibold">Bank account</p>
                    <!-- <Input v-model="bank_account" placeholder="Eg 0344332332356..." v-bind="bank_accountAttrs"
                        :class="{ 'border-red-600 border-2': !!(errors.bank_account || formErrors?.bank_account) }" /> -->
                </div>
                <p v-if="!!(errors.bank_account || formErrors?.bank_account)"
                    class="text-sm font-semibold text-red-600 mt-2">{{
                        formErrors?.bank_account?.[0] ??
                        errors.bank_account }}</p>
            </div>
            <!-- verify button -->
            <div class="flex items-center lg:w-1/2 w-full">
                <!-- <Button size="lg" @click="" variant="outline_primary" class="w-full h-12 ">Verify Account Number</Button> -->
            </div>
        </div>

        <!-- account  cards -->
        <div
            class="flex flex-wrap items-center gap-x-5 w-full gap-y-5 bg-green-500/5  border border-green-500/15 rounded-md  p-5">
            <div class="flex flex-col w-12 h-12 rounded-full bg-green-500/10 items-center justify-center">
                <Icon name="akar-icons:bank" class="text-green-500 text-2xl" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-green-500">036636263666636362626</p>
                <p class="text-sm font-semibold ">John Kamris Doe</p>
            </div>
            <div class="flex  rounded-full gap-x-2 bg-green-500/10 items-center justify-center p-2">
                <Icon name="material-symbols:check-circle-outline" class="text-green-500 text-xl" />
                <p class="text-sm font-semibold text-green-500">Sufficient Amount Present</p>
            </div>
        </div>

        <div class="flex flex-wrap  items-center gap-x-5 w-full gap-y-5 bg-red-500/5  border border-red-500/15 rounded-md  p-5">
            <div class="flex flex-col w-12 h-12 rounded-full bg-red-500/10 items-center justify-center">
                <Icon name="akar-icons:bank" class="text-red-500 text-2xl" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-red-500">036636263666636362626</p>
                <p class="text-sm font-semibold ">John Kamris Doe</p>
            </div>
            <div class="flex  rounded-full gap-x-2 bg-red-500/10 items-center justify-center p-2">
                <Icon name="material-symbols:check-circle-outline" class="text-red-500 text-xl" />
                <p class="text-sm font-semibold text-red-500">Insufficient Amount </p>
            </div>
        </div>



        <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
        <!-- amount -->
        <div class="flex gap-x-5 gap-y-2 lg:flex-row flex-col max-w-full justify-end">
            <Button severity="secondary" class="lg:w-1/2 w-full" size="lg" @click="paymentStore.previousStep()">
                GO BACK
            </Button>
            <Button size="lg" class="lg:w-1/2 w-full"  @click="onSubmit()">
                PROCEED TO MAKE PAYMENT
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