<template>
<div class="flex justify-center w-full border-b border-gray-100 dark:border-zinc-800 border-solid bg-white dark:bg-[#18181B]">
    <div class="flex justify-center  w-full bg-white dark:bg-black/20">
        <div
        class="flex items-center justify-between gap-x-3 px-4 h-16  w-full max-w-7xl">
        <div class="flex gap-x-2 items-center">


            <!-- side mnenu button and trigger -->
            <!-- <Drawer direction="left">
                <DrawerTrigger>
                    <button
                        class="lg:hidden block items-center gap-x-2 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md">
                        <Icon class="text-2xl" name="line-md:close-to-menu-transition" />
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <SideMenu />
                </DrawerContent>
            </Drawer> -->
            <p class="font-bold">{{ ucFirst(pageTitle) }}</p>
        </div>
        <div class="flex items-center">
            <!-- user drop down -->
            <div class="flex">

                <!-- <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div
                            class="lg:flex hidden items-center gap-x-4 hover:bg-gray-100 dark:hover:bg-zinc-900 p-2 rounded-md ">
                            <Avatar class="h-10 w-10    ">
                                <AvatarImage src="" alt="@unovue" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div class="flex flex-col items-start">
                                <p class="font-semibold texts-sm">Admin</p>
                                <p class="text-sm text-gray-400">admin@fidelitybank.gh.com</p>
                            </div>
                            <Icon class="text-3xl" name="mdi:chevron-down" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> -->
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


</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ucFirst } from '~/utils/index'
import { usePageStore } from "~/store/page_header";


const colorMode = useColorMode()
const pageStore = usePageStore();
const {pageTitle } = storeToRefs(pageStore);
const menu = ref();
const drawerVisible = ref(false);
const router = useRouter();
const route = useRoute();

// computed
const isDark = computed(() => {
  return colorMode.value === 'dark'
})


function logout() {

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

// Compute the current route name
const currentRouteName = computed(() => {
    return route.name || route.path; // Fallback to path if name is not defined
});



// methods
const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
<style></style>
