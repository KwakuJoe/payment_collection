<template>
    <div class="flex flex-col w-full p-6 border border-gray-100 gap-y-5 dark:border-zinc-800">

                <!-- cards -->
            <div class="flex items-center w-full mt-8 gap-x-5">

                <div
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="material-symbols-light:universal-currency-alt-outline" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Currency</p>
                        <p class="text-xl font-bold">Ghana Cedis</p>
                    </div>
                </div>

                <div
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="hugeicons:money-bag-01" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Amount</p>
                        <p class="text-xl font-bold">{{ formatCurrency(1200, 'GHS') }}</p>
                    </div>
                </div>

                <div class="flex items-start bg-primary/10 gap-x-3 border rounded-sm  border-primary/20  lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl"
                        name="streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance" />
                    <div class="flex flex-col flex-1 ">
                        <p class="text-primary">Currency</p>
                        <p class="text-2xl font-bold text-primary">{{ formatCurrency(grandTotal, 'GHS') }}</p>
                    </div>
                </div>

            </div>
        <div class="flex items-center justify-between py-3 border-gray-100 border-y dark:border-zinc-800">
            <h2 class="text-lg font-bold">Cash Counter</h2>
            <Button @click="clearAll" label="Clear All" variant="outline" size="small"/>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <!-- Notes Section -->
                <div class="flex flex-col gap-y-4">
                    <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">Notes</h3>

                    <div class="overflow-hidden border border-gray-100 dark:border-zinc-800">
                        <!-- Header -->
                        <div
                            class="grid grid-cols-3 border-b border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 text-sm font-semibold">Title</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Enter
                                Quantity</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Sum
                            </div>
                        </div>

                        <!-- Notes Rows -->
                        <div v-for="(note, index) in notesData" :key="note.denomination"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="flex items-center p-3 font-medium">
                                GHS{{ note.denomination }}
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">


                                <InputNumber fluid v-model="note.quantity" :min="0" class=""
                                    @update:model-value="(value) => updateNoteQuantity(index, value)"
                                    :class="{ 'border-red-600 border-2': errors[`notes[${index}].quantity` as keyof typeof errors] }" />
                                <p v-if="errors[`notes[${index}].quantity` as keyof typeof errors]"
                                    class="mt-1 text-xs text-red-600">
                                    {{ errors[`notes[${index}].quantity` as keyof typeof errors] }}
                                </p>
                            </div>
                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                                {{ formatCurrency(note.total) }}
                            </div>
                        </div>

                        <!-- Notes Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Notes</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 text-lg font-bold border-l border-gray-100 dark:border-zinc-800 text-primary">
                                {{ formatCurrency(notesTotal) }}
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
                            <div class="p-3 text-sm font-semibold">Title</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Enter
                                Quantity</div>
                            <div class="p-3 text-sm font-semibold border-l border-gray-100 dark:border-zinc-800">Sum
                            </div>
                        </div>

                        <!-- Coins Rows -->
                        <div v-for="(coin, index) in coinsData" :key="coin.denomination"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="flex items-center p-3 font-medium">
                                GHS{{ coin.denomination }} coin
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">

                                <InputNumber fluid v-model="coin.quantity" :min="0" class=""
                                    @update:model-value="(value) => updateCoinQuantity(index, value)"
                                    :class="{ 'border-red-600 border-2': errors[`coins[${index}].quantity` as keyof typeof errors] }" />
                                <p v-if="errors[`coins[${index}].quantity` as keyof typeof errors]"
                                    class="mt-1 text-xs text-red-600">
                                    {{ errors[`coins[${index}].quantity` as keyof typeof errors] }}
                                </p>
                            </div>
                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                                {{ formatCurrency(coin.total) }}
                            </div>
                        </div>

                        <!-- Coins Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Coins</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 text-lg font-bold border-l border-gray-100 dark:border-zinc-800 text-primary">
                                {{ formatCurrency(coinsTotal) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



                 <div class="my-4 border-t border-gray-300 border-dashed dark:border-zinc-700"></div>

        <!-- amount -->
        <div class="flex flex-col justify-end max-w-full mt-6 gap-x-5 lg:flex-row">
        <div class="flex flex-col justify-end max-w-full gap-x-5 gap-y-2 lg:flex-row">
            <Button severity="secondary" label=" GO BACK" class="w-full lg:w-1/2" size="lg" @click="paymentStore.previousStep()"/>

            <Button size="lg" label="COMPLETE PAYMENT" class="w-full lg:w-1/2"  @click="onSubmit()"/>
        </div>
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

// Types
interface DenominationData {
    denomination: number
    quantity: number
    total: number
}

interface CountData {
    notes: Array<{ denomination: number; quantity: number; total: number }>
    coins: Array<{ denomination: number; quantity: number; total: number }>
    notesTotal: number
    coinsTotal: number
    grandTotal: number
    timestamp: string
}

// Emit events
const emit = defineEmits<{
    submit: [data: CountData]
    dataUpdate: [data: CountData]
}>()

// Debug flag (set to false in production)
const showDebug = ref(true)
const paymentStore = usePaymentStepsStore();


// Initial data
const notesData = reactive<DenominationData[]>([
    { denomination: 200, quantity: 0, total: 0 },
    { denomination: 100, quantity: 0, total: 0 },
    { denomination: 50, quantity: 0, total: 0 },
    { denomination: 20, quantity: 0, total: 0 },
    { denomination: 10, quantity: 0, total: 0 },
    { denomination: 5, quantity: 0, total: 0 },
    { denomination: 2, quantity: 0, total: 0 },
    { denomination: 1, quantity: 0, total: 0 }
])

const coinsData = reactive<DenominationData[]>([
    { denomination: 2, quantity: 0, total: 0 },
    { denomination: 1, quantity: 0, total: 0 },
    { denomination: 0.50, quantity: 0, total: 0 },
    { denomination: 0.20, quantity: 0, total: 0 },
    { denomination: 0.10, quantity: 0, total: 0 },
    { denomination: 0.05, quantity: 0, total: 0 },
    { denomination: 0.01, quantity: 0, total: 0 }
])

// Validation schema
const validationSchema = yup.object({
    notes: yup.array().of(
        yup.object({
            quantity: yup.number()
                .min(0, 'Quantity must be positive')
                .integer('Quantity must be a whole number')
                .required('Quantity is required')
        })
    ),
    coins: yup.array().of(
        yup.object({
            quantity: yup.number()
                .min(0, 'Quantity must be positive')
                .integer('Quantity must be a whole number')
                .required('Quantity is required')
        })
    )
})

// Form setup
const { errors, handleSubmit, setFieldValue, validate } = useForm({
    validationSchema,
    initialValues: {
        notes: notesData.map(note => ({ quantity: note.quantity })),
        coins: coinsData.map(coin => ({ quantity: coin.quantity }))
    }
})

// Update functions
const updateNoteQuantity = (index: number, value: number | undefined) => {
    const quantity = value || 0
    const note = notesData[index]
    if (note) {
        note.quantity = quantity
        note.total = quantity * note.denomination
        setFieldValue(`notes[${index}].quantity` as any, quantity)
    }
}

const updateCoinQuantity = (index: number, value: number | undefined) => {
    const quantity = value || 0
    const coin = coinsData[index]
    if (coin) {
        coin.quantity = quantity
        coin.total = quantity * coin.denomination
        setFieldValue(`coins[${index}].quantity` as any, quantity)
    }
}

// Computed totals
const notesTotal = computed(() =>
    notesData.reduce((sum, note) => sum + note.total, 0)
)

const coinsTotal = computed(() =>
    coinsData.reduce((sum, coin) => sum + coin.total, 0)
)

const grandTotal = computed(() => notesTotal.value + coinsTotal.value)

// Computed count data
const countData = computed<CountData>(() => ({
    notes: notesData.map(note => ({
        denomination: note.denomination,
        quantity: note.quantity,
        total: note.total
    })),
    coins: coinsData.map(coin => ({
        denomination: coin.denomination,
        quantity: coin.quantity,
        total: coin.total
    })),
    notesTotal: notesTotal.value,
    coinsTotal: coinsTotal.value,
    grandTotal: grandTotal.value,
    timestamp: new Date().toISOString()
}))

// Watch for changes and emit updates
watch(countData, (newData) => {
    emit('dataUpdate', newData)
}, { deep: true })



const clearAll = () => {
    notesData.forEach((note, index) => {
        if (note) {
            note.quantity = 0
            note.total = 0
            setFieldValue(`notes[${index}].quantity` as any, 0)
        }
    })

    coinsData.forEach((coin, index) => {
        if (coin) {
            coin.quantity = 0
            coin.total = 0
            setFieldValue(`coins[${index}].quantity` as any, 0)
        }
    })
}

const getCountData = () => {
    console.log('Current Count Data:', countData.value)
    return countData.value
}

// Form submission
const onSubmit = handleSubmit(async (values) => {
    console.log('Form submitted with values:', values)
    console.log('Count data:', countData.value)
    emit('submit', countData.value)

    paymentStore.currentStep = 4; // Move to the next step after submission
})

// Expose methods for parent component
defineExpose({
    getCountData,
    clearAll,
    countData: computed(() => countData.value)
})
</script>