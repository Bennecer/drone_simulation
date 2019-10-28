<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ sensor.name }}</v-card-title>
        <v-card-text>
          <div class="text--primary">Type : {{ sensor.type }}</div>
        </v-card-text>
        <v-card-text>
          <div class="text--primary">Altitude : {{ altitude }}</div>
        </v-card-text>
      </div>
      <div class="d-flex flex-column justify-center">
        <v-btn @click="up" class="ma-2" color="primary">
          <v-icon left>mdi-arrow-up</v-icon>Up
        </v-btn>
        <v-btn @click="down" class="ma-2" color="error">
          <v-icon left>mdi-arrow-down</v-icon>Down
        </v-btn>
      </div>
      <v-avatar class="ma-3" size="125" tile>
        <v-img>
          <img :src="iconLink" />
        </v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import socket from "@/services/socket.js";

export default {
  name: "SensorAltitude",
  props: {
    sensor: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      iconLink: "",
      altitude: null
    };
  },
  components: {},
  methods: {
    up() {
      this.altitude++;

      const topic =
        this.$store.state.devEui +
        "-out/1/" +
        this.sensor.type +
        "/" +
        this.sensor.nativeNodeId +
        "/" +
        this.sensor.nativeSensorId +
        "/5601";
      if (typeof topic === "string") {
        socket.client.publish(topic, "" + this.altitude);

        setTimeout(() => {
          this.$store.dispatch("getFullState");
        }, 7000);
      }
    },
    down() {
      if (this.altitude > 0) {
        this.altitude--;

        const topic =
          this.$store.state.devEui +
          "-out/1/" +
          this.sensor.type +
          "/" +
          this.sensor.nativeNodeId +
          "/" +
          this.sensor.nativeSensorId +
          "/5601";
        if (typeof topic === "string") {
          socket.client.publish(topic, "" + this.altitude);

          setTimeout(() => {
            this.$store.dispatch("getFullState");
          }, 7000);
        }
      }
    }
  },
  mounted() {
    this.iconLink = "https://aloes.io" + this.sensor.icons[0];
    this.altitude = this.sensor.resources["5601"];
  }
};
</script>
<style scoped lang="scss">
</style>