import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePaymentStepsStore = defineStore('paymentSteps', () => {
  // State
  const currentStep = ref(1)
  const totalSteps = 4;

  const selectedPaymentService = ref({} as any);

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
    selectedPaymentService
  }
})