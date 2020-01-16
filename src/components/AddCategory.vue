<template>
  <div class="addCat">
    <h4>Add category</h4>
    <form class="login-form" id="login-form">
      <div class="row">
        <div class="col-sm-4 addCatF1">
          Location of new category: <p>{{path}}</p>
          Name of new category: <input id="category" type="text" name="category" v-model="category">
          <br><br>
        </div>
        <div class="col-sm-8 addCatF2">
          <div class="row">
            <div class="col-sm-3 repeat" v-for="cat in categories" v-bind:key="cat.id">


              <input type="radio" v-if="cat.categoryName" class="radio-btn" name="choice" v-bind:id="cat.categoryName" v-model="subCategoryOf" v-bind:value="cat.categoryName"/>
              <label v-bind:for="cat.categoryName" v-if="cat.categoryName" class="label">{{cat.categoryName}}</label>


            <!--  <input  type="radio" name="subCategoryOf" v-if="cat.categoryName != null" v-model="subCategoryOf" v-bind:value="cat.categoryName">{{ cat.categoryName }}<br> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 addCatF1">
          <div id="submitNewCat-btn" class="btn btn-animation" name="submit-newCategory" @click="submitCategory()"><span>Add new Category</span></div><br>
        </div>
        <div class="col-sm-8">
          <div id="submitSuperCat-btn" class="btn btn-animation" name="submit-superCategory" @click="submitSuperCategory()"><span>Select supercategory</span></div>
          <div id="clearSuperCat-btn" class="btn btn-animation" name="reset-superCategory" @click="resetSuperCategory()"><span>Reset supercategory</span></div>
        </div>
      </div>


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
      path: "/",
      categories: this.$store.state.categories
    }
  },
  methods: {

    submitCategory(){
      this.$store.dispatch('createCategory', {category: this.category, subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      //this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
    },
    submitSuperCategory(){
      this.$store.dispatch('getCategoriesKey', {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
      this.path = this.path + this.subCategoryOf + "/"
    },
    resetSuperCategory(){
      while(this.$store.state.categories.length > 0) {this.$store.state.categories.pop()}
      this.path = "/"
      this.subCategoryOf = ""
      this.$store.state.superCategory = ""
      this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
    }
  },
  created: function (){
    this.$store.commit('closeNav')
    this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
  }
}

</script>
