<template>
  <div>
    <h3>Profile</h3>
    <div v-if=user>
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { isLogin } from '@/composables/IsLogin';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref} from 'vue';

    let user = ref(null);
    const authStore = useAuthStore();
    onMounted(async () => {
        user.value = await isLogin();
        console.log(user.value);
    })
    let logout = async () => {
        await authStore.logout();
        user.value = null;
    }
    
</script>

<style>

</style>