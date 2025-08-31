<template>
    <div
        class="flex flex-col w-full p-10 bg-white border border-gray-100 rounded-md gap-y-5 dark:bg-black/20 dark:border-zinc-800">

        <div class="flex flex-col w-full gap-y-5">
            <p class="text-xl font-bold">Payment Details</p>

           <!-- {{ prepareFormFields }} -->

            <Message v-if="validationErrors.length" severity="error">
                <ul>
                    <li v-for="(error, index) in validationErrors" :key="index">{{ index + 1 }}. {{ error.error }}</li>
                </ul>
            </Message>

            <FormFieldSection :prepareFormFields="prepareFormFields" :service="service"
                :verification_form_fields="verification_form_fields" :submission_form_fields="submission_form_fields"
                :form_fields="verification_form_fields" />


            <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
            <div class="flex w-full gap-x-5">
                <Button severity="secondary" size="lg" label="GO BACK" class="w-full lg:w-1/2" 
                    @click="goHome()"/>
                <Button type="button" size="lg" class="w-full lg:w-1/2" label="VERIFY" icon="pi pi-search"
                    :loading="isVerificationLoading" @click="nextStepper()" />

            </div>

        </div>
    </div>


</template>
<script setup lang="ts">
import type { FormField, FormFieldForPosting, PreviewDataItem, Service, VerifyFieldsPayload } from "~/types";
import { usePaymentStepsStore } from '~/store/payment'
import { goHome } from '~/utils/index'
import FormFieldSection from "./FormFieldSection.vue";
import { useToast } from "primevue/usetoast";
import { institutionModule } from "~/repository/modules/institution_module";
import { useAuthStore } from "~/store/auth";
// props
const props = defineProps<{
    prepareFormFields: FormFieldForPosting;
    service: Service ;
    verification_form_fields: FormField[];
    submission_form_fields: FormField[];
    form_fields: FormField[]
}>();

onMounted( async () => {
  paymentStore.selectedPaymentServiceFormField! = props.form_fields;
});

// data

const authStore = useAuthStore()
const { token, user } = storeToRefs(authStore);

const paymentStore = usePaymentStepsStore();
const toast = useToast();
const isVerificationLoading = ref(false)
const validationErrors = ref<any[]>([]);
const service = ref(props.service);
const verifyFieldsPayload = ref<VerifyFieldsPayload>({
    service_id: paymentStore.selectedPaymentService?.id,
    channel_reference: null,
    form_data: props.prepareFormFields,
    branch: {
        name: user.value.branch_name,
        code: user.value.branch_code,
        email: null
    },
    user: {
        username: user.value.username,
        email: user.value.email,
    }

})


// get services from the institution
async function postFieldForVerification() {
    isVerificationLoading.value = true;

    try {
        const res = await institutionModule.postFieldForVerification(verifyFieldsPayload.value);

        console.log("Service data loaded:", res);
        // console.log("First service structure:", res?.data?.[0]?.form_field); // Debug log

        // next step
        if (res?.status === true) {
            paymentStore.currentStep++;

            // Extract and convert preview_data
            // const preview: PreviewDataItem[] = res.data.preview_data.map((item:any) => {
            //     const [key, value] = item.split(":").map((str:any) => str.trim());
            //     return { key: key, value: value };
            // });

            const preview: PreviewDataItem[] = res.data.preview_data

            paymentStore.previewDataItem = preview;

            let update_FormFieldsWithPreview =  updateFormFieldsWithPreview(preview, props.form_fields)
            
            paymentStore.selectedPaymentServiceFormField = update_FormFieldsWithPreview;
            // props.prepareFormFields[field.field_name] = defaultValue.value;

            console.log("updated form data:", update_FormFieldsWithPreview);


            toast.add({
                          life: 5000,
                severity: "success",
                detail: "Fields verified successfully",
                summary: res?.message
            });
        } else {

            if (res?.error) {
                const output = {
                    error: Object.values(res.error).map(messages => ({
                        error: (messages as string[])[0]
                    }))
                };
                validationErrors.value = output.error;
                console.log(output);
            }


            toast.add({
                
                severity: "error",
                life: 5000,
                detail: res?.message ?? "Failed to verify fields",
                summary: "Verification Error",
            });
        }



    } catch (error: any) {
        console.error("Failed to fetch services:", error);
        toast.add({
            severity: "error",
            life: 5000,
            detail: error.response?.data?.message ?? error.message,
            summary: error.response?.status == 401 ? "Unauthenticated" : "Server error",
        });
    }

    isVerificationLoading.value = false;

}


const nextStepper = (async () => {
    console.log('Going home')

    // Verification API response is success
    await postFieldForVerification()

});



function updateFormFieldsWithPreview(previewData:PreviewDataItem[], formFields:FormField[]) {
    // Convert previewData array to an object for faster lookup
    const previewMap = previewData.reduce((map:any, item:any) => {
        map[item.key] = item.value;
        return map;
    }, {});

    // Loop and update formFields
    return formFields.map(field => {
        
        if (previewMap.hasOwnProperty(field.field_name)) {
            return {
                ...field,
                // field_type: {
                //     ...field.field_type,
                //     code: 1
                // },
                // field_data_type: {
                //     ...field.field_data_type,
                //     code: 1
                // },
                // is_readonly: 1,
                default_value: field.is_amount == true ? parseFloat(previewMap[field.field_name]) : previewMap[field.field_name]
            };
        }else{
            field.default_value = props.prepareFormFields[`${field.field_name}`]
            if(field.require_verification){
                // field.field_type.code = 1
                // field.is_visible = false
                field.is_readonly = true
            }
        }
        return field; // unchanged
    }).sort((a:any, b:any) => (a.rank ?? 0) - (b.rank ?? 0))
    ;
}




</script>
<style></style>