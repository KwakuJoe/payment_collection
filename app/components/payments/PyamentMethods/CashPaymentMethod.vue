<template>

    <div class="flex flex-col">

        <!-- cash counter -->
    <CashCounter @submit="handleCashCountSubmit" @dataUpdate="handleDataUpdate" ref="cashCounterRef" />
    </div>



</template>
<script setup lang="ts">


const handleCashCountSubmit = (data: any) => {
    console.log('Submitted data:', data)
    // Process the final count data
}


const handleDataUpdate = (data: any) => {
    // Real-time updates as user types
    console.log('Live data update:', data)
}
</script>
<style></style>