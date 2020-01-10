<template>
  <div>
    <button @click="bitte">Get Data</button>
    <p>Email: {{ email }}</p>
    <p>username: {{ username }}</p>
    <p>error: {{ error }}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      username: "",
      email: "",
      error: ""
    }
  },
  methods: {

    bitte(){
      axios.get('/users.json' + '?auth=' + this.$store.state.idToken)
      .then(res => {
        /* eslint-disable no-console */
        console.log("GET METHOD:" + res)
        const data = res.data
        for (let key in data){
          const user = data[key]
          this.username = user.username
          this.email = user.email
        }
      })

      .catch(error => {
        /* eslint-disable no-console */
        this.error = error,
        console.log(error)
      })
    }

  }
}

</script>
