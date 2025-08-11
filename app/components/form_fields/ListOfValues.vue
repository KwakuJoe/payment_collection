<template>
    <div class="flex flex-col w-full ">
        <div class="flex flex-col items-start w-full gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>
            <Select filter fluid  :options="field.list_of_options" option-value="lov_value"
                option-label="lov_title"  class="w-full md:w-56" 
                v-model="prepareFormFields[`${field.field_name}`]"
                />

        </div>
        <p class="mt-2 text-sm font-semibold text-red-600">Error message</p>

    </div>
</template>
<script setup lang="ts">
import type { FormField } from '~/types';

const props = defineProps<{
    field: FormField;
        prepareFormFields: any
}>();


</script>
<style></style>