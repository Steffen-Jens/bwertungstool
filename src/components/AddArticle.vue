<template>
  <div>
    <component id="a" class="addArticleComponent" :is="addArticleComponent" @changeC="addArticleComponent=$event"></component>
  </div>

</template>

<script>

import ChooseCategory from './AddArticle/ChooseCategory.vue';
import AddArticleInformation from './AddArticle/AddArticleInformation.vue'
//import axios from 'axios';

export default {
  components: {
    appChooseCategory: ChooseCategory,
    appAddArticleInformation: AddArticleInformation
  },
  data: function(){
    return{
      addArticleComponent: "appChooseCategory",
    }
  }

}
</script>
