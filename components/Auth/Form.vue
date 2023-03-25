<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        value=""
        label="Username"
        placeholder="@yourname"
        v-model="data.username"
      />
      <UIInput
        value=""
        label="Password"
        placeholder="********"
        type="password"
        v-model="data.password"
      />
      <div>
        <button @click="handleLogin">LogIn</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import useAuth from "../composables/useAuth";

const data = reactive({ password: "", username: "", loading: false });
//saving values from input here

const handleLogin = async () => {
  const { login } = useAuth();
  data.loading = true;
  try {
    await login({ username: data.username, password: data.password });
  } catch (error) {
    console.log(`handleLogin.error`, error);
  } finally {
    data.loading = false;
  }
  // alert(JSON.stringify(data));
};
</script>
