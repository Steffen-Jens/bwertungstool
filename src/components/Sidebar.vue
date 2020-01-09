<template>
  <div id="sidebar" class="sidebar">
    <button @click="closeNav()" title="Close" class="icnbtn sidebar-button close-btn">
      <a>
        <i class="fas fa-times icon"></i>
      </a>
    </button>
    <br>
    <div class="sidebar-content">
      <form class="sidenav-search mob-hide">
        <input class="searchfield" type="search" placeholder="Search"
        aria-label="Search">
        <button class="icnbtn searchbutton nav-button" type="button"><i
          class="fas fa-search icon"></i>
        </button>
      </form>
      <span class="nav-span">Category
        <button title="Add Category"
        class="icnbtn sidebar-button ">
        <a>
          <i class="fas fa-plus icon"></i>
        </a>
      </button>
    </span>
  </div>
</div>
</template>

<script>
export default {

  methods: {
    closeNav() {

        document.getElementById("sidebar").style.width = "0";
        document.getElementById("mainComponent").style.paddingLeft = "0";
        document.getElementById("navbarTop").style.paddingLeft = "0";
        this.expandedNav = false;
      }
    }



}
</script>
