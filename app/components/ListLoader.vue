<template>
  <div class="flex flex-col w-full">
    <div v-for="(item, index) in 14" :key="index"
      class="flex items-center w-full gap-x-3 px-5 border-b border-gray-100 dark:border-zinc-900 py-2 hover:bg-primary/5 dark:hover:bg-primary/5 hover:cursor-pointer bg-white dark:bg-black/20">
      <div class="flex items-center space-x-4 w-full">
        <!-- <Skeleton class="h-12 w-12 rounded-full" /> -->
        <Skeleton shape="circle" size="4rem"></Skeleton>

        <div class="space-y-2">
         <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
          <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style></style>