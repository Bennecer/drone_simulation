<template>
  <div v-if="sensor.type===3342">
    <SensorSwitch :sensor="sensor"/>
  </div>
  <div v-else-if="sensor.type===3336">
    
  </div>
  <div v-else-if="sensor.type===3321">
    <SensorAltitude :sensor="sensor"/>
  </div>
</template>

<script>
import SensorSwitch from '../components/sensors/SensorSwitch';
import SensorAltitude from '../components/sensors/SensorAltitude';

export default {
  name: 'Sensor',
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data(){
    return{
    }
  },
  components: {
    SensorSwitch,
    SensorAltitude
  },
  mounted(){
  }
};
</script>
<style scoped lang="scss">
  .deviceItem{
    width: 100%;
    padding: 5px;
    margin: 5px;
    border: 1px solid black;
    display: flex;
  }
</style>