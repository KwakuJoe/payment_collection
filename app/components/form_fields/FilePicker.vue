<template>

    <div class="flex flex-col w-full" v-if="field.is_visible">
        <div class="flex flex-col items-start w-full gap-y-2">
            <p class="text-sm font-semibold">{{ field.field_label }}</p>
            <FileUpload  size="small" @select="onFileSelect" ref="fileupload" mode="basic" name="demo[]"
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
const onFileSelectt = (file: FileUploadSelectEvent) => {
    console.log('File selected:', file.files[0]);
    props.prepareFormFields[props.field.field_name] = file.files[0];
};

const base64Image = ref('');
const SelectedBase64Image = ref('');

const onFileSelect = async (file: FileUploadSelectEvent) => {
  const selectedImage = file.files[0];
  let base64Image_ = await createBase64Image(selectedImage);
  SelectedBase64Image.value = base64Image_;
  base64Image.value = base64Image_.split(',')[1];

  props.prepareFormFields[props.field.field_name] = base64Image.value;

  if (base64Image_ != '' && base64Image_ != undefined) {
    // showSelectIconImage();
  }
  console.log(base64Image.value);
};

const createBase64Image = (file: any): Promise<string> => {
  return new Promise((resolve, abort) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => abort(error);
  });
};


</script>
<style></style>