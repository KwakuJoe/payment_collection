<template>
  <div class="flex flex-col min-h-screen w-full items-center  bg-gray-50 dark:bg-[#18181B] ">
    <!-- content -->
    <PaymentCollectionList/>
  </div>


</template>
<script setup lang="ts">

import 'vue-sonner/style.css' // vue-sonner v2 requires this import

definePageMeta({
  layout: 'admin'
})

</script>
<style></style>