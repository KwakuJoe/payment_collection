<template>
      <div class="flex items-center w-full px-5 py-2 bg-white border-b border-gray-100 gap-x-3 dark:border-zinc-900 hover:bg-primary/5 dark:hover:bg-primary/5 hover:cursor-pointer dark:bg-black/20" @click="emit('on-clicked')">
        <!-- <Avatar class="h-14 w-14">
          <AvatarImage :src="imageUrl(institution.image)" alt="@unovue" />
          <AvatarFallback class="bg-primary/10 text-primary" >CN</AvatarFallback>
        </Avatar> -->
        <!-- <Avatar :label="institution.name[0]"  size="xlarge" shape="circle" /> -->
        <img :src="`${config.public.imageUrl}/${institution?.image}`" :alt="institution?.name" class="shadow-lg" width="60" />

        <div class="flex flex-col flex-1">
            <p class="text-sm font-semibold">{{ institution.name }}</p>
            <p class="text-sm text-gray-500">{{ institution.category.name }}</p>
        </div>

        <div class="flex">
          <p class="text-sm text-gray-500"> >> </p>
        </div>
      </div>
</template>
<script setup lang="ts">
import type { Institution } from '~/types';

defineProps<{
    institution: Institution
}>()
const config = useRuntimeConfig();

const emit = defineEmits(['on-clicked'])



</script>
<style>
    
</style>