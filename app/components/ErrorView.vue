<template>
    <div
        class="flex flex-col items-center w-full gap-x-3 px-5 border-b border-gray-100 dark:border-zinc-900 py-5 hover:cursor-pointer bg-white dark:bg-black/20">
        <Icon name="uil:server-network" class="text-5xl text-red-500" />
        <p class="text-xl font-semibold">Server Error</p>
        <p class="text-center text-gray-500">An error occurred try to perform this operation</p>
        <Button label="Retry" severity="danger" @click="emit('retry')" class="mt-3" >Retry</Button>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['retry'])
</script>
<style></style>