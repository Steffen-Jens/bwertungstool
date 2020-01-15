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
        class="icnbtn sidebar-button " v-if="this.$store.state.isAdmin != null" @click="newContent='appAddCategory'; setNewContent()">
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

  data: function(){
    return {
      newContent: '',
      isAdmin: this.$store.state.isAdmin,
    }
  },

  methods: {
    closeNav() {
      this.$store.commit('closeNav')
    },
    setNewContent(){
      this.$emit('changeMC', this.newContent);
    }
  }



}
</script>
