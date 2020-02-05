<template>
  <div class="addArt">
    <br>
    <div class="row" v-if="this.$store.state.userId != null">
      <div class="col-sm-1"></div>
      <div class="col-sm-5 addArtF1">
        <h4>Add product</h4>
        <form method="post" class="form" id="form">
          <div class="inputFileWrapper">
            <div class="button-container">
              <span class="mas">Upload an image</span>
              <button id='work' type="button" name="Hover">Upload an image</button>
            </div>
            <input type="file" @change="onFileChange" required />
          </div>
          <br>
          Brand: <br><input type="text" name="addArtBrand" @keyup.enter="uploadArticle" v-model="brand" required>
          <br>
          Product name: <br><input type="text" name="addArtBrand" @keyup.enter="uploadArticle" v-model="name" required>
          <br>
          Description: <br><textarea type="text" name="addArtDescription" v-model="description" required></textarea>
          <br>
          <div class="button-container">
            <span class="mas">Upload</span>
            <button id='work' type="button" @click="uploadArticle" name="Hover">Upload the Article</button>
          </div>
          <br><br>
          <div v-if="this.uploadValue != 0">
            <p>Progress: {{uploadValue+"%"}}</p>
            <!--  <progress id="progress" :value="uploadValue" max="100" ></progress> -->
            <div class="progressBarContainer">
              <div id="progressBar" class="progressBar" :style="{width: uploadValue + '%'}">
              </div>
            </div>
          </div>
        </form>
        <div id="error">{{addArtErrorMessage}}</div>
      </div>
      <div class="col-sm-5">

        <h4>Preview</h4>
        <div class="row card-board">
          <div class="row">

            <div class="col-sm-8 article-cards">
              <h4>{{brand}}</h4>
              <h5>{{name}}</h5>
              <p>{{description}}</p>
              <img v-if="picture" :src="picture" />
            </div>
          </div>
        </div></div>
        <div class="col-sm-1"></div>
      </div>
      <div class="needLogin" v-if="this.$store.state.userId == null">
        <div class="innerNeedLogin">
          <h4>You have to be signed in to add products.</h4>
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
  import firebase from 'firebase';
  import axios from "axios";
  export default{

    data() {
      return{
        brand: "",
        name: "",
        description: "",
        uploadValue: 0,
        picture: null,
        imageData: null,
        imageLocation: null
      }
    },
    methods: {
      onFileChange(e){
        this.uploadValue=0;
        this.imageData = e.target.files[0];
        this.picture = URL.createObjectURL(this.imageData);
      },
      uploadArticle(){

        axios.post("/category" + this.$store.state.superCategory + "/article" + ".json" + '?auth=' + this.$store.state.idToken, {brand: this.brand, name: this.name, description: this.description, creator: this.$store.state.userId})
        .then(res => {
          /* eslint-disable no-console */
          console.log(res)
          this.imageLocation = '/articles' + this.$store.state.superCategory  + res.data.name + `/${this.imageData.name}`

          axios.put("/category" + this.$store.state.superCategory + "/article/" + res.data.name + ".json" + "?auth=" + this.$store.state.idToken, {brand: this.brand, name: this.name, description: this.description, creator: this.$store.state.userId, imageLocation: this.imageLocation})
          const storageRef=firebase.storage().ref(this.imageLocation).put(this.imageData);
          storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
          if(this.uploadValue == 100){
            this.brand = ""
            this.description = ""
            this.name = ""
            this.picture = null;
          }

          }, error=>{console.log(error.message)}
        );
        if(this.$store.state.addArticleOnMainPage == true){
          axios.post("/mainPage/article.json?auth=" + this.$store.state.idToken, {brand: this.brand, name: this.name, description: this.description, creator: this.$store.state.userId, imageLocation: this.imageLocation})
        }
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error)
      })


    }
  }
}

</script>
