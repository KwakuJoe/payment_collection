<template>
    <div class=" flex h-screen w-full justify-center bg-[#FFF9F3] dark:bg-[#18181B]">



        <div class="flex justify-center items-center w-full max-w-7xl">

            <div class="flex lg:w-[60%] md:w-[80%] bg-white dark:bg-[#1A1A1E]">
                <!-- lhs -->

                <div class="relative h-[500px] w-[50%] overflow-hidden">
                    <!-- Background Image using NuxtImg -->
                    <NuxtImg src="/assets/bg_patterns/login-bg.svg" alt="Hero Background"
                        class="absolute inset-0 w-full h-full object-cover" loading="eager" sizes="100vw" />

                    <!-- Dark Overlay -->
                    <!-- <div class="absolute inset-0 bg-black/50"></div> -->



                    <!-- Text Content -->
                    <div class="relative justify-start z-10 flex flex-col h-full text-white p-5">


                        <NuxtImg src="/assets/logo/logo.svg" class="w-[150px]" />
                        <div class="mt-5">
                            <p class="text-xl">CENTRAL</p>
                            <p class="lg:text-3xl text-xl font-bold">COMMAND</p>
                        </div>
                    </div>
                </div>

                <!-- rhs -->
                <div class="flex flex-col w-[50%] p-10">
                    <div class="flex flex-col">
                        <p class="text-2xl font-bold">Login</p>
                        <p class="text-gray-500 font-normal">Enter you credentials to gain access into central command
                        </p>

                        <form @submit.prevent="onSubmit()" class="flex flex-col gap-y-3 mt-5">

                            <!-- username -->
                            <div class="flex flex-col ">

                                <div class="relative w-full max-w-sm items-center">
                                    <Input v-model="username" placeholder="username" v-bind="usernameAttrs"
                                        class="pl-10"
                                        :class="{ 'border-red-600 border-2': !!(errors.username || formErrors?.username) }" />
                                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                                        <Icon class="text-lg" name="solar:user-rounded-broken" />
                                    </span>
                                </div>
                                <p v-if="!!(errors.username || formErrors?.username)"
                                    class="text-sm font-semibold text-red-600 mt-2">{{ formErrors?.username?.[0] ??
                                        errors.username }}</p>

                            </div>

                            <!-- password -->
                            <div class="flex flex-col">

                                <div class="relative w-full max-w-sm items-center">
                                    <Input v-model="password" placeholder="password" v-bind="passwordAttrs"
                                        class="pl-10" :type="showPassword ? ' text' : 'password'"
                                        :class="{ 'border-red-600 border-2': !!(errors.password || formErrors?.password) }" />

                                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
                                        <Icon class="text-lg" name="mynaui:key" />
                                    </span>
                                    <span class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                                        <Icon class="text-lg"
                                            :name="showPassword ? 'iconamoon:eye-off' : 'radix-icons:eye-open'"
                                            @click="showPassword = !showPassword" />
                                    </span>
                                </div>
                                <p v-if="!!(errors.password || formErrors?.password)"
                                    class="text-sm font-semibold text-red-600 mt-2">{{ formErrors?.password?.[0] ??
                                        errors.password }}</p>

                            </div>


                            <!-- <Button :loading="false" class="h-12" size="lg" @click="onSubmit()">Login</Button> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>
<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";


// data
const formErrors = ref<Record<string, string[]> | null>(null);
const showPassword = ref(false)

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
});


</script>
<style></style>