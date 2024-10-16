<script setup>
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';
import MainNav from '@/components/MainNav.vue';
import { onMounted, ref } from 'vue';

  let properties = ref(null);
  const propertyStore = usePropertyStore();
  onMounted(async() => {
    properties.value = await propertyStore.getProperties();
  })
</script>

<template>
  <div v-if="properties">
    <header>
        <MainNav></MainNav>
    </header>
    <h1>Properties</h1>
    <div class="rent-list">
      <div v-for="property in properties" :key="property._id">
        <PropertyBox :property="property"></PropertyBox>
      </div>
    </div>
    
  </div>
</template>

<style>

</style>