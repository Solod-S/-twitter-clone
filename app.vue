<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0"></div>
            <SidebarLeft />
          </div>

          <!-- Main sidebar -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!-- Rigth sidebar -->
          <div class="hidden col-span-12 md:block md:col-span-3 xl:col:span-4">
            <div class="sticky top-0"></div>
            <SidebarRight />
          </div>
        </div>
      </div>

      <!-- Auth -->
      <AuthPage v-else />
    </div>
  </div>
</template>
<script setup>
const { useAuthUser, initAuth, useAuthLoading } = useAuth();
const user = useAuthUser();
// from composables
const isAuthLoading = useAuthLoading();

const darkMode = ref(false);
onBeforeMount(() => {
  initAuth();
});
</script>
