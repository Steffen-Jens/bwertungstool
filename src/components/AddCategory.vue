<template>
  <div class="addCat">
    <br>
    <div v-if="this.$store.state.isAdmin == true" @submit.prevent>
    <form class="login-form" id="login-form">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-3 addCatF1">
          <h4>Add category</h4>
          Location of the new category: <p>{{path}}</p>
          Name of the new category: <input id="category" @keyup.enter="submitCategory()" type="text" v-model="category">
          <br><br>
        </div>
        <div class="col-sm-7 addCatF2">
          <br>
          <div class="row">
            <div class="col-sm-4 repeat" v-for="cat in categories" v-bind:key="cat.id">
              <hr>
              <a class="link" @click="subCategoryOf=cat.categoryName; submitSuperCategory()" v-bind:for="cat.categoryName" v-if="cat.categoryName" v-bind:id="cat.categoryName"  v-bind:value="cat.categoryName">{{cat.categoryName}}</a>
            </div>
            <hr>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-3 addCatF1">
          <div class="button-container">
            <span class="mas">Add</span>
            <button id='work' type="button" name="Hover" @click="submitCategory()">Add new Category</button>
          </div>
        </div>
        <div class="col-sm-7">
          <div class="button-container">
            <span class="mas">Reset</span>
            <button id='work' type="button" name="Hover" @click="resetSuperCategory()">Reset root category</button>
          </div>
          <br><br>
          <div id="error">{{errorMessageF2}}</div>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </form>
  </div>
  <div class="needLogin" v-if="this.$store.state.isAdmin != true">
      <div class="innerNeedLogin">
        <h4>You have to be signed in as an admin to add categories.</h4>
        <router-link to="/login">
          <div class="button-container">
            <span class="mas">Log in</span>
            <button id='work' type="button" name="Hover">Log in</button>
          </div>
        </router-link>
    </div>
  </div>
</div>
</template>

<script>

//import axios from 'axios';

export default {
  data () {
    return {
      category: "",
      subCategoryOf: "",
      path: "/",
      categories: this.$store.state.categories,
      errorMessageF2: ""
    }
  },
  methods: {

    submitCategory(){
      this.$store.dispatch('createCategory', {category: this.category, subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      this.errorMessageF2 = ""
      //this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
    },
    submitSuperCategory(){
      if (this.subCategoryOf != "") {
      this.$store.dispatch('getCategoriesKey', {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      this.path = this.path + this.subCategoryOf + "/"
      this.subCategoryOf = ""
      this.errorMessageF2 = ""
    } else {
      this.errorMessageF2 = "You have to select a root category."
    }
    },
    resetSuperCategory(){
      while(this.$store.state.categories.length > 0) {this.$store.state.categories.pop()}
      this.path = "/"
      this.subCategoryOf = ""
      this.$store.state.superCategory = ""
      this.errorMessageF2 = ""
      this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
    }
  },
  created: function (){
    this.resetSuperCategory()
    this.$store.commit('closeNav')
  }
}

</script>
