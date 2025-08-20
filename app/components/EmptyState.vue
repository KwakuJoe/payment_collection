<template>
    <div
        class="flex flex-col items-center w-full gap-x-3 px-5  border-gray-100 dark:border-zinc-900 py-5 hover:cursor-pointer bg-white dark:bg-black/20">
        <Icon name="material-symbols:hourglass-disabled-rounded" class="text-5xl text-gray-500" />
        <p class="text-xl font-semibold">{{ title ?? 'No data found' }} </p>
        <p class="text-center text-gray-500">{{ message ?? 'There is No data found' }}</p>
        <Button  size="small" label="Refresh"  @click="emit('retry')" class="mt-3" >{{ btnMessage ?? 'Retry' }}</Button>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['retry'])

const props = defineProps<{
    title?: string,
    message?: string,
    btnMessage?: string
}>()
</script>
<style></style>