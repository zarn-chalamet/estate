<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Welcome Back</h1>
      <form @submit.prevent="onLogin">
        <div class="input-group">
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="additional-links">
          <a href="#">Forgot Password?</a>
          <router-link to="/register">Create an Account</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const router = useRouter();
    let email = ref(null);
    let password = ref(null);
    let err = ref(null);

    let onLogin = async () => {
      const authStore = useAuthStore();
      try{
          console.log(email.value,password.value)
            await authStore.login({
                email: email.value,
                password: password.value
            });
            router.push('/');
        }catch(error){
            err.value = error;
        }
    }
    return { onLogin,email,password}
  }
}
</script>

<style scoped>
/* Overall layout */
body,
html {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f6f9;
}

/* Login container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Login card */
.login-card {
  background: #ffffff;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Title */
.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

/* Input group */
.input-group {
  margin-bottom: 20px;
}

.input-group input {
  width: 90%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.input-group input:focus {
  border-color: #007bff;
}

/* Login button */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

/* Additional links */
.additional-links {
  margin-top: 20px;
}

.additional-links a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  margin: 0 10px;
}

.additional-links a:hover {
  text-decoration: underline;
}
</style>
