<template>
  <v-card v-if="updatedSensor">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ sensor.name }}</v-card-title>
        <v-card-text>
          <div class="text--primary">Type : {{ sensor.type }}</div>
        </v-card-text>
        <v-card-text>
          <div class="text--primary">State : {{ sensor.resources["5500"] ? 'ON' : 'OFF' }}</div>
        </v-card-text>
      </div>
      <v-avatar class="ma-3" size="125" tile>
        <v-img @click="switchState('5500', !isSwitchOn)">
          <img v-if="isSwitchOn" :src="iconLinkOn" />
          <img v-else-if="!isSwitchOn" :src="iconLinkOff" />
        </v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import socket from "@/services/socket.js";

export default {
  name: "SensorSwitch",
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      updatedSensor: null
    };
  },
  computed: {
    isSwitchOn: {
      get() {
        return this.updatedSensor.resources["5500"];
      },
      set(value) {
        this.updatedSensor.resources["5500"] = value;
      }
    },
    iconLinkOn() {
      return "https://aloes.io" + this.updatedSensor.icons[0];
    },
    iconLinkOff() {
      return "https://aloes.io" + this.updatedSensor.icons[1];
    }
  },
  watch: {
    sensor: {
      handler(value, oldValue) {
        if (value && value.type) {
          this.updatedSensor = value;
        }
      },
      immediate: true
    }
  },
  components: {},
  methods: {
    switchState(resource, value) {
      this.isSwitchOn = value;
      const topic =
        this.$store.state.devEui +
        "-out/1/" +
        this.updatedSensor.type +
        "/" +
        this.updatedSensor.nativeNodeId +
        "/" +
        this.updatedSensor.nativeSensorId +
        "/" +
        resource;
      if (typeof topic === "string") {
        socket.client.publish(topic, "" + value);

        setTimeout(() => {
          this.$store.dispatch("getFullState");
        }, 7000);
      }
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  li {
    list-style-type: none;
    text-align: left;
  }
  .switchIcon {
    text-align: center;
    img {
      max-width: 200px;
      max-height: 200px;
    }
  }
}
</style>