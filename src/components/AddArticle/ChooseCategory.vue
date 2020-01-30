<template>
  <div class="addCat">


    <form class="login-form" id="login-form">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-3 addCatF1">
          <h4>Choose category</h4>
          Category of the item: <p>{{path}}</p>
          <br>
          Display this item on the homepage.
          <div class="center">
            <label class="label">
              <input  class="label__checkbox" type="checkbox" v-model="showOnMainpage"/>
              <span class="label__text">
                <span class="label__check">
                  <i class="fa fa-check icon"></i>
                </span>
              </span>
            </label>
          </div>
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
          <div class="button-container">
            <span class="mas">Next</span>
            <button id='work' type="button" name="Hover" @click="submitCategory()">Next</button>
          </div>
        </div>
        <div class="col-sm-7">
          <div class="button-container">
            <span class="mas">Submit</span>
            <button id='work' type="button" name="Hover" @click="submitSuperCategory()">Submit root category</button>
          </div>
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
      errorMessageF2: "",
      showOnMainpage: false
    }
  },
  methods: {

    submitCategory(){
      this.$store.state.addArticleOnMainPage = this.showOnMainpage
      this.$emit('changeC', "appAddArticleInformation");

    },
    submitSuperCategory(){
      if (this.subCategoryOf != "") {
        this.$store.dispatch('getCategoriesKey', {folder: "/catregory", subCategoryOf: this.subCategoryOf, returnSecureToken: true})
        this.path = this.path + this.subCategoryOf + "/"
        this.subCategoryOf = ""
        this.errorMessageF2 = ""
      } else {
        this.errorMessageF2 = "You have to select a root category."
      }
    },
    resetSuperCategory(){
      this.path = "/"
      this.subCategoryOf = ""
      this.$store.state.superCategory = ""
      this.errorMessageF2 = ""
      this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
    }
  },
  created: function (){
    this.resetSuperCategory
    this.$store.commit('closeNav')
    this.$store.dispatch("getCategories", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
  }
}

</script>
