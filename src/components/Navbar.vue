<template>
  <nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
    <button class="mn-button navbar-toggler" type="button" @click="openNav">
      <i class="fas fa-bars icon"></i>
      <span> Categories</span>
    </button>
    <router-link to="/" class="hdeNavItem2 logo" @click="newContent='appHome'; setNewContent()"><img class="logo" src="../assets/logo.png"></router-link>
    <button class="mn-button navbar-toggler" type="button" data-toggle="collapse" data-target="#navElements" aria-controls="navElements" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-ellipsis-h icon"></i>
      <span> Menu</span>
    </button>
    <div class="collapse navbar-collapse" id="navElements">
      <ul class="nav nav-pills navbar-nav mr-auto mt-2 mt-lg-0">
        <li>
          <form class="form-inline my-2 my-lg-0">
            <button class="mn-button hdeNavItem" type="button" @click="openNav">
              <i class="fas fa-bars icon"></i>
            </button>
          </form>
        </li>

        <router-link to="/" tag="li" class="navbar-brand hdeNavItem logo" @click="newContent='appHome'; setNewContent()"><img class="logo" src="../assets/logo.png"></router-link>


        <router-link to="/" tag="li" active-class="active" exact class="nav-link"><a>Home</a></router-link>


        <router-link to="/addProduct" tag="li" active-class="active" class="nav-link"><a>Add Article</a></router-link>


        <router-link v-if="this.$store.state.isAdmin == true" to="/addCategory" tag="li" active-class="active" exact class="nav-link"><a>Add Category</a></router-link>

      </ul>
      <form class="form-inline my-2 my-lg-0 hdeNavItem">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="searchString">
        <button class="mn-button" @click="startSearch" type="submit"><i class="fas fa-search icon"></i></button>
      </form>
      <ul class="nav nav-pills navbar-nav my-2 my-lg-0">

        <router-link to="/login" tag="li" active-class="active" exact class="nav-link"><a>Login</a></router-link>

      </ul>
    </div>
  </nav>
</template>


<script>

export default {

  data: function(){
    return {
      newContent: '',
      addArticlePage: "appAddArticle",
      sas: "/login",
      searchString: ""
    }
  },

  methods: {
    openNav(){
      this.$store.commit('openNav')
    },
    closeNav(){
      this.$store.commit('closeNav')
    },
    startSearch(){
      while(this.$store.state.exactArticles.length > 0) {this.$store.state.exactArticles.pop()}
      while(this.$store.state.articles.length > 0) {this.$store.state.articles.pop()}
      if (this.searchString == ""){
        this.$router.push("/ooops")
      }else{
        this.$store.state.searchString = this.searchString
        this.$store.dispatch('getAllCategories', {path: "", returnSecureToken: true})
        this.$router.push("/category/" + this.searchString)
      }
    }
  }
}
</script>
