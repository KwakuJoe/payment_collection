
<template> 
    <div>
        <!-- {{reportStore.dasboardServiceSummary.payment_methods}} -->

        <!-- {{doughnut_data}} -->

     
  
    <div  v-if="reportStore.dasboardServiceSummary.payment_methods?.length > 0" class="flex justify-center card">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-fit" />
    </div>

        <PieChartLoader v-else />
          </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useReportStore } from '~/store/report';
import type { FormatLabelsAndData } from "~/types";
const reportStore = useReportStore();


const props = defineProps<{
    doughnut_data: FormatLabelsAndData
}>();

const payment_methods = ref(null);

const labelss = ref(props.doughnut_data.labels as string[]);
const datass = ref(props.doughnut_data.data as number[]);

const chartData = ref();
const chartOptions = ref();


const setChartData = (  ) => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels:  labelss.value , 
        datasets: [
            {
                data: datass.value ,
                backgroundColor: [documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-amber-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-green-600'), documentStyle.getPropertyValue('--p-red-600'), documentStyle.getPropertyValue('--p-amber-600')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};


// 🔑 Watch for changes in the prop and update chart
watch(
  () => props.doughnut_data,
  (newVal) => {
    if (newVal) {
      labelss.value = newVal.labels;
      datass.value = newVal.data;
      chartData.value = setChartData();
    }
  },
  { immediate: true, deep: true } // run immediately on mount
);

onMounted( async () => {

        chartData.value = setChartData();
        chartOptions.value = setChartOptions();

});



function formatChartData(items = [], labelKey:string, valueKey:string) {

        // alert('has items')
          return {
    labels: items.map(item => item[labelKey]),
    data: items.map(item => Number(item[valueKey]))
  };
  

}


</script>
