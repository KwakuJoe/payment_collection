
<template>
    <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="min-h-[35rem] w-[]"  />
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useReportStore } from '~/store/report';
import type { FormatLabelsAndData } from "~/types";
const reportStore = useReportStore();


const props = defineProps<{
    bar_data: FormatLabelsAndData
}>();

const labelss = ref(props.bar_data.labels as string[]);
const datass = ref(props.bar_data.data as number[]);

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels:  labelss.value , 
        datasets: [
            {
                label: 'Number of Transactions by Instittution',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: datass.value ,
            },
            // {
            //     label: 'My Second dataset',
            //     backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     data: [28, 48, 40, 19, 86, 27, 90, 50,]
            // }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false,
                    display: false,

                }
            }
        }
    };
}

// 🔑 Watch for changes in the prop and update chart
watch(
  () => props.bar_data,
  (newVal) => {
    if (newVal) {
      labelss.value = newVal.labels;
      datass.value = newVal.data;
      chartData.value = setChartData();
    }
  },
  { immediate: true, deep: true } // run immediately on mount
);

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>
