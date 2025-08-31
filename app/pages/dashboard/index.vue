


<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Header with filters -->


    <!-- First Row -->
    <div class="grid grid-cols-3 gap-6 mb-6">
      <!-- Doughnut Chart -->
      <div class="p-4 bg-white shadow rounded-2xl">
       <Chart type="doughnut" :data="chartData" :options="chartOptions" />
      </div>

      <!-- Card: Total Transactions -->
      <div class="flex flex-col justify-center p-6 text-center bg-white shadow rounded-2xl">
        <p class="text-gray-500">Total Transactions</p>
        <h2 class="text-3xl font-bold">{{ totalTransactions }}</h2>
      </div>

      <!-- Card: Total Amount -->
      <div class="flex flex-col justify-center p-6 text-center bg-white shadow rounded-2xl">
        <p class="text-gray-500">Total Amount</p>
        <h2 class="text-3xl font-bold">£{{ totalAmount.toLocaleString() }}</h2>
      </div>
    </div>

    <!-- Second Row -->
    <div class="grid grid-cols-2 gap-6 mb-6">
      <!-- Bar Chart by Institution -->
      <div class="p-4 bg-white shadow rounded-2xl">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>

      <!-- Top Ten Services -->
      <div class="p-4 bg-white shadow rounded-2xl">
       <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Third Row -->
    <div class="p-4 bg-white shadow rounded-2xl">
      <Chart type="bar" :data="chartData" :options="chartOptions" indexAxis="y" class="h-[30rem]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

const statusChart = ref({ options: {}, series: [] });


const totalTransactions = ref(0);
const totalAmount = ref(0);







onMounted(() => { 

        chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    

});


definePageMeta({
    layout: 'admin',
      middleware: 'auth'

})

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
       
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
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };

}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
