<template>
    <div class="flex flex-col p-5 border border-gray-100 border-dashed gap-y-2 dark:border-zinc-800">

        <!-- {{ record?.core_banking_request }} -->


        <div v-if="record?.core_banking_request" v-for="(value, key) in parseMetadata(record?.core_banking_request)" :key="key" class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>{{key.toUpperCase()}}</p>
            <p class="font-medium ">{{ value ?? '-' }}</p>
        </div>
        <br/>
        <hr/>
        <br/>

        <div v-if="record?.core_banking_response" v-for="(value, key) in parseMetadata(record?.core_banking_response)" :key="key" class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
            <p>{{key.toUpperCase()}}</p>
            <p class="font-medium ">{{ value ?? '-' }}</p>
        </div> 


         <EmptyState v-else message="Core banking data is not found on this transaction report" title="No core banking data found" />

    </div>
</template>
<script setup lang="ts">
import EmptyState from '~/components/EmptyState.vue';

const props = defineProps<{
    record: Record<string, any> | null;
}>()


onMounted( async () => {
  
});



const emits = defineEmits(['on-success', 'on-close'])



// Parse JSON string if needed
const parseMetadata = (jsonString: string): Record<string, any> | null => {
    try {
        return JSON.parse(jsonString) ?? [];
    } catch (e) {
        // console.error('Failed to parse metadata:', e);
        return [];
    }
}
</script>
<style lang="">

</style>