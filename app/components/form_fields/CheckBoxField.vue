<template>
    <div class="flex flex-col w-full ">
        <div class="flex flex-col items-start w-full gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }} ss</p>


            <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                    <div v-for="option in field.list_of_options" :key="option.lov_value"
                        class="flex items-center gap-2">
                        <RadioButton v-model="prepareFormFields[`${field.field_name}`]" :inputId="option.lov_value"
                            :name="prepareFormFields[`${field.field_name}`]" :value="option.lov_value" />

                            <Checkbox v-model="prepareFormFields[`${field.field_name}`]" binary />

                        <label :for="option.lov_value">{{ option.lov_title }}</label>
                    </div>
                </div>
            </div>
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