<template>
  <div>
    <!-- <slot></slot> -->
    <MainSection title="Home" :loading="loading">
      <TweetForm :user="user" />
    </MainSection>
  </div>
</template>
<script setup>
const { useAuthUser } = useAuth();

const loading = ref(false);

const user = useAuthUser();
</script>
