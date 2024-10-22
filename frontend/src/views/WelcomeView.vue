<script setup>
import SearchTopic from '@/components/SearchTopic.vue'
import PropertyTypeBox from '@/components/PropertyTypeBox.vue'
import MissionTopic from '@/components/MissionTopic.vue'
import { onMounted, ref } from 'vue';
import { usePropertyStore } from '@/stores/property';
import PropertyBox from '@/components/PropertyBox.vue';

let properties = ref(null);
const propertyStore = usePropertyStore();
const propertyTypes = [
  {
    type: 'Dormitories',
    description: 'Student dormitories with shared rooms and communal facilities',
    key:'dormitory',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/storage-4-myprojects.appspot.com/o/uploads%2Festate%2Fapart.jpg?alt=media&token=37782d38-fa55-4dcf-af1e-2e6cc4016824'
  },
  {
    type: 'Apartments',
    description: 'Regular apartments that students can rent individually or with roommates',
    key:'apartment',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/storage-4-myprojects.appspot.com/o/uploads%2Festate%2Fapartment1.jpg?alt=media&token=727b531b-749c-40a5-9056-72b71125ee29'
  },
  {
    type: '2 Storey Houses',
    description: 'Local houses that students can rent individually or with roommates',
    key: 'house',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/storage-4-myprojects.appspot.com/o/uploads%2Festate%2Fapartment1.jpg?alt=media&token=727b531b-749c-40a5-9056-72b71125ee29',
  },
  {
    type: 'Bangalo',
    description: 'Regular houses that students can rent individually or with roommates',
    key: 'bangalo',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/storage-4-myprojects.appspot.com/o/uploads%2Festate%2Fbangalo.jpg?alt=media&token=9e1ece56-ea3a-4dc0-af56-c2b56b38a025'
  },
  {
    type: 'Homestays',
    description: 'Living with a host family, often for international students',
    key: 'homestay',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/storage-4-myprojects.appspot.com/o/uploads%2Festate%2Fapartment1.jpg?alt=media&token=727b531b-749c-40a5-9056-72b71125ee29'
  }
]

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
        <div v-for="type in propertyTypes" :key="type.type">
        <PropertyTypeBox :propertyType="type"></PropertyTypeBox>
      </div>
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
