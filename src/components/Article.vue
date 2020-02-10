<template>
  <div>
    <br>
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <div class="article">
          <div class="row">
            <div class="col-sm-5">
              <img class="articleImage" :src="art.image" alt="">
            </div>
            <div class="col-sm-5">
              <h1>{{art.brand}}</h1>
              <h2>{{art.name}}</h2>
              <br>
              <h3 v-if="amountOfRatings >= 1">Average of {{amountOfRatings}} ratings:<br><span class="highlightedText">{{(totalRating/amountOfRatings).toFixed(2)}}</span>  <i class="fas fa-angry rate-icon" v-if="totalRating/amountOfRatings<2 && totalRating/amountOfRatings>=1"></i>
                                <i class="fas fa-frown rate-icon" v-if="totalRating/amountOfRatings<4 && totalRating/amountOfRatings>=2"></i>
                                <i class="fas fa-meh rate-icon" v-if="totalRating/amountOfRatings<6 && totalRating/amountOfRatings>=4"></i>
                                <i class="fas fa-smile rate-icon" v-if="totalRating/amountOfRatings<8 && totalRating/amountOfRatings>=6"></i>
                                <i class="fas fa-laugh rate-icon" v-if="totalRating/amountOfRatings<=10 && totalRating/amountOfRatings>=8"></i></h3>

              <h3 v-if="amountOfRatings == 0">This product hasn't been rated.</h3>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-12">
              <p v-html="art.description"></p>
            </div>
          </div>
          <hr>
          <div class="row" v-if="userId != null">
            <div class="col-sm-12">
              <div class="article-rating">
                <h4>Rate the product:</h4>
                <form class="ratingform">
                  Description: <br><textarea class="rating-description" rows="4" name="addRatingDescription" v-model="description" required></textarea>
                  <div class="innerRatingForm">
                    <input type="range" min="1" max="10" v-model="rating"/>
                    <i class="fas fa-angry rate-icon" v-if="rating==2 || rating==1"></i>
                    <i class="fas fa-frown rate-icon" v-if="rating==4 || rating==3"></i>
                    <i class="fas fa-meh rate-icon" v-if="rating==6 || rating==5"></i>
                    <i class="fas fa-smile rate-icon" v-if="rating==8 || rating==7"></i>
                    <i class="fas fa-laugh rate-icon" v-if="rating==10 || rating==9"></i>
                    <h4>{{rating}}</h4>
                  </div>
                </form>
                <div class="button-container">
                  <span class="mas">Submit</span>
                  <button id='work' type="button" @click="submitRating" name="Hover">Submit rating</button>
                </div>
              </div>
            </div>
          </div>
          <br>
          <hr>
          <div class="row">
            <div class="col-sm-12">
              <div class="ratings" v-for="rat in ratings" v-bind:key="rat.id">
                <h5><span class="highlightedText">{{rat.username}}</span> gave {{rat.value}} points.</h5>
                <h6>{{rat.description}}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-1"></div>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios';
var nl2br  = require('nl2br');
export default {

  data () {
    return {
      articles: null,
      articleId: this.$route.params.artId,
      art: {},
      articleURL: "",
      rating: 1,
      description: "",
      ratings: [],
      ratingKey: "",
      amountOfRatings: 0,
      totalRating: 0,
      userId: this.$store.state.userId
    }
  },methods: {
    getRatings(){
      this.amountOfRatings = 0
      this.totalRating = 0
      while(this.ratings.length > 0) {this.ratings.pop()}
      axios.get(this.articleURL + "/rating" + '.json')
      .then(res => {
        /* eslint-disable no-console */
        const data = res.data
        for (let key in data){
          const rating = data[key]
          this.amountOfRatings++
          this.totalRating = (parseInt(this.totalRating) + parseInt(rating.value)).toFixed(2)
          if (this.$store.state.userId == key) {
            this.description = rating.description
            this.rating = rating.value
            this.ratingKey = key
            this.ratings.push(rating)
          }else{
            this.ratings.push(rating)
          }

        }
      })
      .catch(error => {
        this.error = error,
        console.log(error)
      })
    },
    submitRating(){
      axios.put(this.articleURL + "/rating/" + this.$store.state.userId + ".json" + '?auth=' + this.$store.state.idToken, {username: this.$store.state.username, value: this.rating, description: this.description})
      .then(res => {
        /* eslint-disable no-console */
        console.log(res)
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error)
      })
      setTimeout(this.getRatings, 1200)
    }
  },
  created: function (){
    /* eslint-disable no-console */
    this.articles = this.$store.state.articles
    this.articleURL = this.articleId.split("~").join("/")
    if(this.$store.state.prevRoute.path != "/"){
      console.log("startArt")
      this.articles.forEach(article => {
        if(article.articleURL == this.articleURL ){
          this.art = {
            name: article.name,
            brand: article.brand,
            description: nl2br(article.description, false),
            image: article.articleImageURL
          }
        }
      })
    }else {
      this.articles = this.$store.state.exactArticles
      console.log("startArt")
      this.articles.forEach(article => {
        if(article.articleURL == this.articleURL ){
          this.art = {
            name: article.name,
            brand: article.brand,
            description: nl2br(article.description, false),
            image: article.articleImageURL
          }
        }
      })
    }
    this.getRatings()
  },
}

</script>
