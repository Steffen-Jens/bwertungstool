<template>
  <div class="addCat">


    <form class="login-form" id="login-form">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-3 addCatF1">
              <h4>Choose category</h4>
          Category of the article: <p>{{path}}</p>
          <br><br>
        </div>
        <div class="col-sm-7 addCatF2">
          <br>
          <div class="row">
            <div class="col-sm-3 repeat" v-for="cat in categories" v-bind:key="cat.id">
              <input type="radio" v-if="cat.categoryName" class="radio-btn" name="choice" v-bind:id="cat.categoryName" v-model="subCategoryOf" v-bind:value="cat.categoryName"/>
              <label v-bind:for="cat.categoryName" v-if="cat.categoryName" class="label">{{cat.categoryName}}</label>


              <!--  <input  type="radio" name="subCategoryOf" v-if="cat.categoryName != null" v-model="subCategoryOf" v-bind:value="cat.categoryName">{{ cat.categoryName }}<br> -->
            </div>
          </div>
        </div>
        <div class="col-sm-1"></div>
      </div>
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-3 addCatF1">
          <div id="submitNewCat-btn" class="btn btn-animation" name="submit-newCategory" @click="submitCategory()"><span>Next</span></div><br>
        </div>
        <div class="col-sm-7">
          <div id="submitSuperCat-btn" class="btn btn-animation" name="submit-superCategory" @click="submitSuperCategory()"><span>Submit root category</span></div>
          <div id="clearSuperCat-btn" class="btn btn-animation" name="reset-superCategory" @click="resetSuperCategory()"><span>Reset root category</span></div>
          <br><br>
          <div id="error">{{errorMessageF2}}</div>
        </div>
        <div class="col-sm-1"></div>
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
      categories: this.$store.state.categories,
      errorMessageF2: ""
    }
  },
  methods: {

    submitCategory(){
      this.$emit('changeC', "appAddArticleInformation");
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
    this.$store.commit('closeNav')
    this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
  }
}

</script>
