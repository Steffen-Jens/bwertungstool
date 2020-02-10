<template>
  <div id="app">
    <appNavbar :mainComponent="mainComponent" @changeMC="mainComponent=$event"/>
    <appSidebar :mainComponent="mainComponent" @changeMC="mainComponent=$event"/>
    <!--<component id="mainComponent" class="mainComponent" :is="mainComponent"></component>-->
    <router-view id="mainComponent" class="mainComponent" v-on:click.native="closeNav()"></router-view>


  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
/*import Home from './components/Home.vue';
import Login from './components/Login.vue';
import AddCategory from './components/AddCategory.vue';
import AddArticle from './components/AddArticle.vue';
*/

export default {
  name: 'app',
  components: {
    appNavbar: Navbar,
    appSidebar: Sidebar,
/*    appHome: Home,
    appLogin: Login,
    appAddCategory: AddCategory,
    appAddArticle: AddArticle
*/

  },
  data: function(){
    return{
      mainComponent: "appHome",
    }
  },
  methods: {
    closeNav(){
      this.$store.commit('closeNav')
    }
  },

}
</script>

<style type="css">

@import "css/main.css";

</style>
