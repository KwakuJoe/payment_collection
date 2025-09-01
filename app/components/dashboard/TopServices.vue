<template>
    <div v-for="(service, index) in 5"
        class="flex lg:items-center  w-full p-3 bg-white border border-gray-100 dark:border-zinc-800  dark:bg-black/20 mt-1 rounded-md gap-x-3 hover:bg-primary-50/30 hover:cursor-pointer">

        <div class="flex flex-col flex-1">
            <div class="flex items-center gap-x-1">
                <Icon class=" text-sm  text-primary-500" name="f7:cube-box" />
                <p class="font-semibold text-sm "> Passport Fees</p>
            </div>
            <p class="text-primary text-sm">Ghana Passport Agency</p>
        </div>

        <!-- amount -->
        <div class="flex flex-1 justify-end">
            <p class="font-semibold ">GHS 24,000,000</p>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style></style>