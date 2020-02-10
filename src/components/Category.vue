<template>
  <div>
    <br>
      <div class="row">
        <div class="col-sm-12">
          <div class="row card-board">
            <div class="col-sm-3 article-cards" v-for="exArt in exactArticles" v-bind:key="exArt.id" @click="loadArticle(exArt.articleURL)">
              <div class="cards">
              <h4>{{exArt.brand}}</h4>
              <h5>{{exArt.name}}</h5>
              <div class="image">
              <img :src="exArt.articleImageURL" alt="">
              </div>
              </div>
            </div>
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
      exactArticles: this.$store.state.exactArticles,
      subCategoryOf: ""
    }
  },methods: {
    loadArticle(articleURL ){
      this.$router.push("/article/" + articleURL.split("/").join("~"))
    }
  },
  created: function (){
    this.$store.state.prevRoute = "";
  }
}

</script>
