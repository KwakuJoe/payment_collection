<template>
  <div class="flex flex-col min-h-screen w-full items-center  bg-gray-50 dark:bg-[#18181B] ">
    <!-- content -->
    <PaymentCollectionList />
  </div>

  <!-- toast initialization -->
  <Toast />

</template>
<script setup lang="ts">
import Toast from 'primevue/toast';
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})


</script>
<style></style>