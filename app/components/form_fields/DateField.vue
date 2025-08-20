<template>

    <div class="flex flex-col w-full">
        <div class="flex flex-col items-start w-full gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>
            <DatePicker  size="small" dateFormat="dd/mm/yy" class="w-full " v-model="prepareFormFields[`${field.field_name}`]" />
        </div>

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