<template>
  <div>
    <br>
    <div class="row">
      <div class="col-sm-12">
        <div class="row card-board">
          <div class="col-sm-3 article-cards" v-for="art in articles" v-bind:key="art.id" @click="loadArticle(art.articleURL)">
            <div class="cards">
              <h4>{{art.brand}}</h4>
              <h5>{{art.name}}</h5>
              <div class="image">
                <img :src="art.articleImageURL" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
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
    loadArticle(articleURL){
      this.$router.push("/article/" + articleURL.split("/").join("~"))
    }
  },
  created: function (){
    this.$store.state.searchString = ""
    this.$store.state.prevRoute = "/"
    while(this.$store.state.articles.length > 0) {this.$store.state.articles.pop()}
    this.$store.dispatch("getAllCategories", { path: "" })
  }
}

</script>
