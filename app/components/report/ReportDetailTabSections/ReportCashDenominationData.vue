<template>
    <div class="flex flex-col p-5 border border-gray-100 border-dashed gap-y-2 dark:border-zinc-800">

       


       
            
        <div v-if="record.length > 0"  class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">

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
                               {{note.quantity}}
                            </div>

                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                               {{ note.amount }}
                            </div>
                        </div>

                        <!-- Notes Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Notes</div>
                            <div class="p-3 font-bold"></div>
                            <div class="p-3 font-bold border-l border-gray-100 dark:border-zinc-800">{{ totalNotes }}</div>

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
                               {{coin.quantity}}
                            </div>

                            <div class="flex items-center p-3 font-bold border-l border-gray-100 dark:border-zinc-800">
                                 {{ coin.amount }}
                            </div>
                        </div>

                        
                        <!-- Coins Total -->
                        <div
                            class="grid grid-cols-3 border-t border-gray-100 bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800">
                            <div class="p-3 font-bold">Total Coins</div>
                            <div class="p-3 font-bold"></div>
                            <div class="p-3 font-bold border-l border-gray-100 dark:border-zinc-800">{{ totalCoins }}</div>

                        </div>

                    </div>
                </div>
            </div>



            </div>


        


        



        <!-- empty -->
         <EmptyState v-else message="Cash denominations is not found on this transaction report" title="No Cash" />

    </div>
</template>
<script setup lang="ts">
import EmptyState from '~/components/EmptyState.vue';
import type { DenominationData } from '~/types';

const props = defineProps<{
    record: DenominationData[] ;
}>()


const notesData = ref<DenominationData[]>([]);
const coinsData = ref<DenominationData[]>([]);




onMounted( async () => {
    // denomination.value = props.record?.currency_denomination;

        let denomination = await splitNotesAndCoins(props.record);
    notesData.value = denomination.notes;
    coinsData.value = denomination.coins;


});

const emits = defineEmits(['on-success', 'on-close'])



const splitNotesAndCoins =  (  (data:any) => {
    const notes = [] as DenominationData[];
    const coins = [] as DenominationData[];

    data.forEach((item:any) => {
        const denomination = parseFloat(item.denomination); // convert string to number
        const formattedItem = {
                is_note: item.is_note,
                denomination: parseFloat(item.denomination),
                currency: item.currency,
                code: item.code,
                quantity: parseFloat(item.quantity ?? 0),
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
})

// Computed: Total Notes
const totalNotes = computed(() =>
  notesData.value.reduce((sum, note) => sum + note.amount, 0)
)

// Computed: Total Coins
const totalCoins = computed(() =>
  coinsData.value.reduce((sum, coin) => sum + coin.amount, 0)
)


</script>
<style lang="">

</style>