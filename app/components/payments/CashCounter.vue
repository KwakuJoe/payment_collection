<template>
    <div class="flex flex-col w-full gap-y-5  border border-gray-100 dark:border-zinc-800  p-6">

                <!-- cards -->
            <div class="flex w-full items-center mt-8 gap-x-5">

                <div
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="material-symbols-light:universal-currency-alt-outline" />
                    <div class=" flex-1 flex flex-col">
                        <p class="text-primary">Currency</p>
                        <p class="text-xl font-bold">Ghana Cedis</p>
                    </div>
                </div>

                <div
                    class="flex items-start bg-gray-50 gap-x-3 dark:bg-zinc-900 border rounded-sm border-gray-100 dark:border-zinc-800 lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl" name="hugeicons:money-bag-01" />
                    <div class=" flex-1 flex flex-col">
                        <p class="text-primary">Currency</p>
                        <p class="text-xl font-bold">{{ formatCurrency(1200, 'GHS') }}</p>
                    </div>
                </div>

                <div class="flex items-start bg-primary/10 gap-x-3 border rounded-sm  border-primary/20  lg:w-[32%] p-5">
                    <Icon class="w-12 h-12 text-5xl"
                        name="streamline:money-cash-coins-stack-accounting-billing-payment-stack-cash-coins-currency-money-finance" />
                    <div class=" flex-1 flex flex-col">
                        <p class="text-primary">Currency</p>
                        <p class="text-2xl text-primary font-bold">{{ formatCurrency(grandTotal, 'GHS') }}</p>
                    </div>
                </div>

            </div>
        <div class="flex justify-between items-center border-y border-gray-100 dark:border-zinc-800 py-3">
            <h2 class="text-lg font-bold">Cash Counter</h2>
            <!-- <Button @click="clearAll" variant="outline" size="sm">
                Clear All
            </Button> -->
        </div>

        <form @submit.prevent="onSubmit">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Notes Section -->
                <div class="flex flex-col gap-y-4">
                    <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">Notes</h3>

                    <div class="border border-gray-100 dark:border-zinc-800 overflow-hidden">
                        <!-- Header -->
                        <div
                            class="grid grid-cols-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
                            <div class="p-3 font-semibold text-sm">Title</div>
                            <div class="p-3 font-semibold text-sm border-l border-gray-100 dark:border-zinc-800">Enter
                                Quantity</div>
                            <div class="p-3 font-semibold text-sm border-l border-gray-100 dark:border-zinc-800">Sum
                            </div>
                        </div>

                        <!-- Notes Rows -->
                        <div v-for="(note, index) in notesData" :key="note.denomination"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="p-3 flex items-center font-medium">
                                GHS{{ note.denomination }}
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">
                                <!-- <NumberField :model-value="note.quantity"
                                    @update:model-value="(value) => updateNoteQuantity(index, value)" :min="0"
                                    class="w-full">
                                    <NumberFieldContent>
                                        <NumberFieldInput class="h-10 text-center"
                                            :class="{ 'border-red-600 border-2': errors[`notes[${index}].quantity` as keyof typeof errors] }" />
                                    </NumberFieldContent>
                                </NumberField> -->
                                <p v-if="errors[`notes[${index}].quantity` as keyof typeof errors]"
                                    class="text-xs text-red-600 mt-1">
                                    {{ errors[`notes[${index}].quantity` as keyof typeof errors] }}
                                </p>
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800 flex items-center font-bold">
                                {{ formatCurrency(note.total) }}
                            </div>
                        </div>

                        <!-- Notes Total -->
                        <div
                            class="grid grid-cols-3 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Notes</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 border-l border-gray-100 dark:border-zinc-800 font-bold text-lg text-primary">
                                {{ formatCurrency(notesTotal) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coins Section -->
                <div class="flex flex-col gap-y-4">
                    <h3 class="text-base font-semibold text-gray-700 dark:text-gray-300">Coins</h3>

                    <div class="border border-gray-100 dark:border-zinc-800  overflow-hidden">
                        <!-- Header -->
                        <div
                            class="grid grid-cols-3 bg-gray-50 dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
                            <div class="p-3 font-semibold text-sm">Title</div>
                            <div class="p-3 font-semibold text-sm border-l border-gray-100 dark:border-zinc-800">Enter
                                Quantity</div>
                            <div class="p-3 font-semibold text-sm border-l border-gray-100 dark:border-zinc-800">Sum
                            </div>
                        </div>

                        <!-- Coins Rows -->
                        <div v-for="(coin, index) in coinsData" :key="coin.denomination"
                            class="grid grid-cols-3 border-b border-gray-100 dark:border-zinc-800 last:border-b-0">
                            <div class="p-3 flex items-center font-medium">
                                GHS{{ coin.denomination }} coin
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800">
                                <!-- <NumberField :model-value="coin.quantity"
                                    @update:model-value="(value) => updateCoinQuantity(index, value)" :min="0"
                                    class="w-full">
                                    <NumberFieldContent>
                                        <NumberFieldInput class="h-10 text-center"
                                            :class="{ 'border-red-600 border-2': errors[`coins[${index}].quantity` as keyof typeof errors] }" />
                                    </NumberFieldContent>
                                </NumberField> -->
                                <p v-if="errors[`coins[${index}].quantity` as keyof typeof errors]"
                                    class="text-xs text-red-600 mt-1">
                                    {{ errors[`coins[${index}].quantity` as keyof typeof errors] }}
                                </p>
                            </div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800 flex items-center font-bold">
                                {{ formatCurrency(coin.total) }}
                            </div>
                        </div>

                        <!-- Coins Total -->
                        <div
                            class="grid grid-cols-3 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Coins</div>
                            <div class="p-3 border-l border-gray-100 dark:border-zinc-800"></div>
                            <div
                                class="p-3 border-l border-gray-100 dark:border-zinc-800 font-bold text-lg text-primary">
                                {{ formatCurrency(coinsTotal) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



                 <div class="border-t border-dashed border-gray-300 dark:border-zinc-700 my-4"></div>

        <!-- amount -->
        <div class="flex gap-x-5 lg:flex-row flex-col max-w-full mt-6 justify-end">
            <!-- <Button variant="secondary"  size="lg" @click="paymentStore.previousStep()">
                GO BACK
            </Button>
            <Button      size="lg" @click="onSubmit()">
                PROCEED TO MAKE PAYMENT
            </Button> -->
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
        <!-- <div v-if="showDebug" class="mt-6 p-4 bg-gray-100 dark:bg-zinc-900 rounded-lg">
            <h4 class="font-bold mb-2">Debug Output:</h4>
            <pre class="text-xs overflow-auto">{{ JSON.stringify(countData, null, 2) }}</pre>
        </div> -->
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