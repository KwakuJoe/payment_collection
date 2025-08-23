<template>
    <div class="flex flex-col w-full p-6 border border-gray-100 gap-y-5 dark:border-zinc-800">

                <!-- cards -->
            <div class="flex items-center w-full mt-8 gap-x-5">

                <div
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[25%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="material-symbols-light:universal-currency-alt-outline" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Currency</p>
                        <p class="text-xl font-bold">{{ paymentStore.selectedPaymentService?.currency  }}</p>
                    </div>
                </div>

                <div
                    class="flex items-start bg-green-100 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray/20 dark:border-zinc-800 lg:w-[34%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="hugeicons:money-bag-01" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Amount</p>
                        <p class="text-xl font-bold">
                            {{ parseFloat( prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]).toFixed(2) ?? null  }}
</p>
                    </div>
                </div>

                <div class="flex items-start bg-primary/10 gap-x-3 border rounded-sm  border-primary/20  lg:w-[34%] p-5 " :class="compareAmountToCashAmount">
                    <Icon class="w-12 h-12 text-3xl"
                        name="streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Currency</p>
                        <p class="text-2xl font-bold text-primary">{{ formatCurrency(grandTotal, paymentStore.selectedPaymentService?.currency) }}</p>
                    </div>
                </div>

            </div>
        <div class="flex items-center justify-between py-3 border-gray-100 border-y dark:border-zinc-800">
            <h2 class="text-lg font-bold">Cash Counter</h2>
            <Button variant="outline" label="Clear All" size="small" @click="resetCashDenom()"/>

        </div>

       <!-- {{ SubmitFieldsPayload }} -->

        <!-- <p>{{ paymentStore.selectedCurrencyDenomination }}</p> -->

        <form >
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <!-- Notes Section -->
                <div class="flex flex-col gap-y-4">
                    <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">Notes</h3>

                    <div class="overflow-hidden border border-gray-100 dark:border-zinc-800">
                        <!-- Header -->
                        <div
                            class="grid grid-cols-3 border-b border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 text-sm font-semibold">Denom</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800"> Quantity</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Amount
                            </div>
                        </div>

                      

                        <!-- Notes Rows -->
                        <div v-for="(note, index) in notesData" :key="note.code"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="flex items-center p-3 font-medium">
                                {{ note.code }}
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">


                                <InputNumber fluid v-model="note.quantity" @update:modelValue="updateTotals"  />
                               
                            </div>
                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                               {{ note.amount.toFixed(2) }}
                            </div>
                        </div>

                        <!-- Notes Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Notes</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 text-lg font-bold border-l border-gray-100 dark:border-zinc-800 text-primary">
                                {{ totalNotes.toFixed(2) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coins Section -->
                <div class="flex flex-col gap-y-4">
                    <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">Coins</h3>

                    <div class="overflow-hidden border border-gray-100 dark:border-zinc-800">
                        <!-- Header -->
                        <div
                            class="grid grid-cols-3 border-b border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 text-sm font-semibold">Denom</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800"> Quantity</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Amount
                            </div>
                        </div>

                        <!-- Coins Rows -->
                        <div v-for="(coin, index) in coinsData" :key="coin.code"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="flex items-center p-3 font-medium">
                               {{ coin.code }}  
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">
                                <InputNumber fluid v-model="coin.quantity" @update:modelValue="updateTotals" />

                            </div>
                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                                 {{ coin.amount.toFixed(2) }}
                            </div>
                        </div>

                        <!-- Coins Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Coins</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 text-lg font-bold border-l border-gray-100 dark:border-zinc-800 text-primary">
                               {{ totalCoins.toFixed(2) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



                 <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>



                    <div class="flex w-full gap-x-5">
                <Button size="lg" severity="secondary" label="BACK" class="w-full lg:w-1/2" @click="paymentStore.previousStep()"/>

                <Button size="lg" class="w-full lg:w-1/2" label="COMPLETE PAYMENT" :loading="isVerificationLoading" @click="submitCashPayment()"/>


            </div>


        </form>


    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { formatCurrency } from '~/utils/index'
import { usePaymentStepsStore } from '~/store/payment'
import type { FormFieldForPosting, SubmitFieldsPayload } from '~/types'
import { useToast } from "primevue/usetoast";
import { institutionModule } from "~/repository/modules/institution_module";
import { useAuthStore } from "~/store/auth";



const props = defineProps<{
    prepareFormFields: FormFieldForPosting;
}>();

// Types
interface DenominationData {
    is_note: boolean | number
    currency: string
    code: number
    denomination: number
    quantity: number
    amount: number
}

const authStore = useAuthStore()


// Debug flag (set to false in production)
const showDebug = ref(true)

const paymentStore = usePaymentStepsStore();
const notesData = ref(reactive<DenominationData[]>([]));
const coinsData = ref(reactive<DenominationData[]>([]));
 const prepareFormFields = ref(props.prepareFormFields);
 const toast = useToast();

onMounted( async () => {
    await resetCashDenom();
});


function splitNotesAndCoins(data:any) {
    const notes = [] as DenominationData[];
    const coins = [] as DenominationData[];

    data.forEach((item:any) => {
        const denomination = parseFloat(item.denomination); // convert string to number
        const formattedItem = {
                is_note: item.is_note,
                denomination: parseFloat(item.denomination),
                currency: item.currency,
                code: item.code,
                quantity: parseFloat(item.quantity),
                amount: parseFloat(item.amount)
            
        };

        if (denomination >= 1) {
            notes.push(formattedItem);
        } else {
            coins.push(formattedItem);
        }
    });

    console.log('Note', notes);
    console.log('coins', coins);
    return { notes, coins };
}


// Update total for each row when quantity changes
function updateTotals() {
  notesData.value.forEach(note => {
    note.amount = note.quantity * note.denomination
    note.amount = note.amount
  })
  coinsData.value.forEach(coin => {
    coin.amount = coin.quantity * coin.denomination
    coin.amount = coin.amount
  })

paymentStore.selectedCurrencyDenomination  = mergeNotesAndCoins(coinsData.value, notesData.value)
}

// Computed: Total Notes
const totalNotes = computed(() =>
  notesData.value.reduce((sum, note) => sum + note.amount, 0)
)

// Computed: Total Coins
const totalCoins = computed(() =>
  coinsData.value.reduce((sum, coin) => sum + coin.amount, 0)
)

function mergeNotesAndCoins(notes:DenominationData[], coins:DenominationData[]) {
     return [...coins, ...notes]
}

const compareAmountToCashAmount = computed(() =>{
   if (
    parseFloat(props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]) ===
    parseFloat(grandTotal.value.toFixed(2))
   )
    {
        return 'bg-green-100'
    }else{
        return 'bg-red-100';
    }
});


// Computed: Grand Total
const grandTotal = computed(() => {
    return  totalNotes.value + totalCoins.value
})

const resetCashDenom = (async () => {

    let denomination = await splitNotesAndCoins(paymentStore.selectedPaymentService?.currency_denomination);
    notesData.value = denomination.notes;
    coinsData.value = denomination.coins;
    
})

const submitCashPayment = (async () => {

    // parseFloat(props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`])
    
        if(!paymentStore.depositor.name || !paymentStore.depositor.phone ){
            toast.add({
                severity: "error",
                life: 10000,
                detail: '',
                summary: "Depositor name and phone required",
            });

            return false;
    }

       if (
            parseFloat(props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]) !=
            parseFloat(grandTotal.value.toFixed(2))
        )
        {
                        toast.add({
                    severity: "error",
                    life: 10000,
                    detail: '',
                    summary: "CASH does not match amount to pay",
                });

                return false;
        }

    // Verification API response is success
    await postFieldForSubmission();

});

const isVerificationLoading = ref(false);

const SubmitFieldsPayload = ref<SubmitFieldsPayload>({
    service_id: paymentStore.selectedPaymentService!.id.toString(),
    form_data: props.prepareFormFields,
        payment_method: 'CASH',
    source_account: authStore.user!?.source_account,
    destination_account: paymentStore.selectedPaymentService!.account_number,
    depositor_name: paymentStore.depositor.name,
    depositor_phone: paymentStore.depositor.phone,
    depositor_email: paymentStore.depositor?.email!,
    total_amount: parseFloat(props.prepareFormFields[`${paymentStore.selectedPaymentServiceFormFieldIsAmount![0]?.field_name}`]),
    currency: paymentStore.selectedPaymentService!.currency,
    currency_denomination: paymentStore.selectedCurrencyDenomination!,
    channel: 'BRANCH_PAYMENT_PORTAL',
    channel_reference: null,
    app_reference: null,
    branch: {
        name: authStore.user!.branch_name,
        code: authStore.user!.branch_code,
        email: null
    },
    user: {
        username: authStore.user!?.username,
        email: authStore.user!?.email,
    }


})
// get services from the institution
async function postFieldForSubmission() {
    isVerificationLoading.value = true;

    
        SubmitFieldsPayload.value.depositor_name = paymentStore.depositor.name;
    SubmitFieldsPayload.value.depositor_phone = paymentStore.depositor.phone;
    SubmitFieldsPayload.value.depositor_email = paymentStore.depositor?.email!;
    SubmitFieldsPayload.value.currency_denomination = paymentStore.selectedCurrencyDenomination!;

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
            paymentStore.currentStep++;
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