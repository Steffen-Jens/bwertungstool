<template>
  <div class="addArt">
    <br>
    <div v-if="this.$store.state.userId != null">

      <form class="form" id="form">
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-3 addArtF1">
            <h4>Choose category</h4>
            Category of the product: <p>{{path}}</p>
            Show it on the homepage?
            <div class="checkbox">
              <label>
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
          <div class="col-sm-7 addArtF2">
            <br>
            <div class="row">
                <div class="col-sm-4 repeat" v-for="cat in categories" v-bind:key="cat.id">
                  <hr>
                  <a class="link" @click="subCategoryOf=cat.categoryName; submitSuperCategory()" v-bind:for="cat.categoryName" v-if="cat.categoryName" v-bind:id="cat.categoryName"  v-bind:value="cat.categoryName">{{cat.categoryName}}</a>
                </div>

            </div>
            <hr>
          </div>
          <div class="col-sm-1"></div>
        </div>
        <div class="row">
          <div class="col-sm-1"></div>
          <div class="col-sm-3 addArtF1">
            <router-link to="/addProduct/addArticleInformation">
              <div class="button-container">
                <span class="mas">Next</span>
                <button id='work' type="button" name="Hover" @click="submitCategory()">Next</button>
              </div>
            </router-link>
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

      <div class="needLogin" v-if="this.$store.state.userId == null">
        <div class="innerNeedLogin">
          <h4>You have to be signed in to add products.</h4>
          <router-link to="/login">
            <div class="button-container">
              <span class="mas">Sign in</span>
              <button id='work' type="button" name="Hover">Sign in</button>
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
      errorMessageF2: this.$store.state.errorMessage,
      showOnMainpage: false
    }
  },
  methods: {

    submitCategory(){
      this.$store.state.promotedArticle = this.showOnMainpage
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
    this.resetSuperCategory()
    this.$store.commit('closeNav')
  }
}

</script>
