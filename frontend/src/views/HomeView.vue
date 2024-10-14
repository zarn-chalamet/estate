<script setup>
import SearchTopic from '@/components/SearchTopic.vue'
import PropertyTypeBox from '@/components/PropertyTypeBox.vue'
import MissionTopic from '@/components/MissionTopic.vue'
import PropertyBox from '@/components/PropertyBox.vue'
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { usePropertyStore } from '@/stores/property';
const authStore = useAuthStore();
let user = ref(null);
let properties = ref(null);
const propertyStore = usePropertyStore();

onMounted( async() => {
  await authStore.getUser();
        user.value = authStore.userDetail;
  properties.value = await propertyStore.getProperties();
})

let logout = async () => {
        await authStore.logout();
        user.value = {};
}
</script>

<template>
  <div>
    <div v-if="user && Object.keys(user).length > 0">
      <h3>Home</h3>
      <p>{{ properties }}</p>
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      <button @click="logout">Logout</button>
    </div>
    <SearchTopic></SearchTopic>
    <div class="properties">
      <h2>Explore Our Properties</h2>
      <p>Lorem ipsum dolor sit amet</p>
      <div class="property-list">
        <PropertyTypeBox></PropertyTypeBox>
        <PropertyTypeBox></PropertyTypeBox>
        <PropertyTypeBox></PropertyTypeBox>
        <PropertyTypeBox></PropertyTypeBox>
        <PropertyTypeBox></PropertyTypeBox>
      </div>
    </div>
    <MissionTopic></MissionTopic>
    <div>
      <h3>Recent Properties for Rent</h3>
      <p>Lorem ipsum dolor sit amet</p>
      <div class="rent-list">
        <PropertyBox></PropertyBox>
        <PropertyBox></PropertyBox>
        <PropertyBox></PropertyBox>
        <PropertyBox></PropertyBox>
      </div>
    </div>
  </div>
</template>

<style>
.properties {
  margin-top: 50px;
  text-align: center;
}

.property-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .property-list {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .property-list {
    gap: 10px;
  }
}

.rent-list {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
h3,
p {
  text-align: center;
}
</style>
