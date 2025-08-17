<template>
    <div class="flex flex-col w-full p-5 border border-gray-100 gap-y-5 dark:border-zinc-800">
        <div class="flex flex-col items-end lg:flex-row gap-x-5 gap-y-2">
            <div class="flex flex-col w-full lg:w-2/4 ">
                                  
                        <div class="flex flex-col items-start w-full gap-y-2">
                            <!-- <p class="text-sm font-semibold">Phone number</p> -->
                            <InputText fluid v-model="verifyBankTransferPaymentAccountPayload.account_number" placeholder="Account Number" 
                                 autocomplete="off" v-bind:oninput="make_input_number"/>
                        </div>

            </div>



                <div class="flex flex-col w-full lg:w-1/4 ">
                                  
                        <div class="flex flex-col items-start w-full gap-y-2">
                            <!-- <p class="text-sm font-semibold">Phone number</p> -->
                            <InputText fluid v-model="prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]" 
                             variant="filled"   class="bg-gray-500 border-2" 
                            :readonly="true" autocomplete="off" v-bind:oninput="make_input_number" disabled/>
                        </div>

            </div>
            <!-- verify button -->
            <div class="flex items-center w-full lg:w-1/4">
                <Button  @click="verifyBankTransferPaymentAccount()" variant="outline_primary" class="w-full ">Verify </Button>
            </div>
        </div>

                       <!-- {{ paymentStore.depositor }} -->

                  <!-- {{ verifyBankTransferPaymentAccountPayload }} -->
        <!-- account  cards -->
        <div v-if="sufficient_account"
            class="flex flex-wrap items-center w-full p-5 border rounded-md gap-x-5 gap-y-5 bg-green-500/5 border-green-500/15">
            <div class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-green-500/10">
                <Icon name="akar-icons:bank" class="text-2xl text-green-500" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-green-500">{{verifyBankTransferPaymentAccountPayload.account_number}}</p>
                <p class="text-sm font-semibold ">{{account_name}}</p>
            </div>
            <div class="flex items-center justify-center p-2 rounded-full gap-x-2 bg-green-500/10">
                <Icon name="material-symbols:check-circle-outline" class="text-xl text-green-500" />
                <p class="text-sm font-semibold text-green-500">{{message_from_verified_account_number}}</p>
            </div>
        </div>

        <div v-if="insufficient_account" class="flex flex-wrap items-center w-full p-5 border rounded-md gap-x-5 gap-y-5 bg-red-500/5 border-red-500/15">
            <div class="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
                <Icon name="akar-icons:bank" class="text-2xl text-red-500" />
            </div>
            <div class="flex flex-col flex-1">
                <p class="text-sm font-semibold text-red-500">{{verifyBankTransferPaymentAccountPayload.account_number}}</p>
                <!-- <p class="text-sm font-semibold ">John Kamris Doe</p> -->
            </div>
            <div class="flex items-center justify-center p-2 rounded-full gap-x-2 bg-red-500/10">
                <Icon name="material-symbols:check-circle-outline" class="text-xl text-red-500" />
                <p class="text-sm font-semibold text-red-500">{{message_from_verified_account_number}} </p>
            </div>
        </div>




        <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>
        <!-- amount -->
        <div class="flex flex-col justify-end max-w-full gap-x-5 gap-y-2 lg:flex-row">
            <Button severity="secondary" class="w-full lg:w-1/2" size="lg" @click="paymentStore.previousStep()">
                GO BACK
            </Button>
            <Button size="lg" class="w-full lg:w-1/2"  @click="submitBankTransferPayment()">
                COMPLETE PAYMENT
            </Button>
        </div>


    </div>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { usePaymentStepsStore } from '~/store/payment'
import type { FormFieldForPosting, SubmitFieldsPayload, VerifyBankTransferPaymentAccountPayload } from '~/types'
import { useToast } from "primevue/usetoast";
import { institutionModule } from "~/repository/modules/institution_module";

const props = defineProps<{
    prepareFormFields: FormFieldForPosting;
}>();

const bank_account_number  = ref('');

onMounted( async () => {

});


const paymentStore = usePaymentStepsStore();
const toast = useToast();

// data

const  make_input_number = ref( "this.value = this.value.replace(/[^0-9.]/g, '')");


const submitBankTransferPayment = (async () => {

        if(!paymentStore.depositor!.name || !paymentStore.depositor!.phone ){
            toast.add({
                severity: "error",
                life: 10000,
                detail: '',
                summary: "Depositor name and phone required",
            });

            return false;
    }
    
    if(!SubmitFieldsPayload.value.customer_account_number){
            toast.add({
                severity: "error",
                life: 10000,
                detail: '',
                summary: "Verify account number",
            });

            return false;
    }

    // Verification API response is success
    await postFieldForSubmission();

});

const isVerificationLoading = ref(false);

const insufficient_account = ref(false);
const sufficient_account = ref(false);
const account_name = ref('');

const message_from_verified_account_number = ref('');

const verifyBankTransferPaymentAccountPayload = ref<VerifyBankTransferPaymentAccountPayload>({
    account_number: bank_account_number.value,
    payment_amount: props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]
})

const SubmitFieldsPayload = ref<SubmitFieldsPayload>({
    service_id: paymentStore.selectedPaymentService!.id.toString(),
    form_data: props.prepareFormFields,
        payment_type: 'BANK_TRANSFER',
    teller_account_number: null,
    customer_account_number: bank_account_number.value,
    depositor_name: paymentStore.depositor!.name,
    depositor_phone: paymentStore.depositor!.phone,
    depositor_email: paymentStore.depositor!.email!,
    total_amount: parseFloat(props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]),
    currency: paymentStore.selectedPaymentService!.currency,
    currency_denomination: paymentStore.selectedCurrencyDenomination!,
    channel_reference: null,
    branch_user: {
        branch: {
            branch_name: null,
            branch_code: null,
            branch_email: null
        },
        user: {
            user_name: null,
            email: null
        }
    }

})



// get services from the institution
async function verifyBankTransferPaymentAccount() {
     insufficient_account.value = false
     sufficient_account.value = false

        if(!verifyBankTransferPaymentAccountPayload.value.account_number ){
            toast.add({
                severity: "error",
                life: 10000,
                detail: '',
                summary: "AccountNumber required",
            });

            return false;
    }
    
    isVerificationLoading.value = true;

    try {
        const res = await institutionModule.VerifyBankTransferPaymentAccount(verifyBankTransferPaymentAccountPayload.value);
        
          if (res?.status === true) {
            // paymentStore.currentStep++;

            sufficient_account.value = true
            account_name.value = res.data!.account_name
            message_from_verified_account_number.value = res?.message

            SubmitFieldsPayload.value.customer_account_number =  res.data!.account_number

            toast.add({
                          life: 5000,
                severity: "success",
                detail: "Fields verified successfully",
                summary: res?.message
            });


        } else {
            
            
            insufficient_account.value = true
            message_from_verified_account_number.value = res?.message!

            toast.add({
                
                severity: "error",
                life: 5000,
                detail: res?.message ?? "Failed to verify fields",
                summary: "Verification Error",
            });
        }

        
    }catch (error: any) {
        console.error("Failed to fetch services:", error);
        toast.add({
            severity: "error",
            life: 5000,
            detail: error.response?.data?.message ?? error.message,
            summary: error.response?.status == 401 ? "Unauthenticated" : "Server error",
        });
    }
}

// Submit bank transfer payment
async function postFieldForSubmission() {
    isVerificationLoading.value = true;

    try {
        const res = await institutionModule.postFieldForSubmission(SubmitFieldsPayload.value);

        console.log("Service data loaded:", res);
        // console.log("First service structure:", res?.data?.[0]?.form_field); // Debug log

        // next step
        if (res?.status === true) {
            // paymentStore.currentStep++;


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
                // validationErrors.value = output.error;
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


</script>
<style></style>