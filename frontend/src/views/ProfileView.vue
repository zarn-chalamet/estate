<template>
  <div>
    <header>
      <MainNav></MainNav>
    </header>
    <div v-if=user>
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      <router-link to="/create-property">
        <button>Create Property</button>
      </router-link>
      <button @click="logout">Logout</button>
    </div>
    <div>
      <h4>My Properties</h4>
      <div v-for="property in propertiesByCurrentUser" :key="property._id">
        <PropertyBox :property="property" :owner="owner"
        @deletedProperty="removeProperty"></PropertyBox>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainNav from '@/components/MainNav.vue';
import { isLogin } from '@/composables/IsLogin';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import PropertyBox from '@/components/PropertyBox.vue';
import { onMounted, ref} from 'vue';
import { usePropertyStore } from '@/stores/property';

    let user = ref(null);
    let owner = ref(true);
    let propertiesByCurrentUser = ref(null);
    const authStore = useAuthStore();
    const propertyStore = usePropertyStore();
    onMounted(async () => {
        user.value = await isLogin();
        console.log(typeof(user.value._id));

        const properties = await propertyStore.getProperties();
        propertiesByCurrentUser.value = properties.filter((property) => {
          return property.agentId === user.value._id;
        })
    })
    let logout = async () => {
        await authStore.logout();
        user.value = null;
        router.push("/login");
    }

    let removeProperty = (deletedPropertyId) => {
      propertiesByCurrentUser.value = propertiesByCurrentUser.value.filter(property => property._id != deletedPropertyId)
    }
    
</script>

<style>

</style>