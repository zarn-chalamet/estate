<script setup>
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';
import MainNav from '@/components/MainNav.vue';
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useSearchStore } from '@/stores/search';
import { useFilterByType } from '@/stores/filterByType';

const searchStore = useSearchStore();
const propertyStore = usePropertyStore();
const filterbyTypeStore = useFilterByType();

let properties = ref(null);
let filteredProperties = ref(null);

onMounted(async () => {
  // Fetch properties on mount
  properties.value = await propertyStore.getProperties();
  filteredProperties.value = properties.value; // Initialize filteredProperties
});

// Computed property to filter based on search and filter type
const computedFilteredProperties = computed(() => {
  if (!properties.value) return [];

  const query = searchStore.searchQuery.toLowerCase();
  const filterType = filterbyTypeStore.propertyType.toLowerCase();

  // Start with all properties
  let filtered = properties.value;

  // Filter by property type if selected
  if (filterType) {
    filtered = filtered.filter((property) => property.propertyType.toLowerCase() === filterType);
  }

  // Filter by search query (city) if provided
  if (query) {
    filtered = filtered.filter((property) =>
      property.location.city.toLowerCase().includes(query)
    );
  }
  console.log(filterType);
  console.log(query);
  console.log(filtered);

  return filtered;
});

// Watch the computedFilteredProperties to update filteredProperties
watch(computedFilteredProperties, (newValue) => {
  filteredProperties.value = newValue;
});

// Reset filteredProperties on unmount
onBeforeUnmount(() => {
  filteredProperties.value = properties.value; // Reset to original properties
});
</script>

<template>
  <div v-if="properties">
    <header>
      <MainNav></MainNav>
    </header>
    <h1>Properties</h1>
    <div class="rent-list">
      <!-- Use filteredProperties to loop through filtered results -->
      <div v-for="property in filteredProperties" :key="property._id">
        <PropertyBox :property="property" />
      </div>
    </div>
  </div>
</template>

<style>
/* Add any styles you need */
</style>
