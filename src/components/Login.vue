<template>
  <div class="login">
    <h1>Login</h1>
    
    <form ref="login-form" @submit.prevent="onLogin">
      <label for="deviceId">deviceId : </label>
      <input 
        type="text" 
        id="deviceId" 
        name="deviceId"
        placeholder="Enter your deviceId"
        v-model="deviceId" 
        ref="deviceId"
        required
      />
      </br></br>
      <label for="apiKey">apiKey : </label>
      <input 
        type="text" 
        id="apiKey" 
        name="apiKey"
        placeholder="Enter your apiKey"
        v-model="apiKey" 
        ref="apiKey"
        required
        @keypress.native.enter="onLogin"
      />
      </br></br>
      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  mounted(){
  },
  computed: {
    deviceId : {
      get(){
        return this.$store.state.deviceId;
      },
      set(value){
        this.$store.commit("setState", {key:"deviceId", value});
      }
    },
    apiKey : {
      get(){
        return this.$store.state.apiKey;
      },
      set(value){
        this.$store.commit("setState", {key:"apiKey", value});
      }
    }
  },
  methods: {
    onLogin(){
      this.$store.dispatch("login").then(()=>{
        this.$router.push({name: "device"})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
