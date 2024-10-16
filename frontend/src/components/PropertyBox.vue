<template>
  <div class="property" v-if="property">
    <!-- Wrap the router-link around content except the save button -->
    <router-link :to="{ name: 'PropertyDetails', params: { id: property._id } }" class="property-link">
      <div
        class="property-top"
        :style="{ backgroundImage: `url(${property.images[0] || fallbackImage})` }"
      ></div>
      
      <div class="property-details">
        <h4>{{ property.title }}</h4>
        <div class="location">
          {{ property.location.address }}, {{ property.location.city }}, {{ property.location.state }}
        </div>
      </div>

      <div class="property-bottom">
        <span>{{ property.features.bedrooms }} Bed</span>
        <span>{{ property.features.bathrooms }} Bath</span>
        <span>${{ property.price.toLocaleString() }}</span>
      </div>
    </router-link>

    <!-- Save button outside of the router-link -->
    <button class="save-btn" @click="handleSaveClick">Save</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  property: {
    type: Object,
    required: true
  }
});

const fallbackImage = ref("../assets/images/room.jpg");

const handleSaveClick = () => {
  // Handle save button logic here (e.g., save to favorites, API call, etc.)
  console.log("Save button clicked");
};
</script>

<style>
.property {
  position: relative;
  background-color: rgb(206, 207, 209);
  width: 180px;
  border-radius: 10px;
  padding-bottom: 10px;
  height: 240px;
}

.property-top {
  width: 100%;
  height: 130px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.property-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.save-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: blue;
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 10px;
}

.property-details {
  padding: 10px;
}

h4 {
  margin: 8px 0px 2px 5px;
}

.location {
  font-size: 12px;
  color: grey;
  margin-left: 5px;
}

.property-bottom {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-weight: bold;
}
</style>
