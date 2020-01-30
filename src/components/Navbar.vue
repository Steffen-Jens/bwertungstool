<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#" @click="newContent='appHome'; setNewContent()"><img class="logo" src="../assets/logo.png"></a>
      <!-- Navbar brand-->
      <div>
      <button title="Search" type="button" class="navbar-toggler icnbtn nav-button openbtn"
      @click="openNav(); ">
      <i class="fas fa-search icon"><span class="nav-span">Search</span></i>
    </button>
    <button class="navbar-toggler nav-button icnbtn" type="button" data-toggle="collapse"
    data-target="#navbarTop"
    aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" @click="closeNav()">
    <i class="fas fa-caret-square-down icon"><span class="nav-span">Menu</span></i>
  </button>
</div>
  <div class="collapse navbar-collapse" id="navbarTop">
    <ul class="navbar-nav">
      <li class="nav-item search-list">
        <form class="nav-search">
          <button title="Categories" type="button" class="icnbtn nav-button openbtn"
          @click="openNav()">
          <i class="fas fa-bars icon"></i>
        </button>
        <input class="searchfield" type="search" placeholder="Search"
        aria-label="Search">
        <button class="icnbtn searchbutton nav-button" type="button"><i
          class="fas fa-search icon"></i>
        </button>
      </form>
    </li>
  </ul>
  <div class="nav-right">
    <ul class="navbar-nav">
      <li class="nav-item button-list">
        <a class="nav-link" title="Add item" href="#" @click="loadAddArticle()">
          <i class="fas fa-plus icon"><span class="nav-span navbar-toggler">Add item</span></i>
        </a>
      </li>
      <li class="nav-item button-list" v-if="this.$store.state.userId!=null">
        <a class="nav-link" title="Profile" @click="newContent='appLogin'; setNewContent()" href="#">
          <i class="fas fa-user icon"><span class="nav-span navbar-toggler">Profile</span></i>
        </a>
      </li>
      <li class="nav-item button-list" v-if="this.$store.state.userId==null">
        <a class="nav-link" title="Login" @click="newContent='appLogin'; setNewContent()" href="#">
          <i class="fas fa-sign-in-alt icon"><span class="nav-span navbar-toggler">Login</span></i>
        </a>
      </li>
    </ul>
  </div>
</div>
</nav>
</header>
</template>
<script>
export default {

  data: function(){
    return {
      newContent: '',
      addArticlePage: "appAddArticle"

    }
  },

  methods: {
    setNewContent(){
      this.$emit('changeMC', this.newContent);
    },
    loadAddArticle(){
      if(this.$store.state.userId != null){
        this.newContent = "appAddArticle";
        this.setNewContent();
      }else{
        if (confirm("You have to be signed in to add articles.")) {
          this.newContent = "appLogin";
          this.setNewContent();
        }
      }
    },
    loadProfile(){
      if(this.$store.state.userId != null){
        this.loginPage = "appProfile";
      }else{
        this.newContent = "appLogin";
      }
    },
    openNav(){
      this.$store.commit('openNav')
    },
    closeNav(){
      this.$store.commit('closeNav')
    }

  }
}
</script>
