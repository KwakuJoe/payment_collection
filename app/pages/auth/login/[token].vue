<template>
    <div class=" flex h-screen w-full justify-center bg-primary-500/20 dark:bg-[#18181B]">



        <div class="flex justify-center items-center w-full max-w-[500px]">

            <div class="flex justify-center items-center flex-col w-full bg-white dark:bg-[#1A1A1E] p-10">
                <ErrorView v-if="isRequestError" title="Authentication Failed" message="Session expired"
                    btn-message="Go home" @retry="routeToLogin()" />
                <Loading v-else message="Authenticating Please wait ..." />

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
const route = useRoute()
const isRequestError = ref(false);

// route.params.token


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
    loginWithToken()
});




async function loginWithToken() {
    isLoggingIn.value = true;
    isRequestError.value = false;

    try {
        const res = await authModule.loginWithToken(`${route.params.token?.toString()}`)
        console.log('login data:', res);

        if (res?.status === true) {

            // set token & user
            authStore.setAuthItems(
                res?.data.token ?? '',
                res?.data ?? null
            )
            toast.add({ severity: 'success', summary: res.message, detail: 'You have successfully login in your account', life: 3000 });

            routeToHome()
            isLoggingIn.value = false;

        } else {
            toast.add({ severity: 'error', summary: res?.message, detail: 'Failed to login', life: 3000 });
            isLoggingIn.value = false;
            isRequestError.value = true;

            setTimeout(() => {
                routeToLogin()
            }, 10000);
        }

        isLoggingIn.value = true;


    } catch (error: any) {
        isRequestError.value = true;

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

function routeToLogin() {
    router.push('/auth/login')

}


onMounted(() => {
    isRequestError.value = false;
    isLoggingIn.value = true;
    setTimeout(() => {
        loginWithToken()
    }, 5000);
})
</script>
<style></style>