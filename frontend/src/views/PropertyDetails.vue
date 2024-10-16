<template>
  <div class="property-details-page" v-if="property">
    <h2>{{ property.title }}</h2>
    <div class="property-images">
      <img v-for="(image, index) in property.images" :key="index" :src="image" alt="Property Image" />
    </div>

    <div class="property-info">
      <p><strong>Price:</strong> ${{ property.price.toLocaleString() }}</p>
      <p><strong>Location:</strong> {{ property.location.address }}, {{ property.location.city }}, {{ property.location.state }}, {{ property.location.country }} - {{ property.location.postalCode }}</p>
      <p><strong>Status:</strong> {{ property.status }}</p>
      <p><strong>Property Type:</strong> {{ property.propertyType }}</p>
    </div>

    <div class="property-features">
      <h3>Features</h3>
      <ul>
        <li><strong>Bedrooms:</strong> {{ property.features.bedrooms }}</li>
        <li><strong>Bathrooms:</strong> {{ property.features.bathrooms }}</li>
        <li><strong>Area:</strong> {{ property.features.area }} sqft</li>
        <li><strong>Furnished:</strong> {{ property.features.furnished ? 'Yes' : 'No' }}</li>
        <li><strong>Year Built:</strong> {{ property.features.yearBuilt }}</li>
        <li><strong>Parking Spaces:</strong> {{ property.features.parkingSpaces }}</li>
        <li><strong>Pets Allowed:</strong> {{ property.features.petsAllowed ? 'Yes' : 'No' }}</li>
      </ul>
    </div>

    <div class="property-description">
      <h3>Description</h3>
      <p>{{ property.description }}</p>
    </div>

    <div class="property-amenities">
      <h3>Amenities</h3>
      <ul>
        <li v-for="(amenity, index) in property.amenities" :key="index">{{ amenity }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { usePropertyStore } from '@/stores/property';
import { onMounted, ref } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    let property = ref(null);
    const propertyStore = usePropertyStore();

    onMounted(async () => {
      property.value = await propertyStore.getProperty(props.id);
      console.log(property.value);
    });

    return { property };
  }
};
</script>

<style scoped>
.property-details-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.property-images {
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
}

.property-images img {
  width: 250px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 8px;
}

.property-info,
.property-features,
.property-description,
.property-amenities {
  margin-bottom: 20px;
}

h2 {
  text-align: center;
}

h3 {
  margin-bottom: 10px;
  color: #333;
}

p {
  margin: 5px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
