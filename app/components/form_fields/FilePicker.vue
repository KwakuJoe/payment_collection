<template>

    <div class="flex flex-col w-full">
        <div class="flex flex-col w-full items-start gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>
            <FileUpload @select="onFileSelect" ref="fileupload" mode="basic" name="demo[]"
                :accept="fileAcceptedExtensions.toString()" :maxFileSize="5242880" />
                
        </div>

    </div>
</template>
<script setup lang="ts">
import type { FileUploadSelectEvent } from 'primevue/fileupload';
import type { FormField } from '~/types';

const props = defineProps<{
    field: FormField;
    prepareFormFields: any
}>();

// data
const fileupload = ref();
const fileAcceptedExtensions = ref(`
    .xlsx, .xls, .csv, .pdf, .doc, .docx, .jpg, .jpeg, .png, 
          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
          application/vnd.ms-excel, 
          text/csv, 
          application/pdf, 
          image/jpeg, 
          image/png" 
`);
// co


// handle file upload
const onFileSelect = (file: FileUploadSelectEvent) => {
    console.log('File selected:', file.files[0]);
    props.prepareFormFields[props.field.field_name] = file.files[0];
};


</script>
<style></style>