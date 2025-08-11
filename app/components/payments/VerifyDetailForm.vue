<template>
    <form @submit.prevent="onSubmit()"
        class="flex flex-col w-full gap-y-5  bg-white dark:bg-black/20 border border-gray-100 dark:border-zinc-800 rounded-md p-10">
            <div class="flex lg:flex-row fex-col w-full  gap-x-5">

            <div class="flex flex-col lg:w-1/2 w-full">
                <div class="flex flex-col w-full items-start gap-y-2">
                    <p class="text-sm font-semibold">Phone number</p>
                    <!-- <Input v-model="phone" placeholder="phone" v-bind="phoneAttrs"
                        :class="{ 'border-red-600 border-2': !!(errors.phone || formErrors?.phone) }" /> -->
                </div>
                <p v-if="!!(errors.phone || formErrors?.phone)" class="text-sm font-semibold text-red-600 mt-2">{{
                    formErrors?.phone?.[0] ??
                    errors.phone }}</p>

            </div>

            <div class="flex flex-col lg:w-1/2 w-full">
                <div class=" flex flex-col w-full items-start gap-y-2">
                    <p class="text-sm font-semibold">Meter number</p>
                    <!-- <Input v-model="meter_number" placeholder="Eg: 01234343202" v-bind="meter_numberAttrs"
                        :class="{ 'border-red-600 border-2': !!(errors.meter_number || formErrors?.meter_number) }" /> -->
                </div>
                <p v-if="!!(errors.meter_number || formErrors?.meter_number)"
                    class="text-sm font-semibold text-red-600 mt-2">{{
                        formErrors?.meter_number?.[0] ??
                        errors.meter_number }}</p>

            </div>
        </div>

        <div class="flex lg:flex-row fex-col w-full  gap-x-5">

            <div class="flex flex-col lg:w-1/2 w-full">
                <div class="flex flex-col w-full items-start gap-y-2">
                    <p class="text-sm font-semibold">Select Field</p>
                    <!-- <Select v-model="select" v-bind="selectAttrs" >
                        <SelectTrigger class="w-full"
                            :class="{ 'border-red-600 border-2': !!(errors.select || formErrors?.select) }">
                            <SelectValue placeholder="Select a something" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">
                                    Prepaid
                                </SelectItem>
                                <SelectItem value="banana">
                                    Postpaid
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select> -->
                </div>
                <p v-if="!!(errors.select || formErrors?.select)" class="text-sm font-semibold text-red-600 mt-2">{{
                    formErrors?.select?.[0] ??
                    errors.select }}</p>

            </div>

            <div class="flex flex-col lg:w-1/2 w-full">
                <div class="flex flex-col w-full items-start gap-y-2">
                    <p class="text-sm font-semibold">Select Field</p>
                    <!-- <Select v-model="multi_select" v-bind="multi_selectAttrs" multiple>
                        <SelectTrigger class="w-full"
                            :class="{ 'border-red-600 border-2': !!(errors.multi_select || formErrors?.multi_select) }">
                            <SelectValue placeholder="Select a something" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">
                                    Prepaid
                                </SelectItem>
                                <SelectItem value="banana">
                                    Postpaid
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select> -->
                </div>
                <p v-if="!!(errors.multi_select || formErrors?.multi_select)" class="text-sm font-semibold text-red-600 mt-2">{{
                    formErrors?.multi_select?.[0] ??
                    errors.multi_select }}</p>

            </div>
        </div>



            <div class="border-t border-dashed border-gray-300 dark:border-zinc-700 my-4"></div>
        <div class="flex w-full gap-x-5">
            <!-- <Button size="lg" variant="secondary" class="lg:w-1/2 w-full" @click="paymentStore.previousStep()">BACK</Button>
            <Button size="lg" class="lg:w-1/2 w-full" @click="onSubmit()">PROCEED</Button> -->
            
        </div>
    </form>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import type { FileObject } from "~/types";
import { usePaymentStepsStore } from '~/store/payment'


// data

const formErrors = ref<Record<string, string[]> | null>(null);
const paymentStore = usePaymentStepsStore();



const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        phone: yup.string().required('Phone is required to login'),
        meter_number: yup.string().required('Meter number is required to login'),
        select: yup.string().required('Select is required to login'),
        multi_select: yup.array(yup.string()).required('Select is required to login'),  
    }),
});


const [phone, phoneAttrs] = defineField("phone");
const [meter_number, meter_numberAttrs] = defineField("meter_number");
const [select, selectAttrs] = defineField("select");
const [multi_select, multi_selectAttrs] = defineField("multi_select");

const onSubmit = handleSubmit(async (values) => {
    console.log(values)
    paymentStore.nextStep()
});

</script>
<style></style>