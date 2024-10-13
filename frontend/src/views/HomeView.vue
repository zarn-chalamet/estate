<script setup>
import SearchTopic from '@/components/SearchTopic.vue'
import PropertyTypeBox from '@/components/PropertyTypeBox.vue'
import MissionTopic from '@/components/MissionTopic.vue'
import PropertyBox from '@/components/PropertyBox.vue'
</script>

<template>
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
