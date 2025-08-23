<template>
  <div class="flex flex-col w-full p-5 rounded-lg max-w-7xl">
    <!-- header -->
    <div
      class="flex items-center w-full p-3 bg-white border border-gray-100 dark:border-zinc-800 rounded-tr-md rounded-tl-md dark:bg-black/20">
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <p class="font-bold ">Institutions</p>
          <p class="text-sm text-gray-500">Browse through our partner institutions</p>
        </div>

        <div class="flex flex-wrap items-center gap-x-3">
          <!-- search -->
          <div class="flex flex-col">
            <div class="relative items-center w-full max-w-sm">
              <!-- <Input v-model="search" placeholder="Search institution ..." class="pl-10 w-[370px]" /> -->
              <InputText size="small" v-model="search" class="pl-10 w-[370px] text-sm" placeholder="Search" />

              <span class="absolute inset-y-0 flex items-center justify-center px-3 end-0">
                <Icon class="text-lg " name="iconamoon:search-light" />
              </span>
            </div>
          </div>

          <Select checkmark  size="small" filter v-model="selectedCategory" :options="uniqueCategories" option-label="name" option-value="value" placeholder="Select a Category"
            class="w-full md:w-56" />


          <!-- refresh button -->
          <Button  size="small" :loading="isInstitutionsLoading" label="Refresh" icon="pi pi-refresh"  @click="refreshInstitutions()"/>
        </div>
      </div>
    </div>

    <!-- body -->
    <div class="flex flex-col border border-gray-100 dark:border-zinc-800 rounded-br-md rounded-bl-md ">

      <!-- Error State -->
      <ErrorView v-if="isFetchInstitutionsError" />

      <!-- Loading State -->
      <ListLoader v-else-if="isInstitutionsLoading" />

      <!-- Empty State -->
      <div v-else-if="!isInstitutionsLoading && !isFetchInstitutionsError && filteredInstitutions.length === 0"
        class="py-12 text-center">
        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full dark:bg-zinc-800">
          <Icon name="iconamoon:search-light" class="w-6 h-6 text-gray-400" />
        </div>
        <h3 class="mb-2 text-lg font-semibold">No institutions found</h3>
        <p class="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>

      <!-- Institutions Grid with dialog-->
      <template v-else>
        <PaymentCollectionListTile v-for="institution in paginatedInstitutions" :key="institution.id"
          :institution="institution" @on-clicked="openDialog(institution)" />
      </template>



      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-6">
        <Paginator :rows="itemsPerPage" :totalRecords="filteredInstitutions.length"
          :first="(currentPage - 1) * itemsPerPage" @page="handlePageChange"
          template="PrevPageLink PageLinks NextPageLink" class="shadcn-paginator" />
      </div>

      <!-- Results Count -->
      <div class="p-5" v-if="!isInstitutionsLoading && !isFetchInstitutionsError && filteredInstitutions.length > 0">
        <p class="text-sm text-gray-500">
          Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredInstitutions.length) }} of {{
            filteredInstitutions.length }} institutions
        </p>
      </div>
    </div>

    <!-- dialog -->
    <!-- <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
      <DialogContent class="md:max-w-4xl w-full grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh] flex flex-col">
        <DialogHeader class="px-6 py-4 shrink-0">
          <DialogTitle>Payment Collection Detail</DialogTitle>
        </DialogHeader>

        <div class="flex-1 px-6 overflow-y-auto">
          <div class="flex flex-col justify-between  h-[300dvh]">
            <PaymentCollectionServiceList :institution="selectedInstitution" />
          </div>
        </div>
      </DialogContent>
    </Dialog> -->

    <Dialog v-model:visible="isDialogOpen" modal header="Payment Collection Detail" :style="{ width: '60rem' }">
       <PaymentCollectionServiceList :institution="selectedInstitution" />
    </Dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from 'vue'
import type { Category, Institution, ResourceListResponse } from '~/types'
import { institutionModule } from '~/repository/modules/institution_module'
// Reactive state
const isDialogOpen = ref(false)
const selectedInstitution = ref<Institution | null>(null)
const institutionResource = ref<ResourceListResponse<Institution> | undefined>()
const categoryResource = ref<ResourceListResponse<Category> | undefined>()
const search = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10
const isInstitutionsLoading = ref(false)
const isCategoriesLoading = ref(false)
const params = reactive({})
const isFetchInstitutionsError = ref(false)


// Computed properties
const uniqueCategories = computed(() => {
  if (!categoryResource?.value?.data) return [{ name: 'All', value: 'all' }]

  const categories = categoryResource.value.data.map(cat => ({ 
    name: cat.name, 
    value: cat.name 
  })).filter(Boolean)
  
  // Add "All" option at the beginning
  return [{ name: 'All', value: 'all' }, ...categories.sort((a, b) => a.name.localeCompare(b.name))]
})

const filteredInstitutions = computed(() => {
  let filtered:Institution[] = institutionResource?.value?.data || []

  // Filter by search query
  if (search.value.trim()) {
    const query = search.value.toLowerCase().trim()
    filtered = filtered.filter(institution => {
      // Check institution name
      const nameMatch = institution.name?.toLowerCase().includes(query) || false

      // Check institution description
      const descriptionMatch = institution.description?.toLowerCase().includes(query) || false

      // Check category name
      const categoryMatch = institution.category?.name?.toLowerCase().includes(query) || false

      // Check customer name
      const customerMatch = institution.customer_name?.toLowerCase().includes(query) || false

      // Uncomment and modify this if you have services to search through
      // const servicesMatch = institution.services?.some(service =>
      //   service.name?.toLowerCase().includes(query)
      // ) || false

      return nameMatch || descriptionMatch || categoryMatch || customerMatch // || servicesMatch
    })
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    filtered = filtered.filter(institution => {
      return institution.category?.name === selectedCategory.value
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredInstitutions.value.length / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const paginatedInstitutions = computed(() => {
  return filteredInstitutions.value.slice(startIndex.value, endIndex.value)
})

// Methods
// const handlePageChange = (page: number) => {
//   currentPage.value = page
// }

const handlePageChange = (event: any) => {
  const newPage = Math.floor(event.first / event.rows) + 1
  currentPage.value = newPage
}

const openDialog = (institution: Institution) => {
  selectedInstitution.value = institution
  isDialogOpen.value = true
}

// Get the list of institutions
async function getInstitutions(requestSource: string) {
  isInstitutionsLoading.value = true;
  isFetchInstitutionsError.value = false;

  try {
    const res = await institutionModule.getInstitutions(
      params,
      { abortKey: 'get-all-institutions', enableAbort: true },
      requestSource
    );

    institutionResource.value = res;
    console.log('Institution data loaded:', res);
    console.log('First institution structure:', res?.data?.[0]); // Debug log

  } catch (error: any) {
    isFetchInstitutionsError.value = true;
    console.error('Failed to fetch institutions:', error);

    // toast
  } finally {
    isInstitutionsLoading.value = false;
  }
}

// get categories
async function getCategories(requestSource: string) {
  isCategoriesLoading.value = true;
  try {
    const res = await institutionModule.getCategories(
      params,
      { abortKey: 'get-all-categories', enableAbort: true },
      requestSource
    );
    categoryResource.value = res;
    console.log('Category data loaded:', res);
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);

    // toast
  } finally {
    isCategoriesLoading.value = false;
  }
}

function refreshInstitutions() {
  getInstitutions('refresh');
  getCategories('refresh');
}

// Lifecycle hooks
onMounted(() => {
  getInstitutions('mounted');
  getCategories('mounted');
})

// Watch for filter changes to reset pagination
watch([search, selectedCategory], () => {
  currentPage.value = 1
})

// Debug watchers (remove in production)
watch(search, (newVal) => {
  console.log('Search value changed:', newVal)
})

watch(filteredInstitutions, (newVal) => {
  console.log('Filtered institutions count:', newVal.length)
})
</script>