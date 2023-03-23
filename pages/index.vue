<template>
  <div>
    <!-- <slot></slot> -->
    <MainSection title="Home" :loading="loading">Content</MainSection>
  </div>
</template>
<script setup>
const loading = ref(false);
</script>
