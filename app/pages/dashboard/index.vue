<template>
    <div>
        <p>Dashboard</p>
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