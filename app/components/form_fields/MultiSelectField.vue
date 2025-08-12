<template>
    <div class="flex flex-col w-full ">
        <div class="flex flex-col items-start w-full gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>

                <MultiSelect display="chip" v-model="prepareFormFields[`${field.field_name}`]" :options="field.list_of_options"   option-label="lov_title" option-value="lov_value"  filter fluid  
      class="w-full md:w-56"  />

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