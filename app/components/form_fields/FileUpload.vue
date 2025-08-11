<template>

    <div class="flex flex-col w-full">
        <div class="flex flex-col w-full items-start gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>
            <FilePicker :file-types="['image', 'document', 'pdf']" :multiple="false" :max-size-mb="5" @files-selected="handleFiles" />
        </div>
        <p class="text-sm font-semibold text-red-600 mt-2">Error message</p>

    </div>
</template>
<script setup lang="ts">
import type { FileObject, FormField } from '~/types';

const props = defineProps<{
    field: FormField;
}>();

// data
const attachment = ref<FileObject>();


// handle file upload
const handleFiles = (files: FileObject[]) => {
    const file = files[0];
    console.log('Selected file:', file);
    attachment.value = file;
    // Assuming field_name is used to store the file name
}


</script>
<style></style>