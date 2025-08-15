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
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[34%] p-5">
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
            <Button variant="outline" size="small">
                Clear All
            </Button>
        </div>

       

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


                                <InputNumber fluid v-model="note.quantity" @update:modelValue="updateTotals" />
                               
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

        <!-- amount -->
        <div class="flex flex-col justify-end max-w-full mt-6 gap-x-5 lg:flex-row">
        <div class="flex flex-col justify-end max-w-full gap-x-5 gap-y-2 lg:flex-row">
            <Button severity="secondary" class="w-full lg:w-1/2" size="lg" @click="paymentStore.previousStep()">
                GO BACK
            </Button>
            <Button size="lg" class="w-full lg:w-1/2" >
                COMPLETE PAYMENT
            </Button>
        </div>
        </div>

            <!-- Action Buttons -->
            <!-- <div class="flex gap-4 mt-6">
                <Button @click="getCountData" variant="outline" type="button">
                    Get Count Data
                </Button>
                <Button type="submit">
                    Submit Count
                </Button>
            </div> -->
        </form>

        <!-- Debug Output (remove in production) -->
        <!-- <div v-if="showDebug" class="p-4 mt-6 bg-gray-100 rounded-lg dark:bg-zinc-900">
            <h4 class="mb-2 font-bold">Debug Output:</h4>
            <pre class="overflow-auto text-xs">{{ JSON.stringify(countData, null, 2) }}</pre>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { formatCurrency } from '~/utils/index'
import { usePaymentStepsStore } from '~/store/payment'
import type { FormFieldForPosting } from '~/types'

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



// Debug flag (set to false in production)
const showDebug = ref(true)

const paymentStore = usePaymentStepsStore();
const notesData = ref(reactive<DenominationData[]>([]));
const coinsData = ref(reactive<DenominationData[]>([]));
 const prepareFormFields = ref(props.prepareFormFields);

onMounted( async () => {
    let denomination = await splitNotesAndCoins(paymentStore.selectedPaymentService?.currency_denomination);
    notesData.value = denomination.notes;
    coinsData.value = denomination.coins;
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

        if (denomination > 1) {
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
        return 'bg-green-300'
    }else{
        return 'bg-red-300';
    }
});


// Computed: Grand Total
const grandTotal = computed(() => {
    return  totalNotes.value + totalCoins.value
})

</script>