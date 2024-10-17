<script setup>
import { usePropertyStore } from '@/stores/property';
import { ref } from 'vue';
import UploadPhotos from '@/components/UploadPhotos.vue';
import storeDataToDatabase from '@/composables/photoToDb';

  const propertyStore = usePropertyStore();

  let property = ref({
        title: '',
        description: '',
        price: 0,
        propertyType: 'apartment',
        status: 'available',
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          latitude: 0,
          longitude: 0,
        },
        features: {
          bedrooms: 1,
          bathrooms: 1,
          area: 0,
          parkingSpaces: 0,
          furnished: false,
          petsAllowed: false,
          yearBuilt: 2022,
        },
        amenities: [],
        images: [],
      },)
    const amenities = ['Swimming Pool', 'Gym', 'Garden', 'Parking', 'Elevator', 'Security'];


    let {uploadFile} = storeDataToDatabase();



    //upload photo

    let images = ref(null);

    let selectedImages = (selectedImages) => {
      images.value = selectedImages;
    }

    let submitProperty = async () => {
      try {
        property.value.images = [];
    
        // Upload each image and store the download URL
        for (let image of images.value) {
          let downloadUrl = await uploadFile(image.realFile); // Upload each image
          console.log(downloadUrl);
          property.value.images.push(downloadUrl); // Push the download URL into the images array
        }
        await propertyStore.createProperty(property.value);
        alert("created successfully!");
      } catch (error) {
        console.log(error);
      }
    }

    let toggleAmenity = (amenity) => {
      const index = property.value.amenities.indexOf(amenity);
      if (index > -1) {
        property.value.amenities.splice(index, 1);
      } else {
        property.value.amenities.push(amenity);
      }
    }

    
</script>

<template>
    <div class="create-property-form">
      <h2>Create Property</h2>
      <form @submit.prevent="submitProperty">
  
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
        <div v-for="(amenity, index) in amenities" :key="index">
          <input type="checkbox" :value="amenity" @change="toggleAmenity(amenity)" />
          <label>{{ amenity }}</label>
        </div>
  
        <!-- Property Images -->
        <h3>Images</h3>
        <UploadPhotos @selectedImages="selectedImages"></UploadPhotos>
  
        <!-- Submit Button -->
        <button type="submit">Create Property</button>
      </form>
    </div>
</template>

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