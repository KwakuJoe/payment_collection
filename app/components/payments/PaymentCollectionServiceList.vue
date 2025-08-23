<template>
    <div class="flex flex-col w-full rounded-lg max-w-7xl">
        <!-- header -->
        <div
            class="flex items-center w-full p-3 border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md">
            <div class="flex flex-col justify-between w-full gap-y-2">
                <div
                    class="flex flex-wrap items-center w-full p-3 px-5 border border-gray-100 rounded-md gap-y-2 gap-x-3 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800">


                  

                    <img :src="`${config.public.imageUrl}/${institution?.image}`" :alt="institution?.name" class="shadow-lg" width="64" />


                    <div class="flex flex-col flex-1">
                        <p class="text-sm font-bold">{{ institution?.name }} </p>
                        <p class="text-sm text-gray-500">{{ institution?.category.name }}</p>
                    </div>

                    <div class="flex">
                        <p class="text-sm text-gray-500">{{ filteredServices?.length }} services
                            Available</p>
                    </div>
                </div>

                <div class="flex flex-col flex-wrap items-center w-full md:flex-row gap-x-3">
                    <!-- search -->
                    <div class="flex flex-col w-full">
                        <div class="relative items-center">
                            <InputText fluid v-model="search" class="pl-10 text-sm" placeholder="Search" />
                            <span class="absolute inset-y-0 flex items-center justify-center px-3 end-0">
                                <Icon class="text-lg" name="iconamoon:search-light" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- body -->
        <div class="flex flex-col border border-gray-100 dark:border-zinc-800 rounded-br-md rounded-bl-md ">

            <!-- Error State -->
            <ErrorView v-if="isFetchServicesError" @retry="getServices('refresh')" />

            <!-- Loading State -->
            <ListLoader v-else-if="isServicesLoading" />

            <!-- Empty State -->
            <div v-else-if="filteredServices?.length === 0" class="py-12 text-center">
                <div
                    class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full dark:bg-zinc-800">
                    <Icon name="iconamoon:search-light" class="w-6 h-6 text-gray-400" />
                </div>
                <h3 class="mb-2 text-lg font-semibold">No services found</h3>
                <p class="text-gray-500">Try adjusting your search criteria</p>
            </div>

            <!-- Institutions Grid with dialog - FIXED: Use paginatedPaymentCollectionServices instead -->
            <template v-else>
                <PaymentCollectionServiceTile :service="service" v-for="service in paginatedServices" :key="service.id"
                    @on-clicked="routeToPayment(service)" />
            </template>




            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center mt-6">


                <div v-if="totalPages > 1" class="flex justify-center mt-6">
                    <Paginator :rows="itemsPerPage" :totalRecords="filteredServices.length"
                        :first="(currentPage - 1) * itemsPerPage" @page="handlePageChange"
                        template="PrevPageLink PageLinks NextPageLink" class="shadcn-paginator" />
                </div>
            </div>

            <!-- Results Count -->
            <div class="p-5">
                <p class="text-sm text-gray-500">
                    Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredServices!.length) }} of
                    {{
                        filteredServices!.length }} services
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { institutionModule } from '~/repository/modules/institution_module';
import type { Institution, ResourceListResponse, Service, } from '~/types'
import { useToast } from "primevue/usetoast";
import { usePaymentStepsStore } from '~/store/payment';
const paymentStore = usePaymentStepsStore();

const props = defineProps<{
    institution: Institution | null
}>()

const config = useRuntimeConfig();
// Mock data

// Reactive state - using your variable names
const search = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const serviceResource = ref<ResourceListResponse<Service> | undefined>()
const isServicesLoading = ref(false)
const isFetchServicesError = ref(false)
const router = useRouter()
const params = reactive({})
const toast = useToast();



const filteredServices = computed<Service[]>(() => {
    let filtered: Service[] = serviceResource?.value?.data || []

    // Filter by search query
    if (search.value.trim()) {
        const query = search.value.toLowerCase().trim()
        filtered = filtered.filter(service =>
            service.name.toLowerCase().includes(query)
        )
    }

    return filtered
})

const totalPages = computed(() => Math.ceil(filteredServices.value!.length / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const paginatedServices = computed(() => {
    return filteredServices.value?.slice(startIndex.value, endIndex.value)
})

// Methods


const handlePageChange = (event: any) => {
    const newPage = Math.floor(event.first / event.rows) + 1
    currentPage.value = newPage
}

// Watch for filter changes to reset pagination
watch([search, selectedCategory], () => {
    currentPage.value = 1
})


function routeToPayment(service: Service) {
    router.push(`/teller/payments/${service.id}`)
    // store the selected service in the session storage
}


// get services from the institution
async function getServices(requestSource: string) {

    if (!props.institution) {
        console.warn('No institution provided to PaymentCollectionServiceList');
        return;
    }

    isServicesLoading.value = true;
    isFetchServicesError.value = false;

    try {
        const res = await institutionModule.getServicesByInstitution(
            props.institution.id,
            { abortKey: 'get-all-services', enableAbort: true },
            requestSource
        );

        serviceResource.value = res;
        console.log('Service data loaded:', res);
        console.log('First service structure:', res?.data?.[0]); // Debug log
      
    } catch (error: any) {
        isFetchServicesError.value = true;
        console.error('Failed to fetch services:', error);


    toast.add({
      severity: "error",
      detail: error.response?.data?.message ?? error.message,
      summary:
        error.response?.status == 401 ? "Unauthenticated" : "Sever error",
    });
    } finally {
        isServicesLoading.value = false;
    }
}



// Lifecycle hooks
onMounted(() => {
    if (props.institution) {
        getServices('mounted');
    } else {
        console.warn('No institution provided to PaymentCollectionServiceList');
    }
})
</script>