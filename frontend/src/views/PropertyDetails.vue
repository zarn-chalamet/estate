<template>
  <div class="property-details-page" v-if="property">
    <h2>{{ property.title }}</h2>
    <div class="property-images">
      <img v-for="(image, index) in property.images" :key="index" :src="image" alt="Property Image" />
    </div>
    <div class="btn-section">
      <button @click="handleSaveClick" :class="{liked: isLiked}">
        <i class="material-icons-outlined">
          favorite
        </i>
      </button>
      <button @click="showShareModal= true">
        <i class="material-icons-outlined">
          share
        </i>
      </button>
      <button @click="showRequestTourModal = true">
        Request a tour
      </button>
    </div>

    <div class="modal" v-if="showShareModal">
      <div class="modal-content">
        <span class="close" @click="showShareModal = false">&times;</span>
        <h3>Share this property</h3>
        <p>Link: <a :href="propertyLink" target="_blank">{{ propertyLink }}</a></p>
        <button @click="copyLink">Copy Link</button>
      </div>
    </div>

    <div class="modal" v-if="showRequestTourModal">
      <div class="modal-content">
        <span class="close" @click="showRequestTourModal = false">&times;</span>
        <h3>Request a Tour</h3>
        <form @submit.prevent="submitRequest">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="tourRequest.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="tourRequest.email" required />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" v-model="tourRequest.phone" required />
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </div>
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
        <div class="comments-header">
          <h3>Comments</h3>
        </div>
        <div class="comments-list">
          <ul>
            <li v-for="comment in property.comments" :key="comment._id" class="comment-item">
              <div class="comment-user">
                <strong>{{ userNamesMap[comment.userId]?.username || 'Unknown User' }}:</strong>
              </div>
              <div class="comment-text">{{ comment.comment }}</div>
            </li>
          </ul>
        </div>
        <div class="input-box">
          <input type="text" v-model="newComment" placeholder="Write a comment" />
          <button @click="addComment">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLogin } from '@/composables/IsLogin';
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
    let isLiked = ref(false);
    let showShareModal = ref(false);
    let showRequestTourModal = ref(false);
    const propertyLink = `http://localhost:5173/properties/${props.id}`;

    const tourRequest = ref({
      name: '',
      email: '',
      phone: '',
    });

    onMounted(async () => {
      const user = await isLogin();
      console.log(user);
      property.value = await propertyStore.getProperty(props.id);
      console.log(property.value);

      const userIdSet = new Set(property.value.comments.map(comment => comment.userId));
      console.log(userIdSet)
      for(const userId of userIdSet){
        console.log(userId)
        userNamesMap.value[userId] = await authStore.getUserById(userId)
      }

      if(property.value.likes.some(like => like.userId === user._id)){
        isLiked.value = true;
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

    const handleSaveClick = async () => {
      try {
        await propertyStore.toggleLike(property.value._id);
        isLiked.value = !isLiked.value;
      } catch (error) {
        console.error('Error liking property:', error.message);
      }
    };

    const copyLink = () => {
      navigator.clipboard.writeText(propertyLink).then(()=>{
        alert("Link copied to clipboard!");
      })
    }

    const submitRequest = () => {
      // Here, you would handle the form submission logic
      // console.log('Tour request submitted:', tourRequest.value);
      
      // // Clear the form after submission
      // tourRequest.value = { name: '', email: '', phone: '' };
      // showRequestTourModal.value = false; // Close the modal
      alert('Your request has been submitted!'); // Optional alert for user feedback
    };

    return { property, newComment,addComment, userNamesMap, isLiked, handleSaveClick,propertyLink,showShareModal, copyLink,tourRequest, showRequestTourModal, submitRequest };
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
.btn-section{
  margin-right: 0px;
  margin-left: 80%;
}

.btn-section button{
  border: 0.5px solid grey;
  background-color: transparent;
  padding: 8px;
  margin-right: 4px;
  border-radius: 3px;
}
.btn-section button :hover{
  color: rgb(152, 207, 232);
}
.liked{
  color: red;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.section2 {
  min-width: 300px;
  max-width: 600px;
  margin-left: 20px; /* Optional: Adjust margin as needed */
}

.comments-header {
  margin-bottom: 15px;
}

.comments-list {
  max-height: 300px; /* Set a max height for the comments list */
  overflow-y: auto; /* Enable scrolling if the content exceeds max height */
  margin-bottom: 20px;
  border: 1px solid #ddd; /* Add border for the comments section */
  border-radius: 8px;
  background-color: #f9f9f9; /* Light background for comments */
  padding: 10px;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #eee; /* Separator between comments */
}

.comment-item:last-child {
  border-bottom: none; /* Remove the bottom border for the last comment */
}

.comment-user {
  font-weight: bold;
  color: #333; /* Darker color for the user name */
}

.comment-text {
  margin-top: 5px;
  color: #555; /* Softer color for the comment text */
}

.input-box {
  display: flex;
  justify-content: space-between;
}

input {
  padding: 10px;
  border: 1px solid rgb(174, 183, 185);
  border-radius: 5px;
  width: 80%; /* Adjust input width */
}

input::placeholder {
  color: #aaa; /* Lighter color for the placeholder */
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
