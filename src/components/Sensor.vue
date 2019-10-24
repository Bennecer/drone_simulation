<template>
  <SensorSwitch v-if="sensor.type===3342" :sensor="sensor" />

  <SensorMap v-else-if="sensor.type===3336" :sensor="sensor" />

  <SensorAltitude v-else-if="sensor.type===3321" :sensor="sensor" />
</template>

<script>
import SensorSwitch from "../components/sensors/SensorSwitch";
import SensorAltitude from "../components/sensors/SensorAltitude";
import SensorMap from "../components/sensors/SensorMap";

export default {
  name: "Sensor",
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  components: {
    SensorSwitch,
    SensorAltitude,
    SensorMap
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
</style>