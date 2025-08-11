<template>
      <div class="flex items-center w-full gap-x-3 px-5 border-b border-gray-100 dark:border-zinc-900 py-2 hover:bg-primary/5 dark:hover:bg-primary/5 hover:cursor-pointer bg-white dark:bg-black/20" @click="emit('on-clicked')">
        <!-- <Avatar class="h-14  w-14">
          <AvatarImage :src="imageUrl(institution.image)" alt="@unovue" />
          <AvatarFallback class="bg-primary/10 text-primary" >CN</AvatarFallback>
        </Avatar> -->
        <Avatar :label="institution.name[0]"  size="xlarge" shape="circle" />

        <div class="flex flex-col flex-1">
            <p class="font-semibold text-sm">{{ institution.name }}</p>
            <p class="text-sm text-gray-500">{{ institution.category.name }}</p>
        </div>

        <div class="flex">
          <p class="text-sm text-gray-500">2 services</p>
        </div>
      </div>
</template>
<script setup lang="ts">
import type { Institution } from '~/types';

defineProps<{
    institution: Institution
}>()

const emit = defineEmits(['on-clicked'])



</script>
<style>
    
</style>