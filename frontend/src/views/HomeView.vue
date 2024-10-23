<script setup>
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';
import MainNav from '@/components/MainNav.vue';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useSearchStore } from '@/stores/search';
import { useFilterByType } from '@/stores/filterByType';

const searchStore = useSearchStore();
const propertyStore = usePropertyStore();
const filterbyTypeStore = useFilterByType();

let properties = ref(null);
let filteredProperties = ref(null);

onMounted(async () => {
  properties.value = await propertyStore.getProperties();
  filteredProperties.value = properties.value;
});

const computedFilteredProperties = computed(() => {
  if (!properties.value) return [];

  const query = searchStore.searchQuery.toLowerCase();
  const filterType = filterbyTypeStore.propertyType.toLowerCase();

  let filtered = properties.value;

  if (query) {
    filtered = properties.value.filter((property) =>
      property.location.city.toLowerCase().includes(query)
    );
  }

  if (filterType) {
    filtered = filtered.filter((property) => property.propertyType.toLowerCase() === filterType);
  }

  return filtered;
});

watch(computedFilteredProperties, (newValue) => {
  filteredProperties.value = newValue;
});

const resetFilters = () => {
  // Clear search query and filter
  searchStore.searchQuery = '';
  filterbyTypeStore.propertyType = '';
  filteredProperties.value = properties.value;
};

onBeforeMount(() => {
  filteredProperties.value = properties.value;
});

</script>

<template>
  <div v-if="properties">
    <header>
      <MainNav @reset-filters="resetFilters"></MainNav>
    </header>
    <h1>Properties</h1>
    <div class="rent-list">
      <div v-for="property in filteredProperties" :key="property._id">
        <PropertyBox :property="property" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
