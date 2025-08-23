<template>
    <div
        class="flex flex-col w-full p-10 bg-white border border-gray-100 rounded-md gap-y-5 dark:bg-black/20 dark:border-zinc-800">

        <div class="flex flex-col w-full gap-y-5">

            <!-- details -->
            <div class="flex flex-col w-full gap-y-5 ">
                <p class="text-xl font-bold">Verified </p>

  <!-- {{ paymentStore.selectedPaymentServiceFormFieldIsAmount }} -->

   <!-- {{ prepareFormFields}} -->

              <Message v-if="validationErrors.length" severity="error">
                  <ul>
                      <li v-for="(error, index) in validationErrors" :key="index">{{ index + 1 }}. {{ error }}</li>
                  </ul>
              </Message>              

                <div v-if="paymentStore.previewDataItem.length > 0"
                    class="flex flex-col w-full p-4 border border-gray-100 rounded-md dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">

                    <div v-for="preview in paymentStore.previewDataItem" :key="preview.key" class="flex flex-col">
                        <div class="flex items-center justify-between ">
                            <p class="text-sm">{{ preview.key }}</p>
                            <p class="text-sm font-bold">{{ preview.value }}</p>
                        </div>

                    <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
                    </div>
       
                </div>
            </div>
            
            <FormFieldSection :prepareFormFields="prepareFormFields" :service="service"
                :verification_form_fields="verification_form_fields" :submission_form_fields="submission_form_fields"
                :form_fields="paymentStore.selectedPaymentServiceFormField!" />

            <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
            <div class="flex w-full gap-x-5">
                <Button size="lg" severity="secondary" :label="props.verification_form_fields.length > 0 ? 'BACK' : 'CANCEL'" class="w-full lg:w-1/2" @click="backStepper()" />

                <Button size="lg" label="CONTINUE" class="w-full lg:w-1/2" @click="nextStepper()"/>

            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { usePaymentStepsStore } from '~/store/payment'
import type { FormField, FormFieldForPosting, Service } from "~/types";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { routerKey } from 'vue-router';

const paymentStore = usePaymentStepsStore();
const toast = useToast();

const props = defineProps<{
    prepareFormFields: FormFieldForPosting;
    service: Service ;
    verification_form_fields: FormField[];
    submission_form_fields: FormField[];
    form_fields: FormField[];
}>();

const validationErrors = ref<any[]>([]);


const backStepper = (async () => {
    console.log('Going home')

    if (paymentStore.currentStep > 1 && (props.verification_form_fields.length > 0)) {
        paymentStore.selectedPaymentServiceFormField = paymentStore.selectedPaymentServiceFormFieldRefreshed!
        paymentStore.currentStep--;
        // window.location.reload();
    } else {
        goHome();
    }

});



const nextStepper = (async () => {

     let validation_error = validateRequiredFields(props.prepareFormFields, props.form_fields)

    if(validation_error.length > 0) // change to (validation_error.length > 0)
{

    validationErrors.value = validation_error;
     toast.add({
          life: 5000,
            severity: "error",
            summary: 'Some field are mandatory',
            detail: 'Check the form'
               
        });
return ;
}


   let has_amount_field = await checkAmountAmountField(props.prepareFormFields, paymentStore.selectedPaymentServiceFormFieldIsAmount!)

   if(has_amount_field)
   {
   
    
    paymentStore.currentStep++;
   }else{

     toast.add({
          life: 10000,
            severity: "error",
            summary: 'Field has not been configures',
            detail: 'Contact Adminstrator'
               
        });
return ;
            

        return false;
   }
   
    
});
function checkAmountAmountField(prepareFormFields:FormFieldForPosting, selectedPaymentServiceFormFieldIsAmount:FormField[])
{
    let amount_field = paymentStore.selectedPaymentServiceFormFieldIsAmount![0];
    let amount_field_value = parseFloat( prepareFormFields[`${amount_field?.field_name}`]) ? parseFloat( prepareFormFields[`${amount_field?.field_name}`]) : 0;

    // alert(amount_field_value)

    // return false;
    
    if((paymentStore.selectedPaymentServiceFormFieldIsAmount!.length > 0 )
    && 
    (amount_field_value > 0)
)
{
    

    return true;
}else{
    return false;
}

}


function validateRequiredFields(formObject:FormFieldForPosting, formFields:FormField[]) {
    const errors:any[] = [];

    formFields.forEach(field => {
        if (field.is_required === true) {
            const fieldName = field.field_name;
            const fieldDescription = field.field_label;
            const value = formObject[fieldName];

            // Check if value is missing, empty, null, or undefined
            if (
                value === undefined ||
                value === null ||
                value === '' ||
                (typeof value === 'string' && value.trim() === '')
            ) {
                errors.push(`${fieldDescription} field is required`);
            }
        }
    });

    return errors;
}






</script>