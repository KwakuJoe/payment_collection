<template>
    <div class="flex flex-col p-5 border border-gray-100 border-dashed gap-y-2 dark:border-zinc-800">

        <!-- {{ record?.form_data }} -->
        <div v-if="record?.form_data" v-for="(value, key) in parseMetadata(record?.form_data)" :key="key" class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>{{key.toUpperCase()}}</p>
            <p class="font-medium ">{{ value ?? '-' }}</p>
        </div>

       
        <EmptyState v-else message="Form data is not found on this transaction report" title="No form data found" />

    </div>
</template>
<script setup lang="ts">
import EmptyState from '~/components/EmptyState.vue';

const props = defineProps<{
    record: Record<string, any> | null;
}>()

const emits = defineEmits(['on-success', 'on-close'])




// Parse JSON string if needed
const parseMetadata = (jsonString: string): Record<string, any> | null => {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Failed to parse metadata:', e);
        return null;
    }
}
</script>
<style lang="">

</style>