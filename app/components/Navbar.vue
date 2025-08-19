<template>
    <div
        class="flex justify-center w-full border-b border-gray-100 dark:border-zinc-800 border-solid bg-white dark:bg-[#18181B]">
        <div class="flex justify-center  w-full bg-white dark:bg-black/20">
            <div class="flex items-center justify-between gap-x-3 px-4 h-16  w-full max-w-7xl">
                <div class="flex gap-x-2 items-center">
                    <button @click="drawerVisible = true"
                        class="lg:hidden items-center gap-x-2 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md">
                        <Icon class="text-2xl" name="line-md:close-to-menu-transition" />
                    </button>
                    <p class="font-bold">{{ ucFirst(pageTitle) }}</p>
                </div>
                <div class="flex items-center">
                    <!-- user drop down -->
                    <div class="flex">

                         <!-- user drop down -->
                        <div class="flex">
                            <button @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                                class="lg:flex hidden items-center gap-x-4 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md ">
                                <Avatar :label="user_info?.full_name[0]" class="" shape="circle" />
                                <div class="flex flex-col items-start">
                                    <p class="font-semibold text-sm">{{ user_info?.username }}</p>
                                    <p class="text-sm text-gray-400">{{ user_info?.full_name }}</p>
                                </div>
                                <Icon class="text-3xl" name="mdi:chevron-down" />
                            </button>

                            <!-- drop down information -->
                            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                        </div>
                    </div>


                    <!-- dark theme -->
                    <button
                        class="flex justify-center items-center h-10 w-10 p-3 rounded-lg border border-gray-100 border-solid dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900"
                        @click="toggleDarkMode()">
                        <Icon v-if="isDark" name="material-symbols:sunny-outline-rounded" @click="" />
                        <Icon v-else name="material-symbols:moon-stars-outline" @click="" />
                    </button>



                </div>

            </div>
        </div>
    </div>

    <!-- side drawer on small screen only -->
    <div class="card flex justify-center">
        <Drawer v-model:visible="drawerVisible" class="!w-90 md:!w-90 lg:!w-[30rem]">
            <template #header>
                <div
                    class="flex items-center gap-x-3 px-4 h-16 border-b border-gray-200 border-solid dark:border-zinc-800">
                    <img src="../assets/ucc-logo.png" width="24" alt="" />
                    <div class="flex flex-col">
                        <p class="font-bold text-xs">UNIVERSITY OF CAPE COAST</p>
                        <p class="text-gray-400 text-xs">HEALTH MANAGEMENT PORTAL</p>
                    </div>
                </div>
            </template>

            <div class="flex flex-col h-full justify-between">
                <!-- menus -->
                <SideMenu />

                <!-- profile -->
                <button @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"
                    class="flex items-center gap-x-4 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md">
                    <Avatar :label="user_info?.full_name[0]" class="" shape="circle" />
                    <div class="flex flex-col items-start">
                        <p class="font-semibold">{{ user_info?.full_name }}</p>
                        <p class="text-sm text-gray-400">{{ user_info?.email }}</p>
                    </div>
                    <Icon class="text-3xl" name="mdi:chevron-down" />
                </button>
            </div>
        </Drawer>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ucFirst } from '~/utils/index'
import { usePageStore } from "~/store/page_header";
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { token, user } = storeToRefs(authStore);
const colorMode = useColorMode()
const pageStore = usePageStore();
const { pageTitle } = storeToRefs(pageStore);
const menu = ref();
const drawerVisible = ref(false);
const user_info = authStore.getUser();
const route = useRoute();
const router = useRouter();

// computed
const isDark = computed(() => {
    return colorMode.value === 'dark'
})


function logout() {
    token.value = null;
    user.value = null;

    // Clear token from localStorage
    localStorage.removeItem("token");
    // localStorage.removeItem('user');
    localStorage.removeItem("user");

    // redirect to login
    router.push('/auth/login');
}

const toggle = (event: any) => {
    menu.value.toggle(event);
};

const items = ref([
    {
        label: "Logout",
        name: "pi pi-sign-out",
        command: () => {
            logout();
        },
    },
]);





// methods
const toggleDarkMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
<style></style>
