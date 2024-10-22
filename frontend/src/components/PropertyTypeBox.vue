<template>
  
    <div @click="goToHome" class="property-box" :style="{ backgroundImage: `url(${propertyType.imgUrl})` }">
      <div class="property-info">
        <h4>{{propertyType.type}}</h4>
        <p>{{propertyType.description}}</p>
      </div>
    </div>

</template>

<script>
import { useFilterByType } from '@/stores/filterByType';
import { useRouter } from 'vue-router';

export default{
  props: ['propertyType'],
  setup(props){
    const router = useRouter();
    const filterTypeStore = useFilterByType();
    const goToHome = () => {
      filterTypeStore.setPropertyType(props.propertyType.key);
      router.push("/home");
    }
    return { goToHome };
  }
}
</script>

<style scoped>
.property-box {
  width: 200px;
  height: 280px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.property-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  color: #fff;
  padding: 10px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.property-box:hover .property-info {
  opacity: 1; /* Fade in text on hover */
}

h4 {
  font-size: 18px;
  margin: 0 0 5px 0;
}

p {
  font-size: 14px;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .property-box {
    width: 150px;
    height: 220px;
  }

  h4 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
}
</style>
