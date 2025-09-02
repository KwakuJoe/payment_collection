
<template>
    <div>
        {{reportStore.dasboardServiceSummary.payment_methods}}

     
  
    <div div v-if="reportStore.dasboardServiceSummary.payment_methods?.length > 0" class="flex justify-center card">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-fit" />
    </div>

        <PieChartLoader v-else />
          </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from '~/store/report';
const reportStore = useReportStore();

const payment_methods = ref(null);

const chartData = ref();
const chartOptions = ref(null);


const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels:  ['CASH'],
        datasets: [
            {
                data: [1],
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



const labelss = ref([]);
const datass = ref([]);
onMounted( async () => {



        chartData.value = setChartData();
    chartOptions.value = setChartOptions();



});



function formatChartData(items = [], labelKey, valueKey) {

        // alert('has items')
          return {
    labels: items.map(item => item[labelKey]),
    data: items.map(item => Number(item[valueKey]))
  };
  

}


</script>
