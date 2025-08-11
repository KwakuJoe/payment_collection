<template>
  <div class="flex h-full fixed w-full">
    <!-- Sidebar -->
    <div class="flex-shrink-0 w-96 hidden lg:block sidebar sidebar">
      <SideMenu />
    </div>
    <!-- Main Content -->
    <div class="flex-grow overflow-y-auto w-full">
      <Navbar />
      <!-- Your main content goes here -->
      <slot/>
      
    </div>
  </div>

  <div vaal-drawer-wrapper id="app"></div>

</template>
<script setup lang="ts">

</script>
<style></style>
