<template>
    <div class="flex flex-col gap-y-2 border border-gray-100 border-dashed dark:border-zinc-800 p-5">
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>STATUS</p>
            <p class="font-medium ">{{ record?.status ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>INSTITUTION</p>
            <p class="font-medium ">{{ record?.institution.name ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>CATEGORY</p>
            <p class="font-medium ">{{ record?.institution.customer_name ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>SERVICE</p>
            <p class="font-medium ">{{ record?.service.name ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>PAYMENT METHOD</p>
            <p class="font-medium ">{{ record?.payment_method ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>CURRENCY</p>
            <p class="font-medium ">{{ record?.currency ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>TOTAL AMOUNT</p>
            <p class="font-bold ">{{ record?.currency ?? '-' }} {{ record?.total_amount ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>SOURCE ACCOUNT</p>
            <p class="font-medium ">{{ record?.source_account ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>DESTINATION ACCOUNT</p>
            <p class="font-medium ">{{ record?.destination_account ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>TELLER NAME</p>
            <p class="font-medium ">{{ record?.teller_name ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>BRANCH CODE</p>
            <p class="font-medium ">{{ record?.branch_code ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>BRANCH NAME</p>
            <p class="font-medium ">{{ record?.branch_name ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>BRANCH EMAIL</p>
            <p class="font-medium ">{{ record?.branch_email ?? '-' }}</p>
        </div>
        <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>DEPOSITOR NAME</p>
            <p class="font-medium ">{{ record?.depositor_name }}</p>
        </div>
                <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>DEPOSITOR EMAIL</p>
            <p class="font-medium ">{{ record?.depositor_phone }}</p>
        </div>
                <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>CHANNEL</p>
            <p class="font-medium ">{{ record?.channel }}</p>
        </div>

    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    record: Record<string, any> | null;
}>()

const emits = defineEmits(['on-success', 'on-close'])
</script>
<style lang="">

</style>