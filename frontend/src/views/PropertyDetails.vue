<template>
  <div class="property-details-page" v-if="property">
    <h2>{{ property.title }}</h2>
    <div class="property-images">
      <img v-for="(image, index) in property.images" :key="index" :src="image" alt="Property Image" />
    </div>

    <div class="section">
      <div class="section1">
        <div class="property-info">
          <div>
            <strong>Price:</strong>
            ${{ property.price.toLocaleString() }}
          </div>
          <div>
            <strong>Location:</strong> {{ property.location.address }}, {{ property.location.city }}, {{ property.location.state }}, {{ property.location.country }} - {{ property.location.postalCode }}
          </div>
          <div>
            <strong>Status:</strong> 
            {{ property.status }}
          </div>
          <div>
            <strong>Property Type:</strong> 
            {{ property.propertyType }}
          </div>
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
          <span v-for="(amenity, index) in property.amenities" :key="index">
            <span class="amenity-sg">{{ amenity }}</span>
          </span>
        </div>
      </div>
      <div class="section2">
        <div v-if="property.comments">
          <ul>
            <li v-for="comment in property.comments" :key="comment._id">
              <strong>{{ userNamesMap[comment.userId]?.username || 'Unknown User' }}:</strong> {{ comment.comment }}
            </li>
          </ul>
        </div>
        <div class="input-box">
          <input type="text" v-model="newComment" placeholder="Write a comment">
          <button @click="addComment">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { usePropertyStore } from '@/stores/property';
import { onMounted, ref } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    let property = ref(null);
    const propertyStore = usePropertyStore();
    let newComment = ref(null);
    const userNamesMap = ref({});
    const authStore = useAuthStore();

    onMounted(async () => {
      property.value = await propertyStore.getProperty(props.id);
      console.log(property.value);

      const userIdSet = new Set(property.value.comments.map(comment => comment.userId));
      console.log(userIdSet)
      for(const userId of userIdSet){
        console.log(userId)
        userNamesMap.value[userId] = await authStore.getUserById(userId)
      }
    });

    const addComment = async () => {
      if (!newComment.value.trim()) return;

      try {
        const newAddedComment = await propertyStore.addComment(props.id, newComment.value);
        newComment.value = '';
        console.log(newAddedComment.comments)
        property.value.comments = newAddedComment.comments
      } catch (error) {
        console.error('Error adding comment:', error.message);
      }
    }

    return { property, newComment,addComment, userNamesMap };
  }
};
</script>

<style scoped>
.property-details-page {
  max-width: 90%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.property-images {
  display: flex;
  overflow-x: auto;
  margin-bottom: 30px;
}

.property-images img {
  width: 350px;
  height: 250px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 8px;
}

.property-info{
  margin-bottom: 25px;
  
}
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


.amenity-sg{
  background-color: rgb(162, 238, 162);
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
}

.section{
  display: flex;
  justify-content: space-between;
}

.section1{
  max-width: 800px;
}
.section2{
  min-width: 200px;
  max-width: 600px;
}

input{
  padding: 10px;
  border-color: rgb(174, 183, 185);
  border-radius: 5px;
  width: 100%;
}

</style>
