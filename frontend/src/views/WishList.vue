<script setup>
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';
import MainNav from '@/components/MainNav.vue';
import { onMounted, ref } from 'vue';
import { isLogin } from '@/composables/IsLogin';

let user = ref(null);
  let wishListsProperties = ref([]);
  const propertyStore = usePropertyStore();
  onMounted(async() => {
    //get user
    user.value = await isLogin();
    const properties = await propertyStore.getProperties();
    properties.filter((property) => {
      if(property.likes.some(like => like.userId === user.value._id)){
        wishListsProperties.value.push(property);
      }
    })
    
  });

  const updatedProperty = (property) => {
    console.log(property);
    wishListsProperties.value = wishListsProperties.value.filter(p => p._id !== property._id);
  }
</script>

<template>
  <div v-if="wishListsProperties">
    <header>
        <MainNav></MainNav>
    </header>
    <h1>Properties</h1>
    <div class="rent-list">
      <div v-for="property in wishListsProperties" :key="property._id">
        <PropertyBox :property="property"
        @updatedProperty="updatedProperty"
        ></PropertyBox>
      </div>
    </div>
    
  </div>
</template>

<style>

</style>