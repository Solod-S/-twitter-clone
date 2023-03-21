<template>
  <nuxt-link
    to="#"
    class="flex item-center p-3 w-min text-black hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition"
  >
    <div class="w-6 h-6 text-dark" :class="defaultTransition">
      <slot name="icon"></slot>
    </div>
    <div class="hidden ml-4 text-xl xl:block" :class="textClasses">
      <slot name="name"></slot></div
  ></nuxt-link>
</template>
<script setup>
import useTailwindConfig from "../../composables/useTailwindConfig";
//animation
const { defaultTransition } = useTailwindConfig;
const props = defineProps({ active: Boolean, default: false });
const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
//change font style on active (waiting on props "active" from index)
</script>
