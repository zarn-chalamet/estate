<template>
  <nav class="navbar">
    <div>
      <h3 class="logo">ESTATE</h3>
    </div>
    <SearchFunction></SearchFunction>
    <div class="nav-icons">
      <router-link :to="user ? {name:'Profile'} : {name:'Login'}">
        <button class="icon-button" title="Profile">
        <i class="material-icons-outlined">account_circle</i>
      </button>
      </router-link>
      <router-link :to="user ? {name:'WishList'} : {name:'Login'}">
        <button class="icon-button" title="Favorites">
          <i class="material-icons-outlined">
            favorite
          </i>
        </button>
      </router-link>
      <button class="icon-button" title="Cart">
        <i class="material-icons-outlined">shopping_cart</i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import SearchFunction from './SearchFunction.vue'
import { onMounted, ref } from 'vue';
import { isLogin } from '@/composables/IsLogin';
let user = ref(null);
onMounted(async () => {
  user.value = await isLogin();
})
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: Arial, sans-serif;
  margin: 0px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.nav-icons {
  display: flex;
  gap: 15px;
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-button i {
  font-size: 32px;
  color: #555;
  transition: color 0.2s ease;
}

.icon-button:hover i {
  color: #007bff;
}

.icon-button:focus {
  outline: none;
  transform: scale(1.1);
}
</style>
