<template>
    <div
        class="flex flex-col items-center justify-center w-full h-full gap-x-3 px-5  border-gray-100 dark:border-zinc-900 py-5 hover:cursor-pointer bg-white dark:bg-black/20">
        <Icon name="line-md:loading-twotone-loop" class="text-5xl text-primary" />
        <p class="text-xl font-semibold">Loading...</p>
        <p class="text-center text-gray-500"> {{ message ?? 'Please wait while we process your request' }} </p>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    message?: string
}>()
</script>
<style></style>