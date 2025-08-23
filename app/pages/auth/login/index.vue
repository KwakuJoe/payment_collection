<template>
    <div class=" flex h-screen w-full justify-center bg-primary-500/20 dark:bg-[#18181B]">

        <div class="flex justify-center items-center w-full max-w-[500px]">

            <div class="flex flex-col w-full bg-white dark:bg-[#1A1A1E]">
                <!-- lhs -->

                <div class="relative w-full overflow-hidden bg-primary-500">
                    <!-- Background Image using NuxtImg -->
                    <!-- <NuxtImg src="/assets/bg_patterns/login-bg.svg" alt="Hero Background"
                        class="absolute inset-0 w-full h-full object-cover" loading="eager" sizes="100vw" /> -->

                    <!-- Dark Overlay -->
                    <!-- <div class="absolute inset-0 bg-black/50"></div> -->



                    <!-- Text Content -->
                    <div class="relative justify-start z-10 flex flex-col h-full text-white p-5">

                        <div class="flex items-center justify-between">
                            <NuxtImg src="/assets/logo/logo.svg" class="w-[150px]" />
                            <div class="mt-5">
                                <p class="font-semibold text-2xl">{{ config.public.appTitle }}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- rhs -->
                <div class="flex flex-col w-full p-10">
                    <div class="flex flex-col">
                        <p class="text-2xl font-bold">Login</p>
                        <p class="text-gray-500 font-normal">Enter you credentials to gain access into central command
                        </p>

                        <form @submit.prevent="onSubmit()" class="flex flex-col gap-y-3 mt-5">

                            <!-- username -->
                            <div class="flex flex-col ">

                                <div class=" w-full items-center">
                                    <InputText size="large" fluid v-model="username" autocomplete="off"
                                        aria-autocomplete="none" placeholder="username" v-bind="usernameAttrs" class=""
                                        :class="{ 'border-red-600 border-2': !!(errors.username || formErrors?.username) }" />

                                </div>
                                <p v-if="!!(errors.username || formErrors?.username)"
                                    class="text-sm font-semibold text-red-600 mt-2">{{ formErrors?.username?.[0] ??
                                        errors.username }}</p>

                            </div>

                            <!-- password -->
                            <div class="flex flex-col">

                                <div class="relative w-full  items-center">
                                    <Password fluid size="large" auto :feedback="false" autocomplete="off"
                                        aria-autocomplete="none" v-model="password" placeholder="password"
                                        v-bind="passwordAttrs"
                                        :class="{ 'border-red-600 border-2': !!(errors.password || formErrors?.password) }"
                                        toggleMask />
                                </div>
                                <p v-if="!!(errors.password || formErrors?.password)"
                                    class="text-sm font-semibold text-red-600 mt-2">{{ formErrors?.password?.[0] ??
                                        errors.password }}</p>

                            </div>


                            <Button :loading="isLoggingIn" label="Login" class="h-12" size="lg" @click="onSubmit()"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <!-- toast initialization -->
        <Toast />
    </div>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { authModule } from "~/repository/modules/auth_module";
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { useAuthStore } from "~/store/auth";
// data
const formErrors = ref<Record<string, string[]> | null>(null);
const toast = useToast();
const isLoggingIn = ref(false)
const config = useRuntimeConfig();
const authStore = useAuthStore()
const router = useRouter();
const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required('User names is required to login'),
        password: yup.string().required('Password is required to login'),
    }),
});


const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");


const onSubmit = handleSubmit(async (values) => {
    console.log(values)
    login()
});




async function login() {
    isLoggingIn.value = true;

    const payload = {
        username: username.value,
        password: password.value
    }

    try {
        const res = await authModule.login(payload)
        console.log('login data:', res);

        if (res?.status === true) {

            // set token & user
            authStore.setAuthItems(
                res?.data.token ?? '',
                res?.data ?? null
            )
            toast.add({ severity: 'success', summary: res.message, detail: 'You have successfully login in your account', life: 3000 });

            routeToHome()
        } else {
            toast.add({ severity: 'error', summary: res?.message, detail: 'Failed to login', life: 3000 });

        }

        isLoggingIn.value = true;


    } catch (error: any) {

        console.error('Failed to login', error);
        toast.add({ severity: 'error', summary: 'Server', detail: error.message, life: 3000 });

        // toast
    } finally {
        isLoggingIn.value = false;
    }
}


function routeToHome() {
    router.push('/')
    // store the selected service in the session storage
}


</script>
<style></style>