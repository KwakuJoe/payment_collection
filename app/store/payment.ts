import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PreviewDataItem, Service, DenominationData, FormField, Depositor  } from '~/types';

export const usePaymentStepsStore = defineStore('paymentSteps', () => {
  // State
  const currentStep = ref(1)
  const totalSteps = 4;
  const previewDataItem = ref<PreviewDataItem[]>([]);
  const selectedPaymentService = ref({} as Service);
  const selectedPaymentServiceFormField = ref([] as FormField[]);
  const selectedPaymentServiceFormFieldRefreshed = ref<FormField[]>();
  const selectedCurrencyDenomination = ref([] as DenominationData[]);

  const selectedPaymentServiceFormFieldIsAmount = ref<FormField[]>();

  const selectedPaymentServiceCompletedFieldValues = ref({} as any);

  const depositor = ref<Depositor>({
    name: null,
    phone: null,
    email: null
  });

  // const selectedPaymentService = ref({} as any);

  // Getters
  const isFirstStep = computed(() => currentStep.value === 1)
  const isLastStep = computed(() => currentStep.value === totalSteps)

  // Actions
  const nextStep = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const resetSteps = () => {
    currentStep.value = 1
  }

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    resetSteps,
    selectedPaymentService,
    previewDataItem,
    selectedCurrencyDenomination,
    selectedPaymentServiceFormField,
    selectedPaymentServiceFormFieldRefreshed,
    selectedPaymentServiceFormFieldIsAmount,
    selectedPaymentServiceCompletedFieldValues,
    depositor
  }
})