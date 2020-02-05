<template>
  <div>
    <br>
      <div class="row">
        <div class="col-sm-12">
          <div class="row card-board">
            <div class="col-sm-3 article-cards" v-for="art in articles" v-bind:key="art.id">
              <h4>{{art.brand}}</h4>
              <h5>{{art.name}}</h5>
              <p>{{art.description}}</p>
              <img :src="art.articleImageURL" alt="">
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
  created: function (){
    this.$store.dispatch("getArticles")
  }
}

</script>
