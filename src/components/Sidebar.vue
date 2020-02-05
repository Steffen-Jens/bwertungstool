<template>
  <div id="sidebar" class="sidebar">
    <div class="SNHeader">
      <br>
      <h4>Categories:
        <button  @click="closeNav" title="Close" class="mn-button sidebar-button close-btn">
          <a>
            <i class="fas fa-times icon"></i>
          </a>
        </button></h4>
      </div>
      <div class="sidebar-content">
        <div class="repeat" v-for="cat in categories" v-bind:key="cat.id">
          <input type="radio" v-if="cat.categoryName" class="radio-btn" name="choice" />
          <hr>
          <a class="link" @click="subCategoryOf=cat.categoryName; submitSuperCategory()" v-bind:for="cat.categoryName" v-if="cat.categoryName" v-bind:id="cat.categoryName"  v-bind:value="cat.categoryName">{{cat.categoryName}}</a>
        </div>
        <hr>
      </div>
    </div>
  </template>
  <script>
  export default {

    data: function(){
      return {
        newContent: '',
        isAdmin: this.$store.state.isAdmin,
        subCategoryOf: "",
        path: "",
        categories: this.$store.state.SNCategories,
      }
    },

    methods: {
      closeNav() {
        this.$store.commit('closeNav')
      },
      getCategories(){
        this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      },
      resetSuperCategory(){
        this.path = ""
        this.subCategoryOf = ""
        this.$store.state.superSNCategory = ""
        this.$store.dispatch("getSNCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      },
      submitSuperCategory(){
        /* eslint-disable no-console */
        console.log("SUBCATOF: " + this.subCategoryOf)
        this.$store.dispatch('getSNCategoriesKey', {folder: "/catregory", subCategoryOf: this.subCategoryOf, returnSecureToken: true})
        this.path = this.path + this.subCategoryOf + "/"
        this.subCategoryOf = ""
        console.log(this.categories)
        this.$router.push("/category/" + this.path.split("/").join("-"))
      },
    },

    created: function (){
      this.resetSuperCategory()
    }


  }
  </script>
