<script setup>
import SearchTopic from '@/components/SearchTopic.vue'
import PropertyTypeBox from '@/components/PropertyTypeBox.vue'
import MissionTopic from '@/components/MissionTopic.vue'
import { onMounted, ref } from 'vue';
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';

let properties = ref(null);
const propertyStore = usePropertyStore();

onMounted( async() => {
  properties.value = await propertyStore.getProperties();
})


</script>

<template>
  <div>
    
    
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
        <div v-for="property in properties" :key="property._id">
      
      <PropertyBox :property="property"></PropertyBox>
    </div>
        
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
