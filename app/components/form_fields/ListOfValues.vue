<template>
    <div class="flex flex-col lg:w-[100%] gap-5 ">
        <div class="flex flex-col items-start w-full gap-y-2">
                  <p class="text-sm font-bold">
        {{ field.field_label }} 
        <span v-html="showAsteric"></span>
      </p>

         

                <div class="flex flex-row-reverse  lg:w-[100%] gap-3  md:flex-row">
                   <Select checkmark  size="small" filter fluid  :options="options" option-value="lov_value"
                option-label="lov_title"  class="w-full md:w-56" 
                v-model="prepareFormFields[`${field.field_name}`]"
                />        
               
                  <Button v-if="options.length < 1" :loading="isExternaldataLoading" icon="pi pi-refresh" @click="getData()" >
                   fw
                  </Button>
                            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
import type { FormField } from '~/types';
import { institutionModule } from '~/repository/modules/institution_module'
import { useToast } from "primevue/usetoast";
import { usePaymentStepsStore } from '~/store/payment'

const props = defineProps<{
    field: FormField;
        prepareFormFields: any
}>();

const paymentStore = usePaymentStepsStore();
const defaultValue = ref(props.field.default_value || "");
const readonly = ref(props.field.is_readonly || false);
const maxlength = ref(props.field.field_length);
const is_amount = ref(props.field.is_amount || false);
const is_required = ref(props.field.is_required || false);

const make_input_number = ref("");
const showAsteric = ref("");
const isExternaldataLoading = ref(false);

const applyFieldValidation = (field: FormField) => {
  props.prepareFormFields[field.field_name] = defaultValue;

//   if (props.field.is_amount) {
//     make_input_number.value = "this.value = this.value.replace(/[^0-9.]/g, '')";
//   }

  if (!props.prepareFormFields[`${props.field.is_required}`]) {
    showAsteric.value = `<span class="text-red-600 ">*</span>`;
  }
};

const options = ref([] as any[]);
onMounted(async () => {
  options.value = props.field.list_of_options;
  

  await applyFieldValidation(props.field ?? {});

  // Call a thirdparty api to get field values
    if(props.field.is_thirdparty == 1 && options.value.length < 1){
    setTimeout(() => {
       getData()
    }, 5000);
  }
  
});

const showError = ref("");
function onBlur() {
  if (props.prepareFormFields[`${props.field.field_name}`] == "" && props.prepareFormFields[`${props.field.is_required}`]) {
    showError.value = `<p class="mt-2 text-sm font-semibold text-red-600">Field is required</p>`;
  }
}

const toast = useToast()
// const params = reactive({})
const isLoadingGetData = ref(false)

const payload = computed(() => {
    return {
        field_id: props.field.id,
        institution_id: paymentStore.selectedPaymentService!.institution.id
      }
})

// get get external data for field
async function getData() {
  // isLoadingGetData.value = true;
  try {
    isExternaldataLoading.value = true;
    const res = await institutionModule.getFieldExternalData(
      payload.value
    );
    let result = res;

    if (res?.status === true) {

      options.value =  res.data as any[];

                  toast.add({
                      life: 5000,
                      severity: "success",
                      detail: res?.message,
                      summary: res?.message
                  });

    }else{
              toast.add({
            severity: "error",
            detail: res?.message,
            summary: "Sever error",
            life: 5000,
        });
    }
    console.log('Category data loaded:', res);
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);

    // toast
  } finally {
       isExternaldataLoading.value = false;
  }
}

</script>
<style></style>