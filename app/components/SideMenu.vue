<template>
    <aside class="w-full h-screen lg:border-r border-gray-100 dark:border-zinc-800 border-solid  dark:bg-[#18181B]">
        <div class="flex flex-col h-full bg-white dark:bg-black/20">
            <!-- Logo and Title -->
            <div class="items-center hidden h-16 px-5 border-b border-gray-100 border-solid lg:flex dark:border-zinc-800">

                <NuxtImg src="/assets/logo/logo.png" class="w-[120px]" />
                <!-- <div class="flex items-start gap-x-2">
                    <p class="text-sm font-normal ">CENTRAL</p>
                    <p class="text-sm font-bold ">COMMAND </p>
                </div> -->
            </div>
 
            <!-- Menu Items -->
            <ul class="px-4 py-6">
                <li v-for="(item, index) in menuItems" :key="index">
                    <!-- Single Menu Item -->
                    <router-link v-if="!item.children" :to="item.path"
                        class="flex items-center p-3 text-sm transition rounded-sm hover:bg-gray-100 dark:hover:bg-zinc-800/30"
                        :class="{ 'bg-gray-50 dark:bg-zinc-800/20 text-primary font-bold border-l-2 border-primary': isActive(item.path), 'font-bold': isActive(item.path) }">
                        <span class="mr-2 text-lg">
                            <Icon :name="item.icon" />
                        </span>
                        <p class="flex-1 text-sm font-bold">{{ item.title }}</p>
                    </router-link>

                    <!-- Nested Menu Item -->
                    <div v-else>
                        <button
                            class="flex items-center justify-between w-full p-3 transition rounded-sm hover:bg-gray-100 dark:hover:bg-zinc-800/30"
                            @click="toggleDropdown(index)">
                            <div class="flex items-center">
                                <span class="mr-2 text-lg">
                                    <Icon :name="item.icon" />
                                </span>
                                <p class="flex-1 text-sm font-bold">{{ item.title }}</p>
                            </div>
                            <Icon class="text-lg transition-transform"
                                :class="openIndex === index ? 'rotate-180' : 'rotate-0'" name="mdi:chevron-down" />
                        </button>

                        <!-- Dropdown Menu -->
                        <transition name="slide">
                            <ul v-if="openIndex === index" class="pl-6">
                                <li v-for="child in item.children" :key="child.path">
                                    <router-link :to="child.path"
                                        class="flex items-center p-3 text-sm font-bold transition rounded-sm hover:bg-gray-100 dark:hover:bg-zinc-800/30"
                                        :class="{ 'bg-gray-50 dark:bg-zinc-800/20 text-primary font-bold border-l-2 border-primary': isActive(child.path), 'font-bold': isActive(child.path) }">
                                        <span class="mr-2">
                                            <Icon :name="child.icon" />
                                        </span>
                                        {{ child.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </li>
            </ul>
        </div>
    </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { NuxtImg } from '#components';

// Vue Router
const route = useRoute();

// Menu Data
// Define the menu item type
type MenuItem = {
    title: string;
    icon: string;
    path: string;
    children?: Array<{
        name: string;
        icon: string;
        path: string;
    }>;
};

const menuItems = ref<MenuItem[]>([
    {
        title: 'Dashboard',
        icon: 'hugeicons:dashboard-square-01',
        path: '/dashboard', // Single item
    },
    {
        title: 'Payments',
        icon: 'hugeicons:payment-01',
        path: '/', // Single item
    },
    {
        title: 'Report',
        icon: 'majesticons:file-report-line',
        path: '/teller/report', // Single item
    }
]);

// Open index state
const openIndex = ref<number | null>(null);

// Toggle dropdown
const toggleDropdown = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
};

// Check if a link is active
const isActive = (path: string) => {
    return route.path === path;
};




</script>
<style scoped>
/* Smooth Dropdown Animation */
.slide-enter-active,
.slide-leave-active {
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    max-height: 200px;
    opacity: 1;
}
</style>
