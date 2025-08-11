<template>
      <div class="flex items-center w-full gap-x-3 px-5 border-b border-gray-100 dark:border-zinc-800 py-2 hover:bg-primary/5 hover:cursor-pointer" @click="emit('on-clicked')">
        <!-- <Avatar class="h-14  w-14">
          <AvatarImage src="" alt="@unovue" />
          <AvatarFallback class="bg-primary/10 text-primary" >CN</AvatarFallback>
        </Avatar> -->

        <Avatar :label="service.name[0]"  size="large" shape="circle" />


        <div class="flex flex-col flex-1">
            <p class="font-semibold text-sm">{{ service.name }}</p>
            <p class="text-sm text-gray-500">{{ service.description }}</p>
        </div>

        <!-- <div class="flex">
          <p class="text-sm text-gray-500">2 services</p>
        </div> -->
      </div>
</template>
<script setup lang="ts">
import type { Service } from '~/types';



defineProps<{
    service: Service
}>()

const emit = defineEmits(['on-clicked'])
</script>
<style>
    
</style>