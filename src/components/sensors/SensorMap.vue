<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="headline">{{ sensor.name }}</v-card-title>
        <v-card-text>
          <div class="text--primary">Type : {{ sensor.type }}</div>
        </v-card-text>
        <br />
        <v-card-text>
          <div class="text--primary">Lat : {{ position[0] }}</div>
        </v-card-text>
        <v-card-text>
          <div class="text--primary">Long : {{ position[1] }}</div>
        </v-card-text>
        <v-card-text>
          <div class="text--primary">Feel free to drag the marker!</div>
        </v-card-text>
      </div>
      <LMap ref="myMap" :zoom="zoom" style="height: 500px; width: 500px">
        <LTileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></LTileLayer>
        <LMarker draggable autoPan :lat-lng="position" @moveend="drag"></LMarker>
      </LMap>
      <v-avatar class="ma-3" size="125" tile>
        <v-img>
          <img :src="iconLink" />
        </v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
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
      position: [],
      zoom: 1
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  methods: {},
  mounted() {
    this.iconLink = "https://aloes.io" + this.sensor.icons[0];

    const lat = this.sensor.resources[5514];
    const long = this.sensor.resources[5515];

    this.position = [lat, long];
  },
  methods: {
    drag(e) {
      this.position[0] = e.target._latlng.lat;
      this.position[1] = e.target._latlng.lng;

      this.$forceUpdate();

      const topicLat =
        this.$store.state.devEui +
        "-out/1/" +
        this.sensor.type +
        "/" +
        this.sensor.nativeNodeId +
        "/" +
        this.sensor.nativeSensorId +
        "/5514";
      if (typeof topicLat === "string") {
        socket.client.publish(topicLat, "" + this.position[0]);

        setTimeout(() => {
          this.$store.dispatch("getFullState");
        }, 7000);
      }

      const topicLong =
        this.$store.state.devEui +
        "-out/1/" +
        this.sensor.type +
        "/" +
        this.sensor.nativeNodeId +
        "/" +
        this.sensor.nativeSensorId +
        "/5515";
      if (typeof topicLong === "string") {
        socket.client.publish(topicLong, "" + this.position[1]);

        setTimeout(() => {
          this.$store.dispatch("getFullState");
        }, 7000);
      }
    }
  }
};
</script>
<style scoped lang="scss">
</style>