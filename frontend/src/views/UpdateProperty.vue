<template>
    <div class="create-property-form" v-if="property">
      <h2>Create Property</h2>
      <form @submit.prevent="updateProperty">
  
        <!-- Property Details -->
        <div>
          <label for="title">Title</label>
          <input type="text" v-model="property.title" required />
        </div>
  
        <div>
          <label for="description">Description</label>
          <textarea v-model="property.description" required></textarea>
        </div>
  
        <div>
          <label for="price">Price</label>
          <input type="number" v-model="property.price" required />
        </div>
  
        <div>
          <label for="propertyType">Property Type</label>
          <select v-model="property.propertyType" required>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label for="status">Status</label>
          <select v-model="property.status" required>
            <option value="available">available</option>
            <option value="sold">sold</option>
            <option value="pending">pending</option>
          </select>
        </div>
  
        <!-- Property Location -->
        <h3>Location</h3>
        <div>
          <label for="address">Address</label>
          <input type="text" v-model="property.location.address" required />
        </div>
        
        <div>
          <label for="city">City</label>
          <input type="text" v-model="property.location.city" required />
        </div>
        
        <div>
          <label for="state">State</label>
          <input type="text" v-model="property.location.state" required />
        </div>
        
        <div>
          <label for="postalCode">Postal Code</label>
          <input type="text" v-model="property.location.postalCode" required />
        </div>
        
        <div>
          <label for="country">Country</label>
          <input type="text" v-model="property.location.country" required />
        </div>
  
        <div>
          <label for="latitude">Latitude</label>
          <input type="number" v-model="property.location.latitude" required />
        </div>
        
        <div>
          <label for="longitude">Longitude</label>
          <input type="number" v-model="property.location.longitude" required />
        </div>
  
        <!-- Property Features -->
        <h3>Features</h3>
        <div>
          <label for="bedrooms">Bedrooms</label>
          <input type="number" v-model="property.features.bedrooms" required />
        </div>
        
        <div>
          <label for="bathrooms">Bathrooms</label>
          <input type="number" v-model="property.features.bathrooms" required />
        </div>
        
        <div>
          <label for="area">Area (sq ft)</label>
          <input type="number" v-model="property.features.area" required />
        </div>
        
        <div>
          <label for="parkingSpaces">parkingSpaces</label>
          <input type="number" v-model="property.features.parkingSpaces" required />
        </div>
  
        <div>
          <label for="furnished">Furnished</label>
          <input type="checkbox" v-model="property.features.furnished" />
        </div>

        <div>
          <label for="petsAllowed">Pets Allowed</label>
          <input type="checkbox" v-model="property.features.petsAllowed" />
        </div>
  
        <div>
          <label for="yearBuilt">Year Built</label>
          <input type="number" v-model="property.features.yearBuilt" />
        </div>
  
        <!-- Property Amenities -->
        <h3>Amenities</h3>
        <div v-for="(amenity, index) in availableAmenities" :key="index">
          <input 
            type="checkbox"
            :value="amenity" 
            v-model="property.amenities" />
          <label>{{ amenity }}</label>
        </div>
  
        <!-- Property Images -->
        <!-- <h3>Images</h3>
        <UploadPhotos @selectedImages="selectedImages"></UploadPhotos> -->
  
        <!-- Submit Button -->
        <button type="submit">Update Property</button>
      </form>
    </div>
</template>

<script>
import router from '@/router';
import { usePropertyStore } from '@/stores/property';
import { ref } from 'vue';
import { onMounted } from 'vue';

export default {
    props: ['id'],
    setup(props){

        const availableAmenities = ['Swimming Pool', 'Gym', 'Garden', 'Parking', 'Elevator', 'Security'];

        let property = ref(null);
        const propertyStore = usePropertyStore();

        onMounted(async () =>{
            property.value = await propertyStore.getProperty(props.id);
        })

        let updateProperty = async () => {
            console.log(property.value)
            await propertyStore.updateProperty(props.id,property.value)
            alert("updated properly!");
            router.push("/home");
        }
        return { property, availableAmenities, updateProperty }
    }
}
</script>

<style>
.create-property-form {
  max-width: 600px;
  margin: auto;
}
.create-property-form h2, h3 {
  text-align: center;
}
.create-property-form label {
  display: block;
  margin: 5px 0;
}
.create-property-form input,
.create-property-form select,
.create-property-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.create-property-form button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.create-property-form button:hover {
  background-color: #0056b3;
}
</style>