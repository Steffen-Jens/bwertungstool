<template>
  <div>
    <br>
    <br>
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-10 MC-Main">
        <h1>Welcome to</h1>
        <img class="welcome-logo" src="../assets/logo.png" alt="">
      </div>
      <div class="col-sm-1"></div>
      <div class="row">
        <div class="col-sm-12">
          <div class="row card-board">
            <div class="col-sm-3 article-cards" v-for="art in articles" v-bind:key="art.id">
              <h4>{{art.brand}}</h4>
              <h5>{{art.name}}</h5>
              <p>{{art.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//import axios from 'axios';

export default {
  data () {
    return {
      articles: this.$store.state.articles,
      subCategoryOf: ""
    }
  },
  methods: {

  },
  created: function (){
    this.$store.dispatch("getArticles", {subCategoryOf: this.subCategoryOf, returnSecureToken: true})
  }
}

</script>
