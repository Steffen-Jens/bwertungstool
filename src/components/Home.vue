<template>
  <div>
    <button @click="bitte">Get Data</button>
    <p>userId: {{ userId }}</p>
    <p>username: {{ username }}</p>
    <p>isAdmin: {{ isAdmin }}</p>
    <p>idToken: {{ idToken }}</p>
  </div>
</template>

<script>

//import axios from 'axios';

export default {
  data () {
    return {
      username: "",
      userId: "",
      isAdmin: null,
      idToken: ""
    }
  },
  methods: {

    bitte(){
      /*
      axios.get('/users.json' + '?auth=' + this.$store.state.idToken)
      .then(res => {
        eslint-disable no-console
        console.log("GET METHOD:" + res)
        const data = res.data
        for (let key in data){
          const user = data[key]
          this.username = user.username
          this.email = user.email
          this.isAdmin = user.isAdmin
        }
      })

      .catch(error => {
        this.error = error,
        console.log(error)
      })*/
      this.idToken = this.$store.state.idToken
      this.userId = this.$store.state.userId
      this.username = this.$store.state.username
      this.isAdmin = this.$store.state.isAdmin
    }

  }
}

</script>
