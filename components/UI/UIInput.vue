<template>
  <div>
    <label
      for=""
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        @input="(event) => emits('update:modelValue', event.target.value)"
        :type="props.type"
        :value="props.modelValue"
        class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="props.placeholder"
      />
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(["update: modelValue"]);
//To inform a parent component about changes in a child component

const props = defineProps({
  modelValue: { value: String, required: true },
  label: {
    type: String,
    required: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>

// @input="event => emits('update:modelValue', event.target.value)" // add
eventlistner on change // modelValue comes from parrent v-model
