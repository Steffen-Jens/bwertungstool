<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="index.php"><img class="logo" src="../assets/logo.png"></a>
      <!-- Navbar brand-->
      <button title="Search" type="button" class="navbar-toggler icnbtn nav-button openbtn"
      @click="openNav()">
      <i class="fas fa-search icon"><span class="nav-span">Search</span></i>
    </button>
    <button class="navbar-toggler nav-button icnbtn" type="button" data-toggle="collapse"
    data-target="#navbarTop"
    aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" @click="closeNav()">
    <i class="fas fa-caret-square-down icon"><span class="nav-span">Menu</span></i>
  </button>


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
        <a class="nav-link" title="User overview" href="addArticle.html">
          <i class="fas fa-users icon"><span class="nav-span navbar-toggler">User Overview</span></i>
        </a>
      </li>
      <li class="nav-item button-list">

        <a class="nav-link" title="Add article" href="addArticle.html">
          <i class="fas fa-plus icon"><span class="nav-span navbar-toggler">Add Article</span></i>
        </a>

      </li>
      <li class="nav-item button-list">
        <a class="nav-link" title="Profile" @click="newContent='appLogin'; setNewcontent()" href="#">
          <i class="fas fa-user icon"><span class="nav-span navbar-toggler">Profile</span></i>
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
    }
  },

  methods: {
    setNewcontent(){
      this.$emit('changeMC', this.newContent);
    },
    openNav(){

        var x = window.matchMedia("(max-width: 992px)");
        if (x.matches) {

          document.getElementById("sidebar").style.width = "100%";
          document.getElementById("sidebar").style.marginTop = "78px";
          document.getElementById("navbarTop").style.transition = "0.5s";
          document.getElementById("navbarTop").style.paddingLeft = "105%";
        } else {
          var margin = "20.5%";
          document.getElementById("sidebar").style.width = margin;
          document.getElementById("mainComponent").style.paddingLeft = margin;
        }
    },

  }
}
</script>
