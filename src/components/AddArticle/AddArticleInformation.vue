<template>
  <div>
    <div class="row user-account">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <h4>Add Article</h4>
        <form method="post" class="form" id="form">
          <input type="file" @change="onFileChange" />
          <div id="preview">
            <img v-if="picture" :src="picture" />
          </div>
          <br>
          Brand: <input type="text" name="addArtBrand" @keyup.enter="addArticle" v-model="brand">
          <br>
          Article name: <input type="text" name="addArtBrand" @keyup.enter="addArticle" v-model="name">
          <br>
          Description: <input type="text" name="addArtDescription" @keyup.enter="addArticle" v-model="description">
          <br>
          <div id="login-btn" class="btn btn-animation" name="submit-login" @click="uploadArticle"><span>Submit</span></div><br>
        </form>
        <div>
          <p>Progress: {{uploadValue+"%"}}</p>
          <progress id="progress" :value="uploadValue" max="100" ></progress>
        </div>
        <div id="error">{{addArtErrorMessage}}</div>
      </div>
      <div class="col-sm-1"></div>
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
        this.picture=null;
        this.imageLocation = '/articles' + this.$store.state.superCategory  + res.data.name + `/${this.imageData.name}`

        axios.put("/category" + this.$store.state.superCategory + "/article/" + res.data.name + ".json" + "?auth=" + this.$store.state.idToken, {brand: this.brand, name: this.name, description: this.description, creator: this.$store.state.userId, imageLocation: this.imageLocation})
        const storageRef=firebase.storage().ref(this.imageLocation).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
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
