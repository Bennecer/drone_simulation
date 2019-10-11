<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <form ref="login-form" @submit.prevent="onLogin">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      id="deviceId"
                      label="DeviceId"
                      name="deviceId"
                      prepend-icon="mdi-airplane"
                      type="text"
                      v-model="deviceId" 
                      required
                    ></v-text-field>

                    <v-text-field
                      id="apiKey"
                      label="ApiKey"
                      name="apiKey"
                      prepend-icon="mdi-key"
                      type="text"
                      v-model="apiKey" 
                      required
                      @keypress.native.enter="onLogin"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
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
