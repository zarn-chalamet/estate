<script setup>
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';
import MainNav from '@/components/MainNav.vue';
import { computed, onMounted, ref } from 'vue';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();
  let properties = ref(null);
  const propertyStore = usePropertyStore();
  onMounted(async() => {
    properties.value = await propertyStore.getProperties();
    console.log(searchStore.searchQuery)
  })

  const filteredProperties = computed(() => {
  const query = searchStore.searchQuery.toLowerCase();
  if (!query) return properties.value;
  return properties.value.filter((property) =>
    property.location.city.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div v-if="properties">
    <header>
        <MainNav></MainNav>
    </header>
    <h1>Properties</h1>
    <div class="rent-list">
      <div v-for="property in filteredProperties" :key="property._id">
        <PropertyBox :property="property"></PropertyBox>
      </div>
    </div>
    
  </div>
</template>

<style>

</style>