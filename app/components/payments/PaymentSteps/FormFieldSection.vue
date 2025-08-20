<template>
    <div>
        <div class="flex flex-wrap w-full gap-5">
            <!-- filed -->

            <div v-for="field in form_fields" :key="field.id"
                class="flex flex-col lg:w-[48%] gap-5 w-full">
                <!-- text Box -->
                <TextBox :field="field" v-if="field.field_type.code === 1 && field.is_visible === 1" :prepare-form-fields="prepareFormFields" />

                <!-- select -->
                <ListOfValues :prepare-form-fields="prepareFormFields" v-else-if="field.field_type.code === 2"
                    :field="field" />

                <!-- date -->
                <DateField :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 3" />

                <!-- radio button -->
                <RadioButtonField :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 4" />

                <!-- multi select -->
                <MultiSelectField :prepare-form-fields="prepareFormFields" v-else-if="field.field_type.code === 5"
                    :field="field" />

                <!-- Checkbox -->
                <MultiSelectField  :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 6" />

                <!-- file -->
                <FilePicker :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 7 && field.is_visible === 1" />

                <!-- other -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 8" />

                <!-- PIN -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 9" />

                <!-- Password -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 10" />

                <!-- Phone book -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 11" />

                <!-- Payee -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 12" />

                <!-- Textarea -->
                <TextBox :prepare-form-fields="prepareFormFields" :field="field"
                    v-else-if="field.field_type.code === 13" />

                <!-- default -->
                 <span v-else></span>
                <!-- <Hidden :prepare-form-fields="prepareFormFields" :field="field"  /> -->
            </div>
        </div>


    </div>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import type {
    FileObject,
    FormField,
    FormFieldForPosting,
    Service,
} from "~/types";
import { usePaymentStepsStore } from "~/store/payment";
import { goHome } from "~/utils/index";
import Slider from "primevue/slider";
// props
const props = defineProps<{
        prepareFormFields: FormFieldForPosting;
    service: Service ;
    verification_form_fields: FormField[];
    submission_form_fields: FormField[];
    form_fields: FormField[];
}>();

// data

const formErrors = ref<Record<string, string[]> | null>(null);
const paymentStore = usePaymentStepsStore();
const { currentStep } = storeToRefs(paymentStore);
const attachmentList = ref<FileObject[]>();
const attachments = ref<FileObject[]>();
const value = ref(10);

// const prepareFormFields = ref({} as FormFieldForPosting[]);



// handle file upload// handle file upload
const handleFiles = (files: FileObject[]) => {
    console.log("Selected file:", files);
    attachmentList.value = files;
    attachments.value = files;
};




</script>
<style></style>
