<template>
  <div class="search-div">
    <div class="profile-icon-container">
      <router-link :to="user ? {name:'Profile'} : {name:'Login'}">
        
        <i class="material-icons-outlined">account_circle</i>
     
      </router-link>
    </div>
    <div class="content-wrapper">
      <h1>The #1 site real estate professionals trust*</h1>
      <h5>From as low as $10 per day with limited time offer discounts.</h5>
      <div class="search">
        <SearchBox></SearchBox>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import SearchBox from './SearchBox.vue'
import { isLogin } from '@/composables/IsLogin';
let user = ref(null);
onMounted(async () => {
  user.value = await isLogin();
})
</script>

<style scoped>
.search-div {
  background: url('../assets/images/background.png');
  width: 100%;
  height: 700px; /* Use relative height */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.profile-icon-container {
  position: absolute; /* Position it absolutely within the search-div */
  top: 20px; /* Distance from the top */
  right: 20px; /* Distance from the right */
  z-index: 10; /* Ensures it stays on top */
}
.profile-icon-container a{
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: grey;
}

.profile-icon-container i{
  font-size: 40px;
}

.content-wrapper {
  text-align: center;
  color: black;
  background-color: transparent;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%; /* Ensure it doesn't exceed the screen width on small devices */
}

h1 {
  font-size: 2.5vw; /* Use viewport width for scaling */
  margin-bottom: 10px;
}

h5 {
  font-size: 1.5vw; /* Use viewport width for scaling */
  margin-bottom: 20px;
}

/* Media Queries for smaller devices */
@media (max-width: 1024px) {
  h1 {
    font-size: 4vw; /* Larger font size for smaller screens */
  }
  h5 {
    font-size: 2.5vw; /* Larger font size for smaller screens */
  }
}

@media (max-width: 768px) {
  .search-div {
    height: 700px; /* Adjust the height for smaller screens */
  }

  h1 {
    font-size: 4vw; /* Scale up the title */
  }

  h5 {
    font-size: 2vw; /* Scale up the subtitle */
  }
}

@media (max-width: 480px) {
  .search-div {
    height: 850px;
  }

  h1 {
    font-size: 6vw;
  }

  h5 {
    font-size: 3vw;
  }

  .content-wrapper {
    padding: 10px;
  }
}
</style>
