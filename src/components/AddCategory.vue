<template>
  <div>
    <form class="login-form" id="login-form">
      Categoryname: <input id="category" type="text" name="category" v-model="category">
      <br>
      <ul>
        <li v-for="cat in categories" v-bind:key="cat.id">{{ cat.categoryName }}</li>
      </ul>
      <br>
      <input id="login-btn" class="submit btn" type="button" name="submit-login" value="Submit" @click="submitCategory()"><br>
    </form>
  </div>
</template>

<script>

//import axios from 'axios';

export default {
  data () {
    return {
      category: "",
      subCategoryOf: "",
      categories: this.$store.state.categories
    }
  },
  methods: {

    submitCategory(){

      this.$store.dispatch('createCategory', {category: this.category, subCategoryOf: this.subCategoryOf, returnSecureToken: true})

    },
  },
  created: function (){
    this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
  }
}

</script>
