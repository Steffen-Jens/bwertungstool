<template>
  <div id="app">
    <appNavbar :mainComponent="mainComponent" @changeMC="mainComponent=$event"/>
    <component id="mainComponent" class="mainComponent" :is="mainComponent"></component>
    <appSidebar/>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import Sidebar from './components/Sidebar.vue';
import Login from './components/Login.vue';


export default {
  name: 'app',
  components: {
    appNavbar: Navbar,
    appHome: Home,
    appSidebar: Sidebar,
    appLogin: Login,

  },
  data: function(){
    return{
      mainComponent: "appHome"
    }
  }
}
</script>

<style type="scss">

@import "css/main.css";

</style>
