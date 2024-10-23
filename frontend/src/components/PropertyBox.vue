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

        <div class="label">
            <i class="material-icons-outlined">
              bed
            </i>
            <span>
              {{ property.features.bedrooms }}
            </span>
        </div>

        <div class="label">
            <i class="material-icons-outlined">
              bathroom
            </i>
            <span>
              {{ property.features.bathrooms }}
            </span>          
        </div>
        
        <span>฿{{ property.price.toLocaleString() }}</span>
      </div>
    </router-link>

    <!-- Save button outside of the router-link -->
    <div v-if="owner">
      <button class="save-btn" @click="showModals = !showModals">
        <i class="material-icons-outlined">
          more_vert
        </i>
      </button>
      <div v-if="showModals" class="modal-container">
        <div class="modal">
          <router-link :to="{ name: 'UpdateProperty', params: { id: property._id } }">
            <button>Update</button>
          </router-link>
        </div>
        <div class="modal">
          <button @click="deletePropertyBox">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      <button class="save-btn" @click="handleSaveClick" :class="{liked: isLiked}">
        <i class="material-icons-outlined">
          favorite
        </i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { isLogin } from '@/composables/IsLogin';
import router from '@/router';
import { usePropertyStore } from '@/stores/property';
import { onMounted, ref } from 'vue';

const props = defineProps({
  property: {
    type: Object,
    required: true
  },
  owner:{
    type: Boolean,
    required: true
  }
});


const emit = defineEmits(['updatedProperty','deletedProperty']);

let user = ref(null);
let isLiked = ref(false);
let showModals = ref(false);
const propertyStore = usePropertyStore();

onMounted( async () => {
  user.value = await isLogin();
  console.log(props.property.likes);
  console.log(user.value)
  
  //for isLiked value
  if(props.property.likes.some(like => like.userId === user.value._id)){
    console.log("user has already like this blog");
    isLiked.value = true;
  }

  console.log(isLiked.value)
})

const fallbackImage = ref("../assets/images/room.jpg");

const handleSaveClick = async () => {
  try {
    await propertyStore.toggleLike(props.property._id);
    isLiked.value = !isLiked.value;

    emit('updatedProperty',props.property);
    
  } catch (error) {
    console.error('Error liking property:', error.message);
  }
};

const deletePropertyBox = async () => {
  await propertyStore.deleteProperty(props.property._id);
  router.push('/profile');
  emit('deletedProperty',props.property._id);
}
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
  padding: 0px;
}

.save-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.save-btn.liked{
  color: yellow;
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

.label {
  display: flex;
  align-items: center;
  font-size: 12px; /* Smaller text size */
}

.label i {
  font-size: 18px; /* Adjust icon size */
  margin-right: 3px; /* Space between icon and number */
}


.modal-container {
  position: absolute;
  top: 20px;
  right: -70px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.modal:last-child {
  border-bottom: none; /* Remove border for last item */
}
a{
  background-color: transparent;
}
</style>
