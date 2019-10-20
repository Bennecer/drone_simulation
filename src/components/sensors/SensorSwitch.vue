<template>
  <div v-if="updatedSensor" class="deviceItem">
    <ul>
        <li>Name : {{ updatedSensor.name }}</li>
        <li>Type : {{ updatedSensor.type }}</li>
        <li class="switchIcon" @click="switchState('5500', !isSwitchOn)">
            <img v-if="isSwitchOn" :src="iconLinkOn"/>
            <img v-else-if="!isSwitchOn" :src="iconLinkOff"/>
        </li>
    </ul>
  </div>
</template>

<script>
import socket from '@/services/socket.js'

export default {
  name: 'SensorSwitch',
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data(){
    return{
      updatedSensor: null
    }
  },
  computed: {
    isSwitchOn: {
        get(){
            return this.updatedSensor.resources['5500'];
        },
        set(value){
            this.updatedSensor.resources['5500'] = value;
        }
    },
    iconLinkOn(){
        return "https://aloes.io" + this.updatedSensor.icons[0];
    },
    iconLinkOff(){
        return "https://aloes.io" + this.updatedSensor.icons[1];
    }
  },
  watch: {
      sensor: {
          handler(value, oldValue){
              if(value && value.type){
                this.updatedSensor = value;
              }
          },
          immediate: true
      }
  },
  components: {
  },
  methods: {
      switchState(resource, value){
        console.log(this.$store.state.devEui);
        this.isSwitchOn = value;
        const topic = this.$store.state.devEui+"-out/1/"+this.updatedSensor.type+"/"+this.updatedSensor.nativeNodeId+"/"+this.updatedSensor.nativeSensorId+"/"+resource;
        if(typeof topic === "string"){
            socket.client.publish(topic, ""+value);
        }
        this.$store.dispatch('getFullState').then(res => {
            console.log(this.sensor)
        })
      }
  },
  mounted(){
  }
};
</script>
<style scoped lang="scss">
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    li{
      list-style-type: none;
      text-align: left;
    }
    .switchIcon{
      text-align: center;
      img{
          max-width: 200px;
          max-height: 200px;
      }
    }
  }
</style>