<template>
  <div class="device">
    <h1>Devices</h1>
    <div class="deviceContainer">
      <div class="deviceItem" v-for="device in dataDevice.children">
        <ul>
          <li>Name : {{ device.name }}</li>
          <li>Type : {{ device.type }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import dataDevice from '@/assets/dataDevice.json'
  import socket from '@/services/socket.js'

  export default{
      data(){
          return{
              dataDevice
          }
      },
      mounted(){
        socket.eventBus.$on('socketConnected', function(state){
          if(state){
            this.$store.dispatch('getFullState');
          }
        })
      }
  }
</script>
<style scoped lang="scss">
  .deviceContainer{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  
    .deviceItem{
      width: 40%;
      padding: 5px;
      margin: 5px;
      border: 1px solid black;
      display: flex;
    }
  }
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    li{
      list-style-type: none;
      text-align: left;
    }
  }
</style>