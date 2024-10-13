<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="register-title">Create an Account</h1>
      <form @submit.prevent="onRegister">
        <div class="input-group">
          <input type="text" placeholder="Username" required />
        </div>
        <div class="input-group">
          <input type="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <button type="submit" class="register-button">Register</button>
        <div class="additional-links">
          <router-link to="/login">Already have an account? Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onRegister() {
      // Handle registration logic here
    },
  },
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

/* Register container */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Register card */
.register-card {
  background: #ffffff;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Title */
.register-title {
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
  padding: 10px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.input-group input:focus {
  border-color: #007bff;
}

/* Register button */
.register-button {
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

.register-button:hover {
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
}

.additional-links a:hover {
  text-decoration: underline;
}
</style>
