<template>
  <!-- Error State -->
  <ErrorView v-if="isFetchServicesError" @retry="getServiceById()" />

  <!-- loading -->
  <Loading v-else-if="isServicesLoading" />

  <!-- component -->

  <div
    v-else
    class="flex flex-col items-center w-full min-h-screen p-5 bg-gray-50 dark:bg-transparent"
  >
    <div class="flex flex-col items-start w-full gap-x-2 gap-y-2 max-w-7xl">
      <!-- second section -->
      <div
        class="flex flex-col w-full p-5 bg-white border border-gray-100 rounded-md lg:flex-row gap-x-3 gap-y-2 dark:border-zinc-800 dark:bg-black/20"
      >

              <div class="flex flex-col lg:w-[60%] w-ful">
   

          <div
            class="flex flex-wrap items-center w-full p-3 px-5 mt-2 border border-gray-100 rounded-md gap-y-2 gap-x-3 dark:border-zinc-800"
          >
            <div
              class="flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10"
            >
              <Icon
                class="text-3xl text-primary-500"
                name="material-symbols-light:package-2-outline"
              />
            </div>

            <div class="flex flex-col flex-1">
              <p class="text-sm text-gray-500">service</p>
              <p class="text-lg font-bold ">{{serviceResource?.data?.[0]?.name}}</p>
            </div>
          </div>
        </div>

        
        <div class="flex flex-col lg:w-[50%] w-full">
        
          <!-- Institution -->
          <div
            class="flex flex-wrap items-center w-full p-3 px-5 mt-2 border border-gray-100 rounded-md gap-y-2 gap-x-3 dark:border-zinc-800"
          >
            <Avatar label="E" size="xlarge" shape="circle" />
            <div class="flex flex-col flex-1">
              <p class="text-sm text-gray-500 ">Instituion</p>
              <p class="font-bold font-lg ">{{serviceResource?.data?.[0]?.institution.name}}</p>
            </div>
          </div>
        </div>


      </div>

       {{ prepareFormFields }}

       <form @submit.prevent="onSubmit()" class="flex flex-col w-full p-10 bg-white rounded-md gap-y-5 dark:bg-black/20 dark:border-zinc-800">
      <!-- right side -->
      <div
        class="flex flex-col w-full p-5 bg-white border border-gray-100 rounded-md dark:border-zinc-800 dark:bg-black/20"
      >

        <Stepper linear class="w-full" :value="currentStep.toString()">
          <StepList>
            <Step value="1">PAYMENT DETAILS</Step>
            <Step value="2">VERIFY PAYMENT</Step>
            <Step value="3">PAYMENT METHOD</Step>
            <Step value="4">PAYMENT RECEIPT</Step>
          </StepList>
          <StepPanels>
            <StepPanel class="" v-slot="{ activateCallback }" value="1">
              <!-- payment detail section -->
              <div class="flex bg-white dark:bg-black/20">
                <PaymentDetailSection
                :prepareFormFields="prepareFormFields"
                :form_fields="verification_form_fields"
                :submission_form_fields="submission_form_fields"
                :verification_form_fields="verification_form_fields"
                  :service="serviceResource?.data?.[0] ?? null"
                  v-if="currentStep === 1"
                />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
              <!-- Verify payment -->
              <VerifyPaymentDetail   
                              :prepareFormFields="prepareFormFields"
              :form_fields="submission_form_fields"
              :submission_form_fields="submission_form_fields"
                :verification_form_fields="verification_form_fields"
                  :service="serviceResource?.data?.[0] ?? null" v-if="currentStep === 2" />
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <!-- make payment -->
              <PaymentMethod v-if="currentStep === 3" />
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="4">
              <!-- payment receipt -->
              <PaymentReceipt v-if="currentStep === 4" :service="serviceResource?.data?.[0] ?? null"  />
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>

     </form>
    </div>
  </div>


</template>

<script setup lang="ts">
import { institutionModule } from "~/repository/modules/institution_module";
import { usePaymentStepsStore } from "~/store/payment";
import type { FormField, FormFieldForPosting, ResourceListResponse, Service } from "~/types";
import { toast } from "vue-sonner";

const paymentStore = usePaymentStepsStore();
const { currentStep } = storeToRefs(paymentStore);
const route = useRoute();
const isServicesLoading = ref(false);
const isFetchServicesError = ref(false);
const serviceResource = ref<ResourceListResponse<Service> | undefined>();
const prepareFormFields = ref({} as FormFieldForPosting[]);

const steps = [
  {
    step: 1,
    title: "Verify Details",
    description: "Verify payment details & amount ",
  },
  {
    step: 2,
    title: "Enter Detail",
    description: "Verify payment details & amount",
  },
  {
    step: 3,
    title: "Payment Methods",
    description: "Select cash, bank check etc.",
  },

  {
    step: 4,
    title: "Payment Receipt",
    description: "View your payment receipt",
  },
];

// get service by id
const verification_form_fields = ref([] as FormField[]);
const submission_form_fields = ref([] as FormField[]);

// get services from the institution
async function getServiceById() {
  if (!route.params.id) {
    console.warn("No service ID provided in route params");
    return;
  }

  isServicesLoading.value = true;
  isFetchServicesError.value = false;

  try {
    const res = await institutionModule.getServiceById(
      route.params.id as string,
      { abortKey: "get-service-by-id", enableAbort: false }
    );

    serviceResource.value = res;
    console.log("Service data loaded:", res);
    console.log("First service structure:", res?.data?.[0]?.form_field); // Debug log
    let verification_form_fields_ = res?.data?.[0]?.form_field as FormField[];
    let submission_form_fields_ = res?.data?.[0]?.form_field as FormField[];

    verification_form_fields.value = getObjectsRequiredForVerification(
      verification_form_fields_,
      1
    );

    submission_form_fields.value = getObjectsRequiredForVerification(
      submission_form_fields_,
      0
    );

    currentStep.value = (verification_form_fields.value.length > 0 ) ? 1 : 2;

    
  } catch (error: any) {
    isFetchServicesError.value = true;
    console.error("Failed to fetch services:", error);

    toast("Server Error", {
      description: error.response?.data?.message ?? error.message,
      class: "bg-red-500 text-white",
      action: {
        label: "Retry",
        onClick: () => getServiceById(),
      },
    });
  } finally {
    isServicesLoading.value = false;
  }
}

onMounted(() => {
  getServiceById();
});

definePageMeta({
  layout: "admin",
});

function getObjectsRequiredForVerification(
  data: FormField[],
  require_verification: number | boolean
) {
  return data.filter(
    (item) => item && item.require_verification === require_verification
  );
}

const onSubmit = (async () => {
    
    // paymentStore.currentStep = 1;
});

</script>
