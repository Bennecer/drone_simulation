<template>
  <div class="device">
    <h1>Devices</h1>
    <h3 v-if="isConnected">I'm connected !</h3>
    <h3 v-else>I'm not connected</h3>
    <div class="deviceContainer">
      <div :key="device.id" v-for="device in sensors">
        <Sensor :sensor="device" />
      </div>
    </div>
  </div>
</template>
<script>
  import dataDevice from '@/assets/dataDevice.json'
  import socket from '@/services/socket.js'
  import Sensor from '../components/Sensor';

  export default{
      components: {
        Sensor
      },
      data(){
        return{
            dataDevice,
            isConnected: false,
            sensors: {}
        }
      },
      mounted(){
        socket.eventBus.$on('socketConnect', async state => {
          if(state){
            this.isConnected = true;
            this.$store.dispatch('getFullState').then(res => {
              this.sensors = this.$store.state.sensors;
            });
          }
          else{
            this.isConnected = true;
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
    justify-content: space-evenly;
  }
</style>