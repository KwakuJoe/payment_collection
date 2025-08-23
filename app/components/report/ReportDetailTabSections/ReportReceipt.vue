<template>
   
    <div  
        class="flex flex-col w-full p-10 bg-white border border-gray-100 gap-y-5 dark:bg-black/20 dark:border-zinc-800">
        
         <div id="printArea">
        <div class="flex items-center justify-between w-full">
            <!-- system logo -->
            <div class="flex p-2 rounded-lg ">
                <NuxtImg src="/assets/logo/logo.svg" class="w-[120px]" />
                
            </div>
            <!-- payment title -->
            <div class="flex flex-col items-center">
                <p class="font-bold font-lg">{{record?.service?.name}} </p>
                <p class="font-semibold text-gray-500">{{record?.institution?.name ?? ''}}</p>
            </div>
            <!-- utility company logo -->
            <div class="flex p-2 rounded-lg bg-primary/0">
               <img :src="`${config.public.imageUrl}/${record?.institution?.image}`" :alt="record?.institution?.name" class="shadow-lg" width="64" />
            </div>
        </div>

        <div class="flex items-center justify-between w-full">
            <div class="flex flex-col">
                <p class="font-medium text-gray-500">BRANCH: <span class="font-light">{{record?.branch_name}}</span></p>
                <p class="font-medium text-gray-500">TELLER: <span class="font-light">{{record?.teller_name}}</span></p>
            </div>
            <div class="flex flex-col">
                <p class="font-medium text-gray-500">REFERENCE: <span class="font-light">FBL2321</span></p>
                <p class="font-medium text-gray-500">DATE: <span class="font-light">{{record?.created_at}}</span></p>
            </div>
        </div>
        <br>
        

        <div class="flex flex-col p-5 border border-gray-100 rounded-md gap-y-2 dark:border-zinc-900">
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p >Phone Number</p>
                <p class="font-medium">0554538444</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p>Meter Number</p>
                <p class="font-medium">26646463</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p >Customer Name</p>
                <p class="font-medium">ROLAND MAY LUKE</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p >Balance</p>
                <p class="font-medium ">0.00</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p>Amount</p>
                <p class="font-medium">0.00</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p>Payment Methods</p>
                <p class="font-medium">CASH</p>
            </div>
            <div class="flex justify-between w-full py-2 border-b-2 border-gray-100 border-dashed dark:border-zinc-800">
                <p >PAID BY</p>
                <p class="font-medium">ROLAND BAKA FORSON (0554538444)</p>
            </div>

        </div>
        

    </div>
    </div>

    <div> 
        <div class="flex flex-col max-w-full mt-6 gap-x-5 gap-y-2 lg:flex-row ">
            <Button severity="secondary" size="lg" class="w-full lg:w-1/2" @click="emits('on-close')">
               CLOSE
            </Button>
            <Button size="lg"  class="w-full lg:w-1/2" @click="print('printArea')" >
                PRINT
            </Button>
        </div>
        </div>

        
</template>



<script setup lang="ts">
import { usePaymentStepsStore } from '~/store/payment';
import type { Service } from '~/types';
const paymentStore = usePaymentStepsStore();
const config = useRuntimeConfig();

const props = defineProps<{
    record: Record<string, any> | null;
}>()

const emits = defineEmits(['on-success', 'on-close'])


function printDiv(divId: string) {
  const divContent = document.getElementById(divId)?.outerHTML;
  const printWindow = window.open('', '', 'width=800,height=600');

  if (printWindow && divContent) {
    // Copy styles from the current page
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          // Skip CORS-restricted styles
          return '';
        }
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>${styles}</style>
        </head>
        <body>
          ${divContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}

const print = (async (div_id:string) => {
    printDiv(div_id);
})

</script>


<style>



</style>