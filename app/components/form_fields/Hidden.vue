<template>

</template>
<script setup lang="ts">
import type { FormField } from "~/types";

const props = defineProps<{
  field: FormField;
  prepareFormFields: any;
}>();

const defaultValue = ref(props.field.default_value);
const readonly = ref(props.field.is_readonly ? true : false );
const maxlength = ref(props.field.field_length);
const is_amount = ref(props.field.is_amount || false);
const is_required = ref(props.field.is_required || false);

const make_input_number = ref("");
const showAsteric = ref("");

const applyFieldValidation = (field: FormField) => {
  props.prepareFormFields[field.field_name] = defaultValue.value;

  if (props.field.is_amount) {
    make_input_number.value = "this.value = this.value.replace(/[^0-9.]/g, '')";
  }

  if (!props.prepareFormFields[`${props.field.is_required}`]) {
    showAsteric.value = `<span class="text-red-600 ">*</span>`;
  }
};

onMounted(async () => {
  props.prepareFormFields[`${props.field.field_name}`] = null
  // await applyFieldValidation(props.field ?? {});
});

const showError = ref("");
function onBlur() {
  if (props.prepareFormFields[`${props.field.field_name}`] == "" && props.prepareFormFields[`${props.field.is_required}`]) {
    showError.value = `<p class="mt-2 text-sm font-semibold text-red-600">Field is required</p>`;
  }
}
</script>
<style></style>
